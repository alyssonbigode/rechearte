const STORAGE_KEY = "rechearte-alpha-state";
const API_URL = "/api/state";
const SESSION_URL = "/api/session";

const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 10 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2z"/><path d="M8 7h8M8 12h8M8 17h5"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6"/><path d="M16 14h.01"/></svg>',
  package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m21 8-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  boxes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 7h8v8H2zM14 7h8v8h-8zM8 15h8v7H8z"/><path d="M6 7V4h12v3"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="M7 16v-5M12 16V7M17 16v-8"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21V9"/><path d="m17 14-5-5-5 5"/><path d="M5 3h14"/></svg>',
  coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="8" cy="6" rx="6" ry="3"/><path d="M2 6v6c0 1.7 2.7 3 6 3s6-1.3 6-3V6"/><path d="M8 15c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/><path d="M14 9c3.3 0 6 1.3 6 3"/></svg>',
  "shopping-bag": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  "alert-triangle": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m10.3 3.9-8.1 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8.1-14a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  "heart-handshake": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5a5.5 5.5 0 0 0-10 3.5c0 2.3 1.5 4.1 3 5.5l7 7z"/><path d="m12 5 2.5 2.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>',
};

const seed = {
  products: [
    { id: crypto.randomUUID(), name: "Brigadeiro", category: "Cone trufado", price: 6, costPrice: 3, stock: 12 },
    { id: crypto.randomUUID(), name: "Brigadeiro com morango", category: "Cone trufado", price: 6, costPrice: 3.25, stock: 8 },
    { id: crypto.randomUUID(), name: "Morango trufado", category: "Cone trufado", price: 6, costPrice: 3.5, stock: 5 },
    { id: crypto.randomUUID(), name: "Prestigio", category: "Cone trufado", price: 6, costPrice: 3, stock: 3 },
    { id: crypto.randomUUID(), name: "Kinder Bueno", category: "Cone trufado", price: 6, costPrice: 3.75, stock: 6 },
  ],
  customers: [
    { id: crypto.randomUUID(), name: "Cliente balcão", phone: "", note: "Venda sem cadastro" },
  ],
  sales: [],
  consumables: [],
  productionHistory: [],
  recipeHistory: [],
};

let state = structuredClone(seed);
let saleDraftItems = [];
let reportFilter = { start: null, end: null, label: "Tudo" };
let lastSavedState = structuredClone(seed);
const undoStack = [];
let activeRecipeId = null;
let recipeDirty = false;
let recipeIngredientRows = [
  blankRecipeRow(),
];
let lastRecipeUnitCost = 0;

const units = ["g", "kg", "ml", "l", "un"];

async function loadState() {
  try {
    const response = await fetch(API_URL, { credentials: "same-origin" });
    if (response.status === 401) throw new Error("AUTH_REQUIRED");
    if (!response.ok) throw new Error("API indisponivel");
    return normalizeState(await response.json());
  } catch (error) {
    if (error.message === "AUTH_REQUIRED") throw error;
    const saved = localStorage.getItem(STORAGE_KEY);
    return normalizeState(saved ? JSON.parse(saved) : structuredClone(seed));
  }
}

async function loadSession() {
  try {
    const response = await fetch(SESSION_URL, { credentials: "same-origin" });
    if (!response.ok) return { authenticated: false, authEnabled: true };
    return response.json();
  } catch {
    return { authenticated: false, authEnabled: true };
  }
}

function showLogin(message = "") {
  byId("app-shell").hidden = true;
  byId("login-screen").hidden = false;
  byId("login-error").textContent = message;
  byId("login-password").value = "";
  byId("login-user").focus();
}

function showApp() {
  byId("login-screen").hidden = true;
  byId("app-shell").hidden = false;
}

function resetAppSession(message = "") {
  state = structuredClone(seed);
  lastSavedState = structuredClone(seed);
  saleDraftItems = [];
  undoStack.length = 0;
  activeRecipeId = null;
  recipeDirty = false;
  recipeIngredientRows = [blankRecipeRow()];
  showLogin(message);
}

async function startApp() {
  const session = await loadSession();
  if (!session.authenticated) {
    showLogin();
    return;
  }

  try {
    state = await loadState();
    lastSavedState = structuredClone(state);
    renderAll();
    showApp();
  } catch (error) {
    if (error.message === "AUTH_REQUIRED") {
      showLogin();
      return;
    }
    showLogin("Nao foi possivel carregar o sistema agora.");
  }
}

function normalizeState(nextState) {
  return {
    ...structuredClone(seed),
    ...nextState,
    products: Array.isArray(nextState?.products) ? nextState.products : [],
    customers: Array.isArray(nextState?.customers) ? nextState.customers : [],
    sales: Array.isArray(nextState?.sales) ? nextState.sales : [],
    consumables: Array.isArray(nextState?.consumables) ? nextState.consumables : [],
    productionHistory: Array.isArray(nextState?.productionHistory) ? nextState.productionHistory : [],
    recipeHistory: Array.isArray(nextState?.recipeHistory) ? nextState.recipeHistory : [],
  };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  fetch(API_URL, {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  })
    .then(async (response) => {
      if (response.status === 409) {
        showToast("Dados modificados em outro dispositivo. Recarregando para evitar conflito...");
        setTimeout(() => window.location.reload(), 2000);
        return;
      }
      if (!response.ok) {
        if (response.status === 401) {
          showLogin("Sua sessao expirou. Entre novamente.");
          return;
        }
        showToast("Falha ao salvar no servidor.");
        return;
      }
      // Se salvou com sucesso, incrementamos a versao local para a proxima edicao ser valida
      if (state.version !== undefined) {
        state.version += 1;
        lastSavedState.version = state.version;
      }
    })
    .catch(() => {
      showToast("Dados salvos neste aparelho. Servidor indisponivel.");
    });
}

function saveState() {
  undoStack.push(structuredClone(lastSavedState));
  if (undoStack.length > 30) undoStack.shift();
  lastSavedState = structuredClone(state);
  persistState();
}

function undoLastChange() {
  const previous = undoStack.pop();
  if (!previous) {
    showToast("Nenhuma alteracao para voltar.");
    return;
  }
  state = normalizeState(previous);
  lastSavedState = structuredClone(state);
  saleDraftItems = [];
  activeRecipeId = null;
  recipeDirty = false;
  persistState();
  renderAll();
  showToast("Alteracao desfeita.");
}

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatMoneyInput(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  const cents = digits ? Number(digits) : 0;
  return money(cents / 100);
}

function parseMoneyInput(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? Number(digits) / 100 : 0;
}

