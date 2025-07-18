function togglePassword() {
  const passwordInput = document.getElementById("password");
  const showBtn = document.querySelector(".show-btn");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    showBtn.textContent = "Show";
  }
}
// 🔒 Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const showBtn = document.querySelector(".show-btn");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    showBtn.textContent = "Show";
  }
}

// 🚀 Handle login form submit
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = this.username.value;
  const password = this.password.value;

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success && data.redirect) {
      window.location.href = data.redirect; // ✅ Redirect to YouTube or wherever set in backend
    } else {
      alert("Login failed. Please try again.");
    }
  } catch (err) {
    alert("Server error. Try again later.");
    console.error("❌ Error occurred:", err);
  }
});
