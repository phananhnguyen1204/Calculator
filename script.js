class Calculator {
  constructor(previousOutputEl, currentOutputEl) {
    this.previousOutputEl = previousOutputEl;
    this.currentOutputEl = currentOutputEl;
    this._clear();
  }

  _clear() {
    this.previousOutput = "";
    this.currentOutput = "";
    this.operation = undefined;
  }

  _delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  _appendNumber(number) {
    //Does not append . if . already exist
    if (number === "." && this.currentOutput.includes(".")) return;
    //otherwise append numbers
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  _chooseOperation(operation) {
    //choose operation before choose any number
    if (this.currentOutput === "") return;
    //otherwise
    if (this.previousOutput != "") {
      this._compute();
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  _compute() {
    //result of the computation
    let computation;
    const prev = parseFloat(this.previousOutput);
    const curr = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
    }
    this.currentOutput = computation;
    this.previousOutput = "";
    this.operation = undefined;
  }

  _getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("em", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  _updateDisplay() {
    this.currentOutputEl.innerText = this._getDisplayNumber(this.currentOutput);
    if (this.operation != null) {
      this.previousOutputEl.innerText = `${this._getDisplayNumber(
        this.previousOutput
      )} ${this.operation}`;
    } else {
      this.previousOutputEl.innerText = this._getDisplayNumber(
        this.previousOutput
      );
    }
  }
}

const numberBtns = document.querySelectorAll("[data__number]");
const operationBtns = document.querySelectorAll("[data__operation]");
const equalBtn = document.querySelector("[data__equal]");
const deleteBtn = document.querySelector("[data__delete]");
const allClearBtn = document.querySelector("[data__allClear]");
const previousOutputEl = document.querySelector("[data__output--previous]");
const currentOutputEl = document.querySelector("[data__output--current]");

const calculator = new Calculator(previousOutputEl, currentOutputEl);

//Add EventListener to numberButtons
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator._appendNumber(btn.innerText);
    calculator._updateDisplay();
  });
});

//Add EventListener to Operation Buttons
operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator._chooseOperation(btn.innerText);
    calculator._updateDisplay();
  });
});

//Add EventListener to Equal Buttons
equalBtn.addEventListener("click", (btn) => {
  calculator._compute();
  calculator._updateDisplay();
});

//Add EventListener to ClearAll Buttons
allClearBtn.addEventListener("click", function () {
  calculator._clear();
  calculator._updateDisplay();
});

//Add EventListener to Delete Buttons
deleteBtn.addEventListener("click", function () {
  calculator._delete();
  calculator._updateDisplay();
});
