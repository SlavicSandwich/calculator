const buttons = document.querySelectorAll(".button");
const current = document.querySelector('#current');
const expression = document.querySelector('#expression')


window.addEventListener("keydown", handleKeyPress);


buttons.forEach((button) => {
  if (isNumeric(button.textContent)) {
    button.addEventListener("click", handleNum);
  }

  if (button.textContent == "AC") {
    button.addEventListener("click", handleClear);
  }
  if (button.textContent == ".") {
    button.addEventListener("click", handleDot);
  }
  if ("%÷+-X".includes(button.textContent)) {
    button.addEventListener("click", handleOperators);
  }
  if (button.textContent == "C") {
    button.addEventListener("click", handleDelete);
  }
  if (button.textContent == "=") {
    button.addEventListener("click", handleEquals);
  }
});


function isNumeric(char){
  if (char >= '0' && char <= '9') return true;
  return false;
}

function handleKeyPress(e){
  // console.log([e.shiftKey, e.key])
  // console.log(document.getElementById(`${e.key}`).textContent)
  button = document.getElementById(`${e.key}`);
  if (button) button.click()
}

function handleCalculation(exp){
    let first_num ="";
    let second_num = "";
    let operator;

    expression_arr = exp.split(' ');
    first_num = expression_arr[0];
    second_num = expression_arr[2];
    operator = expression_arr[1];

    if((operator == "÷" || operator == "") && second_num == 0){
      return "Bruh"
    }

    decimal_count_first = countDecimals(+first_num);
    decimal_count_second = countDecimals(+second_num);
    to_fix = (decimal_count_first > decimal_count_second)? decimal_count_first: decimal_count_second;
    switch (operator){
        case '%':{
            return (+first_num % +second_num);
        }
        case '÷':{
            return (+first_num / +second_num);
        }
        case '+':{
            return (+first_num + +second_num).toFixed(to_fix);
        }
        case '-':{
            return (+first_num - +second_num).toFixed(to_fix);
        }
        case 'X':{
            return (+first_num * +second_num).toFixed(decimal_count_first + decimal_count_second);
        }

    }
}

var countDecimals = function (value) {
  // console.log(Math.floor(value));
  if(Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0; 
}

var checkBruh = function(){
  if (current.textContent == "Bruh"){
    current.textContent = "";
    expression.textContent = "";
    return true;
  }
  return false;
}

function handleNum(e) {

  if (checkBruh()) return;
  // console.log(e.target.textContent);
  if (expression.textContent[expression.textContent.length - 1] == '='){
    expression.textContent = "";
    current.textContent = "";
  }
  if (current.textContent == "0" || "%÷+-X".includes(current.textContent)) 
    current.textContent = "";
  current.textContent += e.target.textContent;
}

function handleClear(e) {
  console.log(e.target.textContent);
  expression.textContent = "";
  current.textContent = "0";
}

function handleDot(e) {
  if (checkBruh()) return;
  // console.log(e.target.textContent);
  if (!(current.textContent.includes('.'))){current.textContent +="."};
}

function handleOperators(e) {
  if (checkBruh()) return;
  // console.log(e.target.textContent);
  if (expression.textContent == "" || expression.textContent[expression.textContent.length - 1] == "="){
    expression.textContent = current.textContent + " " + e.target.textContent;
    current.textContent = "0"; 
  }
  else{
    expression.textContent += current.textContent;
    current.textContent = handleCalculation(expression.textContent);
    expression.textContent = current + " "+ e.target.textContent;
  }
}

function handleDelete(e) {
  if (checkBruh()) return;
  // console.log(e.target.textContent);
  if (current.textContent == "0")return;
  current.textContent = current.textContent.slice(0,-1);
}

function handleEquals(e) {
  if (checkBruh()) return;
  // console.log(e.target.textContent);
  expression.textContent += " " + current.textContent + " =";
  current.textContent = handleCalculation(expression.textContent);
}
