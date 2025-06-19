// Sistema de abas e funcionalidades interativas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Sistema de abas
    function switchTab(tabName) {
        // Remove classe active de todas as abas e links
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona classe active na aba e link selecionados
        const targetTab = document.getElementById(tabName);
        const targetLink = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab && targetLink) {
            targetTab.classList.add('active');
            targetLink.classList.add('active');
        }

        // Atualiza URL sem recarregar a página
        history.pushState(null, null, `#${tabName}`);
    }

    // Event listeners para links de navegação
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
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Inicializa animações
    animateOnScroll();

    // Efeito de digitação para o título
    function typeWriter(element, text, speed = 80) {
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
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // Animações para elementos flutuantes
    function animateFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.5}s`;
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
                setTimeout(animateCounters, 500);
                homeObserver.unobserve(entry.target);
            }
        });
    });

    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeObserver.observe(homeSection);
    }

    // Efeito de loading inicial
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">GOTIKO</div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                document.body.classList.add('loaded');
            }, 500);
        }, 1000);
    }

    // Executa loading inicial
    showLoadingAnimation();
}); 