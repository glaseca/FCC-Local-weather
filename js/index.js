// TO-DO
/*
  --Control de errores en las peticiones ajax
*/

var city = "Zaragoza,ES";
var lat = "";
var lon = "";
var t = "celsius";

var getDate = function (){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
  today = dd+'-'+mm+'-'+yyyy;
  return today;
}

var getLocation = function (){
   $.ajax({
      url: "http://ip-api.com/json",
      method: "GET",
      cache: false,
      dataType: "json"
    })
    .done(function(msg) {
      console.log(msg);
      lat = msg.lat;
      lon = msg.lon;
      getWeather(lat,lon);
    })
   .fail(function() {
      //$('.alert-danger').show();
  });
};

var getWeather = function (lat, lon){
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      method: "GET",
      data: {"lat":lat,"lon":lon,"APPID":"7a095bca640374d3a4764e2b7565f97d", "units":"metric"},
      cache: false,
      dataType: "json"
    })
    .done(function(msg) {
      console.log(msg);
      $('.date').html(getDate());
      $('.city').html(msg.name);
      $('.temp').html(Math.round(msg.main.temp)+" ºC");
      $('.temp_min').html(msg.main.temp_min+" ºC");
      $('.temp_max').html(msg.main.temp_max+" ºC");
      $('.tempF').html(Math.round((msg.main.temp*1.8)+32)+" ºF");
      $('.temp_minF').html(Math.round((msg.main.temp_min*1.8)+32)+" ºF");
      $('.temp_maxF').html(Math.round((msg.main.temp_max*1.8)+32)+" ºF");
      $('.humidity').html(msg.main.humidity+" %");
      $('.pressure').html(msg.main.pressure+" hPa");
     
 switch(msg.weather[0].main.toLowerCase()){
  case "clear sky": //Despejado
    $('.sunny').show();
    break;
  case "shower rain": //Aguacero
    $('.rainy').show();
    break;
  case "rain": //Lluvia
    $('.sun-shower').show();
    break;
  case "thunderstorm": //Tormenta
    $('.thunder-storm').show();
    break;
  case "snow": //Nieve
    $('.flurries').show();
    break;
  case "broken clouds": //Nublado   
  case "scattered clouds":  //Nubes aisladas
  case "few clouds": //Nubes y claros
  case "fog": //Niebla   
  case "mist": //Niebla
    $('.cloudy').show();
    break;
  default:        
 }
    })
   .fail(function() {
      //$('.alert-danger').show();
  });
};

function metricUnit(){
  if(t=="celsius"){
    $('.C').hide();
    $('.F').show();
    t="farenheit";
    $("button").html('Celsius');
  }else{
    $('.C').show();
    $('.F').hide();
    t="celsius";
    $("button").html('Farenheit');
  }
  
}


$(document).ready(function() {
  getLocation();
  $('#metricUnit').on('click', metricUnit);
});