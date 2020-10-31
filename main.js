$(document).ready(function () {

  var calcStr = ""; // main display
  var histStr = ""; // history display
  var total = ""; // running total
  var visible = false; //main display
  var dpoint_active = true; // able to create decimal
  var oper_active = true; // able to use operator

  //get data when calculator key is clicked
  document.getElementById('keypad').addEventListener('click', getKey);

  function getKey(k) {
    var key = k.target.id;
    switch (key) {
      case 'zero': key = 0;
        break;
      case 'one': key = 1;
        break;
      case 'two': key = 2;
        break;
      case 'three': key = 3;
        break;
      case 'four': key = 4;
        break;
      case 'five': key = 5;
        break;
      case 'six': key = 6;
        break;
      case 'seven': key = 7;
        break;
      case 'eight': key = 8;
        break;
      case 'nine': key = 9;
        break;
    }
    compute(key);
  }

  //display and calulate
  function displayIt(display, history) {
    document.getElementById("display").innerHTML = display;
    document.getElementById("history").innerHTML = history;
  }

  function calcIt(show, func) {
    calcStr += show;
    histStr += show;
    total += func;
    displayIt(calcStr, histStr);
  }

  function deleteOne() {
    calcStr = calcStr.slice(0, -1);
    histStr = histStr.slice(0, -1);
    total = total.slice(0, -1);
    displayIt(calcStr, histStr);
  }

  function compute(data) {
    //NUMBERS
    if (calcStr === "" && data === 0) {
      return 0;
    }

    if (data >= 0 && data <= 9) {
      if (visible) {
        calcStr = "";
        histStr = ""
        total = "";
        visible = false;
      }

      oper_active = true;
      calcIt(data, data);
    }

    //DECIMAL
    if (data == "decimal") {
      if (dpoint_active === false) {
        return 0;
      }
      if (visible || calcStr == 0 || histStr == 0) {
        calcStr = "0.";
        histStr = "0.";
        total = "0.";
        visible = false;
        displayIt(calcStr, histStr);
        dpoint_active = false;
      } else {
        calcIt(".", ".");
        dpoint_active = false;
      }
    }

    //OPERATORS
    if (data == "add") {
      if (total == "") {
        return 0;
      }
      if (oper_active == false) {
        deleteOne();
      }
      visible = false;
      dpoint_active = true;
      calcIt("+", "+");
      oper_active = false;
    }
    if (data == "subtract") {
      if (total == "") {
        return 0;
      }
      if (oper_active == false) {
        deleteOne();
      }
      visible = false;
      dpoint_active = true;
      calcIt("-", "-");
      oper_active = false;
    }
    if (data == "multiply") {
      if (total == "") {
        return 0;
      }
      if (oper_active == false) {
        deleteOne();
      }
      visible = false;
      dpoint_active = true;
      oper_active = false;
      calcIt("x", "*");
    }
    if (data == "divide") {
      if (total == "") {
        return 0;
      }
      if (oper_active == false) {
        deleteOne();
      }
      visible = false;
      dpoint_active = true;
      oper_active = false;
      calcIt("/", "/");
    }

    //EQUALS
    if (data == "equals") {
      if (total == "" || visible) {
        return 0;
      }
      visible = true;
      dpoint_active = true;
      histStr += " = \xa0" + eval(total);
      displayIt(eval(total), histStr);
      total = document.getElementById("display").innerHTML;
      calcStr = total;
    }

    //CLEAR
    if (data == "clear") {
      calcStr = "";
      histStr = "";
      total = "";
      visible = false;
      dpoint_active = true;
      displayIt("0", "0");
    }

    //DELETE
    if (data == "delete") {
      if (visible == true || calcStr == "" || calcStr.length == 1) {
        calcStr = "0";
        histStr = "0";
        displayIt(calcStr, histStr);
        return 0;
      }

      deleteOne();

    }
    //ERRORS

    if (calcStr.length > 25 || total == "NaN") {
      displayIt("Error", "0");
      return 0;
    }
    console.log("***")
    console.log(`Display ${calcStr}`);
    console.log(`History ${histStr}`);
    console.log(`Total ${total}`);
    console.log("---");

  }
});