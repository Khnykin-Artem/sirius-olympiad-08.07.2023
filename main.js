"use strict";

const form = document.forms[0];
const { weight, height } = form.elements;
const calculateButton = document.getElementById("calculate");
const result = document.getElementById("result");
const selectMenu = document.getElementById("lang");

let massOfHeightText1 = "Выраженный дефицит массы тела";
let massOfHeightText2 = "Недостаточная (дефицит) масса тела";
let massOfHeightText3 = "Норма";
let massOfHeightText4 = "Избыточная масса тела (предожирение)";
let massOfHeightText5 = "Ожирение 1 степени";
let massOfHeightText6 = "Ожирение 2 степени";
let massOfHeightText7 = "Ожирение 3 степени";

let resultText = (I, massOfHeight) => `
Ваш ИМТ ${I},${massOfHeight} - значение колонки «Соответствие между массой человека и его ростом»
`;

let validationErrorMessage = "Ошибка валидации!";

selectMenu.addEventListener("change", (event) => {
  const language = event.target.value;

  switch (language) {
    case "eng":
      document.getElementById("weight").innerHTML = "Weight in kilograms:";
      document.getElementById("height").innerHTML = "Height in centimeters:";
      document.getElementById("calculate").innerHTML = "Calculate BMI";

      massOfHeightText1 = "Severe underweight";
      massOfHeightText2 = "Insufficient (deficit) body weight";
      massOfHeightText3 = "Norm";
      massOfHeightText4 = "Overweight (preobesity)";
      massOfHeightText5 = "Obesity 1 degree";
      massOfHeightText6 = "Obesity 2 degrees";
      massOfHeightText7 = "Obesity 3 degrees";

      resultText = (I, massOfHeight) => `
      Your BMI ${I},${massOfHeight} - the value of the column "Correspondence between a person's mass and his height"
`;

      validationErrorMessage = "Validation error!";
      break;
    case "ru":
      document.getElementById("weight").innerHTML = "Вес в килограммах:";
      document.getElementById("height").innerHTML = "Рост в сантиметрах:";
      document.getElementById("calculate").innerHTML = "Рассчитать ИМТ";

      massOfHeightText1 = "Выраженный дефицит массы тела";
      massOfHeightText2 = "Недостаточная (дефицит) масса тела";
      massOfHeightText3 = "Норма";
      massOfHeightText4 = "Избыточная масса тела (предожирение)";
      massOfHeightText5 = "Ожирение 1 степени";
      massOfHeightText6 = "Ожирение 2 степени";
      massOfHeightText7 = "Ожирение 3 степени";

      resultText = (I, massOfHeight) => `
Ваш ИМТ ${I},${massOfHeight} - значение колонки «Соответствие между массой человека и его ростом»
`;

      validationErrorMessage = "Ошибка валидации!";
      break;
  }
});

function validation(m, h) {
  const mLength = String(m).length;
  const hLength = String(h)?.length;

  const mIsNumber = !isNaN(m);
  const hIsNumber = !isNaN(h);

  const mFloatLength = String(m).split(".")[1]?.length;

  if (!mIsNumber) {
    return false;
  }

  if (!hIsNumber) {
    return false;
  }

  if (mLength < 1 || mLength > 5) {
    return false;
  }

  if (hLength < 1 || hLength > 5) {
    return false;
  }

  if (mFloatLength > 1) {
    return false;
  }

  if (+h <= 0) {
    return false;
  }

  return true;
}

calculateButton.addEventListener("click", () => {
  const m = weight.value;
  const h = height.value / 100;

  if (validation(m, h)) {
    const I = (m / h ** 2).toFixed(2);
    let massOfHeight = null;

    if (I < 16) {
      massOfHeight = massOfHeightText1;
    } else if (I >= 16 && I < 18.5) {
      massOfHeight = massOfHeightText2;
    } else if (I >= 18.5 && I < 25) {
      massOfHeight = massOfHeightText3;
    } else if (I >= 25 && I < 30) {
      massOfHeight = massOfHeightText4;
    } else if (I >= 30 && I < 35) {
      massOfHeight = massOfHeightText5;
    } else if (I >= 35 && I < 40) {
      massOfHeight = massOfHeightText6;
    } else if (I >= 40) {
      massOfHeight = massOfHeightText7;
    }

    result.classList.add("result-active");
    result.innerHTML = resultText(I, massOfHeight);
  } else {
    alert(validationErrorMessage);
  }
});
