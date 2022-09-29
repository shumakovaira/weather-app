let dateNow = new Date();
let days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"];
let day = days[dateNow.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[dateNow.getMonth()];
let updateTime = document.querySelector("#updating-date");
updateTime.innerHTML = `${dateNow.toLocaleTimeString().slice(0, 5)} ${day} <br> ${dateNow.getDate()} ${month} ${dateNow.getFullYear()}`;

function convertingDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast-days");
  let forecastTemplate = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index >= 1 && index < 7) {
      forecastTemplate = 
        forecastTemplate + `
        <div class="col days">
        <h2>${convertingDay(forecastDay.dt)}</h2>
        <div class="row">
            <div class="col daily-temp">
                <p class="max-temp">${Math.round(forecastDay.temp.max)}&deg;</p>
                <p class="min-temp">${Math.round(forecastDay.temp.min)}&deg;</p>
            </div>  
            <div class="col weather-icon"> 
            <img 
              src="../img/icons/${forecastDay.weather[0].icon}.svg"
              class="nextdays-icon"
            />
            </div>    
          </div>
          <div class="row">
            <p class="weather-disc">${forecastDay.weather[0].description}</p>
          </div>
        </div>
      `;
    }
  })
  forecastTemplate = forecastTemplate + `</div>`;
  forecastElement.innerHTML = forecastTemplate;
}

function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`
  axios.get(apiURL).then(displayForecast)
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#curr-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#cloud").innerHTML = Math.round(response.data.clouds.all);
  document.querySelector("#sunrise").innerHTML = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
  document.querySelector("#sunset").innerHTML = new Date(response.data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".main-icon").setAttribute("src", `../img/icons/${response.data.weather[0].icon}.svg`)

  getForecast(response.data.coord)
}

function searchCity(city) {
  let apiKey = "c97472d1b3f43bc50b7a38cb09bef4cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "c97472d1b3f43bc50b7a38cb09bef4cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitting(event){
  event.preventDefault();
  let city = document.querySelector(".form").value;
  searchCity(city);
  document.querySelector(".form").value ='';
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
}

let changeButton = document.querySelector(".search-button");
changeButton.addEventListener("click", submitting);

let currentButton = document.querySelector(".location-pin");
currentButton.addEventListener("click", getCurrentLocation);

let inputCity = document.querySelector(".form")
inputCity.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    let city = document.querySelector(".form").value;
    searchCity(city);
    document.querySelector(".form").value ='';
  }
});

searchCity("Lviv")

function displayCelsiusTemp (event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let celsius = document.querySelector(".wi-celsius");
celsius.addEventListener("click", displayCelsiusTemp);