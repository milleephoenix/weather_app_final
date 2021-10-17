let apiKey = "339446a70a6285d4da506a17e7465ddf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Saguenay&appid=${apiKey}&units=metric`;

//console.log(apiUrl);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function capitalizeFirstLetter(data) {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

axios.get(apiUrl).then(displayTemperature);
