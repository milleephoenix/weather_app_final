let apiKey = "339446a70a6285d4da506a17e7465ddf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Saguenay&appid=${apiKey}&units=metric`;

//console.log(apiUrl);

function displayTemperature(response) {
  console.log(response.data.main.temp);
}
axios.get(apiUrl).then(displayTemperature);
