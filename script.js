const burguer = document.querySelector('.header .nav-bar .nav-list .burguer');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

burguer.addEventListener('click', () => {
	burguer.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		burguer.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// Animación de proyectos al hacer scroll
const projectItems = document.querySelectorAll('#projects .project-item');

const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry, index) => {
		if (entry.isIntersecting) {
			setTimeout(() => {
				entry.target.style.animationDelay = '0s';
				entry.target.style.opacity = '1';
			}, index * 200);
		}
	});
}, observerOptions);

projectItems.forEach(item => {
	observer.observe(item);
});
