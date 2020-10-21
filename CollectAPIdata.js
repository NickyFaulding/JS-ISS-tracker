const mymap = L.map('mapid').setView([0, 0], 1);

const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

var myIcon = L.icon({
    iconUrl: 'issImage.png',
    iconSize: [100, 64],
    iconAnchor: [50, 32]
});

const marker = L.marker([0, 0], { icon: myIcon}).addTo(mymap);

let firstTime = true;

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getData(){
    const response = await fetch(api_url);
    const data = await response.json();
    const{ latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);
    if(firstTime){
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
    }
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);

    console.log (latitude);
    console.log (longitude);
}

getData();

setInterval(getData, 3000);