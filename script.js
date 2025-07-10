// Smooth scrolling for navigation links
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

// Navbar background change on scroll - handled by updateNavbarBackground function

// Add to cart functionality with enhanced product info
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productRating = productCard.querySelector('.rating-text').textContent;
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show enhanced notification
        showNotification(`${productName} added to cart! Price: ${productPrice} | Rating: ${productRating}`);
        
        // Update cart icon (if exists)
        const cartIcon = document.querySelector('.nav-icons .fa-shopping-cart');
        if (cartIcon) {
            cartIcon.style.color = '#007bff';
            setTimeout(() => {
                cartIcon.style.color = '#ffffff';
            }, 1000);
        }
        
        // Add to cart counter (if exists)
        updateCartCounter();
    });
});

// Cart counter functionality
let cartCount = 0;
function updateCartCounter() {
    cartCount++;
    const cartIcon = document.querySelector('.nav-icons .fa-shopping-cart');
    if (cartIcon) {
        // Remove existing counter
        const existingCounter = document.querySelector('.cart-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        // Add new counter
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = cartCount;
        counter.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff4757;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 600;
        `;
        
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(counter);
    }
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!');
            this.querySelector('input[type="email"]').value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Countdown timer
function updateCountdown() {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    if (countdownNumbers.length > 0) {
        // Set target date (2 days from now)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2);
        
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (countdownNumbers[0]) countdownNumbers[0].textContent = days.toString().padStart(2, '0');
        if (countdownNumbers[1]) countdownNumbers[1].textContent = hours.toString().padStart(2, '0');
        if (countdownNumbers[2]) countdownNumbers[2].textContent = minutes.toString().padStart(2, '0');
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown(); // Initial call

// Enhanced notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const bgColor = type === 'success' ? 'linear-gradient(45deg, #007bff, #00d4ff)' : 'linear-gradient(45deg, #ff4757, #ff3742)';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .testimonial-card, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Search functionality
const searchIcon = document.querySelector('.nav-icons .fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        showSearchModal();
    });
}

function showSearchModal() {
    // Create search modal
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-overlay"></div>
        <div class="search-content">
            <div class="search-header">
                <h3>Search Products</h3>
                <button class="close-search">&times;</button>
            </div>
            <div class="search-input-container">
                <input type="text" placeholder="Search for gaming PCs, laptops, components..." class="search-input">
                <button class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <div class="search-suggestions">
                <div class="suggestion-item">
                    <i class="fas fa-laptop"></i>
                    <span>ASUS ROG Strix G16</span>
                </div>
                <div class="suggestion-item">
                    <i class="fas fa-desktop"></i>
                    <span>Dell XPS 8940</span>
                </div>
                <div class="suggestion-item">
                    <i class="fas fa-microchip"></i>
                    <span>NVIDIA RTX 4070</span>
                </div>
                <div class="suggestion-item">
                    <i class="fas fa-microchip"></i>
                    <span>Intel Core i9-14900K</span>
                </div>
                <div class="suggestion-item">
                    <i class="fas fa-mouse"></i>
                    <span>Logitech G Pro Wireless</span>
                </div>
                <div class="suggestion-item">
                    <i class="fas fa-keyboard"></i>
                    <span>Corsair K95 RGB</span>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.querySelector('.search-overlay').style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    `;
    
    modal.querySelector('.search-content').style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        border: 1px solid rgba(0, 123, 255, 0.3);
        border-radius: 20px;
        padding: 2rem;
        width: 90%;
        max-width: 600px;
        position: relative;
        z-index: 2;
        backdrop-filter: blur(20px);
    `;
    
    modal.querySelector('.search-header').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    `;
    
    modal.querySelector('.search-header h3').style.cssText = `
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: 600;
    `;
    
    modal.querySelector('.close-search').style.cssText = `
        background: none;
        border: none;
        color: #b0b0b0;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
    `;
    
    modal.querySelector('.search-input-container').style.cssText = `
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    `;
    
    modal.querySelector('.search-input').style.cssText = `
        flex: 1;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(0, 123, 255, 0.3);
        border-radius: 10px;
        color: white;
        font-size: 1rem;
        outline: none;
    `;
    
    modal.querySelector('.search-btn').style.cssText = `
        padding: 1rem 1.5rem;
        background: linear-gradient(45deg, #007bff, #00d4ff);
        border: none;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    modal.querySelector('.search-suggestions').style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    `;
    
    modal.querySelectorAll('.suggestion-item').forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: rgba(0, 123, 255, 0.1);
            border: 1px solid rgba(0, 123, 255, 0.2);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #ffffff;
        `;
        
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(0, 123, 255, 0.2)';
            item.style.borderColor = 'rgba(0, 123, 255, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(0, 123, 255, 0.1)';
            item.style.borderColor = 'rgba(0, 123, 255, 0.2)';
        });
        
        item.addEventListener('click', () => {
            const productName = item.querySelector('span').textContent;
            showNotification(`Searching for: ${productName}`);
            modal.remove();
        });
    });
    
    // Add to page
    document.body.appendChild(modal);
    
    // Focus on input
    setTimeout(() => {
        modal.querySelector('.search-input').focus();
    }, 100);
    
    // Close functionality
    modal.querySelector('.close-search').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.search-overlay').addEventListener('click', () => {
        modal.remove();
    });
    
    // Search functionality
    modal.querySelector('.search-btn').addEventListener('click', () => {
        const query = modal.querySelector('.search-input').value;
        if (query.trim()) {
            showNotification(`Searching for: ${query}`);
            modal.remove();
        }
    });
    
    // Enter key to search
    modal.querySelector('.search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (query.trim()) {
                showNotification(`Searching for: ${query}`);
                modal.remove();
            }
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effects to category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Product rating hover effects
document.querySelectorAll('.product-rating').forEach(rating => {
    const stars = rating.querySelectorAll('.stars i');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            // Highlight stars up to current index
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#ffd700';
                    s.style.transform = 'scale(1.2)';
                }
            });
        });
        
        star.addEventListener('mouseleave', () => {
            // Reset all stars
            stars.forEach(s => {
                s.style.color = '#ffd700';
                s.style.transform = 'scale(1)';
            });
        });
    });
});

// Testimonial card interactions
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Product badge animations
document.querySelectorAll('.product-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.4)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Laptop badge animations
document.querySelectorAll('.laptop-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.4)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && subject && message) {
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Component item hover effects
document.querySelectorAll('.component-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Contact item hover effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Laptop card interactions
document.querySelectorAll('.laptop-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Component category interactions
document.querySelectorAll('.component-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light theme
let isDarkTheme = localStorage.getItem('theme') === 'dark';

// Apply initial theme
function applyTheme() {
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Toggle theme function
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        showNotification('Dark theme activated! 🌙');
    } else {
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        showNotification('Light theme activated! ☀️');
    }
}

// Apply initial theme on page load
applyTheme();

// Add click event to theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Update navbar background for dark theme
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        if (isDarkTheme) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 4px 20px rgba(0, 123, 255, 0.1)';
    } else {
        if (isDarkTheme) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
}

// Update the scroll event listener to use the new function
window.addEventListener('scroll', updateNavbarBackground); 