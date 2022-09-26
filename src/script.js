let dateNow = new Date();
let days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday", 
  "Sunday"];
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
updateTime.innerHTML = `${dateNow.toLocaleTimeString()} ${day} <br> ${dateNow.getDate()} ${month} ${dateNow.getFullYear()}`;

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#curr-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector(".weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#cloud").innerHTML = Math.round(response.data.clouds.all);
  document.querySelector("#sunrise").innerHTML = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
  document.querySelector("#sunset").innerHTML = new Date(response.data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`)
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

let currentButton = document.querySelector(".current-button");
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

let celsiusTemp = null;

function displayFarenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  let farenheitTemperature = (celsiusTemp * 9 ) / 5 + 32;
  currentTemp.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemp (event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let farenheit = document.querySelector(".wi-fahrenheit");
farenheit.addEventListener("click", displayFarenheitTemp);

let celsius = document.querySelector(".wi-celsius");
celsius.addEventListener("click", displayCelsiusTemp);