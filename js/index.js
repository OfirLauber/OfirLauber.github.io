var WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
var APP_ID = '92469c62d282fdfc8719b751aa10c1d8';
var WEATHER_ICON = 'https://openweathermap.org/img/w/';

var current_unit = 'metric';
var current_weather;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByPosition, locationError);
  } else {
    alert('Location unavailable');
  }
}

function locationError(error) {
  console.warn('ERROR(' + error.code + '): ' + error.message);
  alert('Location unavailable');
}

function getWeatherByPosition(position) {
  var requestData = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    appid: APP_ID,
    units: current_unit
  }
  $.getJSON(WEATHER_API, requestData).done(updateWeather);
}

function updateWeather(response) {
  var city = response.name;
  var country = response.sys.country;
  var temperature = response.main.temp;
  var weather = response.weather.shift();
  var icon = '<img src="' + WEATHER_ICON + weather.icon + '.png">'
  current_weather = weather.main;

  $('#location').html(city + ', ' + country);
  $('#temperature').html(temperature + '°');
  $('#weather').html(weather.main + ', ' + weather.description + icon);
}

function playSong(event) {
  var audio = new Audio("assets/" + current_weather + ".mp3");
  audio.play();
}

$(document).ready(function() {
  getLocation();
  
  $('#song').on('click', playSong)
});