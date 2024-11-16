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
	  chipsContainer.appendChild(chip);
	  swiper.update();
	  searchInput.value = '';
	}
  }
  
  function removeChip(element) {
	const chip = element.parentElement;
	chip.remove();
	swiper.update();
  }
  