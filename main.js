// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotX = mouseX;
    dotY = mouseY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-box, .skill-tag');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Spotlight effect
const spotlight = document.getElementById('spotlight');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    spotlight.style.setProperty('--spotlight-x', `${x}%`);
    spotlight.style.setProperty('--spotlight-y', `${y}%`);
});

// Floating particles
function createParticles() {
    const particleBg = document.querySelector('.particle-bg');
    const colors = ['#667eea', '#764ba2', '#f5576c', '#4facfe', '#00f2fe'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;

        particleBg.appendChild(particle);
    }
}

createParticles();

// Project toggle
function toggleProject(projectId) {
    const projectDescription = document.getElementById(projectId);
    const projectBox = projectDescription.previousElementSibling;

    document.querySelectorAll('.project-description').forEach(desc => {
        if (desc.id !== projectId) {
            desc.classList.remove('active');
            desc.previousElementSibling.classList.remove('active');
        }
    });

    projectDescription.classList.toggle('active');
    projectBox.classList.toggle('active');
}

// Close project on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-box') && !e.target.closest('.project-description')) {
        document.querySelectorAll('.project-description').forEach(desc => {
            desc.classList.remove('active');
        });
        document.querySelectorAll('.project-box').forEach(box => {
            box.classList.remove('active');
        });
    }
});

// Resume Modal
const resumeModal = document.getElementById('resumeModal');
const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModalClose = document.getElementById('resumeModalClose');

function openResumeModal() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

viewResumeBtn.addEventListener('click', openResumeModal);
resumeModalClose.addEventListener('click', closeResumeModal);

// Close on backdrop click
resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

// Floating contact widget
const contactWidget = document.getElementById('contactWidget');
const contactPanel = document.getElementById('contactPanel');
const contactWidgetToggle = document.getElementById('contactWidgetToggle');
const contactWidgetClose = document.getElementById('contactWidgetClose');
const contactForm = document.getElementById('contactForm');

function setContactWidgetOpen(isOpen) {
    contactWidget.classList.toggle('open', isOpen);
    contactWidgetToggle.setAttribute('aria-expanded', String(isOpen));
    contactPanel.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
        const firstField = document.getElementById('contactName');
        setTimeout(() => firstField?.focus(), 120);
    }
}

contactWidgetToggle.addEventListener('click', () => {
    const isOpen = contactWidget.classList.contains('open');
    setContactWidgetOpen(!isOpen);
});

contactWidgetClose.addEventListener('click', () => {
    setContactWidgetOpen(false);
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const body = [
        `Hi Gabriel,`,
        ``,
        message,
        ``,
        `From: ${name}`,
        `Email: ${email}`
    ].join('\n');

    const mailtoUrl = `mailto:gcbelandres08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
});

document.addEventListener('click', (event) => {
    if (!contactWidget.classList.contains('open')) return;
    if (!event.target.closest('#contactWidget')) {
        setContactWidgetOpen(false);
    }
});

// Shooting Stars
function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Random starting position across the top 60% of the screen
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.6;

    // Angle between 20–45 degrees (downward diagonal)
    const angleDeg = 20 + Math.random() * 25;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Distance the star travels
    const distance = 150 + Math.random() * 200;
    const travelX = Math.cos(angleRad) * distance;
    const travelY = Math.sin(angleRad) * distance;

    // Duration between 0.6s–1.2s
    const duration = 0.6 + Math.random() * 0.6;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.setProperty('--angle', `${angleDeg}deg`);
    star.style.setProperty('--travel-x', `${travelX}px`);
    star.style.setProperty('--travel-y', `${travelY}px`);
    star.style.animationDuration = `${duration}s`;

document.body.appendChild(star);

    // Remove after animation ends
    star.addEventListener('animationend', () => star.remove());
}

function scheduleShootingStar() {
    spawnShootingStar();
    // Next star appears every 1.5–4 seconds
    const nextDelay = 1500 + Math.random() * 2500;
    setTimeout(scheduleShootingStar, nextDelay);
}

scheduleShootingStar();

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactWidget.classList.contains('open')) {
        setContactWidgetOpen(false);
    }
});
