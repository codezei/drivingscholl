// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	toggleFaq()
	testimonialsSlider()
})
function toggleFaq() {
	let items = document.querySelectorAll('.faq__item')
	let activeItem
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function (e) {
			if (e.currentTarget !== activeItem && !!activeItem) {
				activeItem.classList.remove('active')
			}
			if (e.currentTarget.classList.contains('active')) {
				e.currentTarget.classList.remove('active')
			} else {
				e.currentTarget.classList.add('active')
				activeItem = e.currentTarget
			}
		})


	}


}

function testimonialsSlider() {
	let swiper = new Swiper(".testimonials-slider", {
		slidesPerView: 3,
		spaceBetween: 24,
		// loop: true,
		navigation: {
			nextEl: ".testimonials-button-next",
			prevEl: ".testimonials-button-prev",
		},

		breakpoints: {
			1200: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1
			},
		}
	});
}