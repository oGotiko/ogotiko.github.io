// Sistema de abas e funcionalidades interativas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function switchTab(tabName) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const targetTab = document.getElementById(tabName);
        const targetLink = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab && targetLink) {
            targetTab.classList.add('active');
            targetLink.classList.add('active');
        }

        history.pushState(null, null, `#${tabName}`);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
            
            // Fecha menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Menu hamburger para mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Verifica URL inicial e carrega aba correspondente
    function loadInitialTab() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchTab(hash);
        } else {
            switchTab('home');
        }
    }

    // Carrega aba inicial
    loadInitialTab();

    // Animações de entrada para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.language, .timeline-item, .contact-card, .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -20px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Inicializa animações
    animateOnScroll();

    function typeWriter(element, text, speed = 150) {
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

    // Aplica efeito de digitação no título principal
    const heroTitle = document.querySelector('.hero-title .title-highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 20);
        }, 1000);
    }

    // Animações para elementos flutuantes
    function animateFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.8}s`;
            icon.classList.add('floating');
        });
    }

    // Inicializa animações flutuantes
    animateFloatingElements();

    // Contador animado para estatísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isInfinite = target === '∞';
            const isPercentage = target.includes('%');
            
            if (!isInfinite) {
                const finalValue = isPercentage ? parseInt(target) : parseInt(target);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const updateCounter = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        counter.textContent = isPercentage ? 
                            Math.ceil(currentValue) + '%' : 
                            Math.ceil(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }

    // Inicializa contadores quando a seção home estiver visível
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 20);
                homeObserver.unobserve(entry.target);
            }
        });
    });

    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeObserver.observe(homeSection);
    }

    
}); 

let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 30) {
        // DESCENDO
        navbar.classList.add('nav-hidden');
    } else {
        // SUBINDO
        navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
});