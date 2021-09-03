import { joinGroup } from "./index.js";

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");
  // var btnSubmit = document.querySelectorAll(".needs-validation > button");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        form.classList.add("was-validated");

        if (!form.checkValidity()) {
          event.stopPropagation();
          return;
        }

        joinGroup();
        console.log("done");
      },
      false
    );
  });
})();
