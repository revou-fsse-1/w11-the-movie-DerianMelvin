import {
  formRegister,
  usernameRegister,
  emailRegister,
  passwordRegister,
  confirmPasswordRegister,
  errorUsernameRegister,
  errorEmailRegister,
  errorPassword,
  registerSuccess,
} from "/src/utils/variables.js";
import { API_USERS } from "../utils/constants.js";

let usernameValid = false;
let emailValid = false;
let passwordValid = false;

/* 
  ================================================
    FUNCTIONS
  ================================================
*/
const displayError = (elementId, errorMsg) => {
  elementId.innerHTML = errorMsg;
};

const removeError = (elementId) => {
  elementId.innerHTML = "";
};

const validateUsername = (inputValue) => {
  if (inputValue.length === 0) {
    displayError(errorUsernameRegister, "Username is empty");
    usernameValid = false;
  } else {
    removeError(errorUsernameRegister);
    usernameValid = true;
  }
};

const validateEmail = (inputValue) => {
  if (inputValue.length === 0) {
    displayError(errorEmailRegister, "Email is empty");
    emailValid = false;
  } else {
    removeError(errorEmailRegister);
    emailValid = true;
  }
};

const validatePassword = () => {
  const input = passwordRegister.value;
  const confirmInput = confirmPasswordRegister.value;

  if (input.length !== 0 && input === confirmInput) {
    passwordValid = true;
    errorPassword.classList.add("hidden");
  } else {
    passwordValid = false;
    errorPassword.classList.remove("hidden");
    setTimeout(() => {
      errorPassword.classList.add("hidden");
    }, 1500);
  }
};

const displayRegisterSuccess = () => {
  registerSuccess.classList.remove("hidden");

  setTimeout(async () => {
    const params = {
      method: "POST",
      body: JSON.stringify({
        username: usernameRegister.value,
        email: emailRegister.value,
        password: passwordRegister.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(API_USERS, params);
    const result = await response.json();

    window.location.href = "../index.html";
  }, 1100);
};

/* 
  ================================================
    EVENT LISTENERS
  ================================================
*/
usernameRegister.addEventListener("input", () => {
  validateUsername(usernameRegister.value);
});

emailRegister.addEventListener("input", () => {
  validateEmail(emailRegister.value);
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  validatePassword();

  if (usernameValid && emailValid && passwordValid) {
    displayRegisterSuccess();
  } else {
    validateUsername(usernameRegister.value);
    validateEmail(emailRegister.value);
    validatePassword();
  }
});
