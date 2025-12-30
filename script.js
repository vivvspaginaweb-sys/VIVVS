// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
});

// ===========================
// Scroll Indicator Click
// ===========================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const nextSection = document.querySelector('#problema');
        if (nextSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = nextSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===========================
// Animate on Scroll
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Reset hero section to visible
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// ===========================
// Method Cards Hover Effect
// ===========================
const methodCards = document.querySelectorAll('.method-card');
methodCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Pricing Cards Animation
// ===========================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// ===========================
// Testimonial Cards Animation
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// ===========================
// Feature Items Animation
// ===========================
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    itemObserver.observe(item);
});

// ===========================
// Active Navigation Link
// ===========================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Phone Number Click Tracking
// ===========================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone number clicked:', this.getAttribute('href'));
        // Aquí puedes agregar tracking de analytics si lo necesitas
    });
});

// ===========================
// Accordion Animation Enhancement
// ===========================
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Smooth transition for accordion
        setTimeout(() => {
            const target = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(target);
            
            if (targetElement && this.classList.contains('collapsed') === false) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = this.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 350);
    });
});

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Mobile Menu Close on Resize
// ===========================
let windowWidth = window.innerWidth;
window.addEventListener('resize', function() {
    if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }
});

// ===========================
// Prevent Default for Empty Links
// ===========================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🟦 VIVVS Landing Page', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cTu página web sin complicaciones en menos de 5 días', 'color: #1a3a5c; font-size: 14px;');
console.log('%c📞 697 20 76 58', 'color: #48bb78; font-size: 16px; font-weight: bold;');

// ===========================
// Dynamic Date Update
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('hero-badge-text');
    if (dateElement) {
        const now = new Date();
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const currentMonth = months[now.getMonth()];
        const currentYear = now.getFullYear();
        
        // Si estamos en los últimos días del mes (ej. > 25), mostrar el mes siguiente para más urgencia
        if (now.getDate() > 25) {
            const nextMonthIndex = (now.getMonth() + 1) % 12;
            const nextMonth = months[nextMonthIndex];
            const year = nextMonthIndex === 0 ? currentYear + 1 : currentYear;
            dateElement.textContent = `Solo 8 plazas disponibles en ${nextMonth} ${year}`;
        } else {
            dateElement.textContent = `Solo 8 plazas disponibles en ${currentMonth} ${currentYear}`;
        }
    }
});

// Lead Magnet Form Handler with Brevo Integration
document.addEventListener('DOMContentLoaded', function() {
    const leadMagnetForm = document.getElementById('leadMagnetForm');
    
    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('leadName').value;
            const email = document.getElementById('leadEmail').value;
            
            if (!name || !email) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un email válido');
                return;
            }
            
            // Disable submit button
            const submitBtn = leadMagnetForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            // Send data to Brevo via Vercel API
            fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    alert('¡Gracias ' + name + '! Tu auditoría web se está descargando. También la recibirás en ' + email);
                    
                    // Trigger PDF download
                    const link = document.createElement('a');
                    link.href = 'VIVVS_AUDITORIA_ULTRA_DYNAMIC_CLEAN.pdf';
                    link.download = 'VIVVS-Auditoria-Web-Gratis.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Reset form
                    leadMagnetForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Descargar Auditoría Gratis';
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Descargar Auditoría Gratis';
            });
        });
    }
});
