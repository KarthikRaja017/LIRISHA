document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");
  let actionUrl = "/forms/contact-us-submit.php";
  let forms = document.querySelectorAll(".main-form, .small-form");
  if (forms.length === 0) {
    //forms = document.querySelectorAll("form");
  }
  if (forms.length > 0) {
    // Create and style the overlay element
    const overlay = document.createElement("div");
    overlay.id = "loadingOverlay";
    Object.assign(overlay.style, {
      display: "none", // Hidden by default
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
      zIndex: "9999",
      textAlign: "center",
    });
    // Create and style the loader element
    const loader = document.createElement("div");
    loader.className = "loader";
    Object.assign(loader.style, {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "8px solid #f3f3f3", // Light grey
      borderTop: "8px solid #3498db", // Blue
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
    });
    // Create the loading message element
    const loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Processing, please wait...";
    Object.assign(loadingMessage.style, {
      position: "absolute",
      top: "50%", // Position below the loader
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      fontSize: "20px",
      marginTop: "10px", // Space between loader and message
    });
    // Create keyframe animation via JavaScript
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
  `;
    document.head.appendChild(styleSheet);
    // Append loader and message to the overlay
    overlay.appendChild(loader);
    overlay.appendChild(loadingMessage);
    // Append the overlay to the body
    document.body.appendChild(overlay);
    forms.forEach(function (form) {
      // console.log("Form found:", form);
      // Capture the action URL from the form and then remove the action attribute
      actionUrl = actionUrl ? actionUrl : form.getAttribute("action");
      form.removeAttribute("action"); // Remove the action attribute for security
      form.removeAttribute("onsubmit"); // Remove the onsubmit attribute for security
      // Add novalidate attribute to disable HTML5 validation
      form.setAttribute("novalidate", true);
      // Dynamically create error elements
      addErrorFields(form);
      form.addEventListener("submit", function (event) {
        //   console.log("Form submit event triggered");
        event.preventDefault(); // Prevent the default form submission
        // Create a hidden input field with the current page URL
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "currentpage_url";
        hiddenInput.value = window.location.href; // Get the full URL of the current page
        form.appendChild(hiddenInput);
        const formData = new FormData(form);
        // Show the overlay with loader and message
        overlay.style.display = "block";
        // Client-side validation
        const clientErrors = validateFormData(formData);
        if (Object.keys(clientErrors).length > 0) {
          displayValidationErrors(form, clientErrors);
          overlay.style.display = "none"; // Hide overlay if validation fails
          return; // Stop form submission if Client side Validation fails
        }
        // After Client side Validation
        // Use AJAX to send form data for validation and processing
        const xhr = new XMLHttpRequest();
        xhr.open("POST", actionUrl, true); // Use captured action URL
        xhr.onload = function () {
          // Hide the overlay as soon as the request completes
          overlay.style.display = "none";
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.isValid) {
              // Check if the form processing was successful
              if (response.success) {
                // Redirect to the success URL
                window.location.href = response.redirect_url;
              } else {
                // Redirect to the submission error URL
                window.location.href = response.redirect_url;
              }
            } else {
              displayValidationErrors(form, response.errors);
            }
          } else {
            alert("There was an error processing your request.");
          }
        };
        xhr.send(formData);
      });
    });
  }
});
function addErrorFields(form) {
  const fields = [
    "FirstName",
    "Email",
    "phone",
    "description",
    "captcha_number",
  ];
  fields.forEach(function (field) {
    const inputField = form.querySelector(`[name=${field}]`);
    if (inputField) {
      let errorElement = document.createElement("span");
      errorElement.className = `error ${field}-error`;
      // Special handling for captcha_number to place error message correctly
      if (field === "captcha_number") {
        const container = form.querySelector("#captcha-fields-container");
        if (container) {
          container.insertAdjacentElement("afterend", errorElement);
        }
      } else {
        inputField.parentNode.insertBefore(
          errorElement,
          inputField.nextSibling
        );
      }
    }
  });
}
function validateFormData(formData) {
  const errors = {};
  // Validate FirstName
  const firstName = formData.get("FirstName").trim();
  if (!firstName || firstName.length < 4) {
    errors.FirstName = "First name must be at least 4 characters long.";
  }
  // Validate Email
  const email = formData.get("Email").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.Email = "Please enter a valid email address.";
  }
  // Validate Phone
  const phone = formData.get("phone").trim();
  if (!/^[0-9]+$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  // Validate Description
  const description = formData.get("description").trim();
  if (!description) {
    errors.description = "Description cannot be empty.";
   } 
else if (description.length < 30) {
      errors.description = "Description seems too short—please elaborate!";
    }
  return errors;
}
function displayValidationErrors(form, errors) {
  // Clear previous errors
  form.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  for (const [key, message] of Object.entries(errors)) {
    const errorSpan = form.querySelector(`.${key}-error`);
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
      errorSpan.style.marginBottom = "15px";
	  errorSpan.style.fontSize = "10px";
	  errorSpan.style.lineHeight = "15px";
      errorSpan.style.color = "red"; // Optional: Style the error text
    }
  }
}
