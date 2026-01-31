// Portfolio Website - JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio Website Initialized");
    
    // ========== GLOBAL VARIABLES ==========
    let currentTheme = localStorage.getItem('theme') || 'light';
    let projects = [];
    let filteredProjects = [];
    let visibleProjects = 3;
    
    // ========== DOM ELEMENTS ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const projectCount = document.getElementById('projectCount');
    const clientCount = document.getElementById('clientCount');
    const experienceYears = document.getElementById('experienceYears');
    const downloadResume = document.getElementById('downloadResume');
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreProjects = document.getElementById('loadMoreProjects');
    const contactForm = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');
    
    // ========== THEME TOGGLE ==========
    function initTheme() {
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            currentTheme = 'light';
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', currentTheme);
    });
    
    // ========== MOBILE MENU ==========
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ========== BACK TO TOP BUTTON ==========
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== ANIMATED COUNTERS ==========
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Initialize counters when in viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters
                animateCounter(projectCount, 24);
                animateCounter(clientCount, 18);
                animateCounter(experienceYears, 5);
                
                // Animate skill bars
                document.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = `${width}%`;
                    }, 300);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe hero section for counters
    const heroSection = document.querySelector('.hero');
    observer.observe(heroSection);
    
    // ========== PROJECTS DATA ==========
    projects = [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive admin dashboard for e-commerce management with real-time analytics and inventory tracking.",
            category: "web",
            tags: ["React", "Chart.js", "Node.js", "MongoDB"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Fitness Tracking App",
            description: "Mobile application for tracking workouts, nutrition, and fitness goals with social features.",
            category: "mobile",
            tags: ["React Native", "Firebase", "Redux"],
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80"
        },
        {
            id: 3,
            title: "Travel Booking Platform",
            description: "Full-featured travel booking website with hotel search, flight booking, and itinerary management.",
            category: "web",
            tags: ["Vue.js", "Express", "PostgreSQL", "Stripe"],
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "Food Delivery App UI",
            description: "Modern UI design for a food delivery application with smooth animations and intuitive navigation.",
            category: "design",
            tags: ["Figma", "UI/UX", "Prototyping"],
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "Cryptocurrency Tracker",
            description: "Real-time cryptocurrency tracking dashboard with price alerts and portfolio management.",
            category: "web",
            tags: ["React", "WebSocket", "API", "Chart.js"],
            image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "Meditation App",
            description: "Mobile application for guided meditation and mindfulness with progress tracking.",
            category: "mobile",
            tags: ["Flutter", "Dart", "Audio", "Firebase"],
            image: "https://images.unsplash.com/photo-1545389336-cf0900436f7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 7,
            title: "Real Estate Website",
            description: "Property listing website with advanced search filters, virtual tours, and agent management.",
            category: "web",
            tags: ["Next.js", "TypeScript", "Mapbox", "Tailwind"],
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 8,
            title: "Banking App Redesign",
            description: "Complete redesign of a banking application focusing on accessibility and user experience.",
            category: "design",
            tags: ["Sketch", "User Testing", "Wireframing"],
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];
    
    filteredProjects = [...projects];
    
    // ========== RENDER PROJECTS ==========
    function renderProjects() {
        projectsGrid.innerHTML = '';
        
        const projectsToShow = filteredProjects.slice(0, visibleProjects);
        
        if (projectsToShow.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <h3>No projects found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }
        
        projectsToShow.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            
            // Get category display name
            let categoryName = '';
            switch(project.category) {
                case 'web': categoryName = 'Web App'; break;
                case 'mobile': categoryName = 'Mobile App'; break;
                case 'design': categoryName = 'UI/UX Design'; break;
            }
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <span class="project-category">${categoryName}</span>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                        <a href="#" class="project-link">
                            <i class="fab fa-github"></i>
                            <span>Code</span>
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Show/hide load more button
        if (visibleProjects >= filteredProjects.length) {
            loadMoreProjects.style.display = 'none';
        } else {
            loadMoreProjects.style.display = 'inline-flex';
        }
    }
    
    // ========== PROJECT FILTERING ==========
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                filteredProjects = [...projects];
            } else {
                filteredProjects = projects.filter(project => project.category === filter);
            }
            
            visibleProjects = 3;
            renderProjects();
        });
    });
    
    // ========== LOAD MORE PROJECTS ==========
    loadMoreProjects.addEventListener('click', function() {
        visibleProjects += 3;
        renderProjects();
        
        // Scroll to newly loaded projects
        if (visibleProjects > 6) {
            const projectCards = document.querySelectorAll('.project-card');
            if (projectCards.length > 3) {
                projectCards[projectCards.length - 3].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });
    
    // ========== SKILLS CHART ==========
    function initSkillsChart() {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        
        const skillsData = {
            labels: ['Frontend', 'Backend', 'Design', 'Tools', 'Soft Skills'],
            datasets: [{
                data: [90, 70, 85, 80, 95],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(230, 126, 34, 0.8)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 15
            }]
        };
        
        const config = {
            type: 'doughnut',
            data: skillsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
                            padding: 20,
                            font: {
                                family: "'Raleway', sans-serif",
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        };
        
        const skillsChart = new Chart(ctx, config);
        
        // Update chart colors on theme change
        themeToggle.addEventListener('click', function() {
            setTimeout(() => {
                skillsChart.options.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
                skillsChart.update();
            }, 100);
        });
    }
    
    // ========== CONTACT FORM ==========
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show a success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#2ecc71';
            
            // Reset form
            contactForm.reset();
            
            // Show notification
            showNotification('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
    
    // ========== DOWNLOAD RESUME ==========
    downloadResume.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Alex-Morgan-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        showNotification('Resume download started!');
    });
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Add close button functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Add keyframes for animation
        if (!document.getElementById('notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // ========== CURRENT YEAR ==========
    currentYear.textContent = new Date().getFullYear();
    
    // ========== INITIALIZATION ==========
    function init() {
        // Initialize theme
        initTheme();
        
        // Render initial projects
        renderProjects();
        
        // Initialize skills chart
        if (document.getElementById('skillsChart')) {
            initSkillsChart();
        }
        
        console.log("Portfolio Website Ready");
        
        // Show welcome notification
        setTimeout(() => {
            showNotification('Welcome to my portfolio! Explore my work and skills.');
        }, 1000);
    }
    
    // Call initialization
    init();
});