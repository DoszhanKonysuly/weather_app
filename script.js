let map;

function getGeo() {
  const apiKey = '941bcd2a9431e2c527280bc01877ed1b';
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city');
    return;
  }

  const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  fetch(geocodingURL)
    .then(response => response.json())
    .then(data => {
      displayMap(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    });
}

function displayMap(data) {
  const mapContainer = document.getElementById('map-test');

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const lat = data[0].lat;
    const lon = data[0].lon;
    const center = [lat, lon];

    if (map) {
      // Map already exists, just update the center
      map.setCenter(center, 9);
    } else {
      // Map doesn't exist, create a new one
      ymaps.ready(() => init(center));
    }
  }
}

function init(center) {
  map = new ymaps.Map('map-test', {
    center: center,
    zoom: 13
  });

  map.controls.remove('geolocationControl');
  map.controls.remove('searchControl');
  map.controls.remove('trafficControl');
  map.controls.remove('typeSelector');
  map.controls.remove('fullscreenControl');
  map.controls.remove('zoomControl');
  map.controls.remove('rulerControl');
  map.behaviors.disable(['scrollZoom']);
}