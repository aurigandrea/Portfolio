// Project data with detailed information
const projectData = {
    1: {
        title: "Website for Research",
        description: "Simple but creative research display",
        fullDescription: "Website for my interview at the National Library of Scotland about the Archive of Tomorrow research project. Spoiler alert: got the job. I wanted to play with shapes on the landing page. I focused on interesting geometry and colours. It's optimised for desktop window.",
        tags: ["Infographics", "CSS", "JavaScript"],
        image: "img/Project1/project1.png",
        demoVideo: "img/Project1/Project1.mov",
        code: "https://github.com/aurigandero/AoTNLS"
    },
    2: {
        title: "Creative Storytelling",
        description: "Interactive app to explore multiple research projects",
        fullDescription: "This website is a Virtual Town. On a map thematic building icons spawn randomly which function as links to thematic projects. The projects are Digital Storytelling outputs of the Research Communications class designed and taught by Dr Andrea Kocsis at Anglia Ruskin University in 2024. Look around the Town: https://aruhippstown.netlify.app/",
        tags: ["JavaScript", "CSS", "Storytelling"],
        image: "img/Project2/Project 2.png",
        demoVideo: "img/Project2/Project2.mov",
        code: "https://github.com/aurigandrea/ARUShowcase"
    },
    3: {
        title: "Research Game",
        description: "Gamified research output",
        fullDescription: "Feeding the Future is a small educational card game that compares food items by sustainability and nutrition metrics. Developed for the TRAnsforming the DEbate about Livestock Systems Transformation (TRADE) project. Fancy a round of cards? https://aurigandrea.github.io/FeedingTheFuture/",
        tags: ["JavaScript", "Data Storytelling", "Gamification"],
        image: "img/Project3/Project3.png",
        demoVideo: "img/Project3/Project3.mov",
        code: "#"
    },
    4: {
        title: "Custom CMS Full Stack",
        description: "Research blog from scratch",
        fullDescription: "A secure, multi-login research blog, with a Content Management System from scratch and custom social media sharing functions. Looks good on both mobile and desktop. Read around: https://heritagedigital.org/",
        tags: ["Node.js", "Full Stack", "Python"],
        image: "img/Project4/Project4.png",
        demoVideo: "img/Project4/Project4.mov",
        code: "https://github.com/aurigandrea/nudigitalheritage"
    },
    5: {
        title: "Walking App",
        description: "Walking app from archival research",
        fullDescription: "Web app developed for the Unforgotten Lives exhibition at the London Metropolitan Archives for the Mapping Black London research team. Visitors scanned the QR code and carried the exhibition farther on their phones, exploring the heritage of pre-Windrush Black Londoners around them. The app follows you on the map.",
        tags: ["JavaScript", "Data-driven", "Mapping"],
        image: "img/Project5/Project5.png",
        demoVideo: "img/Project5/Project 5.mov",
        code: "#"
    },
    6: {
        title: "Exhibition Kiosk",
        description: "Kiosk for audience engagement",
        fullDescription: "During the Digital Ghosts exhibition, visitors could save their own web archive. The app archives the input on Wayback Machine and also curates a list of the submitted websites.",
        tags: ["JavaScript", "Web Archiving", "Interactive"],
        image: "img/Project6/Project6.png",
        demoVideo: "img/Project6/Project6.mov",
        code: "#"
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const videoModal = document.getElementById('videoModal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalClose = document.querySelectorAll('.modal-close');
const viewDetailsButtons = document.querySelectorAll('.view-details');
const projectCards = document.querySelectorAll('.project-card');

// Open modal with project details
function openModal(projectId) {
    const project = projectData[projectId];
    
    // Get modal image and video elements
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    // Always show image in the modal
    modalImage.src = project.image;
    modalImage.style.display = 'block';
    modalVideo.style.display = 'none';
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalFullDescription').textContent = project.fullDescription;
    
    // Clear and populate tags
    const modalTags = document.getElementById('modalTags');
    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });
    
    // Update links
    const modalLinks = document.querySelector('.modal-links');
    
    // Check if this project has a demo video or live demo
    if (project.demoVideo) {
        // Only show View Code button if code link is not "#"
        const codeButton = project.code !== '#' 
            ? `<a href="${project.code}" class="btn-secondary" target="_blank">View Code</a>` 
            : '';
        
        modalLinks.innerHTML = `
            <button class="btn-primary" id="watchDemoBtn">Watch Demo</button>
            ${codeButton}
        `;
        
        // Add event listener for Watch Demo button
        document.getElementById('watchDemoBtn').addEventListener('click', () => {
            openVideoModal(project.demoVideo);
        });
    } else {
        // Only show View Code button if code link is not "#"
        const codeButton = project.code !== '#' 
            ? `<a href="${project.code}" class="btn-secondary" target="_blank">View Code</a>` 
            : '';
        
        modalLinks.innerHTML = `
            <a href="${project.liveDemo}" class="btn-primary" target="_blank">Live Demo</a>
            ${codeButton}
        `;
    }
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open video modal
function openVideoModal(videoSrc) {
    const demoVideo = document.getElementById('demoVideo');
    demoVideo.src = videoSrc;
    videoModal.classList.add('active');
}

// Close video modal
function closeVideoModal() {
    const demoVideo = document.getElementById('demoVideo');
    demoVideo.pause();
    demoVideo.src = '';
    videoModal.classList.remove('active');
}

// Event listeners for opening modal
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open if clicking on a link inside the card
        if (e.target.tagName !== 'A') {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        }
    });
    
    // Auto-play video preview on hover
    const video = card.querySelector('.project-video-preview');
    if (video) {
        card.addEventListener('mouseenter', () => {
            video.play();
        });
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// Event listeners for closing modal
modalClose.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeModal();
        closeVideoModal();
    });
});

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
        closeModal();
        closeVideoModal();
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            closeModal();
        }
        if (videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    }
});

// Smooth scroll animation
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

// Parallax effect on hero section
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero) {
        const opacity = 1 - (scrollY / 500);
        const translateY = scrollY * 0.5;
        hero.style.opacity = Math.max(opacity, 0);
        hero.style.transform = `translateY(${translateY}px)`;
    }
    
    lastScrollY = scrollY;
});

// Add intersection observer for scroll animations
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

// Observe project cards for stagger animation
const cards = document.querySelectorAll('.project-card');
cards.forEach((card, index) => {
    observer.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent modal scroll on body
modal.addEventListener('wheel', (e) => {
    e.stopPropagation();
});

// Add touch support for mobile
let touchStartY = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

modal.addEventListener('touchmove', (e) => {
    const modalContent = document.querySelector('.modal-content');
    const touchY = e.touches[0].clientY;
    const scrollTop = modalContent.scrollTop;
    
    // Only close if swiping down from the top
    if (scrollTop === 0 && touchY > touchStartY + 50) {
        closeModal();
    }
});

// Navbar functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// EmailJS initialization
const EMAILJS_PUBLIC_KEY = '4-OUV3n4Z6mgZIkRQ';
const EMAILJS_SERVICE_ID = 'service_14hq5fh';
const EMAILJS_TEMPLATE_ID = 'template_nkdm1da';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Honeypot spam protection - if this field is filled, it's a bot
        const honeypot = document.getElementById('website').value;
        if (honeypot) {
            return false;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                alert('Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert('Oops! Something went wrong. Please try again or email me directly at aurigandrea@gmail.com');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}
