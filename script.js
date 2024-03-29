// Todo Script




// let input = document.getElementById("taskInput");
// let btn_add = document.querySelector(".addTask");
// let ul = document.getElementById("taskList");

// btn_add.addEventListener("click", addTask);

// function addTask() {
//   let taskText = input.value.trim();
//   if (taskText !== "") {
//     let li = document.createElement("li");
//     li.textContent = taskText;

//     let deleteBtn = document.createElement("button");
//     deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
//     deleteBtn.className = "delete";
//     deleteBtn.onclick = function () {
//       li.remove();
//     };

//     li.appendChild(deleteBtn);
//     ul.appendChild(li);

//     input.value = "";
//   }
// }

// Calculator Script

const display = document.getElementById('display')

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = '';
}

function calculate(){
    display.value = eval(display.value);
}

function backKey(){
// Get the current value of the display
let currentValue = display.value;
    
// Remove the last character from the display value
currentValue = currentValue.slice(0, -1);

// Update the display with the new value
display.value = currentValue;
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

const quoteText = document.querySelector('.quote'),
      authorName = document.querySelector('.authorName'),
      quoteBtn = document.getElementById('newQuote'),
      soundBtn = document.querySelector('.sound'),
      copyQuoteBtn = document.querySelector('.copy'),
      twitterBtn = document.querySelector('.twitter')
      


// random quote function
function randomQuote() {
  // added loading class to the button, so that the button won't work when clicked and loading quote msg shows.
  quoteBtn.classList.add("loading");
  quoteBtn.innerHTML = "Loading Quote...";
  // fectching random quote/ data from the API and parsing it into javascript object
  fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
    quoteText.innerText = result.content
    authorName.innerText = result.author
    quoteBtn.innerText = "New Quote";
    quoteBtn.classList.remove("loading");
  })
}

soundBtn.addEventListener("click", () => {
  // the SpeechSynthesisUtterance is a web speech api that represents a speech request
  let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
  speechSynthesis.speak(utterance);
});

copyQuoteBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerText)
    .then(() => {
      // Update button icon and color to show success
      copyQuoteBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
      // Clear the message after 2 seconds
      setTimeout(() => {
        copyQuoteBtn.innerHTML = `<i class="fas fa-copy"></i></li>`;
      }, 2000);
    })
    .catch((error) => {
      console.error('Unable to copy text: ', error);
    });
});


twitterBtn.addEventListener('click', () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, '_blank');
});


// Favorite Container
heartBtn = document.getElementById('heart-fav'),
listOfQuotes = document.getElementById('list-of-favourite-quotes'),
showListOfFavQuotes = document.getElementById('show-list'),
clearFav = document.getElementById('clear-button'),
closeFav = document.getElementById('close-fav'),
favContainer = document.querySelector('.favourite-container');

let favorites = [];
// check whetehr a quote is already in the favorites list
const checkExistingQuote = (content, quoteAuthor) => {
  return favorites.some((q) => 
  q.content === content && q.author === quoteAuthor) 
}
// Update displayed quote and author, also update heart icon class
const updateQuote = (content, quoteAuthor) => {
  quoteText.innerText = content;
  authorName.innerText = quoteAuthor;
  
  let existsInFavorites = checkExistingQuote(content, quoteAuthor);
  let heartIcon = heartBtn.firstElementChild;
  
  if (existsInFavorites) {
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid', 'active');
  } else {
    heartIcon.classList.remove('fa-solid', 'active');
    heartIcon.classList.add('fa-regular');
  }
}

// Function to handle new quote button click
const handleNewQuote = () => {
  randomQuote(); // Generate new quote
  updateQuote(quoteText.innerText, authorName.innerText); // Update quote display
}

// Add event listener for new quote button
quoteBtn.addEventListener('click', handleNewQuote);


