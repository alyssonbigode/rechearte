require("dotenv").config();

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { Pool } = require("pg");

const root = __dirname;
const port = process.env.PORT || 3000;
const sessions = new Map();
const SESSION_COOKIE = "rechearte_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

function seed() {
  return {
    products: [
      { id: crypto.randomUUID(), name: "Brigadeiro", category: "Cone trufado", price: 6, costPrice: 3, stock: 12 },
      { id: crypto.randomUUID(), name: "Brigadeiro com morango", category: "Cone trufado", price: 6, costPrice: 3.25, stock: 8 },
      { id: crypto.randomUUID(), name: "Morango trufado", category: "Cone trufado", price: 6, costPrice: 3.5, stock: 5 },
      { id: crypto.randomUUID(), name: "Prestigio", category: "Cone trufado", price: 6, costPrice: 3, stock: 3 },
      { id: crypto.randomUUID(), name: "Kinder Bueno", category: "Cone trufado", price: 6, costPrice: 3.75, stock: 6 },
    ],
    customers: [
      { id: crypto.randomUUID(), name: "Cliente balcao", phone: "", note: "Venda sem cadastro" },
    ],
    sales: [],
    consumables: [],
    productionHistory: [],
  };
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) request.destroy();
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function send(response, status, type, body) {
  response.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function sendJson(response, status, body) {
  send(response, status, mime[".json"], JSON.stringify(body));
}

function redirect(response, location) {
  response.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store",
  });
  response.end();
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [part, ""];
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function cookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.secure) parts.push("Secure");
  return parts.join("; ");
}

function cleanSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
}

function getSession(request) {
  cleanSessions();
  const token = parseCookies(request.headers.cookie)[SESSION_COOKIE];
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return session;
}

function hasAdminCredentials() {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASS);
}

function clearSession(response) {
  response.setHeader("Set-Cookie", cookie(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  }));
}

