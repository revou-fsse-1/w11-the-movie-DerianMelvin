import {
  formLogIn,
  usernameLogIn,
  passwordLogIn,
  errorUsernameLogIn,
  errorPasswordLogIn,
  errorSubmit,
  logInSuccess,
} from "./utils/variables.js";
import { API_USERS } from "./utils/constants.js";
import { displayError, removeError } from "./utils/functions.js";

let usernameValid = false;
let passwordValid = false;

/* 
  ================================================
    FUNCTIONS
  ================================================
*/
const getUser = async () => {
  const response = await fetch(
    `${API_USERS}?username=${usernameLogIn.value}&password=${passwordLogIn.value}`
  );
  const user = await response.json();
  return user[0];
};

const validateUsername = (inputValue) => {
  if (inputValue.length === 0) {
    displayError(errorUsernameLogIn, "Username is empty");
    usernameValid = false;
  } else {
    removeError(errorUsernameLogIn);
    usernameValid = true;
  }
};

const validatePassword = (inputValue) => {
  if (inputValue.length === 0) {
    displayError(errorPasswordLogIn, "Password is empty");
    passwordValid = false;
  } else {
    removeError(errorPasswordLogIn);
    passwordValid = true;
  }
};

const displaySubmitError = () => {
  errorSubmit.classList.remove("hidden");
  setTimeout(() => {
    errorSubmit.classList.add("hidden");
  }, 1500);
};

const displayLogInSuccess = () => {
  logInSuccess.classList.remove("hidden");
  setTimeout(() => {
    window.location.href = "./homepage/index.html";
  }, 1100);
};

/* 
  ================================================
    EVENT LISTENERS
  ================================================
*/
usernameLogIn.addEventListener("input", () => {
  validateUsername(usernameLogIn.value);
});

passwordLogIn.addEventListener("input", () => {
  validatePassword(passwordLogIn.value);
});

formLogIn.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (usernameValid && passwordValid) {
    const user = await getUser();

    if (user === undefined) {
      displaySubmitError();
    } else if (passwordLogIn.value !== user.password) {
      displaySubmitError();
    } else {
      displayLogInSuccess();
    }
  } else {
    validateUsername(usernameLogIn.value);
    validatePassword(passwordLogIn.value);
  }
});
