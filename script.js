const num_buttons = document.querySelectorAll(".num_button");
const op_buttons = document.querySelectorAll(".operator_button");
const equal_button = document.querySelector(".equal");
const display_expression = document.querySelector(".display")
const clear_button = document.querySelector(".clear");
const delete_button = document.querySelector(".delete");
const dot = document.querySelector(".dot_button");
const minus_plus = document.querySelectorAll(".mp");

// variables for each of the parts of a calculator operation
display_expression.textContent = "0";
let num_1;
let num_2;
let operator;

// add
function add(a, b) {
    return a + b;
}

// subtract
function subtract(a, b) {
    return a - b;
}

// multiply
function multiply(a, b) {
    return a * b;
}

// divide
function divide(a, b) {
    return a / b;
}

// function operate that takes an operator and 2 numbers and then calls one of 
// the above functions on the numbers.
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if (num2 == 0) {
                return "Can't divide by 0";
            }
            return divide(num1, num2);
        default:
            console.log("ERROR");
            return NaN;
    }
}

// functions that populate the display when you click the 
// number buttons. You should be storing the ‘display value’ in a variable
let storedNumber = "";
let firstNum = "";
let operatorValue = "";

// Buttons that adds numbers to expression
num_buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display_expression.textContent == "Can't divide by 0") {
            storedNumber = button.value;
        } else { 
            storedNumber += button.value;
        }

        display_expression.textContent = storedNumber;
    });
});

// Buttons that adds operators to expression
op_buttons.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (operatorValue != "") {
            const result = operate(firstNum, parseFloat(storedNumber), operatorValue);
            display_expression.textContent = result;
            storedNumber = result;
            operatorValue = "";
        }
        firstNum = parseFloat(storedNumber);
        operatorValue = operator.value;
        console.log(`First number: ${firstNum}, Operator: ${operatorValue}`);
        storedNumber = "";
    });
});

// Button that calculates expression
equal_button.addEventListener('click', () => {
    const result = operate(firstNum, parseFloat(storedNumber), operatorValue);
    display_expression.textContent = result;
    storedNumber = result;
    operatorValue = "";
});




// Button that clears the display
clear_button.addEventListener("click", () => {
    display_expression.textContent = "0"
    storedNumber = "";
    firstNum = "";
    operatorValue = "";
});

// Button that delete last element on the display
delete_button.addEventListener("click", () => {
    display_expression.textContent = display_expression.textContent.slice(0, -1);
    if (display_expression.textContent.length == 0) {
        display_expression.textContent = "0"
    }
    storedNumber = display_expression.textContent;
})

// function that calculate
const calculate = function(first_num, second_num, operator) {
    return operate(parseFloat(first_num), parseFloat(second_num), operator)
}

// Button that adds dot to number
dot.addEventListener("click", () => {
    if (!display_expression.textContent.includes(".")) {
        storedNumber += "."
        display_expression.textContent += ".";
    }
})

