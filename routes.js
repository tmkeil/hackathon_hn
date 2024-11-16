let map;
let directionsService;
let directionsRenderer;

function initMap() {
  // Initialisiere die Karte und das Directions Service
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  
  // Erstelle eine Karte
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 48.7758, lng: 9.1829 } // Beispiel-Koordinaten (Heilbronn)
  });

  // Routenrenderer auf der Karte einfügen
  directionsRenderer.setMap(map);

  // Ziel aus LocalStorage holen und aktuellen Standort abrufen
  const destination = localStorage.getItem("destination");
  if (!destination) {
	alert("Ziel nicht gefunden. Bitte wählen Sie ein Ziel aus.");
  } else {
	document.getElementById("destinationName").innerText = destination;
	getCurrentLocation(destination);
  }
}

// Funktion zum Abrufen des aktuellen Standorts
async function getCurrentLocation(destination) {
	if ("geolocation" in navigator) {
	  try {
		const position = await new Promise((resolve, reject) => {
		  navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		const currentLocation = position.coords;
		calculateRoute(currentLocation, destination);
	  } catch (error) {
		alert("Standort konnte nicht abgerufen werden. Bitte aktivieren Sie die Standortfreigabe.");
	  }
	} else {
	  alert("Geolocation wird von diesem Browser nicht unterstützt.");
	}
  }

// Funktion, um die Route mit Google Maps API zu berechnen
async function calculateRoute(currentLocation, destination) {
  const apiKey = "AIzaSyB6dWP2vhMNne-6D3gHDKXZqpiUr3DFQXA"; // Dein Google Maps API-Key hier einfügen
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination}&key=${apiKey}`;

  console.log("API-Request-URL:", url);
  
  const response = await fetch(url);
  const data = await response.json();
  console.log("API-Antwort:", data);
  
  if (data.routes && data.routes.length > 0) {
    const route = data.routes[0].legs[0];
    displayRoute(route); // Funktion zum Anzeigen der Route
  } else {
    alert("Keine Route gefunden.");
  }
}

// Funktion zum Anzeigen der Route auf der Karte
function displayRoute(route) {
	const routeContainer = document.getElementById("routeContainer");
	routeContainer.innerHTML = `
	  <h2>Route von deinem Standort nach ${route.end_address}</h2>
	  <p>Entfernung: ${route.distance.text}</p>
	  <p>Dauer: ${route.duration.text}</p>
	`;
  
	// Verwende die bestehende Karte, anstatt eine neue zu erstellen
	const request = {
	  origin: { lat: route.start_location.lat, lng: route.start_location.lng },
	  destination: { lat: route.end_location.lat, lng: route.end_location.lng },
	  travelMode: "DRIVING",
	};
  
	directionsService.route(request, (response, status) => {
	  if (status === "OK") {
		directionsRenderer.setDirections(response);
	  } else {
		alert("Konnte die Route nicht abrufen.");
	  }
	});
  }
  

window.onload = initMap;
