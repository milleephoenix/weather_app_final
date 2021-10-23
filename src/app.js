//console.log(apiUrl);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img class="forecast-icon" src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width="40"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">18° </span>
                  <span class="weather-forecast-temperature-min">17° </span>
                </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let dateTime = document.querySelector("#dateTime");
  let iconElement = document.querySelector("#weatherIcon");

  displayForecast();

  celciusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateTime.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
}

function search(city) {
  let apiKey = "339446a70a6285d4da506a17e7465ddf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function capitalizeFirstLetter(data) {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let farTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farTemp);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);