function createSession(response, user) {
  const token = crypto.randomBytes(32).toString("base64url");
  sessions.set(token, {
    user,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  response.setHeader("Set-Cookie", cookie(SESSION_COOKIE, token, {
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  }));
}

function timingSafeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function isAuthenticated(request) {
  return !hasAdminCredentials() || Boolean(getSession(request));
}

function safeStaticPath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const requested = pathname === "/" ? "/index.html" : pathname === "/login" ? "/login.html" : pathname;
  const resolved = path.normalize(path.join(root, requested));
  return resolved.startsWith(root) ? resolved : null;
}

function validateState(state) {
  if (!Array.isArray(state.products) || !Array.isArray(state.customers) || !Array.isArray(state.sales)) {
    throw new Error("Formato invalido");
  }
  if (state.recipeHistory && !Array.isArray(state.recipeHistory)) {
    throw new Error("Historico de receitas invalido");
  }
  if (state.consumables && !Array.isArray(state.consumables)) {
    throw new Error("Insumos invalidos");
  }
  if (state.productionHistory && !Array.isArray(state.productionHistory)) {
    throw new Error("Historico de producao invalido");
  }
}

function nonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function nonNegativeInteger(value) {
  return Math.floor(nonNegativeNumber(value));
}

async function waitForDatabase() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      await pool.query("select 1");
      return;
    } catch (error) {
      if (attempt === 30) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function initDatabase() {
  await waitForDatabase();
  await pool.query(`
    create table if not exists products (
      id uuid primary key,
      name text not null,
      category text not null,
      price numeric(12, 2) not null default 0,
      cost_price numeric(12, 2) not null default 0,
      stock integer not null default 0,
      min_stock integer not null default 0,
      created_at timestamptz not null default now()
    );

    create table if not exists customers (
      id uuid primary key,
      name text not null,
      phone text not null default '',
      note text not null default '',
      created_at timestamptz not null default now()
    );

    create table if not exists sales (
      id uuid primary key,
      date timestamptz not null,
      customer_id uuid references customers(id) on delete set null,
      payment text not null,
      note text not null default '',
      total numeric(12, 2) not null default 0,
      created_at timestamptz not null default now()
    );

    create table if not exists sale_items (
      id bigserial primary key,
      sale_id uuid not null references sales(id) on delete cascade,
      product_id uuid references products(id) on delete set null,
      name text not null,
      qty integer not null,
      unit_price numeric(12, 2) not null,
      unit_cost numeric(12, 2) not null default 0
    );

    create table if not exists consumables (
      id uuid primary key,
      code text not null default '',
      name text not null,
      details text not null default '',
      stock numeric(12, 3) not null default 0,
      unit text not null default 'g',
      min_stock numeric(12, 3) not null default 0,
      min_stock_unit text not null default 'g',
      cost numeric(12, 2) not null default 0,
      unit_cost numeric(14, 6) not null default 0,
      created_at timestamptz not null default now()
    );

    create table if not exists recipe_history (
      id uuid primary key,
      name text not null,
      product_id uuid references products(id) on delete set null,
      yield_qty integer not null default 1,
      total_cost numeric(12, 2) not null default 0,
      unit_cost numeric(12, 2) not null default 0,
      created_at timestamptz not null default now()
    );

    create table if not exists recipe_ingredients (
      id bigserial primary key,
      recipe_id uuid not null references recipe_history(id) on delete cascade,
      consumable_id uuid references consumables(id) on delete set null,
      name text not null default '',
      brand text not null default '',
      details text not null default '',
      package_price numeric(12, 2) not null default 0,
      package_qty numeric(12, 3) not null default 0,
      package_unit text not null default 'g',
      used_qty numeric(12, 3) not null default 0,
      used_unit text not null default 'g'
    );

    create table if not exists production_history (
      id uuid primary key,
      date timestamptz not null,
      product_id uuid references products(id) on delete set null,
      product_name text not null default '',
      recipe_id uuid references recipe_history(id) on delete set null,
      qty integer not null default 0,
      note text not null default '',
      created_at timestamptz not null default now()
    );

    create table if not exists production_consumed (
      id bigserial primary key,
      production_id uuid not null references production_history(id) on delete cascade,
      consumable_id uuid references consumables(id) on delete set null,
      name text not null default '',
      unit text not null default 'g'
    );

    create table if not exists state_version (
      id int primary key default 1,
      version int not null default 0
    );
    insert into state_version (id, version) values (1, 0) on conflict do nothing;
  `);

  await pool.query(`
    alter table recipe_ingredients add column if not exists brand text not null default '';
    alter table recipe_ingredients add column if not exists details text not null default '';
    alter table recipe_ingredients add column if not exists consumable_id uuid references consumables(id) on delete set null;
    alter table consumables add column if not exists code text not null default '';
    alter table consumables add column if not exists min_stock_unit text not null default 'g';
    alter table consumables add column if not exists unit_cost numeric(14, 6) not null default 0;
    alter table products add column if not exists cost_price numeric(12, 2) not null default 0;
    alter table sale_items add column if not exists unit_cost numeric(12, 2) not null default 0;
    update products set stock = 0 where stock < 0;

    do $$
    begin
      if not exists (
        select 1 from pg_constraint where conname = 'products_stock_non_negative'
      ) then
        alter table products add constraint products_stock_non_negative check (stock >= 0);
      end if;
    end $$;
  `);

  const result = await pool.query("select count(*)::int as total from products");
  if (result.rows[0].total === 0) {
    await saveState(seed());
  }
}

async function getState() {
  const [
    productsResult,
    customersResult,
    salesResult,
    itemsResult,
    consumablesResult,
    recipesResult,
    recipeIngredientsResult,
    productionResult,
    productionConsumedResult,
    versionResult,
  ] = await Promise.all([
    pool.query(`
      select id, name, category, price::float as price, cost_price::float as "costPrice", stock
      from products
      order by created_at, name
    `),
    pool.query(`
      select id, name, phone, note
      from customers
      order by created_at, name
    `),
    pool.query(`
      select id, date, customer_id as "customerId", payment, note, total::float as total
      from sales
      order by date desc
    `),
    pool.query(`
      select sale_id as "saleId", product_id as "productId", name, qty, unit_price::float as "unitPrice", unit_cost::float as "unitCost"
      from sale_items
      order by id
    `),
    pool.query(`
      select id, code, name, details, stock::float as stock, unit,
        min_stock::float as "minStock", min_stock_unit as "minStockUnit",
        cost::float as cost, unit_cost::float as "unitCost"
      from consumables
      order by created_at, code, name
    `),
    pool.query(`
      select id, name, product_id as "productId", yield_qty as "yieldQty",
        total_cost::float as "totalCost", unit_cost::float as "unitCost", created_at as "createdAt"
      from recipe_history
      order by created_at desc
    `),
    pool.query(`
      select recipe_id as "recipeId", consumable_id as "consumableId", name, brand, details, package_price::float as "packagePrice",
        package_qty::float as "packageQty", package_unit as "packageUnit",
        used_qty::float as "usedQty", used_unit as "usedUnit"
      from recipe_ingredients
      order by id
    `),
    pool.query(`
      select id, date, product_id as "productId", product_name as "productName",
        recipe_id as "recipeId", qty, note
      from production_history
      order by date desc
    `),
    pool.query(`
      select production_id as "productionId", consumable_id as "consumableId", name,
        qty::float as qty, unit
      from production_consumed
      order by id
    `),
    pool.query(`select version from state_version where id = 1`),
  ]);

  const itemsBySale = new Map();
  for (const item of itemsResult.rows) {
    if (!itemsBySale.has(item.saleId)) itemsBySale.set(item.saleId, []);
    itemsBySale.get(item.saleId).push({
      productId: item.productId,
      name: item.name,
      qty: item.qty,
      unitPrice: item.unitPrice,
      unitCost: item.unitCost,
    });
  }

  const ingredientsByRecipe = new Map();
  for (const ingredient of recipeIngredientsResult.rows) {
    if (!ingredientsByRecipe.has(ingredient.recipeId)) ingredientsByRecipe.set(ingredient.recipeId, []);
    ingredientsByRecipe.get(ingredient.recipeId).push({
      id: crypto.randomUUID(),
      consumableId: ingredient.consumableId || "",
      name: ingredient.name,
      brand: ingredient.brand,
      details: ingredient.details,
      packagePrice: ingredient.packagePrice,
      packageQty: ingredient.packageQty,
      packageUnit: ingredient.packageUnit,
      usedQty: ingredient.usedQty,
      usedUnit: ingredient.usedUnit,
    });
  }

  const consumedByProduction = new Map();
  for (const item of productionConsumedResult.rows) {
    if (!consumedByProduction.has(item.productionId)) consumedByProduction.set(item.productionId, []);
    consumedByProduction.get(item.productionId).push({
      consumableId: item.consumableId,
      name: item.name,
      qty: item.qty,
      unit: item.unit,
    });
  }

  return {
    version: versionResult.rows[0]?.version || 0,
    products: productsResult.rows,
    customers: customersResult.rows,
    consumables: consumablesResult.rows,
    sales: salesResult.rows.map((sale) => ({
      ...sale,
      date: new Date(sale.date).toISOString(),
      items: itemsBySale.get(sale.id) || [],
    })),
    recipeHistory: recipesResult.rows.map((recipe) => ({
      ...recipe,
      createdAt: new Date(recipe.createdAt).toISOString(),
      ingredients: ingredientsByRecipe.get(recipe.id) || [],
    })),
    productionHistory: productionResult.rows.map((item) => ({
      ...item,
      date: new Date(item.date).toISOString(),
      consumed: consumedByProduction.get(item.id) || [],
    })),
  };
}

async function saveState(state) {
  validateState(state);
  const client = await pool.connect();
  const productIds = new Set(state.products.map((product) => product.id));
  const productCosts = new Map(state.products.map((product) => [product.id, nonNegativeNumber(product.costPrice)]));
  const customerIds = new Set(state.customers.map((customer) => customer.id));
  const consumableIds = new Set((state.consumables || []).map((item) => item.id));
  const recipeIds = new Set((state.recipeHistory || []).map((recipe) => recipe.id));
  try {
    await client.query("begin");

    const versionResult = await client.query("select version from state_version where id = 1 for update");
    const currentVersion = versionResult.rows[0]?.version || 0;
    if (state.version !== undefined && state.version !== currentVersion) {
      throw new Error("CONCURRENCY_ERROR");
    }

    await client.query("delete from production_consumed");
    await client.query("delete from production_history");
    await client.query("delete from sale_items");
    await client.query("delete from sales");
    await client.query("delete from recipe_ingredients");
    await client.query("delete from recipe_history");
    await client.query("delete from consumables");
    await client.query("delete from products");
    await client.query("delete from customers");

    for (const product of state.products) {
      await client.query(
        `
          insert into products (id, name, category, price, cost_price, stock, min_stock)
          values ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          product.id,
          product.name,
          product.category,
          nonNegativeNumber(product.price),
          nonNegativeNumber(product.costPrice),
          nonNegativeInteger(product.stock),
          0,
        ],
      );
    }

    for (const item of state.consumables || []) {
      await client.query(
        `
          insert into consumables (id, code, name, details, stock, unit, min_stock, min_stock_unit, cost, unit_cost)
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        [
          item.id,
          item.code || "",
          item.name,
          item.details || "",
          nonNegativeNumber(item.stock),
          item.unit || "g",
          nonNegativeNumber(item.minStock),
          item.minStockUnit || item.unit || "g",
          nonNegativeNumber(item.cost),
          nonNegativeNumber(item.unitCost),
        ],
      );
    }

    for (const customer of state.customers) {
      await client.query(
        `
          insert into customers (id, name, phone, note)
          values ($1, $2, $3, $4)
        `,
        [customer.id, customer.name, customer.phone || "", customer.note || ""],
      );
    }

    for (const sale of state.sales) {
      await client.query(
        `
          insert into sales (id, date, customer_id, payment, note, total)
          values ($1, $2, $3, $4, $5, $6)
        `,
        [
          sale.id,
          sale.date,
          customerIds.has(sale.customerId) ? sale.customerId : null,
          sale.payment,
          sale.note || "",
          sale.total,
        ],
      );

      for (const item of sale.items || []) {
        await client.query(
          `
            insert into sale_items (sale_id, product_id, name, qty, unit_price, unit_cost)
            values ($1, $2, $3, $4, $5, $6)
          `,
          [
            sale.id,
            productIds.has(item.productId) ? item.productId : null,
            item.name,
            item.qty,
            item.unitPrice,
            nonNegativeNumber(item.unitCost ?? productCosts.get(item.productId)),
          ],
        );
      }
    }

    for (const recipe of state.recipeHistory || []) {
      await client.query(
        `
          insert into recipe_history (id, name, product_id, yield_qty, total_cost, unit_cost, created_at)
          values ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          recipe.id,
          recipe.name || "Receita sem nome",
          productIds.has(recipe.productId) ? recipe.productId : null,
          nonNegativeInteger(recipe.yieldQty) || 1,
          nonNegativeNumber(recipe.totalCost),
          nonNegativeNumber(recipe.unitCost),
          recipe.createdAt || new Date().toISOString(),
        ],
      );

      for (const ingredient of recipe.ingredients || []) {
        await client.query(
          `
            insert into recipe_ingredients
              (recipe_id, consumable_id, name, brand, details, package_price, package_qty, package_unit, used_qty, used_unit)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `,
          [
            recipe.id,
            consumableIds.has(ingredient.consumableId) ? ingredient.consumableId : null,
            ingredient.name || "",
            ingredient.brand || "",
            ingredient.details || "",
            nonNegativeNumber(ingredient.packagePrice),
            nonNegativeNumber(ingredient.packageQty),
            ingredient.packageUnit || "g",
            nonNegativeNumber(ingredient.usedQty),
            ingredient.usedUnit || "g",
          ],
        );
      }
    }

    for (const production of state.productionHistory || []) {
      await client.query(
        `
          insert into production_history (id, date, product_id, product_name, recipe_id, qty, note)
          values ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          production.id,
          production.date,
          productIds.has(production.productId) ? production.productId : null,
          production.productName || "",
          recipeIds.has(production.recipeId) ? production.recipeId : null,
          nonNegativeInteger(production.qty),
          production.note || "",
        ],
      );

      for (const item of production.consumed || []) {
        await client.query(
          `
            insert into production_consumed (production_id, consumable_id, name, qty, unit)
            values ($1, $2, $3, $4, $5)
          `,
          [
            production.id,
            consumableIds.has(item.consumableId) ? item.consumableId : null,
            item.name || "",
            nonNegativeNumber(item.qty),
            item.unit || "g",
          ],
        );
      }
    }

    await client.query("update state_version set version = version + 1 where id = 1");
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

const server = http.createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");

  if (pathname === "/api/health" && request.method === "GET") {
    try {
      await pool.query("select 1");
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 503, { ok: false });
    }
    return;
  }

  if (pathname === "/api/session" && request.method === "GET") {
    sendJson(response, 200, {
      authenticated: isAuthenticated(request),
      authEnabled: hasAdminCredentials(),
    });
    return;
  }

  if (pathname === "/api/session" && request.method === "POST") {
    if (!hasAdminCredentials()) {
      sendJson(response, 200, { ok: true, authenticated: true });
      return;
    }

    try {
      const body = JSON.parse(await readBody(request));
      const validUser = timingSafeEqualText(body.user || "", process.env.ADMIN_USER);
      const validPass = timingSafeEqualText(body.password || "", process.env.ADMIN_PASS);
      if (!validUser || !validPass) {
        clearSession(response);
        sendJson(response, 401, { ok: false, error: "Credenciais invalidas" });
        return;
      }
      createSession(response, process.env.ADMIN_USER);
      sendJson(response, 200, { ok: true, authenticated: true });
    } catch {
      sendJson(response, 400, { ok: false, error: "Formato invalido" });
    }
    return;
  }

  if (pathname === "/api/session" && request.method === "DELETE") {
    const token = parseCookies(request.headers.cookie)[SESSION_COOKIE];
    if (token) sessions.delete(token);
    clearSession(response);
    sendJson(response, 200, { ok: true });
    return;
  }

  if (pathname === "/logout") {
    const token = parseCookies(request.headers.cookie)[SESSION_COOKIE];
    if (token) sessions.delete(token);
    clearSession(response);
    redirect(response, "/login?message=Sessao%20encerrada.");
    return;
  }

  if (pathname.startsWith("/api/") && !isAuthenticated(request)) {
    sendJson(response, 401, { ok: false, error: "Nao autenticado" });
    return;
  }

  if (pathname === "/api/state" && request.method === "GET") {
    try {
      sendJson(response, 200, await getState());
    } catch {
      sendJson(response, 500, { ok: false, error: "Falha ao ler o banco" });
    }
    return;
  }

  if (pathname === "/api/state" && request.method === "PUT") {
    try {
      const parsed = JSON.parse(await readBody(request));
      await saveState(parsed);
      sendJson(response, 200, { ok: true });
    } catch (err) {
      if (err.message === "CONCURRENCY_ERROR") {
        sendJson(response, 409, { ok: false, error: "Versao conflituosa" });
      } else {
        sendJson(response, 400, { ok: false, error: "Falha ao salvar os dados" });
      }
    }
    return;
  }

  if ((pathname === "/" || pathname === "/index.html") && !isAuthenticated(request)) {
    redirect(response, "/login");
    return;
  }

  if ((pathname === "/login" || pathname === "/login.html") && isAuthenticated(request)) {
    redirect(response, "/");
    return;
  }

  const filePath = safeStaticPath(request.url);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    send(response, 404, "text/plain; charset=utf-8", "Nao encontrado");
    return;
  }

  const extension = path.extname(filePath);
  send(response, 200, mime[extension] || "application/octet-stream", fs.readFileSync(filePath));
});

initDatabase()
  .then(() => {
    server.listen(port, "0.0.0.0", () => {
      console.log(`Rechearte Controle em http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error("Nao foi possivel iniciar o banco de dados.", error);
    process.exit(1);
  });
