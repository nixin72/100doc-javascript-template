window.addEventListener("load", function () {
  let memory = 0;
  let lastValue = 0;
  let currValue = "";
  let currOperation = null;

  let numKeys = document.querySelectorAll(".num");
  for (let i = 0; i < numKeys.length; i++) {
    numKeys[i].addEventListener("click", function (event) {
      setCurrentValue(event.target.innerText);
      setText();
    });
  }

  let unaryKeys = document.querySelectorAll(".unary");
  for (let i = 0; i < unaryKeys.length; i++) {
    unaryKeys[i].addEventListener("click", function (event) {
      currOperation = event.target.innerText;
      equals();
      currOperation = null;
    });
  }

  let binaryKeys = document.querySelectorAll(".bin");
  for (let i = 0; i < binaryKeys.length; i++) {
    binaryKeys[i].addEventListener("click", function (event) {
      console.log(event.target.innerText);
      setOperation(event.target.innerText);
      highlightOperation(event.target);
    });
  }

  document.querySelector(".clear").addEventListener("click", function (event) {
    lastValue = "";
    currValue = "";
    currOperation = null;
    highlightOperation(null);
    clear();
  });

  document.querySelector(".eq").addEventListener("click", function () {
    equals();
  });

  let mem = document.getElementsByClassName("mem");
  for (let i = 0; i < mem.length; i++) {
    mem[i].addEventListener("click", function (event) {
      switch (event.target.innerText) {
        case "m+": memory += currValue; break;
        case "m-": memory -= currValue; break;
        case "mc": memory = 0; break;
        case "mr": currValue = memory.toString(); break;
      }
      setText();
    })
  }

  document.getElementById("toggle").addEventListener("click", function (event) {
    let el = document.getElementById("science");
    let hidden = el.classList.value == "hide"
    if (hidden) {
      el.classList.remove("hide");
      event.target.innerText = "⇥"
    }
    else {
      el.classList.add("hide");
      event.target.innerText = "⇤"
    }
  });

  function setCurrentValue (val) {
    switch (val) {
      case "e": currValue = Math.E; break;
      case "\u03C0": currValue = Math.PI; break;
      case "Rand": currValue = Math.random(); break;
      default: {
        currValue += val;
      }
    }
  }

  function setText () {
    console.log(currValue);
    document.getElementById("display").innerText = currValue;
  }

  function setOperation (operation) {
    currOperation = operation;
    lastValue = currValue;
    currValue = "";
    clear();
  }

  function highlightOperation (target) {
    document.querySelectorAll(".operation").forEach(el => el.classList.remove("operation"));
    if (target != undefined)
      target.classList.add("operation");
  }

  function clear () {
    document.getElementById("display").innerText = "0";
  }

  function equals () {
    let newValue;
    lastValue = parseFloat(lastValue);
    currValue = parseFloat(currValue);

    console.log(lastValue, currValue, currOperation);

    switch (currOperation) {
      case "\u00B1": newValue = -currValue; break;
      case "%": newValue = currValue / 100; break;
      case "+": newValue = currValue + lastValue; break;
      case "\u2212": newValue = lastValue - currValue; break;
      case "\u00D7": newValue = lastValue * currValue; break;
      case "\u00F7": newValue = lastValue / currValue; break;

      case "exp": newValue = lastValue ** currValue; break;
      case "neg": newValue = currValue * -1; break;

      case "x2": newValue = currValue ** 2; break;
      case "x3": newValue = currValue ** 3; break;
      case "xy": newValue = lastValue ** currValue; break;
      case "ex": newValue = Math.exp(currValue); break;
      case "10x": newValue = 10 ** currValue; break;

      case "sin": newValue = Math.sin(currValue); break;
      case "cos": newValue = Math.cos(currValue); break;
      case "tan": newValue = Math.tan(currValue); break;
      case "sinh": newValue = Math.sinh(currValue); break;
      case "cosh": newValue = Math.cosh(currValue); break;
      case "tanh": newValue = Math.tanh(currValue); break;
      default: {
        console.log("default", currOperation)
      }
    }

    currValue = newValue;
    setText();
  }
});
