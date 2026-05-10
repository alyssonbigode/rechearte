const SESSION_URL = "/api/session";

const form = document.getElementById("login-form");
const userInput = document.getElementById("login-user");
const passwordInput = document.getElementById("login-password");
const errorMessage = document.getElementById("login-error");
const message = new URLSearchParams(window.location.search).get("message");
if (message) errorMessage.textContent = message;

async function checkSession() {
  try {
    const response = await fetch(SESSION_URL, { credentials: "same-origin" });
    if (!response.ok) return;
    const session = await response.json();
    if (session.authenticated) window.location.replace("/");
  } catch {
    errorMessage.textContent = "Nao foi possivel verificar a sessao agora.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  errorMessage.textContent = "";

  try {
    const response = await fetch(SESSION_URL, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userInput.value.trim(),
        password: passwordInput.value,
      }),
    });

    if (!response.ok) {
      passwordInput.value = "";
      errorMessage.textContent = "Usuario ou senha invalidos.";
      passwordInput.focus();
      return;
    }

    window.location.replace("/");
  } catch {
    errorMessage.textContent = "Nao foi possivel entrar agora.";
  } finally {
    submitButton.disabled = false;
  }
});

userInput.focus();
checkSession();
