// var video = document.getElementById('myVideo')

// // When the 'ended' event fires
// video.addEventListener('ended', function(){
//   // Reset the video to 0
//   video.currentTime = 10;
//   // And play again
//   video.play();
// });

// <!doctype html>
// <html>
// <head>
// <script>
// function add(){
// var a,b,c;
// a=Number(document.getElementById("first").value);
// b=Number(document.getElementById("second").value);
// c= a + b;
// document.getElementById("answer").value= c;
// }
// </script>
// </head>
// <body>
// Enter the First number : <input id="first">
// Enter the Second number: <input id="second">
// <button onclick="add()">Add</button>
// <input id="answer">
// </body>
// </html>
// let a,b,c=0
//  a=parseInt(document.getElementById("cal-principle").value);
//  b=parseInt(document.getElementById("cal-rate").value);
//  c=parseInt(document.getElementById("cal-time").value);
//  let res=a+b+c;
//  console.log(res);
//  (document.getElementById("answer").value)= res;

var principle = document.getElementById("cal-principle");
var rate = document.getElementById("cal-rate");
var time = document.getElementById("cal-time");

function compound_intrest() {
  var first_number = parseFloat(principle.value);
  if (isNaN(first_number)) first_number = 0;
  var second_number = parseFloat(rate.value);
  if (isNaN(second_number)) second_number = 0;
  var third_number = parseFloat(time.value);
  if (isNaN(third_number)) third_number = 0;
  //    var result = (first_number *(Math.pow((1+(second_number/100)),(third_number))))-first_number;
  var result = first_number * Math.pow(1 + second_number / 100, third_number);
  var result = Math.round(result);
  document.getElementById("txtresult").value = result;
}

// Calculator

let initialSlider = document.getElementById("initialSlider");
let autoSlider = document.getElementById("autoSlider");
let lengthSlider = document.getElementById("lengthSlider");

let initialValue = document.getElementById("initialValue");
let autoValue = document.getElementById("autoValue");
let lengthValue = document.getElementById("lengthValue");

let totalValue = document.getElementById("totalValue");

let interest = 12;
let timeInterval = 12;

// Compound Interest Calculator
const compoundInterest = (p, t, r, n) => {
  const amount = p * Math.pow(1 + r / n, n * t);
  return amount;
};

const sip = (p, r, n) => {
  let i = r / (100 * n);
  const amount = p * (1 + i) * ((Math.pow(1 + i, n) - 1) / i);
  return amount;
};

initialValue.textContent = "₹" + initialSlider.value;
autoValue.textContent = "₹" + autoSlider.value;
totalValue.textContent =
  "₹ " +
  compoundInterest(initialSlider.value, lengthSlider.value, 0.052, 1).toFixed(
    2
  );

lengthValue.textContent = `${lengthSlider.value} ${
  lengthSlider.value > 1 ? "years" : "year"
}`;

initialSlider.oninput = function () {
  initialValue.textContent = "₹" + initialSlider.value;
  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.052, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};

autoSlider.oninput = function () {
  autoValue.textContent = "₹" + autoSlider.value;
  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.052, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};

lengthSlider.oninput = function () {
  lengthValue.textContent = `${lengthSlider.value} ${
    lengthSlider.value > 1 ? "years" : "year"
  }`;

  totalValue.textContent = `₹ ${(
    compoundInterest(initialSlider.value, lengthSlider.value, 0.052, 1) +
    sip(autoSlider.value, interest, timeInterval)
  ).toFixed(2)}`;
};
