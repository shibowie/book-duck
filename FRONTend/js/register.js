import { registerUser } from "./auth.js";

const registerForm = document.querySelector("#register-form");
const registerMessage = document.querySelector("#register-message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  registerMessage.textContent = "";

  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";
    return;
  }

  try {
    await registerUser(username, email, password);

    window.location.href = "../index.html";
  } catch (error) {
    registerMessage.textContent = error.message;
  }
});
