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
      let copiedMsg = document.getElementById('copiedMsg');
      copiedMsg.innerText = 'Copied to clipboard';
      copiedMsg.style.paddingTop = '20px';
      document.getElementById("textToCopy").value = '';
  }).catch((error) => {
      console.error('Unable to copy text: ', error);
  });
}

document.getElementById('textToCopy').addEventListener('input', function() {
  document.getElementById('copiedMsg').innerText = '';
  copiedMsg.style.paddingTop = '';
});


// Quote-Generator Script

let quoteShown = document.querySelector('.quote');
let generateQuote = document.querySelector('.quoteBtn');
let Author = document.querySelector('.author');
let num = 0;
let quote = [];

fetch('https://type.fit/api/quotes')
.then(response => {
  return response.json();
}).then(data => {
  quote = data;
}).catch(err => {
  console.log('fetch error:', err);
})

generateQuote.addEventListener('click', () =>{
  num++;
  quoteShown.innerText = quote[num].text;
  Author.innerText = '~' + quote[num].author;
})

// Password-Generator Script

function generatePassword(){
  let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
  let password = "";
  for(let i = 0; i < 12; i++){
    let random = Math.floor( Math.random() * char.length ) ;
    password += char[random];
  }
  document.getElementById('passOutput').textContent = password;
}

function copyPassword() {
  let textCopy = document.getElementById("passOutput").innerText;
  navigator.clipboard.writeText(textCopy).then(() => {
    let copyMsg = document.getElementById('copiedPass');
    copyMsg.innerText = 'Copied to clipboard';
    copyMsg.style.display = 'block';
    copyMsg.style.paddingTop = '20px';
    setTimeout(() => { // Clear the message after 2 seconds
      copyMsg.style.display = 'none';
    }, 2000);
  }).catch((error) => {
    console.error('Unable to copy text: ', error);
  });
}


// Digital-Clock Script


// QR-Code Script


// Drawing-App Script


// Weather-App Script


// Recipe-Finder Script