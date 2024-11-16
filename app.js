// Zugriff auf die Kamera
document.getElementById("start-camera").addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            alert("Camera started successfully!");
            // Weiterleitung auf eine Seite für QR-Code-Scan oder Kamera-Funktion
            window.location.href = "camera.html";
        })
        .catch((error) => {
            alert("Camera access denied or not available.");
            console.error(error);
        });
});

// Zugriff auf GPS-Daten
document.getElementById("get-location").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            alert(`Your location: Latitude ${latitude}, Longitude ${longitude}`);
            
            // Simuliere basierend auf den Koordinaten die Weiterleitung
            if (latitude && longitude) {
                window.location.href = `tour.html?lat=${latitude}&lon=${longitude}`;
            }
        }, (error) => {
            alert("Unable to retrieve location. Please enable GPS.");
            console.error(error);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
