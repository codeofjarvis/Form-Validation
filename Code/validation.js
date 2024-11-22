
// input feild is required 

$(document).ready(function($) {
        
  $("#register-form").validate({
  rules: {
      username: "required",        
      password: {
          required: true,
          minlength: 8    
      },

      item:{
          required: true
        },
     city: "required",
    gender: "required",
    
   
  },
  messages: {
      // name: "Please enter your username",                   
      password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 8 characters long"
      },
      item:"Please select an item",
    city: "Please enter your city",
    gender: "This field is required"
  },
   errorPlacement: function(error, element) 
{
if ( element.is(":radio") ) 
{
  error.appendTo( element.parents('.form-group') );
}
else 
{ // This is the default behavior 
  error.insertAfter( element );
}
},
  submitHandler: function(form) {
      form.submit();
  }
  
});
});



// Phone Number and Mobile number Validation

document.addEventListener("DOMContentLoaded", function () {
  // Get all input elements
  const mobileCode = document.querySelector(".mobile-code");
  const mobileNumber = document.querySelector(".mobile-number");
  const phoneCode = document.querySelector(".phone-code");
  const phoneNumber = document.querySelector(".phone-number");

  // Validation patterns
  const codePattern = /^\+?\d{1,4}$/; // Country code validation
  const mobilePattern = /^[1-9]\d{9}$/; // 10-digit mobile number, not starting with 0
  const phonePattern = /^\d{6,8}$/; // 6 to 8 digits for landline phone numbers

  // Function to show error message
  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
  }

  // Function to show success
  function showSuccess(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    input.classList.remove("error");
    input.classList.add("success");
  }

  // Function to validate input
  function validateInput(input, pattern, errorMessage) {
    const value = input.value.trim();

    if (value === "") {
      showError(input, "");
      return false;
    } else if (!pattern.test(value)) {
      showError(input, errorMessage);
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }

  // Allow only numeric input
  function allowOnlyNumbers(event) {
    if (
      !/^\d$/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "+"
    ) {
      event.preventDefault();
    }
    // Allow '+' only at the beginning of code inputs
    if (
      event.key === "+" &&
      (this.classList.contains("mobile-code") ||
        this.classList.contains("phone-code")) &&
      this.value.length > 0
    ) {
      event.preventDefault();
    }
  }

  // Add keypress event listeners to all inputs
  [mobileCode, mobileNumber, phoneCode, phoneNumber].forEach((input) => {
    input.addEventListener("keypress", allowOnlyNumbers);
  });

  // Add input event listeners for real-time validation
  mobileCode.addEventListener("input", function () {
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4); // Limit to 4 digits
    }
    validateInput(this, codePattern, "Invalid country code (1-4 digits)");
  });

  mobileNumber.addEventListener("input", function () {
    if (this.value.length > 10) {
      this.value = this.value.slice(0, 10); // Limit to 10 digits
    }
    validateInput(this, mobilePattern, "Mobile number must be 10 digits");
  });

  phoneCode.addEventListener("input", function () {
    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4); // Limit to 4 digits
    }
    validateInput(this, codePattern, "Invalid country code (1-4 digits)");
  });

  phoneNumber.addEventListener("input", function () {
    if (this.value.length > 8) {
      this.value = this.value.slice(0, 8); // Limit to 8 digits
    }
    validateInput(this, phonePattern, "Phone number must be 6-8 digits");
  });

  // Form submission validation
  document.querySelector("form").addEventListener("submit", function (e) {
    let isValid = true;

    // Validate mobile number section
    if (
      !validateInput(
        mobileCode,
        codePattern,
        "Invalid country code (1-4 digits)"
      )
    ) {
      isValid = false;
    }
    if (
      !validateInput(
        mobileNumber,
        mobilePattern,
        "Mobile number must be 10 digits"
      )
    ) {
      isValid = false;
    }

    // Validate phone number section
    if (
      !validateInput(
        phoneCode,
        codePattern,
        "Invalid country code (1-4 digits)"
      )
    ) {
      isValid = false;
    }
    if (
      !validateInput(
        phoneNumber,
        phonePattern,
        "Phone number must be 6-8 digits"
      )
    ) {
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Prevent form submission if validation fails
    }
  }); 
});
