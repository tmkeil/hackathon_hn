// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	freeMode: true,
  });
  
  // Function to add a chip
  function addChip() {
	const searchInput = document.getElementById('searchInput');
	const chipsContainer = document.getElementById('chipsContainer');
	const chipValue = searchInput.value.trim();
  
	if (chipValue) {
	  const chip = document.createElement('div');
	  chip.classList.add('swiper-slide', 'chip');
	  chip.innerHTML = `${chipValue} <span class="remove-chip" onclick="removeChip(this)">x</span>`;
	  chip.onclick = () => selectChip(chip); // Klick-Event für die Route
	  chipsContainer.appendChild(chip);
	  swiper.update();
	  searchInput.value = '';
	}
  }
  
  // Function to remove a chip
  function removeChip(element) {
	const chip = element.parentElement;
	chip.remove();
	swiper.update();
  }
  
  // Event Listener for clicking on a chip to select a destination
  function selectChip(element) {
	const chipText = element.innerText.trim(); // Der Text des ausgewählten Chips
	window.localStorage.setItem("destination", chipText); // Ziel im LocalStorage speichern
	window.location.href = "routes.html"; // Weiterleitung zur routes.html
  }
  