function parseQuantity(value) {
  const normalized = String(value ?? "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function wholeUnitQuantity(value) {
  const number = Number(value || 0);
  return Math.ceil(number);
}

function isWholeQuantity(value) {
  return Number.isInteger(Number(value || 0));
}

function formatQuantity(value, unit) {
  const number = unit === "un" ? wholeUnitQuantity(value) : Number(value || 0);
  const formatted = Number.isInteger(number)
    ? String(number)
    : number.toLocaleString("pt-BR", { maximumFractionDigits: 3 });
  return `${formatted} ${unit || "un"}`;
}

function unitOptions(selected) {
  return units.map((unit) => `<option value="${unit}" ${unit === selected ? "selected" : ""}>${unit}</option>`).join("");
}

function normalizeQuantity(qty, unit) {
  if (unit === "kg") return { group: "weight", value: qty * 1000 };
  if (unit === "g") return { group: "weight", value: qty };
  if (unit === "l") return { group: "volume", value: qty * 1000 };
  if (unit === "ml") return { group: "volume", value: qty };
  return { group: "unit", value: qty };
}

function convertQuantity(qty, fromUnit, toUnit) {
  const source = normalizeQuantity(qty, fromUnit);
  const target = normalizeQuantity(1, toUnit);
  if (source.group !== target.group || !target.value) return null;
  return source.value / target.value;
}

function baseUnit(unit) {
  const normalized = normalizeQuantity(1, unit);
  if (normalized.group === "weight") return "g";
  if (normalized.group === "volume") return "ml";
  return "un";
}

function baseQuantity(qty, unit) {
  return normalizeQuantity(qty || 0, unit).value;
}

function consumableUnitCost(item) {
  if (item.unitCost) return item.unitCost;
  const quantity = baseQuantity(item.stock || 0, item.unit);
  return quantity > 0 ? (item.cost || 0) / quantity : 0;
}

function consumableCostLabel(item) {
  return `${money(consumableUnitCost(item))}/${baseUnit(item.unit)}`;
}

function inventoryValue(item) {
  return consumableUnitCost(item) * baseQuantity(item.stock || 0, item.unit);
}

function applyConsumablePurchase(item, qty, unit, totalCost) {
  const currentBaseQty = baseQuantity(item.stock || 0, item.unit);
  const addedInItemUnit = convertQuantity(qty, unit, item.unit);
  if (addedInItemUnit === null) return { ok: false, reason: "unit" };
  if (item.unit === "un" && !isWholeQuantity(addedInItemUnit)) return { ok: false, reason: "whole" };

  const addedBaseQty = baseQuantity(addedInItemUnit, item.unit);
  const currentValue = inventoryValue(item);
  const nextBaseQty = currentBaseQty + addedBaseQty;
  const nextValue = currentValue + totalCost;

  item.stock = (item.stock || 0) + addedInItemUnit;
  item.cost = nextValue;
  item.unitCost = nextBaseQty > 0 ? nextValue / nextBaseQty : 0;
  return { ok: true };
}

function applyConsumableLoss(item, qty, unit) {
  const removedInItemUnit = convertQuantity(qty, unit, item.unit);
  if (removedInItemUnit === null) return { ok: false, reason: "unit" };
  if (item.unit === "un" && !isWholeQuantity(removedInItemUnit)) return { ok: false, reason: "whole" };
  if (removedInItemUnit > (item.stock || 0)) return { ok: false, reason: "stock" };

  const unitCost = consumableUnitCost(item);
  const removedBaseQty = baseQuantity(removedInItemUnit, item.unit);
  item.stock = Math.max(0, (item.stock || 0) - removedInItemUnit);
  item.cost = Math.max(0, inventoryValue(item) - removedBaseQty * unitCost);
  item.unitCost = unitCost;
  return { ok: true };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function nonNegativeInteger(value) {
  return Math.floor(nonNegativeNumber(value));
}

function byId(id) {
  return document.getElementById(id);
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function monthKey(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfWeek(date = new Date()) {
  const start = startOfDay(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
}

function productCost(productId) {
  return state.products.find((product) => product.id === productId)?.costPrice || 0;
}

function latestRecipeForProduct(productId) {
  return (state.recipeHistory || []).find((recipe) => recipe.productId === productId);
}

function consumableLabel(consumable) {
  const code = consumable.code ? `${consumable.code} - ` : "";
  return `${code}${consumable.name}${consumable.details ? ` - ${consumable.details}` : ""}`;
}

function recipeRequirements(productId, qty) {
  const recipe = latestRecipeForProduct(productId);
  if (!recipe) return { recipe: null, items: [] };
  const multiplier = nonNegativeInteger(qty) / (nonNegativeInteger(recipe.yieldQty) || 1);
  const grouped = new Map();
  for (const ingredient of recipe.ingredients || []) {
    if (!ingredient.consumableId) continue;
    const consumable = state.consumables.find((item) => item.id === ingredient.consumableId);
    if (!consumable) continue;
    const usedUnit = ingredient.usedUnit || baseUnit(consumable.unit);
    const needed = convertQuantity((ingredient.usedQty || 0) * multiplier, usedUnit, consumable.unit);
    if (needed === null) continue;
    const current = grouped.get(consumable.id) || {
      consumable,
      ingredient,
      needed: 0,
      shortage: 0,
    };
    current.needed += needed;
    current.shortage = Math.max(0, current.needed - (consumable.stock || 0));
    grouped.set(consumable.id, current);
  }
  const items = [...grouped.values()].map((item) => {
    if (item.consumable.unit === "un") {
      item.needed = wholeUnitQuantity(item.needed);
      item.shortage = Math.max(0, item.needed - (item.consumable.stock || 0));
    }
    return item;
  });
  return { recipe, items };
}

function consumableAlerts() {
  return state.consumables.filter((item) => {
    const minInStockUnit = consumableMinInStockUnit(item);
    return minInStockUnit !== null && (item.stock || 0) <= minInStockUnit;
  });
}

function isConsumableLow(item) {
  const minInStockUnit = consumableMinInStockUnit(item);
  return minInStockUnit !== null && (item.stock || 0) <= minInStockUnit;
}

function consumableMinUnit(item) {
  const selectedUnit = item.minStockUnit || item.unit;
  return convertQuantity(item.minStock || 0, selectedUnit, item.unit) === null ? item.unit : selectedUnit;
}

function consumableMinInStockUnit(item) {
  return convertQuantity(item.minStock || 0, consumableMinUnit(item), item.unit);
}

function consumableMinLabel(item) {
  return formatQuantity(item.minStock || 0, consumableMinUnit(item));
}

function saleCost(sale) {
  return sale.items.reduce((sum, item) => {
    const unitCost = item.unitCost ?? productCost(item.productId);
    return sum + item.qty * unitCost;
  }, 0);
}

function salesSince(date) {
  return state.sales.filter((sale) => new Date(sale.date) >= date);
}

function toDateTimeLocalValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function endOfDay(date = new Date()) {
  const end = startOfDay(date);
  end.setDate(end.getDate() + 1);
  end.setMilliseconds(end.getMilliseconds() - 1);
  return end;
}

function startOfQuarter(date = new Date()) {
  const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
  return new Date(date.getFullYear(), quarterStartMonth, 1);
}

function endOfQuarter(date = new Date()) {
  const start = startOfQuarter(date);
  return new Date(start.getFullYear(), start.getMonth() + 3, 0, 23, 59, 59, 999);
}

function parseReportDateInput(id) {
  const value = byId(id).value;
  return value ? new Date(value) : null;
}

function reportSales() {
  return state.sales.filter((sale) => {
    const date = new Date(sale.date);
    if (reportFilter.start && date < reportFilter.start) return false;
    if (reportFilter.end && date > reportFilter.end) return false;
    return true;
  });
}

function setReportFilter(start, end, label) {
  reportFilter = { start, end, label };
  byId("report-start").value = start ? toDateTimeLocalValue(start) : "";
  byId("report-end").value = end ? toDateTimeLocalValue(end) : "";
  renderReports();
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function askConfirmation({ title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  const modal = byId("confirm-modal");
  modal.innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Confirmacao</p>
          <h2 id="confirm-title">${escapeHtml(title)}</h2>
        </div>
        <button class="icon-button modal-close" data-confirm-cancel type="button" title="Fechar">X</button>
      </header>
      <p>${escapeHtml(message)}</p>
      <div class="modal-actions">
        <button class="ghost-action" data-confirm-cancel type="button">${escapeHtml(cancelText)}</button>
        <button class="primary-action" data-confirm-ok type="button">${escapeHtml(confirmText)}</button>
      </div>
    </section>
  `;
  modal.hidden = false;

  return new Promise((resolve) => {
    const finish = (result) => {
      modal.hidden = true;
      modal.innerHTML = "";
      modal.removeEventListener("click", onClick);
      resolve(result);
    };

    const onClick = (event) => {
      if (event.target.id === "confirm-modal" || event.target.closest("[data-confirm-cancel]")) finish(false);
      if (event.target.closest("[data-confirm-ok]")) finish(true);
    };

    modal.addEventListener("click", onClick);
  });
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icons[node.dataset.icon] || "";
  });
}

function blankRecipeRow() {
  return {
    id: crypto.randomUUID(),
    consumableId: "",
    usedQty: 1,
    usedUnit: "g",
  };
}

function setView(view) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `${view}-view`);
  });
  const label = document.querySelector(`[data-view="${view}"]`).textContent.trim();
  byId("page-title").textContent = label;
}

function renderSelects() {
  byId("sale-customer").innerHTML = state.customers
    .map((customer) => `<option value="${customer.id}">${customer.name}</option>`)
    .join("");
  byId("sale-product").innerHTML = state.products
    .map((product) => `<option value="${product.id}">${product.name} - ${money(product.price)} (${product.stock})</option>`)
    .join("");
  byId("recipe-product").innerHTML = state.products
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join("");
  byId("production-product").innerHTML = state.products
    .map((product) => `<option value="${product.id}">${product.name} (${product.stock} prontos)</option>`)
    .join("");
}

function renderSaleDraft() {
  saleDraftItems = saleDraftItems.flatMap((item) => {
    const product = state.products.find((productItem) => productItem.id === item.productId);
    return product ? [{ ...item, name: product.name, unitPrice: product.price, unitCost: product.costPrice || 0 }] : [];
  });
  const total = saleDraftItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  byId("sale-total").textContent = money(total);
  byId("sale-items").innerHTML = saleDraftItems.length
    ? saleDraftItems.map((item) => `
      <div class="sale-item">
        <div>
          <strong>${item.qty}x ${item.name}</strong>
          <span>${money(item.unitPrice)} cada · ${money(item.qty * item.unitPrice)}</span>
        </div>
        <div class="sale-item-actions">
          <button class="ghost-action qty-button" data-decrease-sale-item="${item.productId}" title="Diminuir item" type="button">-</button>
          <span class="qty-value">${item.qty}</span>
          <button class="ghost-action qty-button" data-increase-sale-item="${item.productId}" title="Aumentar item" type="button">+</button>
          <button class="ghost-action remove-item" data-remove-sale-item="${item.productId}" title="Remover item" type="button">
            <span data-icon="trash"></span>
          </button>
        </div>
      </div>
    `).join("")
    : '<div class="sale-item"><span>Nenhum item adicionado ainda.</span></div>';
}

function renderMetrics() {
  const now = new Date();
  const today = startOfDay(now);
  const month = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayTotal = state.sales
    .filter((sale) => new Date(sale.date) >= today)
    .reduce((sum, sale) => sum + sale.total, 0);
  const monthSales = state.sales.filter((sale) => new Date(sale.date) >= month).length;
  const lowStock = state.products.filter((product) => product.stock <= 0).length + consumableAlerts().length;
  const activeRecipes = new Set((state.recipeHistory || []).map((recipe) => recipe.productId).filter(Boolean)).size;
  const producedMonth = (state.productionHistory || [])
    .filter((item) => new Date(item.date) >= month)
    .reduce((sum, item) => sum + item.qty, 0);

  byId("metric-today").textContent = money(todayTotal);
  byId("metric-month").textContent = String(monthSales);
  byId("metric-low-stock").textContent = String(lowStock);
  byId("metric-customers").textContent = String(state.customers.length);
  byId("metric-consumables").textContent = String(state.consumables.length);
  byId("metric-consumable-alerts").textContent = String(consumableAlerts().length);
  byId("metric-active-recipes").textContent = String(activeRecipes);
  byId("metric-produced-month").textContent = String(producedMonth);
}

function renderLowStock() {
  const lowProducts = state.products.filter((product) => product.stock <= 0).map((product) => `
      <div class="list-item">
        <div><strong>${product.name}</strong><br><span>${product.category}</span></div>
        <span class="badge low">${product.stock} un.</span>
      </div>
    `);
  const lowConsumables = consumableAlerts().map((item) => `
      <div class="list-item">
        <div><strong>${escapeHtml(item.name)}</strong><br><span>Comprar insumo para producao</span></div>
        <span class="badge low">${formatQuantity(item.stock, item.unit)}</span>
      </div>
    `);
  const low = [...lowProducts, ...lowConsumables];
  byId("low-stock-list").innerHTML = low.length
    ? low.join("")
    : '<div class="list-item"><span>Nenhum alerta de estoque agora.</span><span class="badge">ok</span></div>';
}

function saleRow(sale) {
  const customer = state.customers.find((item) => item.id === sale.customerId)?.name || "Cliente removido";
  const date = new Date(sale.date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  return { customer, date };
}

function isPendingSale(sale) {
  return String(sale.payment).toLowerCase() === "pendente";
}

function renderSales() {
  byId("recent-sales").innerHTML = state.sales.slice(0, 6).map((sale) => {
    const row = saleRow(sale);
    return `
      <tr>
        <td>${row.date}</td>
        <td>${row.customer}</td>
        <td>${sale.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</td>
        <td>${sale.payment}</td>
        <td>${money(sale.total)}</td>
      </tr>
    `;
  }).join("") || '<tr><td colspan="5">Nenhuma venda lancada ainda.</td></tr>';

  byId("sales-history").innerHTML = state.sales.map((sale) => {
    const row = saleRow(sale);
    return `
      <article class="timeline-item">
        <header>
          <strong>${row.customer}</strong>
          <span>${money(sale.total)}</span>
        </header>
        <p>${row.date} · ${sale.payment}</p>
        <p>${sale.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</p>
        ${sale.note ? `<p><strong>Obs:</strong> ${sale.note}</p>` : ""}
        <div class="timeline-actions">
          <button class="ghost-action" data-delete-sale="${sale.id}" type="button">
            <span data-icon="trash"></span>
            Excluir venda
          </button>
        </div>
      </article>
    `;
  }).join("") || '<div class="timeline-item">Nenhuma venda registrada.</div>';
}

function renderDebtors() {
  const pendingSales = state.sales.filter(isPendingSale);
  const debtTotal = pendingSales.reduce((sum, sale) => sum + sale.total, 0);
  const debtItems = pendingSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0), 0);
  const customers = new Map();

  for (const sale of pendingSales) {
    const row = saleRow(sale);
    const key = sale.customerId || row.customer;
    const current = customers.get(key) || { name: row.customer, total: 0, sales: [] };
    current.total += sale.total;
    current.sales.push(sale);
    customers.set(key, current);
  }

  byId("debt-total").textContent = money(debtTotal);
  byId("debt-sales-count").textContent = String(pendingSales.length);
  byId("debt-customers-count").textContent = String(customers.size);
  byId("debt-items-count").textContent = String(debtItems);

  const debtors = [...customers.values()].sort((a, b) => b.total - a.total);
  byId("debtors-list").innerHTML = debtors.length
    ? debtors.map((debtor) => `
      <article class="timeline-item">
        <header>
          <strong>${escapeHtml(debtor.name)}</strong>
          <span>${money(debtor.total)}</span>
        </header>
        <p>${debtor.sales.length} venda(s) pendente(s)</p>
        <div class="debt-sales">
          ${debtor.sales.map((sale) => {
            const row = saleRow(sale);
            return `
              <div class="debt-sale">
                <div>
                  <strong>${row.date}</strong>
                  <p>${sale.items.map((item) => `${item.qty}x ${escapeHtml(item.name)}`).join(", ")}</p>
                  ${sale.note ? `<p><strong>Obs:</strong> ${escapeHtml(sale.note)}</p>` : ""}
                </div>
                <div class="debt-actions">
                  <strong>${money(sale.total)}</strong>
                  <select data-payment-method="${sale.id}">
                    <option>Pix</option>
                    <option>Dinheiro</option>
                    <option>Cartao</option>
                  </select>
                  <button class="primary-action" data-mark-paid="${sale.id}" type="button">Marcar pago</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </article>
    `).join("")
    : '<div class="timeline-item">Nenhum pagamento pendente.</div>';
}

function renderProducts() {
  byId("products-list").innerHTML = state.products.map((product) => `
    <article class="card">
      <header>
        <h3>${escapeHtml(product.name)}</h3>
        <span class="badge ${product.stock <= 0 ? "low" : ""}">${product.stock} un.</span>
      </header>
      <p>${escapeHtml(product.category)}</p>
      <strong>${money(product.price)}</strong>
      <p>Custo: ${money(product.costPrice || 0)}</p>
      <div class="card-actions">
        <button class="ghost-action" data-price-product="${product.id}" type="button">Precificar</button>
        <button class="ghost-action" data-edit-product="${product.id}" type="button">Editar</button>
        <button class="ghost-action" data-delete-product="${product.id}" type="button">Excluir</button>
      </div>
    </article>
  `).join("");
}

function renderCustomers() {
  byId("customers-list").innerHTML = state.customers.map((customer) => {
    const sales = state.sales.filter((sale) => sale.customerId === customer.id);
    const total = sales.reduce((sum, sale) => sum + sale.total, 0);
    return `
      <article class="card">
        <header>
        <h3>${escapeHtml(customer.name)}</h3>
          <span class="badge">${sales.length} vendas</span>
        </header>
        <p>${escapeHtml(customer.phone || "Sem WhatsApp")}${customer.note ? ` · ${escapeHtml(customer.note)}` : ""}</p>
        <strong>${money(total)}</strong>
        <div class="card-actions">
          <button class="ghost-action" data-edit-customer="${customer.id}" type="button">Editar</button>
          <button class="ghost-action" data-delete-customer="${customer.id}" type="button">Excluir</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderStock() {
  byId("stock-list").innerHTML = state.products.map((product) => `
    <div class="stock-row">
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <p>${escapeHtml(product.category)}</p>
      </div>
      <div class="stock-actions">
        <input min="0" step="1" type="number" value="${product.stock}" data-stock-input="${product.id}" />
        <button class="primary-action" data-stock-save="${product.id}" type="button">Atualizar</button>
      </div>
    </div>
  `).join("");
}

function renderConsumables() {
  byId("consumables-list").innerHTML = state.consumables.length
    ? state.consumables.map((item) => `
      <article class="card">
        <header>
          <h3>${escapeHtml(item.name)}</h3>
          <span class="badge ${isConsumableLow(item) ? "low" : ""}">${formatQuantity(item.stock, item.unit)}</span>
        </header>
        <p>Codigo ${escapeHtml(item.code || "sem codigo")} - ${escapeHtml(item.details || "Sem detalhe")} - minimo ${consumableMinLabel(item)}</p>
        <strong>${consumableCostLabel(item)}</strong>
        <p>Valor em estoque: ${money(inventoryValue(item))}</p>
        <div class="card-actions">
          <button class="ghost-action" data-add-consumable-stock="${item.id}" type="button">Adicionar</button>
          <button class="ghost-action" data-remove-consumable-stock="${item.id}" type="button">Diminuir</button>
          <button class="ghost-action" data-reset-consumable-average="${item.id}" type="button">Zerar media</button>
          <button class="ghost-action" data-edit-consumable="${item.id}" type="button">Editar</button>
          <button class="ghost-action" data-delete-consumable="${item.id}" type="button">Excluir</button>
        </div>
      </article>
    `).join("")
    : '<article class="card">Nenhum insumo cadastrado ainda.</article>';

  byId("consumable-alert-list").innerHTML = consumableAlerts().length
    ? consumableAlerts().map((item) => `
      <div class="list-item">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <br><span>Codigo ${escapeHtml(item.code || "sem codigo")} - minimo desejado: ${consumableMinLabel(item)}</span>
        </div>
        <span class="badge low">${formatQuantity(item.stock || 0, item.unit)}</span>
      </div>
    `).join("")
    : '<div class="list-item"><span>Nenhum insumo abaixo do minimo.</span><span class="badge">ok</span></div>';
}

function renderProductionPlan() {
  const productId = byId("production-product").value;
  const qty = nonNegativeInteger(byId("production-qty").value) || 1;
  const { recipe, items } = recipeRequirements(productId, qty);
  const status = byId("production-recipe-status");

  if (!recipe) {
    status.textContent = "Sem receita ativa";
    byId("production-requirements").innerHTML = `
      <div class="requirement-list">
        <div class="requirement-row">
          <div><strong>Salve uma receita para este produto</strong><p>A baixa automatica dos insumos depende de uma receita vinculada.</p></div>
          <span class="badge low">pendente</span>
        </div>
      </div>
    `;
    return;
  }

  status.textContent = `${qty} un. - ${recipe.name} - ${money(recipe.unitCost || 0)} / un.`;
  byId("production-requirements").innerHTML = `
    <div class="requirement-list">
      ${items.length ? items.map(({ consumable, needed, shortage }) => `
        <div class="requirement-row">
          <div>
            <strong>${escapeHtml(consumableLabel(consumable))}</strong>
            <p>Vai usar ${formatQuantity(needed, consumable.unit)} - estoque atual ${formatQuantity(consumable.stock || 0, consumable.unit)}</p>
          </div>
          <span class="badge ${shortage > 0 ? "low" : ""}">${shortage > 0 ? `faltam ${formatQuantity(shortage, consumable.unit)}` : "ok"}</span>
        </div>
      `).join("") : `
        <div class="requirement-row">
          <div><strong>Receita sem insumos vinculados ao estoque</strong><p>Abra a receita e escolha o insumo correspondente em cada linha para baixar automaticamente.</p></div>
          <span class="badge low">vincular</span>
        </div>
      `}
    </div>
  `;
}

function renderProductionHistory() {
  const history = state.productionHistory || [];
  byId("production-history-list").innerHTML = history.length
    ? history.slice(0, 8).map((item) => {
      const product = state.products.find((productItem) => productItem.id === item.productId)?.name || item.productName || "Produto removido";
      const date = new Date(item.date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
      return `
        <article class="timeline-item">
          <header>
            <strong>${escapeHtml(product)}</strong>
            <span>${item.qty} un.</span>
          </header>
          <p>${date}${item.note ? ` - ${escapeHtml(item.note)}` : ""}</p>
          <p>${(item.consumed || []).map((used) => `${escapeHtml(used.name)}: ${formatQuantity(used.qty, used.unit)}`).join(", ") || "Sem baixa de insumos."}</p>
        </article>
      `;
    }).join("")
    : '<div class="timeline-item">Nenhuma producao registrada ainda.</div>';
}

function renderReports() {
  const filteredSales = reportSales();
  const revenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const cost = filteredSales.reduce((sum, sale) => sum + saleCost(sale), 0);
  const items = filteredSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0), 0);
  const profit = revenue - cost;
  const averageTicket = filteredSales.length ? revenue / filteredSales.length : 0;
  const startLabel = reportFilter.start ? reportFilter.start.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "inicio";
  const endLabel = reportFilter.end ? reportFilter.end.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "agora";

  byId("report-period-label").textContent = `${reportFilter.label}: ${startLabel} ate ${endLabel}`;
  byId("report-revenue-today").textContent = money(revenue);
  byId("report-items-today").textContent = String(items);
  byId("report-gross-profit").textContent = money(profit);
  byId("report-net-profit").textContent = money(profit);

  byId("weekly-report").innerHTML = `
    <div class="list-item"><span>Faturamento</span><strong>${money(revenue)}</strong></div>
    <div class="list-item"><span>Custo dos produtos</span><strong>${money(cost)}</strong></div>
    <div class="list-item"><span>Itens vendidos</span><strong>${items}</strong></div>
    <div class="list-item"><span>Vendas registradas</span><strong>${filteredSales.length}</strong></div>
    <div class="list-item"><span>Ticket medio</span><strong>${money(averageTicket)}</strong></div>
  `;

  const customerTotals = new Map();
  for (const sale of filteredSales) {
    const customer = saleRow(sale).customer;
    const current = customerTotals.get(customer) || { count: 0, total: 0, sales: [] };
    current.count += 1;
    current.total += sale.total;
    current.sales.push(sale);
    customerTotals.set(customer, current);
  }
  const topCustomers = [...customerTotals.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);
  byId("top-customers-report").innerHTML = topCustomers.length
    ? topCustomers.map(([name, data]) => `
      <article class="timeline-item">
        <header>
          <strong>${escapeHtml(name)}</strong>
          <span>${money(data.total)}</span>
        </header>
        <p>${data.count} compra(s) - ticket medio ${money(data.total / data.count)}</p>
        <div class="report-sale-list">
          ${data.sales.map((sale) => {
            const row = saleRow(sale);
            return `
              <div class="report-sale-row">
                <div>
                  <strong>${row.date}</strong>
                  <p>${sale.items.map((item) => `${item.qty}x ${escapeHtml(item.name)}`).join(", ")}</p>
                </div>
                <span>${money(sale.total)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </article>
    `).join("")
    : '<div class="list-item"><span>Nenhuma venda registrada.</span></div>';

  const productTotals = new Map();
  for (const sale of filteredSales) {
    for (const item of sale.items) {
      const current = productTotals.get(item.name) || { qty: 0, revenue: 0 };
      current.qty += item.qty;
      current.revenue += item.qty * item.unitPrice;
      productTotals.set(item.name, current);
    }
  }
  const topProducts = [...productTotals.entries()]
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, 6);
  byId("top-products-report").innerHTML = topProducts.length
    ? topProducts.map(([name, data]) => `
      <article class="card">
        <header>
          <h3>${escapeHtml(name)}</h3>
          <span class="badge">${data.qty} un.</span>
        </header>
        <p>Vendido: ${money(data.revenue)}</p>
      </article>
    `).join("")
    : '<article class="card">Nenhum produto vendido ainda.</article>';

  byId("filtered-sales-report").innerHTML = filteredSales.length
    ? filteredSales.map((sale) => {
      const row = saleRow(sale);
      return `
        <article class="timeline-item">
          <header>
            <strong>${escapeHtml(row.customer)}</strong>
            <span>${money(sale.total)}</span>
          </header>
          <p>${row.date} - ${escapeHtml(sale.payment)}</p>
          <p>${sale.items.map((item) => `${item.qty}x ${escapeHtml(item.name)}`).join(", ")}</p>
          ${sale.note ? `<p><strong>Obs:</strong> ${escapeHtml(sale.note)}</p>` : ""}
        </article>
      `;
    }).join("")
    : '<div class="timeline-item">Nenhuma venda neste periodo.</div>';
}

function readRecipeRowsFromDom() {
  recipeIngredientRows = [...document.querySelectorAll("[data-ingredient-id]")].map((row) => ({
    id: row.dataset.ingredientId,
    consumableId: row.querySelector('[data-field="consumableId"]')?.value || "",
    usedQty: parseQuantity(row.querySelector('[data-field="usedQty"]').value),
    usedUnit: row.querySelector('[data-field="usedUnit"]').value,
  })).map((row) => ({
    ...row,
    usedQty: row.usedUnit === "un" ? wholeUnitQuantity(row.usedQty) : row.usedQty,
  }));
}

function ingredientCost(row) {
  const consumable = state.consumables.find((item) => item.id === row.consumableId);
  if (!consumable || !row.usedQty) return 0;
  const usedBaseQty = normalizeQuantity(row.usedQty, row.usedUnit);
  const consumableBase = normalizeQuantity(1, baseUnit(consumable.unit));
  if (usedBaseQty.group !== consumableBase.group) return 0;
  return consumableUnitCost(consumable) * usedBaseQty.value;
}

function calculateRecipeCost() {
  if (document.querySelector("[data-ingredient-id]")) readRecipeRowsFromDom();
  const total = recipeIngredientRows.reduce((sum, row) => sum + ingredientCost(row), 0);
  const yieldQty = nonNegativeInteger(byId("recipe-yield").value) || 1;
  lastRecipeUnitCost = total / yieldQty;

  for (const row of recipeIngredientRows) {
    const cell = document.querySelector(`[data-ingredient-total="${row.id}"]`);
    if (cell) cell.textContent = money(ingredientCost(row));
    const input = document.querySelector(`[data-ingredient-id="${row.id}"] [data-field="usedQty"]`);
    if (input && row.usedUnit === "un") input.value = wholeUnitQuantity(row.usedQty);
  }

  byId("recipe-total-cost").textContent = money(total);
  byId("recipe-unit-cost").textContent = money(lastRecipeUnitCost);
}

function currentRecipeSnapshot() {
  if (document.querySelector("[data-ingredient-id]")) readRecipeRowsFromDom();
  const totalCost = recipeIngredientRows.reduce((sum, row) => sum + ingredientCost(row), 0);
  const yieldQty = nonNegativeInteger(byId("recipe-yield").value) || 1;
  const invalidUnitRow = recipeIngredientRows.some((row) => row.usedUnit === "un" && !isWholeQuantity(row.usedQty));
  if (invalidUnitRow) {
    showToast("Quantidade em unidade precisa ser numero inteiro.");
    return null;
  }
  return {
    id: crypto.randomUUID(),
    name: byId("recipe-name").value.trim() || "Receita sem nome",
    productId: byId("recipe-product").value || null,
    yieldQty,
    totalCost,
    unitCost: totalCost / yieldQty,
    createdAt: new Date().toISOString(),
    ingredients: recipeIngredientRows.map((row) => {
      const consumable = state.consumables.find((item) => item.id === row.consumableId);
      const unit = baseUnit(consumable?.unit || row.usedUnit);
      return {
        ...row,
        id: crypto.randomUUID(),
        name: consumable?.name || "",
        brand: "",
        details: consumable?.details || "",
        packagePrice: consumableUnitCost(consumable || {}),
        packageQty: 1,
        packageUnit: unit,
      };
    }),
  };
}

function saveCurrentRecipe() {
  if (recipeIngredientRows.some((row) => !row.consumableId)) {
    showToast("Escolha um insumo cadastrado em todas as linhas da receita.");
    return null;
  }
  const recipe = currentRecipeSnapshot();
  if (!recipe) return null;
  state.recipeHistory = [recipe, ...(state.recipeHistory || [])];
  activeRecipeId = recipe.id;
  recipeDirty = false;
  saveState();
  renderRecipeHistory();
  renderProductionPlan();
  return recipe;
}

function resetRecipeCalculator() {
  byId("recipe-name").value = "";
  byId("recipe-yield").value = 1;
  if (state.products[0]) byId("recipe-product").value = state.products[0].id;
  recipeIngredientRows = [blankRecipeRow()];
  activeRecipeId = null;
  recipeDirty = false;
  lastRecipeUnitCost = 0;
  renderCostCalculator();
  renderIcons();
}

function startRecipeForProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  byId("recipe-name").value = product.name;
  byId("recipe-yield").value = 1;
  byId("recipe-product").value = product.id;
  recipeIngredientRows = [blankRecipeRow()];
  activeRecipeId = null;
  recipeDirty = true;
  setView("products");
  renderCostCalculator();
  renderIcons();
  byId("recipe-name").scrollIntoView({ behavior: "smooth", block: "center" });
  showToast(`Receita iniciada para ${product.name}.`);
}

function openRecipe(recipeId) {
  const recipe = state.recipeHistory.find((item) => item.id === recipeId);
  if (!recipe) return;
  byId("recipe-name").value = recipe.name;
  byId("recipe-yield").value = recipe.yieldQty || 1;
  byId("recipe-product").value = recipe.productId || byId("recipe-product").value;
  recipeIngredientRows = (recipe.ingredients || []).map((row) => ({ ...row, id: crypto.randomUUID() }));
  recipeIngredientRows = recipeIngredientRows.map((row) => ({
    ...row,
    usedQty: row.usedQty || 1,
    usedUnit: row.usedUnit || "g",
  }));
  if (recipeIngredientRows.length === 0) {
    recipeIngredientRows.push(blankRecipeRow());
  }
  activeRecipeId = recipe.id;
  recipeDirty = false;
  renderCostCalculator();
  renderIcons();
  showToast("Receita aberta na calculadora.");
}

function renderRecipeHistory() {
  const recipes = state.recipeHistory || [];
  byId("recipe-history-list").innerHTML = recipes.length
    ? recipes.map((recipe) => {
      const date = new Date(recipe.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
      const product = state.products.find((item) => item.id === recipe.productId)?.name || "Sem produto vinculado";
      return `
        <article class="timeline-item">
          <header>
            <strong>${escapeHtml(recipe.name)}</strong>
            <span>${money(recipe.unitCost || 0)} / un.</span>
          </header>
          <p>${date} - ${escapeHtml(product)}</p>
          <p>${(recipe.ingredients || []).map((ingredient) => {
            const item = state.consumables.find((consumable) => consumable.id === ingredient.consumableId);
            return item ? escapeHtml(consumableLabel(item)) : escapeHtml(ingredient.name || "Insumo removido");
          }).join(", ")}</p>
          <p>Custo total ${money(recipe.totalCost || 0)} - rendimento ${recipe.yieldQty || 1} un.</p>
          <div class="timeline-actions">
            <button class="ghost-action" data-open-recipe="${recipe.id}" type="button">Abrir receita</button>
            <button class="ghost-action" data-delete-recipe="${recipe.id}" type="button">
              <span data-icon="trash"></span>
              Excluir
            </button>
          </div>
        </article>
      `;
    }).join("")
    : '<div class="timeline-item">Nenhuma receita salva ainda.</div>';
}

function renderCostCalculator() {
  const consumableOptions = (selected) => `
    <option value="">Escolha um insumo</option>
    ${state.consumables.map((item) => `
      <option value="${item.id}" ${item.id === selected ? "selected" : ""}>${escapeHtml(consumableLabel(item))} - estoque ${formatQuantity(item.stock || 0, item.unit)}</option>
    `).join("")}
  `;
  const selectedCost = (consumableId) => {
    const consumable = state.consumables.find((item) => item.id === consumableId);
    return consumable ? consumableCostLabel(consumable) : "Escolha um insumo";
  };
  byId("ingredient-rows").innerHTML = recipeIngredientRows.map((row) => `
    <tr data-ingredient-id="${row.id}">
      <td><select data-field="consumableId">${consumableOptions(row.consumableId || "")}</select></td>
      <td><strong>${selectedCost(row.consumableId)}</strong></td>
      <td><input data-field="usedQty" inputmode="decimal" type="text" value="${row.usedQty || ""}" /></td>
      <td><select data-field="usedUnit">${unitOptions(row.usedUnit)}</select></td>
      <td><strong data-ingredient-total="${row.id}">R$ 0,00</strong></td>
      <td>
        <button class="ghost-action remove-item" data-remove-ingredient="${row.id}" title="Remover ingrediente" type="button">
          <span data-icon="trash"></span>
        </button>
      </td>
    </tr>
  `).join("");
  calculateRecipeCost();
}

function renderAll() {
  renderSelects();
  renderSaleDraft();
  renderMetrics();
  renderLowStock();
  renderSales();
  renderDebtors();
  renderProducts();
  renderCustomers();
  renderStock();
  renderConsumables();
  renderProductionPlan();
  renderProductionHistory();
  renderReports();
  renderCostCalculator();
  renderRecipeHistory();
  renderIcons();
}

function resetProductForm() {
  byId("product-form").reset();
  byId("product-price").value = "";
  byId("product-cost").value = "";
}

function resetCustomerForm() {
  byId("customer-form").reset();
}

function resetConsumableForm() {
  byId("consumable-form").reset();
  byId("consumable-id").value = "";
  byId("consumable-cost").value = "";
}

function closeEditModal() {
  const modal = byId("edit-modal");
  modal.hidden = true;
  modal.innerHTML = "";
}

function openProductModal(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  byId("edit-modal").innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Editar produto</p>
          <h2 id="modal-title">${escapeHtml(product.name)}</h2>
        </div>
        <button class="icon-button modal-close" data-close-modal type="button" title="Fechar">X</button>
      </header>
      <form class="form-grid" data-product-edit-form="${product.id}">
        <label class="wide">
          Nome
          <input name="name" required type="text" value="${escapeHtml(product.name)}" />
        </label>
        <label class="wide">
          Categoria
          <input name="category" required type="text" value="${escapeHtml(product.category)}" />
        </label>
        <label>
          Preco
          <input name="price" data-money-input inputmode="numeric" required type="text" value="${money(product.price)}" />
        </label>
        <label>
          Custo inicial
          <input name="costPrice" data-money-input inputmode="numeric" placeholder="Opcional, a receita calcula depois" type="text" value="${money(product.costPrice || 0)}" />
        </label>
        <label>
          Estoque
          <input name="stock" min="0" step="1" required type="number" value="${product.stock}" />
        </label>
        <button class="primary-action wide" type="submit">
          <span data-icon="save"></span>
          Salvar alteracoes
        </button>
      </form>
    </section>
  `;
  byId("edit-modal").hidden = false;
  renderIcons();
}

function openCustomerModal(customerId) {
  const customer = state.customers.find((item) => item.id === customerId);
  if (!customer) return;
  byId("edit-modal").innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Editar cliente</p>
          <h2 id="modal-title">${escapeHtml(customer.name)}</h2>
        </div>
        <button class="icon-button modal-close" data-close-modal type="button" title="Fechar">X</button>
      </header>
      <form class="form-grid" data-customer-edit-form="${customer.id}">
        <label class="wide">
          Nome
          <input name="name" required type="text" value="${escapeHtml(customer.name)}" />
        </label>
        <label class="wide">
          WhatsApp
          <input name="phone" type="tel" value="${escapeHtml(customer.phone)}" />
        </label>
        <label class="wide">
          Observacao
          <input name="note" type="text" value="${escapeHtml(customer.note)}" />
        </label>
        <button class="primary-action wide" type="submit">
          <span data-icon="save"></span>
          Salvar alteracoes
        </button>
      </form>
    </section>
  `;
  byId("edit-modal").hidden = false;
  renderIcons();
}

function openConsumableModal(consumableId) {
  const item = state.consumables.find((consumable) => consumable.id === consumableId);
  if (!item) return;
  byId("edit-modal").innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Editar insumo</p>
          <h2 id="modal-title">${escapeHtml(item.name)}</h2>
        </div>
        <button class="icon-button modal-close" data-close-modal type="button" title="Fechar">X</button>
      </header>
      <form class="form-grid" data-consumable-edit-form="${item.id}">
        <label>
          Codigo
          <input name="code" required type="text" value="${escapeHtml(item.code || "")}" />
        </label>
        <label class="wide">
          Nome
          <input name="name" required type="text" value="${escapeHtml(item.name)}" />
        </label>
        <label class="wide">
          Marca/detalhe
          <input name="details" type="text" value="${escapeHtml(item.details || "")}" />
        </label>
        <label>
          Estoque atual
          <input name="stock" inputmode="decimal" required type="text" value="${item.stock || 0}" />
        </label>
        <label>
          Unidade
          <select name="unit">${unitOptions(item.unit)}</select>
        </label>
        <label>
          Alerta minimo
          <input name="minStock" inputmode="decimal" type="text" value="${item.minStock || 0}" />
        </label>
        <label>
          Unidade do alerta
          <select name="minStockUnit">${unitOptions(consumableMinUnit(item))}</select>
        </label>
        <label>
          Valor em estoque
          <input name="cost" data-money-input inputmode="numeric" type="text" value="${money(item.cost || 0)}" />
        </label>
        <button class="primary-action wide" type="submit">
          <span data-icon="save"></span>
          Salvar alteracoes
        </button>
      </form>
    </section>
  `;
  byId("edit-modal").hidden = false;
  renderIcons();
}

function openAddConsumableStockModal(consumableId) {
  const item = state.consumables.find((consumable) => consumable.id === consumableId);
  if (!item) return;
  byId("edit-modal").innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Adicionar compra</p>
          <h2 id="modal-title">${escapeHtml(consumableLabel(item))}</h2>
        </div>
        <button class="icon-button modal-close" data-close-modal type="button" title="Fechar">X</button>
      </header>
      <form class="form-grid" data-consumable-add-stock-form="${item.id}">
        <div class="wide">
          <p>Estoque atual: <strong>${formatQuantity(item.stock || 0, item.unit)}</strong></p>
          <p>Custo medio atual: <strong>${consumableCostLabel(item)}</strong></p>
        </div>
        <label>
          Quantidade comprada
          <input name="qty" inputmode="decimal" required type="text" />
        </label>
        <label>
          Unidade
          <select name="unit">${unitOptions(item.unit)}</select>
        </label>
        <label class="wide">
          Valor pago
          <input name="cost" data-money-input inputmode="numeric" required type="text" />
        </label>
        <button class="primary-action wide" type="submit">
          <span data-icon="plus"></span>
          Adicionar ao estoque
        </button>
      </form>
    </section>
  `;
  byId("edit-modal").hidden = false;
  renderIcons();
}

function openRemoveConsumableStockModal(consumableId) {
  const item = state.consumables.find((consumable) => consumable.id === consumableId);
  if (!item) return;
  byId("edit-modal").innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header class="modal-header">
        <div>
          <p class="eyebrow">Diminuir estoque</p>
          <h2 id="modal-title">${escapeHtml(consumableLabel(item))}</h2>
        </div>
        <button class="icon-button modal-close" data-close-modal type="button" title="Fechar">X</button>
      </header>
      <form class="form-grid" data-consumable-remove-stock-form="${item.id}">
        <div class="wide">
          <p>Estoque atual: <strong>${formatQuantity(item.stock || 0, item.unit)}</strong></p>
          <p>Valor em estoque: <strong>${money(inventoryValue(item))}</strong></p>
          <p>Custo medio: <strong>${consumableCostLabel(item)}</strong></p>
        </div>
        <label>
          Quantidade a diminuir
          <input name="qty" inputmode="decimal" required type="text" />
        </label>
        <label>
          Unidade
          <select name="unit">${unitOptions(item.unit)}</select>
        </label>
        <label class="wide">
          Motivo
          <input name="reason" placeholder="Ex: quebrou, perdeu, venceu" type="text" />
        </label>
        <button class="primary-action wide" type="submit">
          <span data-icon="trash"></span>
          Diminuir estoque
        </button>
      </form>
    </section>
  `;
  byId("edit-modal").hidden = false;
  renderIcons();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

byId("sale-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (saleDraftItems.length === 0) {
    showToast("Adicione pelo menos um produto na compra.");
    return;
  }

  for (const item of saleDraftItems) {
    const product = state.products.find((productItem) => productItem.id === item.productId);
    if (!product || product.stock < item.qty) {
      showToast(`Estoque insuficiente para ${item.name}.`);
      return;
    }
  }

  for (const item of saleDraftItems) {
    const product = state.products.find((productItem) => productItem.id === item.productId);
    product.stock -= item.qty;
  }

  const items = saleDraftItems.map((item) => ({ ...item }));
  const total = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  state.sales.unshift({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    customerId: byId("sale-customer").value,
    payment: byId("sale-payment").value,
    note: byId("sale-note").value.trim(),
    items,
    total,
  });

  byId("sale-form").reset();
  byId("sale-qty").value = 1;
  saleDraftItems = [];
  saveState();
  renderAll();
  showToast("Venda registrada e estoque atualizado.");
});

byId("add-sale-item").addEventListener("click", () => {
  const product = state.products.find((item) => item.id === byId("sale-product").value);
  const qty = Number(byId("sale-qty").value);
  if (!product || qty < 1) {
    showToast("Informe uma quantidade valida.");
    return;
  }

  const currentItem = saleDraftItems.find((item) => item.productId === product.id);
  const currentQty = currentItem?.qty || 0;
  if (currentQty + qty > product.stock) {
    showToast(`Estoque insuficiente para ${product.name}. Disponivel: ${product.stock}.`);
    return;
  }

  if (currentItem) {
    currentItem.qty += qty;
  } else {
    saleDraftItems.push({
      productId: product.id,
      name: product.name,
      qty,
      unitPrice: product.price,
      unitCost: product.costPrice || 0,
    });
  }

  byId("sale-qty").value = 1;
  renderSaleDraft();
  renderIcons();
});

["input", "change", "keyup", "mouseup"].forEach((eventName) => {
  byId("production-qty").addEventListener(eventName, renderProductionPlan);
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-money-input]")) {
    event.target.value = formatMoneyInput(event.target.value);
  }
  if (event.target.closest("#ingredient-rows") || event.target.id === "recipe-yield") {
    recipeDirty = true;
    calculateRecipeCost();
  }
  if (event.target.id === "recipe-name" || event.target.id === "recipe-product") {
    recipeDirty = true;
  }
  if (event.target.id === "production-qty") {
    renderProductionPlan();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.closest("#ingredient-rows")) {
    recipeDirty = true;
    calculateRecipeCost();
  }
  if (event.target.id === "recipe-product") recipeDirty = true;
  if (event.target.id === "production-qty") renderProductionPlan();
  if (event.target.id === "production-product") renderProductionPlan();
  if (event.target.id === "report-start" || event.target.id === "report-end") {
    reportFilter = {
      start: parseReportDateInput("report-start"),
      end: parseReportDateInput("report-end"),
      label: "Personalizado",
    };
    renderReports();
  }
});

document.addEventListener("click", (event) => {
  const preset = event.target.closest("[data-report-preset]")?.dataset.reportPreset;
  if (!preset) return;
  const now = new Date();
  if (preset === "today") setReportFilter(startOfDay(now), endOfDay(now), "Hoje");
  if (preset === "month") setReportFilter(new Date(now.getFullYear(), now.getMonth(), 1), now, "Mes atual");
  if (preset === "quarter") setReportFilter(startOfQuarter(now), endOfQuarter(now), "Trimestre");
  if (preset === "all") setReportFilter(null, null, "Tudo");
});

byId("add-ingredient-row").addEventListener("click", () => {
  readRecipeRowsFromDom();
  recipeIngredientRows.push(blankRecipeRow());
  recipeDirty = true;
  renderCostCalculator();
  renderIcons();
});

byId("apply-recipe-cost").addEventListener("click", () => {
  calculateRecipeCost();
  const product = state.products.find((item) => item.id === byId("recipe-product").value);
  if (!product) {
    showToast("Escolha um produto para aplicar o custo.");
    return;
  }
  product.costPrice = lastRecipeUnitCost;
  saveState();
  renderAll();
  showToast(`Custo aplicado em ${product.name}.`);
});

byId("save-recipe-history").addEventListener("click", () => {
  const recipe = saveCurrentRecipe();
  if (recipe) showToast("Receita salva no historico.");
});

byId("clear-recipe").addEventListener("click", async () => {
  if (!activeRecipeId && recipeDirty) {
    const shouldSave = await askConfirmation({
      title: "Salvar receita?",
      message: "Esta receita ainda nao foi salva. Deseja salvar no historico antes de apagar da tela?",
      confirmText: "Salvar e apagar",
      cancelText: "Apagar sem salvar",
    });
    if (shouldSave && !saveCurrentRecipe()) return;
  }

  resetRecipeCalculator();
  showToast("Receita apagada da tela.");
});

function adjustSaleItem(productId, delta) {
  const item = saleDraftItems.find((saleItem) => saleItem.productId === productId);
  const product = state.products.find((productItem) => productItem.id === productId);
  if (!item || !product) return;

  const nextQty = item.qty + delta;
  if (nextQty <= 0) {
    saleDraftItems = saleDraftItems.filter((saleItem) => saleItem.productId !== productId);
  } else if (nextQty <= product.stock) {
    item.qty = nextQty;
  } else {
    showToast(`Estoque insuficiente para ${product.name}. Disponivel: ${product.stock}.`);
  }

  renderSaleDraft();
  renderIcons();
}

async function deleteSale(saleId) {
  const sale = state.sales.find((item) => item.id === saleId);
  if (!sale) return;
  const confirmed = await askConfirmation({
    title: "Excluir venda?",
    message: "Tem certeza que deseja excluir esta venda? O estoque dos produtos sera devolvido.",
    confirmText: "Excluir venda",
  });
  if (!confirmed) return;

  for (const item of sale.items) {
    const product = state.products.find((productItem) => productItem.id === item.productId);
    if (product) product.stock += item.qty;
  }

  state.sales = state.sales.filter((item) => item.id !== saleId);
  saveState();
  renderAll();
  showToast("Venda excluida e estoque devolvido.");
}

async function markSalePaid(saleId) {
  const sale = state.sales.find((item) => item.id === saleId);
  const select = document.querySelector(`[data-payment-method="${saleId}"]`);
  if (!sale || !select) return;
  const method = select.value;
  const confirmed = await askConfirmation({
    title: "Marcar como pago?",
    message: `Confirmar pagamento desta venda como ${method}?`,
    confirmText: "Confirmar pagamento",
  });
  if (!confirmed) return;

  sale.payment = method;
  saveState();
  renderAll();
  showToast("Pagamento atualizado.");
}

async function resetConsumableAverage(consumableId) {
  const item = state.consumables.find((consumable) => consumable.id === consumableId);
  if (!item) return;
  if ((item.stock || 0) > 0) {
    showToast("Zere o estoque antes de zerar a media.");
    return;
  }
  const confirmed = await askConfirmation({
    title: "Zerar media?",
    message: `Zerar o custo medio de ${item.name}? Use isto somente quando o estoque acabou e voce quer recomecar a media.`,
    confirmText: "Zerar media",
  });
  if (!confirmed) return;
  item.cost = 0;
  item.unitCost = 0;
  saveState();
  renderAll();
  showToast("Media zerada.");
}

byId("product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = byId("product-id").value || crypto.randomUUID();
  const product = {
    id,
    name: byId("product-name").value.trim(),
    category: byId("product-category").value.trim(),
    price: parseMoneyInput(byId("product-price").value),
    costPrice: parseMoneyInput(byId("product-cost").value),
    stock: nonNegativeInteger(byId("product-stock").value),
  };
  const index = state.products.findIndex((item) => item.id === id);
  if (index >= 0) state.products[index] = product;
  else state.products.push(product);
  resetProductForm();
  saveState();
  renderAll();
  showToast("Produto salvo.");
});

byId("customer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = byId("customer-id").value || crypto.randomUUID();
  const customer = {
    id,
    name: byId("customer-name").value.trim(),
    phone: byId("customer-phone").value.trim(),
    note: byId("customer-note").value.trim(),
  };
  const index = state.customers.findIndex((item) => item.id === id);
  if (index >= 0) state.customers[index] = customer;
  else state.customers.push(customer);
  resetCustomerForm();
  saveState();
  renderAll();
  showToast("Cliente salvo.");
});

byId("consumable-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = byId("consumable-id").value || crypto.randomUUID();
  const code = byId("consumable-code").value.trim();
  if (!code) {
    showToast("Informe o codigo do insumo.");
    return;
  }
  const duplicateCode = state.consumables.some((item) => item.id !== id && String(item.code || "").toLowerCase() === code.toLowerCase());
  if (duplicateCode) {
    showToast("Ja existe um insumo com este codigo.");
    return;
  }
  const consumable = {
    id,
    code,
    name: byId("consumable-name").value.trim(),
    details: byId("consumable-details").value.trim(),
    stock: parseQuantity(byId("consumable-stock").value),
    unit: byId("consumable-unit").value,
    minStock: parseQuantity(byId("consumable-min-stock").value),
    minStockUnit: byId("consumable-min-stock-unit").value,
    cost: parseMoneyInput(byId("consumable-cost").value),
  };
  consumable.unitCost = consumable.stock > 0 ? consumable.cost / baseQuantity(consumable.stock, consumable.unit) : 0;
  const index = state.consumables.findIndex((item) => item.id === id);
  if (index >= 0) state.consumables[index] = consumable;
  else state.consumables.push(consumable);
  resetConsumableForm();
  saveState();
  renderAll();
  showToast("Insumo salvo.");
});

byId("production-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const product = state.products.find((item) => item.id === byId("production-product").value);
  const qty = nonNegativeInteger(byId("production-qty").value);
  if (!product || qty < 1) {
    showToast("Escolha o produto e uma quantidade valida.");
    return;
  }

  const { recipe, items } = recipeRequirements(product.id, qty);
  if (!recipe) {
    showToast("Salve uma receita vinculada a este produto antes de produzir.");
    return;
  }
  if (items.length === 0) {
    showToast("Vincule pelo menos um insumo do estoque na receita.");
    return;
  }

  const missing = items.filter((item) => item.shortage > 0);
  if (missing.length) {
    showToast(`Falta ${missing[0].consumable.name}: ${formatQuantity(missing[0].shortage, missing[0].consumable.unit)}.`);
    return;
  }

  for (const item of items) {
    const usedBaseQty = baseQuantity(item.needed, item.consumable.unit);
    item.consumable.cost = Math.max(0, inventoryValue(item.consumable) - usedBaseQty * consumableUnitCost(item.consumable));
    item.consumable.stock -= item.needed;
  }
  product.stock += qty;
  state.productionHistory = [{
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    productId: product.id,
    productName: product.name,
    recipeId: recipe.id,
    qty,
    note: byId("production-note").value.trim(),
    consumed: items.map((item) => ({
      consumableId: item.consumable.id,
      name: item.consumable.name,
      qty: item.needed,
      unit: item.consumable.unit,
    })),
  }, ...(state.productionHistory || [])];

  byId("production-form").reset();
  byId("production-qty").value = 1;
  saveState();
  renderAll();
  showToast("Producao registrada e insumos baixados.");
});

document.addEventListener("click", async (event) => {
  const productEditId = event.target.dataset.editProduct;
  const productDeleteId = event.target.dataset.deleteProduct;
  const productPriceId = event.target.dataset.priceProduct;
  const consumableAddStockId = event.target.dataset.addConsumableStock;
  const consumableRemoveStockId = event.target.dataset.removeConsumableStock;
  const consumableResetAverageId = event.target.dataset.resetConsumableAverage;
  const consumableEditId = event.target.dataset.editConsumable;
  const consumableDeleteId = event.target.dataset.deleteConsumable;
  const customerEditId = event.target.dataset.editCustomer;
  const customerDeleteId = event.target.dataset.deleteCustomer;
  const stockSaveId = event.target.dataset.stockSave;
  const removeSaleItemId = event.target.closest("[data-remove-sale-item]")?.dataset.removeSaleItem;
  const increaseSaleItemId = event.target.closest("[data-increase-sale-item]")?.dataset.increaseSaleItem;
  const decreaseSaleItemId = event.target.closest("[data-decrease-sale-item]")?.dataset.decreaseSaleItem;
  const deleteSaleId = event.target.closest("[data-delete-sale]")?.dataset.deleteSale;
  const markPaidId = event.target.closest("[data-mark-paid]")?.dataset.markPaid;
  const removeIngredientId = event.target.closest("[data-remove-ingredient]")?.dataset.removeIngredient;
  const openRecipeId = event.target.closest("[data-open-recipe]")?.dataset.openRecipe;
  const deleteRecipeId = event.target.closest("[data-delete-recipe]")?.dataset.deleteRecipe;
  const closeModal = event.target.closest("[data-close-modal]");

  if (removeSaleItemId) {
    saleDraftItems = saleDraftItems.filter((item) => item.productId !== removeSaleItemId);
    renderSaleDraft();
    renderIcons();
  }

  if (increaseSaleItemId) {
    adjustSaleItem(increaseSaleItemId, 1);
  }

  if (decreaseSaleItemId) {
    adjustSaleItem(decreaseSaleItemId, -1);
  }

  if (deleteSaleId) {
    await deleteSale(deleteSaleId);
  }

  if (markPaidId) {
    await markSalePaid(markPaidId);
  }

  if (removeIngredientId) {
    readRecipeRowsFromDom();
    recipeIngredientRows = recipeIngredientRows.filter((row) => row.id !== removeIngredientId);
    if (recipeIngredientRows.length === 0) {
      recipeIngredientRows.push(blankRecipeRow());
    }
    recipeDirty = true;
    renderCostCalculator();
    renderIcons();
  }

  if (openRecipeId) {
    openRecipe(openRecipeId);
  }

  if (deleteRecipeId) {
    const confirmed = await askConfirmation({
      title: "Excluir receita?",
      message: "Tem certeza que deseja excluir esta receita do historico?",
      confirmText: "Excluir receita",
    });
    if (!confirmed) return;
    state.recipeHistory = (state.recipeHistory || []).filter((recipe) => recipe.id !== deleteRecipeId);
    saveState();
    renderRecipeHistory();
    showToast("Receita excluida.");
  }

  if (closeModal || event.target.id === "edit-modal") {
    closeEditModal();
    return;
  }

  if (productEditId) {
    openProductModal(productEditId);
  }

  if (productPriceId) {
    startRecipeForProduct(productPriceId);
  }

  if (productDeleteId) {
    const confirmed = await askConfirmation({
      title: "Excluir produto?",
      message: "Tem certeza que deseja excluir este produto? O historico de vendas sera mantido.",
      confirmText: "Excluir produto",
    });
    if (!confirmed) return;
    state.products = state.products.filter((item) => item.id !== productDeleteId);
    saveState();
    renderAll();
    showToast("Produto excluido.");
  }

  if (consumableAddStockId) {
    openAddConsumableStockModal(consumableAddStockId);
  }

  if (consumableRemoveStockId) {
    openRemoveConsumableStockModal(consumableRemoveStockId);
  }

  if (consumableResetAverageId) {
    await resetConsumableAverage(consumableResetAverageId);
  }

  if (consumableEditId) {
    openConsumableModal(consumableEditId);
  }

  if (consumableDeleteId) {
    const confirmed = await askConfirmation({
      title: "Excluir insumo?",
      message: "Tem certeza que deseja excluir este insumo? Receitas vinculadas deixam de baixar esse item automaticamente.",
      confirmText: "Excluir insumo",
    });
    if (!confirmed) return;
    state.consumables = state.consumables.filter((item) => item.id !== consumableDeleteId);
    for (const recipe of state.recipeHistory || []) {
      for (const ingredient of recipe.ingredients || []) {
        if (ingredient.consumableId === consumableDeleteId) ingredient.consumableId = "";
      }
    }
    saveState();
    renderAll();
    showToast("Insumo excluido.");
  }

  if (customerEditId) {
    openCustomerModal(customerEditId);
  }

  if (customerDeleteId && state.customers.length > 1) {
    const confirmed = await askConfirmation({
      title: "Excluir cliente?",
      message: "Tem certeza que deseja excluir este cliente? O historico de vendas sera mantido.",
      confirmText: "Excluir cliente",
    });
    if (!confirmed) return;
    state.customers = state.customers.filter((item) => item.id !== customerDeleteId);
    saveState();
    renderAll();
    showToast("Cliente excluido.");
  }

  if (stockSaveId) {
    const input = document.querySelector(`[data-stock-input="${stockSaveId}"]`);
    const product = state.products.find((item) => item.id === stockSaveId);
    product.stock = nonNegativeInteger(input.value);
    saveState();
    renderAll();
    showToast("Estoque atualizado.");
  }
});

byId("edit-modal").addEventListener("submit", (event) => {
  event.preventDefault();
  const productForm = event.target.closest("[data-product-edit-form]");
  const customerForm = event.target.closest("[data-customer-edit-form]");
  const consumableForm = event.target.closest("[data-consumable-edit-form]");
  const consumableAddStockForm = event.target.closest("[data-consumable-add-stock-form]");
  const consumableRemoveStockForm = event.target.closest("[data-consumable-remove-stock-form]");
  const formData = new FormData(event.target);

  if (productForm) {
    const product = state.products.find((item) => item.id === productForm.dataset.productEditForm);
    if (!product) return;
    product.name = String(formData.get("name")).trim();
    product.category = String(formData.get("category")).trim();
    product.price = parseMoneyInput(formData.get("price"));
    product.costPrice = parseMoneyInput(formData.get("costPrice"));
    product.stock = nonNegativeInteger(formData.get("stock"));
    saveState();
    renderAll();
    closeEditModal();
    showToast("Produto atualizado.");
  }

  if (customerForm) {
    const customer = state.customers.find((item) => item.id === customerForm.dataset.customerEditForm);
    if (!customer) return;
    customer.name = String(formData.get("name")).trim();
    customer.phone = String(formData.get("phone")).trim();
    customer.note = String(formData.get("note")).trim();
    saveState();
    renderAll();
    closeEditModal();
    showToast("Cliente atualizado.");
  }

  if (consumableForm) {
    const item = state.consumables.find((consumable) => consumable.id === consumableForm.dataset.consumableEditForm);
    if (!item) return;
    const code = String(formData.get("code")).trim();
    if (!code) {
      showToast("Informe o codigo do insumo.");
      return;
    }
    const duplicateCode = state.consumables.some((consumable) => consumable.id !== item.id && String(consumable.code || "").toLowerCase() === code.toLowerCase());
    if (duplicateCode) {
      showToast("Ja existe um insumo com este codigo.");
      return;
    }
    item.code = code;
    item.name = String(formData.get("name")).trim();
    item.details = String(formData.get("details")).trim();
    item.stock = parseQuantity(formData.get("stock"));
    item.unit = String(formData.get("unit"));
    item.minStock = parseQuantity(formData.get("minStock"));
    item.minStockUnit = String(formData.get("minStockUnit") || item.unit);
    item.cost = parseMoneyInput(formData.get("cost"));
    item.unitCost = item.stock > 0 ? item.cost / baseQuantity(item.stock, item.unit) : consumableUnitCost(item);
    saveState();
    renderAll();
    closeEditModal();
    showToast("Insumo atualizado.");
  }

  if (consumableAddStockForm) {
    const item = state.consumables.find((consumable) => consumable.id === consumableAddStockForm.dataset.consumableAddStockForm);
    if (!item) return;
    const qty = parseQuantity(formData.get("qty"));
    const unit = String(formData.get("unit"));
    const cost = parseMoneyInput(formData.get("cost"));
    if (!qty || !cost) {
      showToast("Informe quantidade e valor pago.");
      return;
    }
    const result = applyConsumablePurchase(item, qty, unit, cost);
    if (!result.ok && result.reason === "unit") {
      showToast("A unidade da compra nao combina com a unidade do insumo.");
      return;
    }
    if (!result.ok && result.reason === "whole") {
      showToast("Insumo em unidade precisa ser numero inteiro.");
      return;
    }
    saveState();
    renderAll();
    closeEditModal();
    showToast("Compra adicionada e custo medio recalculado.");
  }

  if (consumableRemoveStockForm) {
    const item = state.consumables.find((consumable) => consumable.id === consumableRemoveStockForm.dataset.consumableRemoveStockForm);
    if (!item) return;
    const qty = parseQuantity(formData.get("qty"));
    const unit = String(formData.get("unit"));
    if (!qty) {
      showToast("Informe a quantidade para diminuir.");
      return;
    }
    const result = applyConsumableLoss(item, qty, unit);
    if (!result.ok && result.reason === "unit") {
      showToast("A unidade nao combina com a unidade do insumo.");
      return;
    }
    if (!result.ok && result.reason === "whole") {
      showToast("Insumo em unidade precisa ser numero inteiro.");
      return;
    }
    if (!result.ok && result.reason === "stock") {
      showToast(`Estoque insuficiente. Disponivel: ${formatQuantity(item.stock || 0, item.unit)}.`);
      return;
    }
    saveState();
    renderAll();
    closeEditModal();
    showToast("Estoque diminuido e valor abatido.");
  }
});

byId("undo-change").addEventListener("click", undoLastChange);

byId("logout-button").addEventListener("click", async () => {
  resetAppSession("Sessao encerrada.");
  try {
    await fetch(SESSION_URL, {
      method: "DELETE",
      credentials: "same-origin",
      keepalive: true,
    });
  } catch {
    byId("login-error").textContent = "Sessao encerrada nesta tela. Recarregue se precisar validar o servidor.";
  }
});

byId("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = event.target.querySelector("button[type='submit']");
  submitButton.disabled = true;
  byId("login-error").textContent = "";

  try {
    const response = await fetch(SESSION_URL, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: byId("login-user").value.trim(),
        password: byId("login-password").value,
      }),
    });

    if (!response.ok) {
      showLogin("Usuario ou senha invalidos.");
      return;
    }

    await startApp();
  } catch {
    byId("login-error").textContent = "Nao foi possivel entrar agora.";
  } finally {
    submitButton.disabled = false;
  }
});

await startApp();
