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
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("forecast");
  forecastElement.innerHTML = `
            <div class="col-sm forecast-column">
              <i class="fas fa-cloud-sun weather-icon"></i>
              <p>Tues</p>
              <span class="max-temp">18°</span> <span class="min-temp">7°</span>
            </div>
          </div>`;
}

function getForecast(coordinates) {
  let apiKey = "1ba1100ec11f44947f639237235127ac";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  //Update main city name
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  //Update current temperature in C
  let actualTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#actual-temp");
  mainTempDisplay.innerHTML = `${actualTemp}°C`;
  celsiusValue = actualTemp;
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
  //Update wind speed
  let windDisplay = document.querySelector(".wind");
  windDisplay.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

  getForecast(response.data.coord);
}

//API call on user search
function search(city) {
  let apiKey = "1ba1100ec11f44947f639237235127ac";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#userinput");
  search(cityInputElement.value);
}

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", handleSubmit);

//displays weather data for London on page load:
search("London");

//Use current location button API call
function searchPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1ba1100ec11f44947f639237235127ac";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric}`;
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
  celsiusTemp.innerHTML = `${Math.round(celsiusValue)}°C`;
}

function changeToF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusValue * 9) / 5 + 32;
  let mainTemperature = document.querySelector("#actual-temp");
  mainTemperature.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeToC);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToF);
