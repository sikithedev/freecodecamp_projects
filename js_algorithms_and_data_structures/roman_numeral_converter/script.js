const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {
  convertToRoman(number.value);
});

const romanToArabic = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const convertToRoman = (number) => {
  number = parseInt(number);
  if (isNaN(number)) {
    output.textContent = "Please enter a valid number";
  } else if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
  } else if (number > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
  } else {
    output.textContent = calculateRoman(number);
  }
};

const calculateRoman = (arabic) => {
  let roman = "";

  for (const [key, value] of Object.entries(romanToArabic)) {
    console.log(key, value);
    while (arabic >= value) {
      arabic -= value;
      roman += key;
    }
  }

  return roman;
};
