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

//Displays weather for London on page load

function displayWeather(response) {
  //Update main city name
  console.log(response.data);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  //Update current temperature in C
  let actualTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#actual-temp");
  mainTempDisplay.innerHTML = `${actualTemp}`;
  celsiusValue = mainTempDisplay.innerHTML;
  //Update weather icon
  let iconCode = response.data.weather[0].icon;
  let mainIcon = document.querySelector("#main-weather-icon");
  mainIcon.src = `https://openweathermap.org/img/w/${iconCode}.png`;

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
let apiKey = "1ba1100ec11f44947f639237235127ac";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;
axios.get(url).then(displayWeather);

//Adds user's city input to the page + fetch weather info from API

function displayUserWeather(response) {
  //Update main city name
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  //Update current temperature in C
  let actualTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#actual-temp");
  mainTempDisplay.innerHTML = `${actualTemp}`;
  //Update weather icon
  let iconCode = response.data.weather[0].icon;
  let mainIcon = document.querySelector("#main-weather-icon");
  mainIcon.src = `https://openweathermap.org/img/w/${iconCode}.png`;
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

  axios.get(url).then(displayUserWeather);
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

// Celcius and Fahrenheit buttons conversion functionality
let celsiusValue = null;

function changeToC(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#actual-temp");
  celsiusTemp.innerHTML = Math.round(celsiusValue);
  let units = document.querySelector("temperature-unit");
  units.innerHTML = "ºc";
}

function changeToF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusValue * 9) / 5 + 32;
  let mainTemperature = document.querySelector("#actual-temp");
  mainTemperature.innerHTML = Math.round(fahrenheitTemp);
  let units = document.querySelector("temperature-unit");
  units.innerHTML = "ºf";
}
let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeToC);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToF);
