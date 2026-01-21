const burguer = document.querySelector('.header .nav-bar .nav-list .burguer');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

// Enhanced mobile menu with better UX
burguer.addEventListener('click', () => {
	burguer.classList.toggle('active');
	mobile_menu.classList.toggle('active');

	// Prevent body scroll when menu is open
	document.body.style.overflow = mobile_menu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
	if (!burguer.contains(e.target) && !mobile_menu.contains(e.target)) {
		burguer.classList.remove('active');
		mobile_menu.classList.remove('active');
		document.body.style.overflow = 'auto';
	}
});

// Header background change with smooth transition
document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = 'rgba(41, 50, 60, 0.95)';
		header.style.backdropFilter = 'blur(20px)';
	} else {
		header.style.backgroundColor = 'transparent';
		header.style.backdropFilter = 'blur(10px)';
	}
});

// Enhanced menu item clicks with smooth closing
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		burguer.classList.remove('active');
		mobile_menu.classList.remove('active');
		document.body.style.overflow = 'auto';
	});
});

// Enhanced gallery functionality with touch support
function changeMainImage(thumb) {
    const projectItem = thumb.closest('.project-item');
    const mainImage = projectItem.querySelector('.project-img img');
    const currentSrc = mainImage.src;
    const newSrc = thumb.src;

    // Only change if different
    if (currentSrc !== newSrc) {
        // Add loading state
        mainImage.style.opacity = '0.7';

        // Preload image
        const img = new Image();
        img.onload = () => {
            mainImage.src = newSrc;
            mainImage.alt = thumb.alt;
            mainImage.style.opacity = '1';
        };
        img.src = newSrc;
    }

    // Update active thumbnail
    const thumbs = projectItem.querySelectorAll('.gallery-thumbs img');
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

// Touch gesture support for gallery
document.addEventListener('DOMContentLoaded', () => {
    // Add touch event listeners to gallery thumbnails
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    galleryThumbs.forEach(thumb => {
        // Touch start
        thumb.addEventListener('touchstart', (e) => {
            e.preventDefault();
            thumb.classList.add('touch-active');
        }, { passive: false });

        // Touch end
        thumb.addEventListener('touchend', (e) => {
            e.preventDefault();
            thumb.classList.remove('touch-active');
            changeMainImage(thumb);
        }, { passive: false });

        // Prevent context menu on long press
        thumb.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobile_menu.classList.contains('active')) {
            burguer.classList.remove('active');
            mobile_menu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = mobile_menu;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal.classList.contains('active')) {
            const focusableContent = modal.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
});
