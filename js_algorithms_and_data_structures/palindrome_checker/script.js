const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

checkButton.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please input a value");
    return;
  }

  if (checkIfPalindrome(textInput.value)) {
    result.textContent = `${textInput.value} is a palindrome`;
  } else {
    result.textContent = `${textInput.value} is not a palindrome`;
  }
});

const checkIfPalindrome = (str) => {
  const formattedStr = str
    .toLowerCase()
    .split("")
    .filter((c) => /[a-z0-9]/g.test(c));
  return formattedStr.join("") === formattedStr.reverse().join("");
};
