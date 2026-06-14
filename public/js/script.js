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
   SKILL PROGRESS FILL - HOVER TRIGGERED
========================================== */

document.querySelectorAll('.skill-card').forEach(card => {
    const fill = card.querySelector('.skill-progress-fill');
    if (!fill) return;
    const targetWidth = fill.getAttribute('data-width');

    card.addEventListener('mouseenter', () => {
        fill.style.width = targetWidth;
    });
    card.addEventListener('mouseleave', () => {
        fill.style.width = '0';
    });
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


/* ==========================================
   NEW PORTFOLIO FEATURES LOGIC
   - Resume Preview Modal & Downloader
   - Skill Tabs & Scorecard Stars
   - Combined Project Filter & Search
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. RESUME PREVIEW MODAL & DOWNLOADER
    const viewResumeBtn = document.getElementById("viewResumeBtn");
    const resumeModal = document.getElementById("resumeModal");
    const closeResumeBtn = document.getElementById("closeResumeBtn");
    const printResumeBtn = document.getElementById("printResumeBtn");
    const downloadResumeBtn = document.getElementById("downloadResumeBtn");
    const resumeIframe = document.getElementById("resumeIframe");

    if (viewResumeBtn && resumeModal) {
        // Open Modal
        viewResumeBtn.addEventListener("click", () => {
            resumeModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Disable scroll
        });

        // Close Modal via button
        if (closeResumeBtn) {
            closeResumeBtn.addEventListener("click", () => {
                resumeModal.classList.remove("active");
                document.body.style.overflow = ""; // Enable scroll
            });
        }

        // Close Modal via click outside modal-content
        resumeModal.addEventListener("click", (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });

        // Print Resume
        if (printResumeBtn && resumeIframe) {
            printResumeBtn.addEventListener("click", () => {
                try {
                    resumeIframe.contentWindow.focus();
                    resumeIframe.contentWindow.print();
                } catch (e) {
                    console.error("Print error:", e);
                    // Fallback if cross-origin or blocked
                    window.open("assets/resume.pdf", "_blank").print();
                }
            });
        }

        // Animated Downloader
        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener("click", () => {
                const btnText = downloadResumeBtn.querySelector(".btn-text");
                const iconMain = downloadResumeBtn.querySelector(".icon-main");
                const iconLoading = downloadResumeBtn.querySelector(".icon-loading");
                const iconSuccess = downloadResumeBtn.querySelector(".icon-success");

                // Disable button during animation
                downloadResumeBtn.style.pointerEvents = "none";
                
                // State 1: Preparing
                btnText.textContent = "Preparing...";
                iconMain.style.display = "none";
                iconLoading.style.display = "inline-block";

                setTimeout(() => {
                    // State 2: Downloading
                    btnText.textContent = "Downloading...";
                    
                    // Trigger actual file download
                    const link = document.createElement("a");
                    link.href = "assets/resume.pdf";
                    link.download = "Mamidi_Vinay_Babu_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => {
                        // State 3: Success
                        btnText.textContent = "Downloaded!";
                        iconLoading.style.display = "none";
                        iconSuccess.style.display = "inline-block";
                        downloadResumeBtn.style.background = "#10b981";
                        downloadResumeBtn.style.borderColor = "#10b981";
                        downloadResumeBtn.style.color = "white";

                        // Reset button state
                        setTimeout(() => {
                            btnText.textContent = "Download";
                            iconSuccess.style.display = "none";
                            iconMain.style.display = "inline-block";
                            downloadResumeBtn.style.background = "";
                            downloadResumeBtn.style.borderColor = "";
                            downloadResumeBtn.style.color = "";
                            downloadResumeBtn.style.pointerEvents = "";
                        }, 3000);

                    }, 1200);

                }, 1000);
            });
        }
    }

    // 2. SKILL TABS FILTER
    const skillsTabButtons = document.querySelectorAll(".skills-tab-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    // Skills Category Filter Tabs
    skillsTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            skillsTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            skillCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    card.classList.remove("hidden");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px) scale(0.95)";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "";
                    }, 50);
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // 3. PROJECT FILTER & SEARCH COMBINED
    const projectSearchInput = document.getElementById("projectSearch");
    const projectFilterButtons = document.querySelectorAll(".project-filter-btn");
    const projectCards = document.querySelectorAll(".project-grid .project-card");

    let currentProjectFilter = "all";
    let currentProjectSearch = "";

    function filterProjects() {
        projectCards.forEach(card => {
            const category = card.getAttribute("data-category") || "";
            const tech = card.getAttribute("data-tech") || "";
            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const description = card.querySelector("p")?.textContent.toLowerCase() || "";
            
            const matchesCategory = currentProjectFilter === "all" || category === currentProjectFilter;
            
            const searchTerms = currentProjectSearch.toLowerCase().trim();
            const matchesSearch = searchTerms === "" || 
                title.includes(searchTerms) || 
                description.includes(searchTerms) || 
                tech.includes(searchTerms);

            if (matchesCategory && matchesSearch) {
                card.classList.remove("hidden");
                // Animate card appearance
                card.style.opacity = "0";
                card.style.transform = "translateY(15px) scale(0.98)";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0) scale(1)";
                }, 50);
            } else {
                card.classList.add("hidden");
            }
        });
    }

    // Event listener for project filter buttons
    projectFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            projectFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            currentProjectFilter = btn.getAttribute("data-filter") || "all";
            filterProjects();
        });
    });

    // Event listener for project search input
    if (projectSearchInput) {
        projectSearchInput.addEventListener("input", (e) => {
            currentProjectSearch = e.target.value;
            filterProjects();
        });
    }

    // 4. CERTIFICATE VIEW MODAL
    const certModal = document.getElementById("certModal");
    const certModalImg = document.getElementById("certModalImg");
    const certModalTitle = document.getElementById("certModalTitle");
    const certModalClose = document.getElementById("certModalClose");

    function openCertModal(src, title) {
        if (!certModal) return;
        // Reset animation by re-setting src
        certModalImg.src = "";
        certModalTitle.innerHTML = `<i class="fa-solid fa-certificate"></i> ${title}`;
        certModal.classList.add("active");
        document.body.style.overflow = "hidden";
        // Small delay so animation triggers fresh
        setTimeout(() => {
            certModalImg.src = src;
            certModalImg.alt = title;
        }, 50);
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Bind View buttons
    document.querySelectorAll(".cert-view-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".certificate-card");
            const src = card.getAttribute("data-cert-src");
            const title = card.getAttribute("data-cert-title");
            openCertModal(src, title);
        });
    });

    // Close via X button
    if (certModalClose) {
        certModalClose.addEventListener("click", closeCertModal);
    }

    // Close via backdrop click
    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }

    // Close via Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
            closeCertModal();
        }
    });
});