// Hero Canvas Animation
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(30, 144, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function init() { for (let i = 0; i < 80; i++) particles.push(new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init();
animate();

// Reveal Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .slide-left, .slide-right').forEach(el => observer.observe(el));

// Consultation Modal Logic
const modal = document.getElementById('consultModal');
const closeModalBtn = document.getElementById('closeModal');
const triggerBtns = document.querySelectorAll('#navConsultBtn, #heroConsultBtn');

triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
};

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Testimonials
const testiWrapper = document.getElementById('testiWrapper');
const testiCards = document.querySelectorAll('.testi-card');
const testiDotsContainer = document.getElementById('testiDots');
let testiIndex = 0;

if (testiCards.length > 0) {
    testiCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('t-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(i));
        testiDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.t-dot');
    function showSlide(index) {
        testiIndex = index;
        testiWrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    setInterval(() => {
        testiIndex = (testiIndex + 1) % testiCards.length;
        showSlide(testiIndex);
    }, 5000);
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ——————————————————————————————
// GOOGLE APPS SCRIPT FORM SUBMIT + BUTTON LOADER
// ——————————————————————————————
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjsvss_TJRkoSmwhPYWn2mftdRvtbGS1HnEKqWV3GmnsvzDhII2x_EbeR1CDcaIbE2Rg/exec";

// CONSULTATION FORM
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = consultForm.querySelector("button[type='submit']");
        submitBtn.classList.add("btn-loading");
        submitBtn.innerText = "Sending...";

        let data = {};
        new FormData(consultForm).forEach((v, k) => data[k] = v);

        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(data)
        });

        submitBtn.classList.remove("btn-loading");
        submitBtn.innerText = "Submit Request";

        alert("Consultation request sent!");
        consultForm.reset();
        closeModal();
    });
}

// CAREER FORM
const careerForm = document.getElementById('careerForm');
if (careerForm) {
    careerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = careerForm.querySelector("button[type='submit']");
        submitBtn.classList.add("btn-loading");
        submitBtn.innerText = "Submitting...";

        let data = {};
        new FormData(careerForm).forEach((v, k) => data[k] = v);

        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(data)
        });

        submitBtn.classList.remove("btn-loading");
        submitBtn.innerText = "Apply Now";

        alert("Application submitted!");
        careerForm.reset();
    });
}const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});