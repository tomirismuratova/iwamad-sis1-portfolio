
const themeButton = document.getElementById("theme-toggle");
const html = document.documentElement;

themeButton.addEventListener("click", function () {
  const isDark = html.dataset.theme === "dark";

  html.dataset.theme = isDark ? "light" : "dark";

  themeButton.textContent = isDark ? "Dark Mode" : "Light Mode";
  themeButton.setAttribute("aria-pressed", String(!isDark));
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to dark mode" : "Switch to light mode"
  );
});


const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

function showError(field, message) {
  const error = document.getElementById(field.id + "-error");
  error.textContent = message;
  field.setAttribute("aria-invalid", "true");
}

function clearError(field) {
  const error = document.getElementById(field.id + "-error");
  error.textContent = "";
  field.removeAttribute("aria-invalid");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  formStatus.textContent = "";

  clearError(nameInput);
  clearError(emailInput);
  clearError(messageInput);

  let isValid = true;
  let firstInvalidField = null;

  function invalidate(field, message) {
    showError(field, message);
    isValid = false;

    if (!firstInvalidField) {
      firstInvalidField = field;
    }
  }

  if (nameInput.value.trim() === "") {
    invalidate(nameInput, "Please enter your name.");
  }

  const email = emailInput.value.trim();

  if (email === "") {
    invalidate(emailInput, "Please enter your email address.");
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      invalidate(emailInput, "Please enter a valid email address.");
    }
  }

  if (messageInput.value.trim() === "") {
    invalidate(messageInput, "Please enter your message.");
  }

  if (!isValid) {
    firstInvalidField.focus();
    return;
  }

  formStatus.textContent =
    "Success! Your form has been validated. No message was sent.";

  form.reset();
});
