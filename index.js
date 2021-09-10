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
let timeInterval = 12;

durationMenu.forEach(
  (item) =>
    (item.oninput = function (e) {
      timeInterval = parseInt(e.target.value);
      resetCalculator();
    })
);

roundUpCheckbox.addEventListener("click", () => {
  resetCalculator();
});

partnerCheckbox.addEventListener("click", () => {
  roundUpCheckbox.click();
  resetCalculator();
});

function resetCalculator() {
  initialValue.textContent = "₹" + initialSlider.value;
  autoValue.textContent = "₹" + autoSlider.value;
  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;

  lengthValue.textContent = `${lengthSlider.value} ${
    lengthSlider.value > 1 ? "years" : "year"
  }`;
}

// Compound Interest Calculator
const compoundInterest = (p, t, r, n) => {
  if (partnerCheckbox.checked) r = 0.04;
  const amount = p * Math.pow(1 + r / n, n * t);
  return amount;
};

const sip = (p, r, n) => {
  if (partnerCheckbox.checked) r = 4;
  let i = r / (100 * n);
  const amount = p * (1 + i) * ((Math.pow(1 + i, n) - 1) / i);
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

  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.09, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};

resetCalculator();
