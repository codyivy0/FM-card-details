const confirmBtn = document.getElementById("confirm-button");
const inputFields = document.querySelectorAll(".input-fields input");
const frontNumber = document.getElementById("front-number");
const nameElement = document.getElementById("name");
const expirationElement = document.getElementById("expiration");
const backNumber = document.getElementById("back-number");

confirmBtn.addEventListener("click", () => {
  let allFieldsValid = true;
  inputFields.forEach((field) => {
    if (field.value.trim() === "") {
      const error = field.nextElementSibling;
      error.textContent = "Can't be blank";
      field.classList.add("red-border");
      allFieldsValid = false;
    } else if (
      field.id === "card-number" &&
      !/^\d{16}$/.test(field.value.trim())
    ) {
      const error = field.nextElementSibling;
      error.textContent = "Wrong format, numbers only. Must be 16 digits";
      field.classList.add("red-border");
      allFieldsValid = false;
    } else {
      const error = field.nextElementSibling;
      error.textContent = String.fromCharCode(0xa0);
      field.classList.remove("red-border");

      // Update card elements as input fields are completed
      if (field.id === "card-number") {
        const formattedNumber = field.value
          .trim()
          .replace(/(\d{4})(?=\d)/g, "$1 ");
        frontNumber.textContent = formattedNumber;
      } else if (field.id === "cardholder-name") {
        nameElement.textContent = field.value.trim().toUpperCase();
      } else if (field.id === "exp-date-mm" || field.id === "exp-date-yy") {
        const month = document.getElementById("exp-date-mm").value.trim();
        const year = document.getElementById("exp-date-yy").value.trim();
        const formattedDate = `${month.padStart(2, "0")}/${year.padStart(
          2,
          "0"
        )}`;
        document.getElementById("expiration").textContent = formattedDate;
      } else if (field.id === "cvc") {
        backNumber.textContent = field.value.trim().replace();
      }
    }
  });
  if (allFieldsValid) {
    document.querySelector(".input-fields").style.display = "none";
    document.querySelectorAll(".complete").forEach((complete) => {
      complete.style.display = "flex";
    });
  }
});
