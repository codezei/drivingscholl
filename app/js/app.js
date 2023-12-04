// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	toggleFaq()
	testimonialsSlider()
	gallerySlider()
	mobMenu()
	let wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset :0,
		mobile: true,
		live: true}).init()
	smoothScroll() 
	lazyVideo()
	parkSlider()
	toggleVisibility()
})

if (document.documentElement.clientWidth < 480) {
	window.addEventListener('scroll',
	  function () {
		return setTimeout(lazyMap, 1000)
	  }, {
		once: true,
		passive: true
	  });
  } else {
	lazyMap();
  };


function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});
	}
}
function mobMenu () {
	let btn = document.querySelector('.mob-menu-btn')
	let menu = document.querySelector('.mob-menu')
	btn.addEventListener('click', function () {
		btn.classList.toggle('open')
		menu.classList.toggle('open')
	})
	menu.addEventListener('click', function (e) {
	
		if (e.target.classList.contains('menu__link')) {
			btn.classList.remove('open')
			menu.classList.remove('open')
		}
	})
}
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

function gallerySlider() {
	let swiper = new Swiper(".gallery-swiper", {
		slidesPerView: 4,
		spaceBetween: 24,
		// loop: true,
		navigation: {
			nextEl: ".gallery-button-next",
			prevEl: ".gallery-button-prev",
		},
		pagination: {
			el: ".gallery-pagination",
			clickable: true
		  },

		breakpoints: {
			1200: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 3,
			},
			0: {
				slidesPerView: 2
			},
		}
	});
}
function parkSlider() {
	let swiper = new Swiper(".park-swiper", {
		slidesPerView: 4,
		spaceBetween: 24,
		// loop: true,
		navigation: {
			nextEl: ".park-button-next",
			prevEl: ".park-button-prev",
		},
		pagination: {
			el: ".park-pagination",
			clickable: true
		  },

		breakpoints: {
			1200: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 3,
			},
			0: {
				slidesPerView: 2
			},
		}
	});
}

function lazyVideo () {
	let videos = document.querySelectorAll('.lazy-video')
	for (let i = 0; i < videos.length; i++) {
		let thumbnail = document.createElement('img')
		thumbnail.setAttribute('src', 'https://i.ytimg.com/vi/'+videos[i].dataset.id+'/hqdefault.jpg')
		thumbnail.setAttribute('alt', '')
		videos[i].appendChild(thumbnail)

		videos[i].addEventListener('click', function (e) {
			let iframe = document.createElement('iframe')
			iframe.setAttribute('src', 'https://www.youtube.com/embed/'+e.currentTarget.dataset.id)
			iframe.classList.add('iframe')
			iframe.setAttribute('title', e.currentTarget.dataset.title)
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
			e.currentTarget.replaceWith(iframe)
		})
	}
}

function lazyMap () {
	let maps = document.querySelectorAll('.lazy-map')

	for (let i = 0; i < maps.length; i++) {
		let iframe = document.createElement('iframe')
		iframe.setAttribute('src', maps[i].dataset.src)
		iframe.setAttribute('height', 450)
		iframe.setAttribute('title', maps[i].dataset.title)
		iframe.classList.add('iframe')
		maps[i].replaceWith(iframe)
	}
}

function toggleVisibility () {
	let buttons = document.querySelectorAll('.js-group-btn')
	let groups = document.querySelectorAll('.js-group')
	let activeBtn = buttons[0]
	let activeGroup = groups[0]

	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function (e) {
			if (activeBtn !== e.currentTarget) {
				activeBtn.classList.remove('active')
				activeBtn = e.currentTarget
				activeBtn.classList.add('active')

				activeGroup.classList.remove('active')
				activeGroup = document.querySelector('.js-group[data-target="'+e.currentTarget.dataset.target+'"]')
				activeGroup.classList.add('active')
			}
		})
	}
}