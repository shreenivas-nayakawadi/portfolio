// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check localStorage for theme preference
const currentTheme = localStorage.getItem('theme');

// Set initial theme
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
} else {
    document.body.classList.remove('dark-theme');
    icon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation
    themeToggle.classList.add('animate');
    setTimeout(() => {
        themeToggle.classList.remove('animate');
    }, 300);
});

// Listen for system theme changes
prefersDarkScheme.addListener(e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.classList.remove('dark-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show an alert
        console.log({ name, email, subject, message });
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .project-card, .experience-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.about-content, .project-card, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();