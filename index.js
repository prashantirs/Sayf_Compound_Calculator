let initialSlider = document.getElementById("initialSlider");
let autoSlider = document.getElementById("autoSlider");
let lengthSlider = document.getElementById("lengthSlider");

let initialValue = document.getElementById("initialValue");
let autoValue = document.getElementById("autoValue");
let lengthValue = document.getElementById("lengthValue");

let totalValue = document.getElementById("totalValue");

let durationMenu = document.querySelectorAll("input.duration");

let partnerCheckbox = document.querySelector("input.partner");
let roundUpCheckbox = document.querySelector("input.roundup");

let interest = 9;
let timeInterval = lengthSlider.value;

durationMenu.forEach(
  (item) =>
    (item.oninput = function (e) {
      timeInterval = parseInt(e.target.value);
      resetCalculator();
    })
);

roundUpCheckbox.addEventListener("click", () => {
  resetCalculator();
  console.log("ASD");
});

partnerCheckbox.addEventListener("click", () => {
  resetCalculator();
});

function resetCalculator() {
  initialValue.textContent = "₹" + initialSlider.value;
  autoValue.textContent = "₹" + autoSlider.value;
  lengthValue.textContent = `${lengthSlider.value} ${
    lengthSlider.value > 1 ? "years" : "year"
  }`;

  let ans = sip(autoSlider.value, interest, lengthSlider.value);

  if (partnerCheckbox.checked)
    ans += compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1);

  if (roundUpCheckbox.checked) ans += roundUpSpare();

  totalValue.textContent = `₹ ${ans.toFixed(2)}`;
}

// Compound Interest Calculator
const compoundInterest = (p, l, r, n) => {
  let amount =
    ((p / 25) * (Math.pow(1.0075, 12 * l) - 1) * 1.0075) / (9 / 1200);
  return amount;
};

const sip = (p, r, l) => {
  console.log(l);
  let amount = (p * (Math.pow(1.00025, 365 * l) - 1) * 1.00025) / 0.00025;
  return amount;
};

const roundUpSpare = () => {
  let amount =
    (600 * (Math.pow(1.0075, 12 * lengthSlider.value) - 1) * 1.0075) /
    (9 / 1200);

  return amount;
};

initialSlider.oninput = function () {
  initialValue.textContent = "₹" + initialSlider.value;
  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};

autoSlider.oninput = function () {
  autoValue.textContent = "₹" + autoSlider.value;
  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};

lengthSlider.oninput = function () {
  lengthValue.textContent = `${lengthSlider.value} ${
    lengthSlider.value > 1 ? "years" : "year"
  }`;

  let ans = sip(autoSlider.value, interest, lengthSlider.value);

  if (partnerCheckbox.checked)
    ans += compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1);

  if (roundUpCheckbox.checked) ans += roundUpSpare();

  totalValue.textContent = `₹ ${ans.toFixed(2)}`;
};

resetCalculator();
