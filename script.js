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

// Función para cambiar imagen principal en galería
function changeMainImage(thumb) {
    const projectItem = thumb.closest('.project-item');
    const mainImage = projectItem.querySelector('.project-img img');
    const currentSrc = mainImage.src;
    const newSrc = thumb.src;

    // Solo cambiar si es diferente
    if (currentSrc !== newSrc) {
        // Animación de fade out
        mainImage.style.opacity = '0';

        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.alt = thumb.alt;
            mainImage.style.opacity = '1';
        }, 200);
    }

    // Actualizar thumbnails activos
    const thumbs = projectItem.querySelectorAll('.gallery-thumbs img');
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}
