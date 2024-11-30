// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const percentage = document.querySelector('.loader-percentage');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1;
        percentage.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.display = 'none';
                showWelcomeModal();
                if (!localStorage.getItem('cookiesAccepted')) {
                    showCookieNotice();
                }
            }, 500);
        }
    }, 20);
});

// Welcome Modal
function showWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    welcomeModal.style.display = 'flex';
    setTimeout(() => {
        welcomeModal.querySelector('.welcome-content').style.opacity = '1';
        welcomeModal.querySelector('.welcome-content').style.transform = 'translateY(0)';
    }, 100);

    // Typing effect
    const typed = new Typed('.typed-welcome', {
        strings: ["I'M Full Stack Developer", "I'M UI/UX Designer", "I'M Problem Solver"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}

function startExploring() {
    const welcomeModal = document.getElementById('welcomeModal');
    welcomeModal.querySelector('.welcome-content').style.opacity = '0';
    welcomeModal.querySelector('.welcome-content').style.transform = 'translateY(20px)';
    setTimeout(() => {
        welcomeModal.style.display = 'none';
        showCookieNotice();
    }, 300);
}

// Cookie Notice
function showCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    cookieNotice.style.display = 'block';
    setTimeout(() => {
        cookieNotice.style.transform = 'translateY(0)';
    }, 100);
}

function acceptAllCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieNotice').style.transform = 'translateY(150%)';
    showNotification('success', 'Cookies preferences saved!');
}

function acceptSelectedCookies() {
    const analytics = document.getElementById('analyticsCookies').checked;
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('analyticsAccepted', analytics);
    document.getElementById('cookieNotice').style.transform = 'translateY(150%)';
    showNotification('success', 'Cookie preferences saved!');
}

// Notification Toast
function showNotification(type, message) {
    const toast = document.getElementById('notificationToast');
    const icon = toast.querySelector('.notification-icon');
    const messageEl = toast.querySelector('.notification-message');
    
    icon.className = 'notification-icon fas';
    if (type === 'success') {
        icon.classList.add('fa-check-circle');
        icon.style.color = '#4CAF50';
    } else {
        icon.classList.add('fa-exclamation-circle');
        icon.style.color = '#f44336';
    }
    
    messageEl.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

function closeNotification() {
    const toast = document.getElementById('notificationToast');
    toast.style.transform = 'translateX(150%)';
}
const typedText = document.querySelector('.typed-text');
const texts = [
    'Computer Science Student',
    'Web Developer',
    'UI/UX Designer',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, newTextDelay);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, typingDelay);
        return;
    }

    setTimeout(type, isDeleting ? erasingDelay : typingDelay);
}

// Start typing animation
setTimeout(type, newTextDelay);

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.innerHTML = '<div class="loading"></div>';
    submitBtn.disabled = true;
    
    try {
        // Replace with your form handling logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
});

// Mobile Navigation
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '<i class="fas fa-bars"></i>';

navbar.appendChild(navToggle);

navToggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Add mobile navigation styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-toggle {
            display: block;
            background: none;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            flex-direction: column;
            text-align: center;
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: scaleY(1);
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background when scrolling
    if (currentScroll > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll up/down
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScroll = currentScroll;
});

// Dropdown Menu for Mobile
const dropdownLinks = document.querySelectorAll('.nav-link-dropdown');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        link.classList.toggle('active');
        
        if (dropdown.style.maxHeight) {
            dropdown.style.maxHeight = null;
        } else {
            dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add loading indicator for page transitions
const pageLinks = document.querySelectorAll('a[href^="#"]');

pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        // Add loading animation
        link.classList.add('loading');
        
        // Smooth scroll to target
        target.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Remove loading animation after transition
        setTimeout(() => {
            link.classList.remove('loading');
        }, 500);
    });
});

// Mobile Bottom Navigation
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenu = document.querySelector('.close-menu');

// Handle mobile nav item clicks
mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
    });
});

// Toggle menu overlay
menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close menu overlay
closeMenu.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close menu when clicking outside
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Update active state based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Resume Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabId) {
        // Hide all tabs
        tabContents.forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });

        // Remove active class from all buttons
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabId);
        const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);

        if (selectedTab && selectedBtn) {
            selectedTab.style.display = 'block';
            setTimeout(() => {
                selectedTab.classList.add('active');
            }, 10);
            selectedBtn.classList.add('active');

            // Animate progress bars if professional skills tab
            if (tabId === 'professional') {
                const progressBars = selectedTab.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    }

    // Add click event to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // Show first tab by default
    showTab('education');
});

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Hide all items first
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
});

