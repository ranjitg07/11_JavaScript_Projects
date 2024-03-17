// Todo Script

let input = document.getElementById("taskInput");
let btn_add = document.querySelector(".add");
let ul = document.getElementById("taskList");

btn_add.addEventListener("click", addTask);

function addTask() {
  let taskText = input.value.trim();
  if (taskText !== "") {
    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "delete";
    deleteBtn.onclick = function () {
      li.remove();
    };

    li.appendChild(deleteBtn);
    ul.appendChild(li);

    input.value = "";
  }
}

// BMI - Calculator Script

let bmiBtn = document.querySelector('.btn-calc')

bmiBtn.addEventListener('click', calculateBMI)

function calculateBMI(){
    let weight = document.getElementById('weight').value;
    let height = document.getElementById('height').value;

    let bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

    let bmiResult = "Your BMI is: " + bmi;
    if(bmi < 18.5) {
        bmiResult += "(UnderWeight)"
    } else if(bmi >= 18.5 && bmi < 25){
        bmiResult += "(NormalWeight)"
    } else if(bmi >= 25 && bmi < 30){
        bmiResult += "(OverWeight)"
    } else if(bmi >= 30 && bmi < 40){
        bmiResult += "(Obese)"
    }
    document.getElementById('bmi-result').innerText = bmiResult;
}

// Copy Clipboard Script

function copyText() {
  let textToCopy = document.getElementById("textToCopy").value;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Copied to clipboard');
  }).catch((error) => {
    console.error('Unable to copy text: ', error);
  });
}


// Quote-Generator Script


// Password-Generator Script


// Digital-Clock Script


// QR-Code Script


// Drawing-App Script


// Weather-App Script


// Recipe-Finder Script