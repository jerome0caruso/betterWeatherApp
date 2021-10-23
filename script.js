const apiKey = '80afed911e6a4adb81771e6da2bf74d5';
const content = document.getElementById("content");
const fiveDayContainer = document.getElementById("fiveDay");
let lat, lon;
const submit = document.getElementById('btn');
// search bar by zip
submit.addEventListener("click", fetchdata);

// Geolocations from google
window.onload = function() {
    let startPos;
    let geoSuccess = function(position) {
      startPos = position;
    lat = document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    lon = document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    fetchdataG(lat.toFixed(2), lon.toFixed(2));
    getForcast(lat, lon);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };
// Calling api by lat/lon with google geo locations
function fetchdataG(lat, lon) {
    const zipcode = document.getElementById('zipcode').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => createPage(data))
    document.getElementById('zipcode').value = '';
}

// regular api call
async function fetchdata(e) {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => createPage(data))
    document.getElementById('zipcode').value = '';
}
// converting k to f and c
function createTemp(temp, unit) {
    if(unit === 'f') {
        return ((Number(temp) -273.15)*1.8)+32;
    } else if(unit === 'c') {
        return c = (Number(temp))-273.15
    }
}

// main temp and city 
function createPage(data) {
    let today = new Date()
    let minutes;
    if(today.getMinutes() < 10) {
        minutes = `${today.getHours()}:0${today.getMinutes()}`
    } else {
        minutes = `${today.getHours()}:${today.getMinutes()}`
    }
    
content.innerHTML=
`
    <div class="card" id="card">
        <div class="card-body">
            <div class="cityContainer">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="150px">
                <div class="innerCityContainer">
                    <h1 class="card-title">${data.name}</h5>
                    <h4 class="card-subtitle mb-2 text-muted">${today.toLocaleDateString()}</h6>
                    <h5 class="card-subtitle mb-2 text-muted">${minutes}</h6>
                </div>
            </div>
        
        <hr style="width:50%", size="3", color=black>  
        <p class="card-text">Today's temperature | ${createTemp(data.main.temp, 'f').toFixed(0)}℉ /  ${createTemp(data.main.temp, 'c').toFixed(0)}℃</p>
        <p class="card-text">Today's high/low | ${createTemp(data.main.temp_max, 'f').toFixed(0)}℉ / ${createTemp(data.main.temp_min, 'c').toFixed(0)}℃ </p>
        <p class="card-text">Today's humidity is ${data.main.humidity}%</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
        </div>
    </div>
`
    // resetting variables to new zipcode location instead of geolocations
    lat = data.coord.lat;
    lon = data.coord.lon;
    getForcast()
}
// ------------
// 5 day forcast
const apiKey2 = 'b579e19b290ce554b1bccbb57758b651';
function getForcast() {
    console.log("second api call")
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=imperial`)
    .then((response) => response.json())
    .then((data) => getFiveDay(data))
}

function getDate(i) {
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const day = date.getDay();
    console.log(day)
    let changer = i + day;
    if(changer > 6) {
        changer = changer - 7;
    }
    return days[changer]
}

function getFiveDay(data) {
    let d = data.daily;
    fiveDayContainer.innerHTML = '';
    for(let i = 1; i < 5; i++){
        fiveDayContainer.innerHTML+=
        `
    <div class="card" style="width: 18rem;">
        <div class="card-body bg-info text-white" id="fiveDayCard">
          <h5 class="card-title">${getDate(i)}</h5>
          <img src="http://openweathermap.org/img/wn/${d[i].weather[0].icon}@2x.png" width="100px">
          <h3 class="card-text">${Math.round(d[i].temp.day)}℉ /</h3>
          <h3 class="card-text">${((d[i].temp.day - 32) * 5/9).toFixed(0) }℃</h3>
        </div>
    </div>
        `
    }
}