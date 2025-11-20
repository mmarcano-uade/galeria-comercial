  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const topicSelect = document.getElementById("helpTopic");
    const messageTextarea = document.getElementById("contactMessage");
    const successMsg = document.getElementById("contactSuccess");

    function validateEmail(value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(value).toLowerCase());
    }

    function setFieldValidity(field, isValid) {
      if (isValid) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      } else {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
      }
    }

    function validateForm() {
      let valid = true;

      const nameOk = nameInput.value.trim().length > 0;
      setFieldValidity(nameInput, nameOk);
      if (!nameOk) valid = false;

      const emailVal = emailInput.value.trim();
      const emailOk = emailVal.length > 0 && validateEmail(emailVal);
      setFieldValidity(emailInput, emailOk);
      if (!emailOk) valid = false;

      const topicOk = topicSelect.value.trim().length > 0;
      setFieldValidity(topicSelect, topicOk);
      if (!topicOk) valid = false;

      const msg = messageTextarea.value.trim();
      const msgOk = msg.length >= 10;
      setFieldValidity(messageTextarea, msgOk);
      if (!msgOk) valid = false;

      return valid;
    }

    [nameInput, emailInput, topicSelect, messageTextarea].forEach((field) => {
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) {
          validateForm();
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const isValid = validateForm();
      if (!isValid) {
        successMsg.classList.add("d-none");
        return;
      }

      form.reset();
      [nameInput, emailInput, topicSelect, messageTextarea].forEach((f) => {
        f.classList.remove("is-valid", "is-invalid");
      });
      successMsg.classList.remove("d-none");
    });
  });
