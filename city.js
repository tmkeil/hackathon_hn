document.addEventListener("DOMContentLoaded", () => {
	// URL-Parameter auslesen
	const urlParams = new URLSearchParams(window.location.search);
	const city = urlParams.get("city");

	// Überschrift dynamisch anpassen
	const cityTitle = document.getElementById("cityTitle");
	if (city) {
	  cityTitle.textContent = `Welcome to ${city}!`;
	} else {
	  cityTitle.textContent = "City not found.";
	}
  });