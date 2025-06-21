// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email form submission
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Show success message
                showNotification('Teşekkürler! E-posta adresiniz kaydedildi.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
            }
        });
    }

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add animation to circles
    animateCircles();
    
    // Testimonial cards interactivity
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialText = document.querySelector('.testimonial-content p:first-child');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    
    // Testimonial data
    const testimonials = {
        emily: {
            text: '"I used to jump from one routine to another, always searching for something that worked—but nothing ever stuck. Since starting LIFT, I finally have a structure that supports me consistently. Even on tough days when motivation is low, this system keeps me grounded."',
            author: '— Emily, Phase 1'
        },
        james: {
            text: '"I thought I was signing up for better productivity, but what I found was much deeper. With LIFT, I feel aligned with who I really am and what I value. I\'m not just getting more done—I\'m moving with purpose. That shift was unexpected, and it changed everything."',
            author: '— James, Phase 3'
        },
        mila: {
            text: '"Before LIFT, I was constantly stuck in my head—overthinking every little thing and going in circles without moving forward. LIFT helped me break that cycle. Now, I simply show up for myself every single day, with calm and clarity. No more mental noise. No mental drama."',
            author: '— Mila, Phase 2'
        }
    };
    
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            testimonialCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update testimonial content
            const testimonialKey = this.getAttribute('data-testimonial');
            const testimonialData = testimonials[testimonialKey];
            
            if (testimonialData && testimonialText && testimonialAuthor) {
                testimonialText.textContent = testimonialData.text;
                testimonialAuthor.textContent = testimonialData.author;
            }
        });
    });

    // Add intersection observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pricing-card, .testimonial-card, .hero-content, .what-is-lift-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Animate background circles
function animateCircles() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const randomDelay = Math.random() * 2000;
        const randomDuration = 4000 + Math.random() * 4000;
        
        setTimeout(() => {
            setInterval(() => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                const randomScale = 0.5 + Math.random() * 0.5;
                
                circle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
            }, randomDuration);
        }, randomDelay);
    });
}

// Add click effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .nav-btn, .cta-btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (for future mobile implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Lazy loading for images (when real images are added)
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Performance optimization
window.addEventListener('load', function() {
    // Initialize lazy loading
    lazyLoadImages();
    
    // Add loaded class for additional animations
    document.body.classList.add('loaded');
}); 