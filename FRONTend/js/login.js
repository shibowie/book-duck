import { loginUser } from "./auth.js";

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const identifier = document.querySelector("#identifier").value;
  const password = document.querySelector("#password").value;

  loginMessage.textContent = "";

  try {
    await loginUser(identifier, password);

    window.location.href = "../index.html";
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});
