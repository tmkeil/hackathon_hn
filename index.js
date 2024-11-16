function scanQRCode() {
    const scannedCity = prompt("Simulated QR Code Stuff: Type a City", "Berlin");
    if (scannedCity) {
        window.location.href = `city.html?city=${encodeURIComponent(scannedCity)}`;
    }
}

function useGPS() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                alert(`Your location: Latitude ${latitude}, Longitude ${longitude}`);
                if (latitude && longitude) {
                    window.location.href = `tour.html?lat=${latitude}&lon=${longitude}`;
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

function useCam() {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            alert("Camera started successfully!");
            window.location.href = "camera.html";
        })
        .catch((error) => {
            alert("Camera access denied or not available.");
            console.error(error);
        });
}
