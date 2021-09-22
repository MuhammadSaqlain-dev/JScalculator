window.onload = () => {
  var number = document.querySelectorAll(".numbers div");
  var input = document.getElementById("input");
  var operator = document.querySelectorAll(".operators div");
  var result = document.getElementById("result");
  var clear = document.getElementById("clear");
  var displayResult = false;

  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
      if (displayResult) {
        input.innerHTML = e.currentTarget.innerHTML;
        displayResult = false;
      } else {
        input.innerHTML += e.currentTarget.innerHTML;
        displayResult = false;
      }
    });
  }

  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
      var currentStr = input.innerHTML;
      var lastChar = currentStr[currentStr.length - 1];
      if (
        lastChar === "÷" ||
        lastChar === "×" ||
        lastChar === "+" ||
        lastChar === "-"
      ) {
        var cloneStr = currentStr.slice(0, currentStr.length - 1);
        input.innerHTML = cloneStr + e.currentTarget.innerHTML;
      } else if (input.innerHTML === "") {
        console.log("Enter a number first!");
      } else {
        input.innerHTML += e.currentTarget.innerHTML;
        displayResult = false;
      }
    });
  }

  result.addEventListener("click", function (e) {
    var inputStr = input.innerHTML;

    var numbersArray = inputStr.split(/\+|\-|\×|\÷/g);
    console.log(numbersArray);

    var operatorsArray = inputStr.replace(/[0-9]|\./g, "").split("");
    console.log(operatorsArray);

    console.log("--------------------------");

    // Divide, Multiply, Add, Subtract
    var divideIndex = operatorsArray.indexOf("÷");
    while (divideIndex !== -1) {
      numbersArray.splice(
        divideIndex,
        2,
        (numbersArray[divideIndex] / numbersArray[divideIndex + 1]).toString()
      );
      operatorsArray.splice(divideIndex, 1);
      divideIndex = operatorsArray.indexOf("÷");
    }

    var multiplyIndex = operatorsArray.indexOf("×");
    while (multiplyIndex !== -1) {
      numbersArray.splice(
        multiplyIndex,
        2,
        (
          numbersArray[multiplyIndex] * numbersArray[multiplyIndex + 1]
        ).toString()
      );
      operatorsArray.splice(multiplyIndex, 1);

      multiplyIndex = operatorsArray.indexOf("×");
    }

    var subtractIndex = operatorsArray.indexOf("-");
    while (subtractIndex !== -1) {
      numbersArray.splice(
        subtractIndex,
        2,
        (
          numbersArray[subtractIndex] - numbersArray[subtractIndex + 1]
        ).toString()
      );
      operatorsArray.splice(subtractIndex, 1);

      subtractIndex = operatorsArray.indexOf("-");
    }

    var addIndex = operatorsArray.indexOf("+");
    while (addIndex !== -1) {
      numbersArray.splice(
        addIndex,
        2,
        (
          parseFloat(numbersArray[addIndex]) +
          parseFloat(numbersArray[addIndex + 1])
        ).toString()
      );
      operatorsArray.splice(addIndex, 1);

      addIndex = operatorsArray.indexOf("+");
    }

    displayResult = true;
    input.innerHTML = numbersArray[0];
    console.log(numbersArray);
  });

  clear.addEventListener("click", function () {
    input.innerHTML = "";
    displayResult = false;
  });
};
