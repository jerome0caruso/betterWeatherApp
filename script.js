
const submit = document.getElementById('btn');
const apiKey = '80afed911e6a4adb81771e6da2bf74d5';
submit.addEventListener("click", fetchdata);
const content = document.getElementById("content");

function fetchdata(e) {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => createPage(data))

    document.getElementById('zipcode').value = '';
}
function createTemp(temp, unit) {
    if(unit === 'f') {
        const f =((Number(temp) -273.15)*1.8)+32;
    } else if(unit === 'c') {
        const c = (Number(temp))-273.15
    }
}
function createPage(data) {
    console.log(data)
    let today = new Date()
    let minutes;

    if(today.getHours() < 10) {
        minutes = `${today.getHours()}:0${today.getMinutes()}`
    } else {
        minutes = `${today.getHours()}:${today.getMinutes()}`
    }
    
content.innerHTML=
`
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${data.name}</h5><h6 class="card-subtitle mb-2 text-muted">${today.toLocaleDateString()}</h6><h6 class="card-subtitle mb-2 text-muted">${minutes}</h6>
    <hr style="width:50%", size="3", color=black>  
    <p class="card-text">Today's high/low is ${f.toFixed(0)}℉ / ${c.toFixed(0)}℃ -- ${f.toFixed(0)}℉ / ${c.toFixed(0)}℃</p>
    <p class="card-text">Today's humidity is ${data.main.humidity}%</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
    </div>
    </div>
`

}