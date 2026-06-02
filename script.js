// script.js - Interactive Portfolio Functionality

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // 1. MOBILE HAMBURGER MENU
    // ========================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when a nav link is clicked
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========================
    // 2. PORTFOLIO PROJECTS DATA & FILTERING
    // ========================
    const projectsData = [
        {
            id: 1,
            title: "LUMINA Studio",
            description: "Interactive brand platform for creative agency with fluid animations.",
            category: "web",
            img: "https://placehold.co/600x400/f5eef0/8b5f6e?text=LUMINA",
            tag: "Web App"
        },
        {
            id: 2,
            title: "FinTech Dashboard",
            description: "User-centric dashboard for financial analytics, fully responsive.",
            category: "ui",
            img: "https://placehold.co/600x400/e8e2f0/6a4e6e?text=DASHBOARD",
            tag: "UI/UX"
        },
        {
            id: 3,
            title: "Bloom Cosmetics",
            description: "Minimalist e-commerce rebranding & design system.",
            category: "brand",
            img: "https://placehold.co/600x400/fdeef2/b6687a?text=BLOOM",
            tag: "Branding"
        },
        {
            id: 4,
            title: "Voyage Travel",
            description: "Interactive trip planner with immersive storytelling.",
            category: "web",
            img: "https://placehold.co/600x400/dce8f2/5e6c8c?text=VOYAGE",
            tag: "Web App"
        },
        {
            id: 5,
            title: "Artify Gallery",
            description: "Minimal UI/UX concept for digital art marketplace.",
            category: "ui",
            img: "https://placehold.co/600x400/ffe6e6/bb6b6b?text=ARTIFY",
            tag: "UI/UX"
        },
        {
            id: 6,
            title: "Nomad Essentials",
            description: "Visual identity & packaging design for sustainable brand.",
            category: "brand",
            img: "https://placehold.co/600x400/f2efe0/9e8b5e?text=NOMAD",
            tag: "Branding"
        }
    ];
    
    const workGrid = document.getElementById('workGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';
    
    function renderProjects(filter) {
        if (!workGrid) return;
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);
        
        if (filteredProjects.length === 0) {
            workGrid.innerHTML = `<div class="no-projects">No projects in this category yet ✨</div>`;
            return;
        }
        
        const projectsHTML = filteredProjects.map(project => `
            <div class="work-card" data-category="${project.category}">
                <img class="card-img" src="${project.img}" alt="${project.title}" loading="lazy">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="card-tag">${project.tag}</span>
            </div>
        `).join('');
        
        workGrid.innerHTML = projectsHTML;
    }
    
    if (filterBtns.length && workGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // update active button style
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // get filter value
                const filterValue = btn.getAttribute('data-filter');
                activeFilter = filterValue;
                renderProjects(activeFilter);
            });
        });
        
        // initial render
        renderProjects('all');
    }
    
    // ========================
    // 3. SKILLS SECTION DYNAMIC (with icons)
    // ========================
    const skillsData = [
        { name: "React", icon: "fab fa-react" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "HTML5/CSS3", icon: "fab fa-html5" },
        { name: "Figma", icon: "fab fa-figma" },
        { name: "Tailwind", icon: "fas fa-wind" },
        { name: "UI Design", icon: "fas fa-paintbrush" },
        { name: "Responsive Dev", icon: "fas fa-mobile-alt" },
        { name: "Git/Github", icon: "fab fa-github" }
    ];
    
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
        const skillsHTML = skillsData.map(skill => `
            <div class="skill-item">
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            </div>
        `).join('');
        skillsGrid.innerHTML = skillsHTML;
    }
    
    // ========================
    // 4. CONTACT FORM HANDLING with validation & feedback
    // ========================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // simple validation
            if (!name || !email || !message) {
                showFormFeedback('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormFeedback('Please enter a valid email address.', 'error');
                return;
            }
            
            // simulate successful message sending
            showFormFeedback(`Thanks ${name}! I'll get back to you soon. ✨`, 'success');
            contactForm.reset();
            
            // optional: clear success message after 5 seconds
            setTimeout(() => {
                if (formFeedback) formFeedback.style.display = 'none';
            }, 5000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return emailRegex.test(email);
    }
    
    function showFormFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.textContent = message;
        formFeedback.style.display = 'block';
        formFeedback.style.color = type === 'error' ? '#e03a3a' : '#2c7a4d';
        formFeedback.style.fontWeight = '500';
        formFeedback.style.marginTop = '12px';
        
        // auto hide after 4 seconds (only for success)
        if (type === 'success') {
            setTimeout(() => {
                if (formFeedback) formFeedback.style.display = 'none';
            }, 4000);
        }
    }
    
    // ========================
    // 5. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ========================
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 80; // adjust for sticky header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================
    // 6. INTERSECTION OBSERVER (subtle fade-in on scroll)
    // ========================
    const fadeElements = document.querySelectorAll('.work-card, .skill-item, .hero-content, .contact-wrapper');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1), transform 0.5s ease';
        observer.observe(el);
    });
    
    // Force hero content to fade sooner
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(0)';
        observer.observe(heroContent);
    }
    
    // ========================
    // 7. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    // ========================
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach(link => {
            link.classList.remove('active-nav');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active-nav');
                link.style.color = '#c44569';
            } else {
                link.style.color = '#2d2d3a';
            }
        });
    }
    
    // add active-nav style and run on scroll
    const style = document.createElement('style');
    style.textContent = `
        .active-nav {
            color: #c44569 !important;
            font-weight: 700;
        }
        .nav-link {
            transition: color 0.2s;
        }
        .no-projects {
            text-align: center;
            padding: 3rem;
            background: #fefafc;
            border-radius: 2rem;
            color: #c44569;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // call once on load
    
    // ========================
    // 8. ADD SIMPLE HOVER EFFECT FOR WORK CARDS (prevent image glitch)
    // ========================
    const styleHover = document.createElement('style');
    styleHover.textContent = `
        .work-card img {
            transition: transform 0.4s ease;
        }
        .work-card:hover img {
            transform: scale(1.02);
        }
        .form-feedback {
            font-size: 0.85rem;
            transition: all 0.2s;
        }
        input, textarea {
            transition: all 0.2s;
        }
        button[type="submit"] {
            cursor: pointer;
        }
    `;
    document.head.appendChild(styleHover);
    
    // small console greeting (polite)
    console.log("✨ Portfolio ready | Elena Rivera — responsive & dynamic");
});