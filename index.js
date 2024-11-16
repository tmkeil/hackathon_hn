async function scanQRCode() {
  // const scannedCity = prompt("Simulated QR Code Stuff: Type a City", "Heilbronn");
  // if (scannedCity) {
  //     window.location.href = `city.html?city=${encodeURIComponent(scannedCity)}`;
  // }
  await navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      alert("Camera started successfully!");
      window.location.href = "camera.html";
    })
    .catch((error) => {
      alert("Camera access denied or not available.");
      console.error(error);
    });
    window.location.href = "city.html";
}

async function useGPS() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        alert(`Your location: Latitude ${latitude}, Longitude ${longitude}`);

        try {
          // API-Schlüssel einfügen
          const apiKey = "5d7e61a96c8f441db8bb3a466682e27b";
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const city =
              data.results[0].components.city ||
              data.results[0].components.town ||
              "Unknown City";
            alert(`You are in: ${city}`);
            window.location.href = `city.html?city=${encodeURIComponent(city)}`;
          } else {
            alert("City not found for this location.");
          }
        } catch (error) {
          alert("Failed to fetch city information.");
          console.error(error);
        }
      },
      (error) => {
        alert("Unable to retrieve location. Please enable GPS.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function greenRoute() {
  // navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((stream) => {
  //         alert("Camera started successfully!");
  //         window.location.href = "camera.html";
  //     })
  //     .catch((error) => {
  //         alert("Camera access denied or not available.");
  //         console.error(error);
  //     });
}
