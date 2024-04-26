const cityName = document.querySelector(".city-name");
const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".city-input");
const windSpeed = document.querySelector('.wind-speed');
const humidityBr = document.querySelector('.humidity');
const pressureBr = document.querySelector('.pressure');
const backgroundImg = document.querySelector('body');
const tempValue = document.querySelector('.temp');
const localHour = document.querySelector('.local-time');
const weatherIcon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');

const weather = {
  apiKey: "dd143d245d197fecb335f72c5b49fd89",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => this.dispWeather(data));
  },
  
  dispWeather: function (data) {
    const { name, timezone } = data;
    const { main, icon } = data.weather[0];
    const { temp, pressure, humidity } = data.main;
    const { speed } = data.wind;

    cityName.textContent = name;
    windSpeed.textContent = `${speed} km/h`;
    humidityBr.textContent = `${humidity}%`;
    pressureBr.textContent = `${pressure} hPa`;
    tempValue.textContent = `${temp} °C`;
    description.textContent = getDescription(main);
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`

    const date = new Date();
    const hours = date.getHours() - isSummerTime(date);
    const minutes = date.getMinutes();
    const timezoneHours = timezone / 3600;
    let time = hours + Number(timezoneHours);
    if(time < 0) {
      time += 24;
    } 

    localHour.textContent = `${time} : ${minutes < 10 ? `0${minutes}` : minutes}`;
  },
};

searchButton.addEventListener("click", function () {
  const cityName = searchBar.value;
  displayWeather(cityName);
});

isSummerTime = function(date) {
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const lastOfMonth = new Date(date.getFullYear(), month, 0);
  const lastDayOfMonth = lastOfMonth.getDay();
  const lastDateOfMonth = lastOfMonth.getDate();
  const lastSundayOfMonth = lastDateOfMonth - lastDayOfMonth;

  if(month > 3 && month < 10) {
    return 2;
  } else if(month > 10 && month < 3) {
    return 1;
  } else if(month === 3) {
    dayOfMonth < lastSundayOfMonth ? 1 : 2;
  } else {
    dayOfMonth < lastSundayOfMonth ? 2 : 1;
  }
}

getDescription = function(description) {
  switch(description.toLowerCase()) {
    case 'clear':
      return 'Bezchmurnie';
    case 'clouds':
      return 'Pochmurno';
    case 'rain':
      return 'deszcz';
    case 'thunderstorm':
      return 'burza';
    case 'snow':
      return 'śnieżnie';
    case 'mist':
      return 'mgliście';
  }
}

displayWeather = function(cityName) {
  weather.fetchWeather(cityName);
  backgroundImg.style.backgroundImage = `url("https://source.unsplash.com/1600x900?${cityName}")`;
}

displayWeather('Gdansk');
