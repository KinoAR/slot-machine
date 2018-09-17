const getById = (id) => document.getElementById(id);
const selectElement = (array) => array[Math.floor(Math.random() * array.length)];
const updateMoneyAmount = (amount) => getById("moneyAmount").textContent = `You have ${amount}$`;
const basePath = 'public/';
const imageNames = [
  "grape",
  "cherry",
  "heart",
  "num7",
  "lemon",
  "orange",
  "strawberry"
];

var moneyAmount = 50;
var betAmount = 0;

function spin() {
  if (moneyAmount < betAmount) {
    alert(`Invalid bet amount, you do not have enough money to bet ${betAmount}$`);
  } else {
    const slotOne = getById("slotOne");
    const slotTwo = getById("slotTwo");
    const slotThree = getById("slotThree");
    slotOne.src = `${basePath}${selectElement(imageNames)}.png`;
    slotTwo.src = `${basePath}${selectElement(imageNames)}.png`
    slotThree.src = `${basePath}${selectElement(imageNames)}.png`;
    checkWinner();
  }
}

function setBetAmount(event) {
  betAmount = parseInt(event.target.dataset.betAmount);
}

function checkWinner() {
  const slotValues = [
    getById("slotOne"),
    getById("slotTwo"),
    getById("slotThree")
  ].map(value => value.src);
  const initialValue = slotValues[0];
  if (moneyAmount > 0) {
    if (slotValues.every(value => value === initialValue)) {
      alert("Congratulations! You hit the jackpot!");
      moneyAmount = moneyAmount + 15 * betAmount;
      updateMoneyAmount(moneyAmount);
    } else {
      moneyAmount = moneyAmount - betAmount;
      updateMoneyAmount(moneyAmount)
    }
  } else {
    alert("You lost all your money!");
  }
}

window.onload = () => {
  [
    getById("oneDollarBet"),
    getById("threeDollarBet"),
    getById("tenDollarBet")
  ].forEach(element => {
    element.addEventListener('click', setBetAmount, false);
  })
  updateMoneyAmount(moneyAmount);
};