// Portfolio Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = modal.querySelector('.modal-category');
    const modalTitle = modal.querySelector('.modal-title');
    const likesCount = modal.querySelector('.likes-count');
    const viewsCount = modal.querySelector('.views-count');
    const modalDescription = modal.querySelector('.modal-description');
    const clientName = modal.querySelector('.client-name');
    const projectDate = modal.querySelector('.project-date');
    const toolsList = modal.querySelector('.tools-list');
    
    // Project Details Data
    const projectDetails = {
        'content1': {
            title: 'Website Content Strategy',
            category: 'Content Writing',
            image: 'assets/portfolio/content1.jpg',
            likes: '265',
            views: '524',
            description: 'Developed comprehensive content strategy for a corporate website, including SEO optimization and user engagement improvements.',
            client: 'Tech Solutions Ltd',
            date: 'March 2024',
            tools: ['Content Strategy', 'SEO', 'WordPress', 'Analytics'],
            liveLink: '#'
        },
        'seo1': {
            title: 'E-commerce SEO Strategy',
            category: 'SEO',
            image: 'assets/portfolio/seo1.jpg',
            likes: '456',
            views: '789',
            description: 'Implemented SEO strategies for an e-commerce platform, resulting in 150% increase in organic traffic.',
            client: 'Fashion Store',
            date: 'February 2024',
            tools: ['SEO', 'Google Analytics', 'Keyword Research'],
            liveLink: '#'
        },
        // Add more project details as needed
    };

    // Open Modal
    document.querySelectorAll('.portfolio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioItem = btn.closest('.portfolio-item');
            const projectId = portfolioItem.querySelector('img').src.split('/').pop().split('.')[0];
            const details = projectDetails[projectId];

            if (details) {
                modalImage.src = details.image;
                modalCategory.textContent = details.category;
                modalTitle.textContent = details.title;
                likesCount.textContent = details.likes;
                viewsCount.textContent = details.views;
                modalDescription.textContent = details.description;
                clientName.textContent = details.client;
                projectDate.textContent = details.date;
                
                // Clear and populate tools
                toolsList.innerHTML = '';
                details.tools.forEach(tool => {
                    const toolTag = document.createElement('span');
                    toolTag.className = 'tool-tag';
                    toolTag.textContent = tool;
                    toolsList.appendChild(toolTag);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Like Button Functionality
    const likeBtn = modal.querySelector('.btn-like');
    likeBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
        const count = parseInt(likesCount.textContent);
        likesCount.textContent = icon.classList.contains('fas') ? count + 1 : count - 1;
    });
});

// Client Section Filtering
document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const clientCards = document.querySelectorAll('.client-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            // Filter clients
            clientCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = null;

                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Hover effect for client cards
    clientCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const info = card.querySelector('.client-info');
            info.style.opacity = '1';
            info.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', () => {
            const info = card.querySelector('.client-info');
            info.style.opacity = '0';
            info.style.transform = 'translateY(20px)';
        });
    });
});

// Connection checking function
function checkInternetConnection() {
    if (!navigator.onLine) {
        window.location.href = '/errors.html';
    }
}

// Check connection when page loads
window.addEventListener('load', checkInternetConnection);

// Check connection when it changes
window.addEventListener('online', () => {
    window.location.href = '/'; // Redirect to home page when connection is restored
});

window.addEventListener('offline', checkInternetConnection);

// Check for failed resource loading
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT') {
        checkInternetConnection();
    }
}, true);

// Error handling functions
function showConnectionError() {
    const errorDiv = document.getElementById('connectionError');
    errorDiv.classList.add('show');
}

function hideConnectionError() {
    const errorDiv = document.getElementById('connectionError');
    errorDiv.classList.remove('show');
}

function show404Error() {
    const errorDiv = document.getElementById('pageNotFound');
    errorDiv.classList.add('show');
}

function hide404Error() {
    const errorDiv = document.getElementById('pageNotFound');
    errorDiv.classList.remove('show');
}

function checkConnection() {
    if (navigator.onLine) {
        hideConnectionError();
        location.reload();
    } else {
        showConnectionError();
    }
}

function goBack() {
    window.history.back();
}

// Event listeners for connection status
window.addEventListener('online', () => {
    hideConnectionError();
    location.reload();
});

window.addEventListener('offline', () => {
    showConnectionError();
});

// Handle 404 errors
window.addEventListener('load', () => {
    if (document.querySelector('.page-not-found-indicator')) {
        show404Error();
    }
});

// Handle failed resource loading
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT') {
        if (!navigator.onLine) {
            showConnectionError();
        }
    }
}, true); 
