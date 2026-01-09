/* ============================================
   PROFESSIONAL PORTFOLIO - JavaScript
   Modern, Interactive, and Performant
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initCounterAnimation();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initCursorGlow();
    setCurrentYear();
});

/* ============================================
   LOADING SCREEN
   ============================================ */

function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after animation completes
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 1800);
    });
    
    // Fallback: hide loader after 3 seconds anyway
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 3000);
}

/* ============================================
   NAVIGATION
   ============================================ */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Scroll effect for navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

/* ============================================
   THEME TOGGLE
   ============================================ */

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get stored theme or use system preference
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = (theme) => localStorage.setItem('theme', theme);
    
    // Apply theme
    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark-theme', isDark);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    };
    
    // Initialize theme
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        applyTheme(storedTheme === 'dark');
    } else {
        applyTheme(prefersDarkScheme.matches);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-theme');
        applyTheme(isDark);
        setStoredTheme(isDark ? 'dark' : 'light');
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!getStoredTheme()) {
            applyTheme(e.matches);
        }
    });
}

/* ============================================
   TYPING EFFECT
   ============================================ */

function initTypingEffect() {
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
        'modern web applications',
        'responsive user interfaces',
        'scalable backend systems',
        'full-stack solutions',
        'exceptional experiences'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of the phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 2000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-content, .about-education, .experience-card, .skills-category, ' +
        '.project-card, .contact-info, .contact-form, .highlight-item'
    );
    
    // Add initial state
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        
        let frame = 0;
        
        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutQuad = 1 - Math.pow(1 - progress, 3);
            const currentValue = target * easeOutQuad;
            
            if (isDecimal) {
                counter.textContent = currentValue.toFixed(2);
            } else {
                counter.textContent = Math.round(currentValue);
            }
            
            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = isDecimal ? target.toFixed(2) : target;
                
                // Add + suffix for certain counters
                if (target >= 10 && !isDecimal) {
                    counter.textContent += '+';
                }
            }
        };
        
        animate();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   PROJECT FILTERS
   ============================================ */

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--secondary)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Float labels
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if input has value on load
            if (input.value) {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */

function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow) return;
    
    // Only enable on non-touch devices
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth follow effect
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

/* ============================================
   SET CURRENT YEAR
   ============================================ */

function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   PARALLAX EFFECTS (Optional Enhancement)
   ============================================ */

function initParallax() {
    const parallaxElements = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.getElementById('hamburger');
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Optimize scroll handler
const optimizedScrollHandler = throttle(() => {
    // Scroll-related operations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'images/PHOTO.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Run preload on page load
preloadResources();
