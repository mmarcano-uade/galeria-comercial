document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("promoForm");
    const emailInput = document.getElementById("promoEmail");
    const errorMsg = document.getElementById("promoEmailError");

    function isValidEmail(value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(value).toLowerCase());
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const value = emailInput.value.trim();
      const ok = isValidEmail(value);

      if (!ok) {
        errorMsg.classList.remove("d-none");
        emailInput.classList.add("is-invalid");
        return;
      }

      errorMsg.classList.add("d-none");
      emailInput.classList.remove("is-invalid");
      emailInput.value = "";

      alert("¡Gracias! Te registraste para recibir novedades.");
    });

    emailInput.addEventListener("input", function () {
      if (errorMsg.classList.contains("d-none")) return;
      const ok = isValidEmail(emailInput.value.trim());
      if (ok) {
        errorMsg.classList.add("d-none");
        emailInput.classList.remove("is-invalid");
      }
    });
  });
