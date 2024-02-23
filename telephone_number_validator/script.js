const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

checkBtn.addEventListener("click", () => checkInput());
clearBtn.addEventListener("click", () => {
  result.innerText = "";
});

const checkInput = () => {
  if (input.value === "") {
    alert("Please provide a phone number");
    return;
  }

  const number = input.value;
  const regex =
    /^1?\s?([0-9]{3}|\([0-9]{3}\)|\s\([0-9]{3}\)\s|\s[0-9]{3}\s)-?[0-9]{3}[-\s]?[0-9]{4}$/;
  const isValid = regex.test(number);
  result.innerText = isValid
    ? `Valid US number: ${number}`
    : `Invalid US number: ${number}`;
};
