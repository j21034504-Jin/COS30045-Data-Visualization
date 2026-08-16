"use strict";


document.addEventListener("DOMContentLoaded", function () {

  updateCurrentYear();

  setupMobileNavigation();

  setupFAQ();

  setupEnergyCalculator();

});



/* CURRENT YEAR */

function updateCurrentYear() {

  const yearElements =
    document.querySelectorAll(".current-year");

  const currentYear =
    new Date().getFullYear();


  yearElements.forEach(function (element) {

    element.textContent =
      currentYear;

  });

}



/* MOBILE NAVIGATION */

function setupMobileNavigation() {

  const menuButton =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");


  if (!menuButton || !navLinks) {

    return;

  }


  menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("open");

  });

}



/* FAQ ACCORDION */

function setupFAQ() {

  const questions =
    document.querySelectorAll(".faq-question");


  questions.forEach(function (button) {


    button.addEventListener("click", function () {


      const answer =
        button.nextElementSibling;


      const icon =
        button.querySelector(".faq-icon");


      const isOpen =
        button.getAttribute("aria-expanded") === "true";


      if (isOpen) {

        answer.hidden = true;

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        icon.textContent =
          "+";

      }

      else {

        answer.hidden = false;

        button.setAttribute(
          "aria-expanded",
          "true"
        );

        icon.textContent =
          "−";

      }


    });


  });

}



/* ENERGY CALCULATOR */

function setupEnergyCalculator() {


  const form =
    document.getElementById("energy-form");


  if (!form) {

    return;

  }


  const wattsInput =
    document.getElementById("watts");

  const hoursInput =
    document.getElementById("hours");

  const priceInput =
    document.getElementById("price");


  form.addEventListener(
    "submit",
    function (event) {


      event.preventDefault();


      calculateEnergy();


    }
  );


}



/* INPUT VALIDATION */

function validateInput(input) {


  const value =
    Number(input.value);


  let errorMessage =
    "";


  if (
    input.value.trim() === "" ||
    isNaN(value)
  ) {

    errorMessage =
      "Please enter a value.";

  }


  else if (value <= 0) {

    errorMessage =
      "Please enter a number greater than 0.";

  }


  else if (
    input.id === "hours" &&
    value > 24
  ) {

    errorMessage =
      "Hours per day cannot be more than 24.";

  }


  const errorElement =
    document.getElementById(
      input.id + "-error"
    );


  errorElement.textContent =
    errorMessage;


  if (errorMessage !== "") {

    input.classList.add("invalid");

    return false;

  }


  else {

    input.classList.remove("invalid");

    return true;

  }


}



/* PERFORM CALCULATION */

function calculateEnergy() {


  const wattsInput =
    document.getElementById("watts");


  const hoursInput =
    document.getElementById("hours");


  const priceInput =
    document.getElementById("price");



  const wattsValid =
    validateInput(wattsInput);


  const hoursValid =
    validateInput(hoursInput);


  const priceValid =
    validateInput(priceInput);



  if (
    !wattsValid ||
    !hoursValid ||
    !priceValid
  ) {

    hideResults();

    return;

  }



  const watts =
    Number(wattsInput.value);


  const hoursPerDay =
    Number(hoursInput.value);


  const electricityPrice =
    Number(priceInput.value);



  /* CALCULATIONS */


  const dailyKwh =
    (watts * hoursPerDay) / 1000;


  const monthlyKwh =
    dailyKwh * 30;


  const yearlyKwh =
    dailyKwh * 365;


  const yearlyCost =
    yearlyKwh *
    (electricityPrice / 100);



  /* UPDATE WEB PAGE */


  document.getElementById(
    "daily-result"
  ).textContent =
    dailyKwh.toFixed(2) +
    " kWh";


  document.getElementById(
    "monthly-result"
  ).textContent =
    monthlyKwh.toFixed(2) +
    " kWh";


  document.getElementById(
    "yearly-result"
  ).textContent =
    yearlyKwh.toFixed(2) +
    " kWh";


  document.getElementById(
    "cost-result"
  ).textContent =
    "$" +
    yearlyCost.toFixed(2);



  const placeholder =
    document.querySelector(
      ".results-placeholder"
    );


  const results =
    document.querySelector(
      ".result-list"
    );


  placeholder.hidden =
    true;


  results.hidden =
    false;


}



/* INVALID INPUT RESULTS */

function hideResults() {


  const placeholder =
    document.querySelector(
      ".results-placeholder"
    );


  const results =
    document.querySelector(
      ".result-list"
    );


  placeholder.textContent =
    "Please correct the highlighted input values.";


  placeholder.hidden =
    false;


  results.hidden =
    true;


}