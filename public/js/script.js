/* ==========================================
   MOBILE MENU TOGGLE
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* Close menu when link clicked */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

/* Load saved theme */

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});


/* ==========================================
   TYPING EFFECT
========================================== */

const typingText = document.getElementById("typing-text");

const roles = [
    "Aspiring Software Developer",
    "Python Developer",
    "Data Analyst",
    "Full Stack Developer",
    "MCA Student"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }

    } else {

        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


/* ==========================================
   SCROLL REVEAL ANIMATION (Intersection Observer)
========================================== */

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .timeline-item, .certificate-card"
);

revealElements.forEach(el => {
    el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));


/* ==========================================
   ACTIVE NAVIGATION LINK
========================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    // Default to 'home' when at the very top of the page
    let current = window.scrollY < 120 ? "home" : "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        // Fixed pageYOffset tracking error via window.scrollY
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-link");
        }
    });
});


/* ==========================================
   NAVBAR SHADOW ON SCROLL
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }
});


/* ==========================================
   SKILL BAR ANIMATION (Intersection Observer)
========================================== */

const progressBars = document.querySelectorAll(".progress span");

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute("data-width");
            bar.style.width = targetWidth;
            bar.style.transition = "width 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
            observer.unobserve(bar);
        }
    });
}, {
    threshold: 0.1
});

progressBars.forEach(bar => {
    bar.style.width = "0";
    skillObserver.observe(bar);
});


/* ==========================================
   SMOOTH SCROLL OFFSET FIX
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth"
        });
    });
});


/* ==========================================
   SMART HIDE/SHOW HEADER ON SCROLL
========================================== */

let lastScrollTop = 0;
const headerEl = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide header
            headerEl.classList.add("header-hidden");
        } else {
            // Scrolling up - show header
            headerEl.classList.remove("header-hidden");
        }
    } else {
        headerEl.classList.remove("header-hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


/* ==========================================
   SCROLL PROGRESS & BACK TO TOP BUTTON
========================================== */

const scrollProgress = document.getElementById("scrollProgress");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const progressRingCircle = document.querySelector(".progress-ring__circle");
const circumference = 2 * Math.PI * 20;

if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${circumference}`;
    progressRingCircle.style.strokeDashoffset = `${circumference}`;
}

function handleScrollEffects() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    // Update scroll progress bar
    if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercentage}%`;
    }
    
    // Back to top button
    if (scrollTopBtn) {
        if (scrollTop > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
        
        // Update SVG Progress Ring
        if (progressRingCircle) {
            const offset = circumference - (scrollPercentage / 100) * circumference;
            progressRingCircle.style.strokeDashoffset = offset;
        }
    }
}

window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("resize", handleScrollEffects);
handleScrollEffects();

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ==========================================
   3D TILT EFFECT ON CARDS
========================================== */

const tiltElements = document.querySelectorAll(".skill-card, .project-card, .certificate-card");

tiltElements.forEach(el => {
    el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((centerY - y) / centerY) * 8; // Max 8 degrees tilt
        const rotateY = ((x - centerX) / centerX) * 8;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener("mouseleave", () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});


/* ==========================================
   CANVAS PARTICLE BACKGROUND
========================================== */

const canvas = document.getElementById("heroCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener("resize", () => {
        if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        initParticles();
    });
    
    const heroSection = document.getElementById("home");
    if (heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        
        heroSection.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
        }
        
        draw() {
            const isDark = document.body.classList.contains("dark-mode");
            ctx.fillStyle = isDark ? "rgba(96, 165, 250, 0.35)" : "rgba(37, 99, 235, 0.22)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor(width / 15), 65);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        const isDark = document.body.classList.contains("dark-mode");
        const lineColor = isDark ? "rgba(96, 165, 250, " : "rgba(37, 99, 235, ";
        
        particles.forEach((p, idx) => {
            p.update();
            p.draw();
            
            for (let j = idx + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    const opacity = ((100 - dist) / 100) * 0.12;
                    ctx.strokeStyle = lineColor + opacity + ")";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
            
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const opacity = ((mouse.radius - dist) / mouse.radius) * 0.18;
                    ctx.strokeStyle = lineColor + opacity + ")";
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
}


/* ==========================================
   CONTACT FORM SUBMISSION HANDLER
========================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Setup loading state
        formStatus.textContent = "Sending message...";
        formStatus.className = "form-status loading";
        formStatus.style.display = "block";
        
        const formData = {
            name: document.getElementById("formName").value,
            email: document.getElementById("formEmail").value,
            message: document.getElementById("formMessage").value
        };
        
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success state
                formStatus.textContent = result.message || "Message sent successfully!";
                formStatus.className = "form-status success";
                contactForm.reset();
            } else {
                // Server validation or limit error
                formStatus.textContent = result.error || "Failed to send message.";
                formStatus.className = "form-status error";
            }
        } catch (error) {
            console.error("Form submission error:", error);
            formStatus.textContent = "Unable to connect to the server. Please try again later.";
            formStatus.className = "form-status error";
        }
        
        // Auto hide status after 6 seconds
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 6000);
    });
}


/* ==========================================
   CONSOLE SIGNATURE
========================================== */

console.log("Portfolio developed for Mamidi Vinay Babu 🚀");