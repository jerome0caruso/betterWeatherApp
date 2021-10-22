
const submit = document.getElementById('btn');
const apiKey = '80afed911e6a4adb81771e6da2bf74d5';
submit.addEventListener("click", fetchdata);
const content = document.getElementById("content");

window.onload = function() {
    let startPos;
    let geoSuccess = function(position) {
      startPos = position;
    const lat = document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    const lon = document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    fetchdataG(lat.toFixed(2), lon.toFixed(2));
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };
function fetchdataG(lat, lon) {
    console.log("here", lat, lon)
    const zipcode = document.getElementById('zipcode').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => createPage(data))

    document.getElementById('zipcode').value = '';
}

async function fetchdata(e) {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => createPage(data))

    document.getElementById('zipcode').value = '';
}
function createTemp(temp, unit) {
    if(unit === 'f') {
        return ((Number(temp) -273.15)*1.8)+32;
    } else if(unit === 'c') {
        return c = (Number(temp))-273.15
    }
}
function createPage(data) {
    console.log(data)
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
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
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
}

