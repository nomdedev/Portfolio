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
	let scroll_position = window.scrollY;
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
            } else if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
});

// ==========================================
// PROJECTS FILTERING SYSTEM
// ==========================================

class ProjectsFilter {
    constructor() {
        this.projectsGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.techFilter = document.getElementById('tech-filter');
        this.complexityFilter = document.getElementById('complexity-filter');
        this.projectsCount = document.getElementById('projects-count');
        this.currentFilter = 'all';
        this.currentTech = '';
        this.currentComplexity = '';

        this.init();
    }

    init() {
        // Load projects on page load
        this.loadProjects();

        // Setup filter button events
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.setActiveFilter(filter);
                this.filterProjects();
            });
        });

        // Setup select filter events
        if (this.techFilter) {
            this.techFilter.addEventListener('change', (e) => {
                this.currentTech = e.target.value;
                this.filterProjects();
            });
        }

        if (this.complexityFilter) {
            this.complexityFilter.addEventListener('change', (e) => {
                this.currentComplexity = e.target.value;
                this.filterProjects();
            });
        }
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.filter === filter);
        });
    }

    loadProjects() {
        if (!this.projectsGrid) return;

        this.projectsGrid.innerHTML = '';

        projectsData.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            this.projectsGrid.appendChild(projectElement);
        });

        this.updateProjectsCount(projectsData.length, projectsData.length);
    }

    createProjectElement(project, index) {
        const projectDiv = document.createElement('div');
        projectDiv.className = `project-item ${project.featured ? 'featured' : ''}`;
        projectDiv.style.animationDelay = `${index * 0.1}s`;

        // Get category info
        const categoryInfo = filterConfig.categories[project.category] || { label: project.category, icon: '📁' };

        // Generate tech tags
        const techTags = project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Generate links
        const links = [];
        if (project.links.github) {
            links.push(`<a href="${project.links.github}" class="project-link" target="_blank">📄 Ver Código</a>`);
        }
        if (project.links.demo) {
            links.push(`<a href="${project.links.demo}" class="project-link" target="_blank">🚀 Ver Demo</a>`);
        }
        if (project.links.contact) {
            links.push(`<a href="${project.links.contact}" class="project-link" target="_blank">💼 Contactar</a>`);
        }

        // Generate rating stars
        const stars = '⭐'.repeat(project.rating);

        projectDiv.innerHTML = `
            <div class="project-meta">
                <div class="project-category">
                    <span class="filter-icon">${categoryInfo.icon}</span>
                    ${categoryInfo.label}
                </div>
                <div class="project-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">${project.rating}/5</span>
                </div>
            </div>
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h1>
                    <a href="${project.links.github || project.links.demo || project.links.contact}" target="_blank">
                        ${project.title}
                    </a>
                </h1>
                <div class="project-description">
                    ${project.description}
                </div>
                ${project.impact ? `
                <div class="project-impact">
                    <strong>🎯 Impacto:</strong> ${project.impact}
                </div>
                ` : ''}
                <div class="project-tech">
                    <strong>🛠️ Tecnologías:</strong>
                    <div class="tech-tags">
                        ${techTags}
                    </div>
                </div>
                <div class="project-links">
                    ${links.join('')}
                </div>
            </div>
        `;

        return projectDiv;
    }

    filterProjects() {
        const projectItems = document.querySelectorAll('.project-item');
        let visibleCount = 0;

        projectItems.forEach(item => {
            const category = item.querySelector('.project-category').textContent.trim().split(' ')[1] || '';
            const techTags = Array.from(item.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            const complexity = this.getProjectComplexity(item);

            let isVisible = true;

            // Category filter
            if (this.currentFilter !== 'all') {
                isVisible = isVisible && category.toLowerCase() === this.currentFilter;
            }

            // Tech filter
            if (this.currentTech) {
                isVisible = isVisible && techTags.some(tag =>
                    tag.toLowerCase().includes(this.currentTech.toLowerCase())
                );
            }

            // Complexity filter
            if (this.currentComplexity) {
                isVisible = isVisible && complexity === this.currentComplexity;
            }

            item.classList.toggle('hidden', !isVisible);
            if (isVisible) visibleCount++;
        });

        this.updateProjectsCount(visibleCount, projectsData.length);
    }

    getProjectComplexity(item) {
        // This is a simplified version - in a real implementation,
        // you'd store complexity in the project data
        const techCount = item.querySelectorAll('.tech-tag').length;
        if (techCount >= 5) return 'enterprise';
        if (techCount >= 3) return 'high';
        if (techCount >= 2) return 'medium';
        return 'low';
    }

    updateProjectsCount(visible, total) {
        if (this.projectsCount) {
            this.projectsCount.innerHTML = `Mostrando <strong>${visible}</strong> de <strong>${total}</strong> proyectos`;
        }
    }
}

