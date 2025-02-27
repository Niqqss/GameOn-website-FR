// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");
const modalValid = document.getElementById("validation-message");
const modalForm = document.getElementById("modal-form");
const modalValidClose = document.getElementById("close-valid-form");

// form validation
const inputsValidity = {
  first: false,
  last: false,
  email: false,
  birthdate: false,
  quantity: false,
  location: false,
  termsOfUse: false,
}

const form = document.querySelector("form");
// spread syntax to store the elements in an array so the returned values are iterable
const textInputs = [...document.querySelectorAll(".text-control")];

form.addEventListener("submit", handleForm);

function handleForm(e) {
  // prevent the form from using the default behavior (like displaying the browser's native error message)
  e.preventDefault();
  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter(key => !inputsValidity[key]);

  // if there is still at least 1 error (length > 0), displays error message for each false key
  if (failedInputs.length) {
    failedInputs.forEach(input => {
      const index = keys.indexOf(input);
      showValidation({ index: index, validation: false });
    })
  }
  // if the form is valid, hide the form and displays the success message + console.log the user inputs
  else {
    modalValid.classList.remove("hidden");
    modalForm.classList.add("hidden");
    // retrieving user data in console
    const locationVal = document.querySelector('input[name=location]:checked').value;
    console.log([...textInputs.map(val => val.value), locationVal, infoCheckbox.value]);
  }
}

// displays or not the error message
function showValidation({ index, validation }) {
  if (validation) {
    formData[index].setAttribute("data-error-visible", "false");
  }
  else {
    formData[index].setAttribute("data-error-visible", "true");
  }
}

// make nav responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// firstname verif
const firstInput = document.getElementById("first");
const regexName = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/;

firstInput.addEventListener("blur", firstValidation);
firstInput.addEventListener("input", firstValidation);

function firstValidation() {
  if (firstInput.value.length >= 2 && regexName.test(firstInput.value)) {
    showValidation({ index: 0, validation: true });
    inputsValidity.first = true;
  }
  else {
    showValidation({ index: 0, validation: false });
    inputsValidity.first = false;
  }
}

// lastname verif
const lastInput = document.getElementById("last");

lastInput.addEventListener("blur", lastValidation);
lastInput.addEventListener("input", lastValidation);

function lastValidation() {
  if (lastInput.value.length >= 2 && regexName.test(lastInput.value)) {
    showValidation({ index: 1, validation: true });
    inputsValidity.last = true;
  }
  else {
    showValidation({ index: 1, validation: false });
    inputsValidity.last = false;
  }
}

// mail verif
const mailInput = document.getElementById("email");
// regex as a constraint so the user has to use the right format
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/;

mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);

function mailValidation() {
  if (regexEmail.test(mailInput.value)) {
    showValidation({ index: 2, validation: true });
    inputsValidity.email = true;
  }
  else {
    showValidation({ index: 2, validation: false });
    inputsValidity.email = false;
  }
}

// birthdate verif
const dateInput = document.getElementById("birthdate");
const regexBirthdate = /^(200[0-4]|19[2-9]\d)\-(1[0-2]|0[1-9])\-(3[0-1]|[0-2]\d)$/;

dateInput.addEventListener("blur", dateValidation);
dateInput.addEventListener("input", dateValidation);

function dateValidation() {
  if (regexBirthdate.test(dateInput.value)) {
    showValidation({ index: 3, validation: true });
    inputsValidity.birthdate = true;
  }
  else {
    showValidation({ index: 3, validation: false });
    inputsValidity.birthdate = false;
  }
}

// quantity verif
const quantityInput = document.getElementById("quantity");
const regexQuantity = /^(\d?[0-9]|[1-9]0)$/;

quantityInput.addEventListener("blur", quantityValidation);
quantityInput.addEventListener("input", quantityValidation);

function quantityValidation() {
  if (regexQuantity.test(quantityInput.value)) {
    showValidation({ index: 4, validation: true });
    inputsValidity.quantity = true;
  }
  else {
    showValidation({ index: 4, validation: false });
    inputsValidity.quantity = false;
  }
}

// location verif
const locationInput = document.getElementsByName("location");

for (const location of locationInput) {
  location.addEventListener('input', checkLocation);
}

function checkLocation() {
  if (!location.checked) {
    showValidation({ index: 5, validation: true });
    inputsValidity.location = true;
  }
  else {
    showValidation({ index: 5, validation: false });
    inputsValidity.location = false;
  }
}

// terms of use verif
const termsOfUseCheckbox = document.getElementById("checkbox1");

termsOfUseCheckbox.addEventListener("input", isTOUChecked);

function isTOUChecked() {
  if (termsOfUseCheckbox.checked) {
    showValidation({ index: 6, validation: true });
    inputsValidity.termsOfUse = true;
  }
  else {
    showValidation({ index: 6, validation: false });
    inputsValidity.termsOfUse = false;
  }
}

// allows us to know if newsletter checkbox is checked or not when retrieving data
const infoCheckbox = document.getElementById('checkbox2');

infoCheckbox.addEventListener("input", isInfoChecked);

function isInfoChecked() {
  if (infoCheckbox.checked){
    infoCheckbox.value = true;
  }
  else {
    infoCheckbox.value = false;
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalCloseBtn.addEventListener("click", closeModal);
modalValidClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
