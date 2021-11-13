//Add day and time to the page:

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let title = document.querySelector(".main-date");
title.innerHTML = `${day}, ${hour}:${minutes}`;

//Adds user's city input to the page + fetch weather info from API

function displayWeather(response) {
  //Update main city name
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  //Update current temperature in C
  let actualTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#actual-temp");
  mainTempDisplay.innerHTML = `${actualTemp}`;
  //Update description
  let apiDescription = response.data.weather[0].description;
  let description = document.querySelector(".description");
  description.innerHTML = `${apiDescription}`;
  //Update humidity
  let humidityDisplay = document.querySelector(".humidity");
  humidityDisplay.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  //Update Wind
  let windDisplay = document.querySelector(".wind");
  windDisplay.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}

//API call
function search(event) {
  event.preventDefault();
  let apiKey = "1ba1100ec11f44947f639237235127ac";
  let units = "metric";
  let city = document.querySelector("#userinput").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displayWeather);
}
let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", search);

//Use current location button API call
function searchPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1ba1100ec11f44947f639237235127ac";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

/*C and F buttons functionality

function changeToC(event) {
  event.preventDefault();
  units = "metric";
}

function changeToF(event) {
  event.preventDefault();
  units = "imperial";
}
let celciusButton = document.querySelector(".celcius");
celciusButton.addEventListener("click", changeToC);

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", changeToF); */