// Initialize projects filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsFilter();
});

// ==========================================
// ENHANCED GALLERY FUNCTIONALITY
// ==========================================

// Enhanced gallery functionality with touch support
function changeMainImage(thumb) {
    const projectItem = thumb.closest('.project-item');
    const mainImage = projectItem.querySelector('.project-img img');
    const currentSrc = mainImage.src;
    const newSrc = thumb.src;

    if (currentSrc !== newSrc) {
        // Add fade effect
        mainImage.style.opacity = '0.7';
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 150);
    }

    // Update active thumbnail
    const thumbs = projectItem.querySelectorAll('.gallery-thumbs img');
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Lazy load images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add loading class to images
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        if (!img.classList.contains('loaded')) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Trigger load after a short delay
    setTimeout(() => {
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '1';
            img.classList.add('loaded');
        });
    }, 100);
});

// ==========================================
// SECURE CONTACT SYSTEM
// ==========================================

// Email obfuscation and secure contact functions
function openEmailClient() {
    // Obfuscated email to prevent scraping
    const user = 'martin.nomdedeu';
    const domain = 'gmail.com';
    const subject = encodeURIComponent('Contacto desde Portfolio Web');
    const body = encodeURIComponent('Hola Martin,\n\nMe gustaría contactarte para hablar sobre...\n\nSaludos,');

    // Open default email client
    window.location.href = `mailto:${user}@${domain}?subject=${subject}&body=${body}`;
}

function showPhoneModal() {
    const modal = document.getElementById('phoneModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openLinkedIn() {
    window.open('https://www.linkedin.com/in/martin-nomdedeu/', '_blank');
}

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate form before submission
            if (!validateForm()) {
                return;
            }

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Enviando...</span><span class="btn-icon">⏳</span>';

            try {
                // Get form data
                const formData = new FormData(contactForm);

                // Send to Formspree (the form action handles this)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success modal
                    const successModal = document.getElementById('successModal');
                    if (successModal) {
                        successModal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }

                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }

            } catch (error) {
                console.error('Error sending message:', error);
                showFormError('Error al enviar el mensaje. Por favor intenta de nuevo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const phoneModal = document.getElementById('phoneModal');
        const successModal = document.getElementById('successModal');

        if (e.target === phoneModal) {
            closePhoneModal();
        }
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePhoneModal();
            closeSuccessModal();
        }
    });
});

// ==========================================
// FORM VALIDATION ENHANCEMENTS
// ==========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        showFormError('Por favor ingresa tu nombre');
        return false;
    }

    if (!email) {
        showFormError('Por favor ingresa tu email');
        return false;
    }

    if (!validateEmail(email)) {
        showFormError('Por favor ingresa un email válido');
        return false;
    }

    if (!message) {
        showFormError('Por favor ingresa tu mensaje');
        return false;
    }

    return true;
}

function showFormError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid #ef4444;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
        text-align: center;
    `;

    const form = document.querySelector('.contact-form');
    form.insertBefore(errorDiv, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// ==========================================
// END SECURE CONTACT SYSTEM
// ==========================================
