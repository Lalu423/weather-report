var $SubmitBtn = $('#submitbtn');
var Input = document.querySelector('#input')
var cityName = document.querySelector('#city-name');
var tempEl = document.querySelector('#temp');
var winEl = document.querySelector('#wind');
var humidEl = document.querySelector('#humid');
var indexEl = document.querySelector('#index');

var historyCities = $(JSON.parse(localStorage.getItem('saved')));

saveCity();
function saveCity() {
    historyCities.sort();
    for (var i = 0; i < historyCities.length; i++){
        if(historyCities[i] ===  historyCities[i+1]){
            historyCities.spice(i, 1);
            i--;
        }
    }
    btnCreator();
}

function btnCreator() {
    btnPlace.children().remove();
    
}


//gecoding API
function getCity(inputFromField){
    var url="http://api.openweathermap.org/geo/1.0/direct?" + inputFromField + "q={city name},{state code},{country code}&limit={limit}&appid={API key"
        //fetch(url){
        // ...
        //}
        //.then(data){
        //data=[]
            var lat = data[0].lat;
            var lon = data[0].lon
            getCurrentWeather(lat,lon);
        //}
    }

//current weather
function getCurrentWeather(lat, lon){
    https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
}

getCity