// display favorites
const displayFavorites = () => {
  listOfQuotes.innerHTML = '';
  favorites.forEach((quote, index) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${index+1}. ${quote.content} - ${quote.authorName}`
  listOfQuotes.appendChild(listItem);
  })
}

// save favorites to local storage
const saveFavoritesToLocalStorage = () =>{
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// add to favorites
const addToFavorites = () => {
  let heartIcon = heartBtn.firstElementChild;
  // red color for heart
  heartIcon.classList.remove('fa-regular');
  heartIcon.classList.add('fa-solid', 'active');
  const content = quoteText.innerText;
  const quoteAuthor = authorName.innerText;
  let existsInFavorites = checkExistingQuote(content, quoteAuthor);
  // push to favorites array only if it doesn't already exist
  if(!existsInFavorites){
    favorites.push({
      content,
      authorName: quoteAuthor
    });
    saveFavoritesToLocalStorage();
    displayFavorites();
  }
}

// clear favorites
const clearFavorites = () => {
  localStorage.removeItem('favorites');
  favorites = [];
  displayFavorites();
  favContainer.style.display = 'none';
  listOfQuotes.style.display = 'none';
  let heartIcon = heartBtn.firstElementChild;
  // if current quote is in favorites clear the heart icon
  if(heartIcon.classList.contains('fa-solid')){
    heartIcon.classList.remove('fa-solid', 'active');
    heartIcon.classList.add('fa-regular');
  }
}

// when page loads
window.onload = () => {
  listOfQuotes.style.display = 'none';
  favContainer.style.display = 'none';
  heartBtn.addEventListener('click', addToFavorites);
  clearFav.addEventListener('click', clearFavorites);
  // get exisitng list of favorites
  let storedFavorites = localStorage.getItem('favorites');
  if(storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    displayFavorites();
  }
  // randomQuote();
}

showListOfFavQuotes.addEventListener('click', () => {
  if(favorites.length == 0){
    listOfQuotes.innerHTML = "You haven't added any quotes yet</p>";
  }
  listOfQuotes.style.display = 'block';
  favContainer.style.display = 'block';
})

// close button
closeFav.addEventListener("click", () => {
  listOfQuotes.style.display = 'none';
  favContainer.style.display = 'none';
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

let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

setInterval(() => {
  let currentTime = new Date();
  hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : '') + currentTime.getHours();
  min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : '') + currentTime.getMinutes();
  sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : '') + currentTime.getSeconds();
},1000)

// QR-Code Script

let qrText = document.getElementById('qr-input');
let qrSizes =  document.getElementById('sizes');
let generateQrBtn = document.getElementById('qrGenerateBtn');
let downlaodQrBtn = document.getElementById('qrdownloadBtn');

let qrContainer = document.querySelector('.qr-body');

generateQrBtn.addEventListener('click', (e) => {
  e.preventDefault();
  qrText.value.length > 0 ? generateQrCode() : alert('Enter the text or URL to generate the QR Code');
})

function generateQrCode() {
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: qrText.value,
    width: qrSizes.value,
    height: qrSizes.value,
    colorLight: "#fff",
    colorDark: "#000"
  })
}

downlaodQrBtn.addEventListener('click', (e) => {
  let qrImg = document.querySelector('.qr-body img')

  if(qrImg !== null){
    let imgAttr = qrImg.getAttribute('src');
    downlaodQrBtn.setAttribute("href", imgAttr);
  } else{
    // downlaodQrBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    
    alert('Please generate a QR code first.');
    e.preventDefault();
  }
})


// Drawing-App Script

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

let clearCanvasBtn = document.getElementById('clearCanvas');
let saveCanvasBtn = document.getElementById('saveCanvas');

let painting = false;

function start(e) {
  painting = true;
  draw(e);
}

function end(){
  painting = false;
  context.beginPath(); // Start a new path for the next drawing
}

function draw(e){
  if(!painting) return;

  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = 'black';

  // Use offsetX and offsetY for drawing on the canvas
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', end);
canvas.addEventListener('mousemove', draw);

clearCanvasBtn.addEventListener('click', clearCanvas);
saveCanvasBtn.addEventListener('click', saveCanvas);

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  // Convert the canvas content to a data URL
  let dataURL = canvas.toDataURL();

  // Create a temporary anchor element to trigger the download
  let a = document.createElement('a');
  a.href = dataURL;
  a.download = 'my_drawing.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Weather-App Script

// Load environment variables from .env file
require('dotenv').config();

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherIcons = {
  Clear: "./Assets/clear.png",
  Clouds: "./Assets/clouds.png",
  Rain: "./Assets/rain.png",
  Drizzle: "./Assets/drizzle.png",
  Mist: "./Assets/mist.png",
  Winter: "./Assets/snowfall.png",
  Storm: "./Assets/storm.png",
};

async function checkWeather(city) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
    document.querySelector('.wind').textContent = `${data.wind.speed} Km/h`;

    const weatherType = data.weather[0].main;
    weatherIcon.src = weatherIcons[weatherType] || "";
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});

// Recipe-Finder Script

function searchRecipe() {
  const recipeInput = document.getElementById('searchRecipe').value;
  const recipeLists = document.getElementById('meal-container');
  const recipeContent = document.getElementById('recipe');
  recipeLists.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeInput}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.meals.forEach(meal => {
      const meals = document.createElement('div');
      meals.classList.add('meal');
      meals.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p class = "instructions">${meal.strInstructions}</p>
        <button class = "read-more" onclick = "readMore(this)">Read More</button>
      `;
      recipeLists.appendChild(meals);
    })
    .catch(err => {
      console.log('Error', err);
    })
  })
}

function readMore(button) {
  const paragraph = button.previousElementSibling;

  if(paragraph.classList.contains('expanded')){
    paragraph.classList.remove('expanded');
    button.textContent = 'Read More';
  } else {
    paragraph.classList.add('expanded');
    button.textContent = 'Read Less';
  }

}