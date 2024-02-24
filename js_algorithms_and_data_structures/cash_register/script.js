let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currency = {
  PENNY: 0.01,
  NICKLE: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
  const cash = Number(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let remainingChange = cash - price;
  const change = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const currentCurrency = currency[cid[i][0]];
    let currentCid = cid[i][1];
    let count = 0;

    while (
      remainingChange >= currentCurrency &&
      currentCid >= currentCurrency
    ) {
      currentCid = round2(currentCid - currentCurrency);
      remainingChange = round2(remainingChange - currentCurrency);
      count++;
    }

    if (count === 0) continue;

    cid[i][1] -= count * currentCurrency;
    change.push([cid[i][0], count * currentCurrency]);
  }

  displayStatus(remainingChange, change);
});

const displayStatus = (remainingChange, change) => {
  if (remainingChange === 0) {
    let statusText = checkIfClosed(cid) ? "Status: CLOSED\n" : "Status: OPEN\n";

    change.forEach((item) => {
      statusText += `${item[0]}: $${item[1]}\n`;
    });
    changeDue.innerText = statusText;
  } else if (remainingChange > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  }
};

const round2 = (number) => {
  return Math.round(number * 100) / 100;
};

const checkIfClosed = (cid) => {
  return cid.every((item) => item[1] === 0);
};
