async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const data = await apiRegister(name, email, password);
  if (data.message?.includes("User registered")) {
    alert("Registered successfully! Please login.");
    showLogin();
  } else {
    alert(data.message || "Registration failed.");
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const user = await apiLogin(email, password);

  if (!user.email) return alert(user.message || "Login failed.");

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  updateUserStats();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("auth-container").style.display = "flex";
}

function showRegister() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("register-section").style.display = "block";
}

function showLogin() {
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("register-section").style.display = "none";
}

// Attach event listeners to replace inline onclick handlers
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const showRegisterLink = document.getElementById('showRegisterLink');
  const showLoginLink = document.getElementById('showLoginLink');
  const logoutLink = document.getElementById('logoutLink');

  if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); login(); });
  if (registerBtn) registerBtn.addEventListener('click', (e) => { e.preventDefault(); register(); });
  if (showRegisterLink) showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showRegister(); });
  if (showLoginLink) showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
  if (logoutLink) logoutLink.addEventListener('click', (e) => { e.preventDefault(); logout(); });
});
