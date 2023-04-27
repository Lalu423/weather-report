var cityName = $("#search-city");
var city = $("#city-name");
var cityTemp = $("#temp");
var cityWind = $("#wind");
var cityHumidity = $("#humidity");
var forecastDay = $(".forecast");
var boxIcon = $("#icon");
var citySearch;
var cityHistory = [];

init();

function init() {
    var storedCities = JSON.parse(localStorage.getItem("City"));
    if (!storedCities) {
        cityHistory = [];
    }
    else {
        cityHistory = storedCities;
    }
    renderHistory();
}

function renderHistory() {
    $("previously-searched").empty();
    for (var i = 0; i < cityHistory.length; i++) {
        var btn = $("<button>");
        btn.text(cityHistory[i]);
        btn.attr("data-city", cityHistory[i]);
        btn.addClass("city-history-btn");
        $("#previously-searched").append(btn);
    }
}

function saveHistory(searchedName) {
    var cityHistory = JSON.parse(localStorage.getItem("City")) || [];
    if (!cityHistory.find((city) => city === searchedName)) {
        cityHistory.push(searchedName);
        localStorage.setItem("City", JSON.stringify(cityHistory));
    }
}

function searchWeather() {
    citySearch = $("#search-city").val().trim();
    getWeather();
}

function getWeather() {
    console.log(citySearch);
    var cityData = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&cnt=40&units=imperial&appid=98d90f1adb1cdb825805eec28572ccfd`;

    fetch(cityData)
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
       console.log(data);
        var searchedName = data.city.name;
        saveHistory(searchedName);

        let i = 0;
        console.log(forecastDay);
        for (let j = 1; j < 6; j++) {

          console.log(j, i);
          console.log(data.list[i]);
          $(`#f${j}`)
            .children(".date")
            .text(
              dayjs(data.list[i].dt_txt.split(" ")[0]).format("MM/DD/YYYY")
            );
          $(`#f${j}`)
            .children(".icon")
            .attr(
              "src",
              `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
            );
          $(`#f${j}`)
            .children(".temp")
            .text("Temp: " + data.list[i].main.temp + "F");
          $(`#f${j}`)
            .children(".wind")
            .text("Wind: " + data.list[i].wind.speed);
          $(`#f${j}`)
            .children(".humidity")
            .text("Humidity: " + data.list[i].main.humidity + "%");
          i += 8;
        }
      });
    curWeather(citySearch);
  }

function curWeather(citySearch) {
    var rnWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=98d90f1adb1cdb825805eec28572ccfd`;
    fetch(rnWeather)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        city.text(data.name + " (" + dayjs().format("MM/DD/YYYY") + ")");
        boxIcon.attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        cityTemp.text("Temp: " + data.main.temp + "F");
        cityWind.text("wind Spd: " + data.wind.speed);
        cityHumidity.text("Humidity: " + data.main.humidity + "%");
    });
}

function buttonSearch(event) {
    citySearch = $(event.target).attr("data-city");
    getWeather();
}

$("#search-btn").on("click", searchWeather);
$("previously-searched").on("click", buttonSearch);



//gecoding API
//function getCity(inputFromField) {
  //  var url = "http://api.openweathermap.org/geo/1.0/direct?" + inputFromField + "q={city name},{state code},{country code}&limit={limit}&appid={API key"
    //fetch(url){
    // ...
    //}
    //.then(data){
    //data=[]
  //  var lat = data[0].lat;
   // var lon = data[0].lon
    //getCurrentWeather(lat, lon);
    //}
//}

//current weather
//function getCurrentWeather(lat, lon) {
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//}

//getCity