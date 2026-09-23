
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const languageToggle = document.querySelector('.language-toggle');
    let currentLanguage = 'pt';
    let typeWriterRun = 0;
    let heroTitle = null;

    const translations = {
        pt: {
            pageTitle: 'Portfólio de Gotiko - Programador', navHistory: 'História', navSkills: 'Conhecimentos', navContact: 'Contato',
            heroWelcome: 'Bem-vindo ao', heroTitle: 'Portfólio de Gotiko', statLanguages: 'Linguagens',
            statPossibilities: 'Possibilidades', statDedication: 'Dedicação',
            heroSubtitle: 'Programador apaixonado por tecnologia, desenvolvimento e inovação. Explore minhas habilidades e os projetos que realizo com dedicação e criatividade.',
            historyTitle: 'Minha Jornada', historyStartTitle: '<i class="fas fa-play-circle"></i> Início da Aventura',
            historyStartText: 'Comecei minha jornada na programação com Lua, criando experiências interativas no Roblox. Foi aqui que descobri minha paixão por criar mundos digitais.',
            historyGrowthTitle: '<i class="fas fa-chart-line"></i> Expansão de Conhecimentos',
            historyGrowthText: 'Explorei Python para automação e processamento de dados, descobrindo o poder da simplicidade e eficiência.',
            historyWebTitle: '<i class="fas fa-globe"></i> Mergulho no Desenvolvimento Web',
            historyWebText: 'JavaScript abriu as portas para o desenvolvimento web dinâmico, com foco em Node.js e futuras explorações em React.js.',
            historySystemsTitle: '<i class="fas fa-microchip"></i> Programação de Sistemas',
            historySystemsText: 'C e C++ me permitiram entender a fundo a computação, desenvolvendo aplicações de alto desempenho e jogos.',
            historyPlatformTitle: '<i class="fas fa-gamepad"></i> Desenvolvimento Multiplataforma',
            historyPlatformText: 'C# se tornou minha ferramenta principal para criação de jogos com Godot e desenvolvimento de soluções desktop robustas.',
            skillsTitle: 'Conhecimentos em Linguagens de Programação',
            skillC: '<strong class="c-color">C:</strong> Programação de baixo nível com foco em otimização de memória e controle de hardware.',
            skillCpp: '<strong class="cpp-color">C++:</strong> Desenvolvimento de jogos e aplicações de alto desempenho.',
            skillCsharp: '<strong class="csharp-color">C#:</strong> Criação de jogos interativos com Godot e desenvolvimento de soluções desktop. Uma linguagem poderosa para múltiplas plataformas.',
            skillLua: '<strong class="lua-color">Lua:</strong> Lua me permite criar mundos dinâmicos no Roblox e além. Comecei minha jornada aqui e continuo explorando suas possibilidades.',
            skillPython: '<strong class="python-color">Python:</strong> Automação e processamento de dados. Utilizo Python para criar soluções ágeis e eficientes.',
            skillJavascript: '<strong class="js-color">JavaScript:</strong> Desenvolvimento web dinâmico com Node.js. Meus objetivos são aprender sobre React.js com está linguagem.',
            contactTitle: 'Entre em Contato', contactIntro: 'Quer bater um papo sobre tecnologia ou discutir um projeto? Fique à vontade para me contatar nas redes abaixo:',
            footer: '&copy; 2025 Gotiko - Todos os direitos reservados.'
        },
        en: {
            pageTitle: 'Gotiko Portfolio - Developer', navHistory: 'History', navSkills: 'Skills', navContact: 'Contact',
            heroWelcome: 'Welcome to', heroTitle: "Gotiko's Portfolio", statLanguages: 'Languages',
            statPossibilities: 'Possibilities', statDedication: 'Dedication',
            heroSubtitle: 'A developer passionate about technology, development, and innovation. Explore my skills and the projects I build with dedication and creativity.',
            historyTitle: 'My Journey', historyStartTitle: '<i class="fas fa-play-circle"></i> The Beginning',
            historyStartText: 'I started my programming journey with Lua, creating interactive experiences on Roblox. That is where I discovered my passion for building digital worlds.',
            historyGrowthTitle: '<i class="fas fa-chart-line"></i> Expanding Knowledge',
            historyGrowthText: 'I explored Python for automation and data processing, discovering the power of simplicity and efficiency.',
            historyWebTitle: '<i class="fas fa-globe"></i> Diving into Web Development',
            historyWebText: 'JavaScript opened the door to dynamic web development, with a focus on Node.js and future explorations in React.js.',
            historySystemsTitle: '<i class="fas fa-microchip"></i> Systems Programming',
            historySystemsText: 'C and C++ helped me understand computing in depth while building high-performance applications and games.',
            historyPlatformTitle: '<i class="fas fa-gamepad"></i> Cross-Platform Development',
            historyPlatformText: 'C# became my main tool for creating games with Godot and developing robust desktop solutions.',
            skillsTitle: 'Programming Language Skills',
            skillC: '<strong class="c-color">C:</strong> Low-level programming focused on memory optimization and hardware control.',
            skillCpp: '<strong class="cpp-color">C++:</strong> Game development and high-performance applications.',
            skillCsharp: '<strong class="csharp-color">C#:</strong> Interactive games with Godot and desktop solutions. A powerful language for multiple platforms.',
            skillLua: '<strong class="lua-color">Lua:</strong> Lua lets me create dynamic worlds on Roblox and beyond. I started my journey here and keep exploring its possibilities.',
            skillPython: '<strong class="python-color">Python:</strong> Automation and data processing. I use Python to create agile and efficient solutions.',
            skillJavascript: '<strong class="js-color">JavaScript:</strong> Dynamic web development with Node.js. My goal is to learn React.js with this language.',
            contactTitle: 'Get in Touch', contactIntro: 'Want to talk about technology or discuss a project? Feel free to reach out through the networks below:',
            footer: '&copy; 2025 Gotiko - All rights reserved.'
        }
    };

    function setLanguage(language) {
        currentLanguage = language === 'en' ? 'en' : 'pt';
        const activeLanguage = currentLanguage;
        const dictionary = translations[activeLanguage];
        typeWriterRun++;
        document.documentElement.lang = activeLanguage === 'en' ? 'en' : 'pt-BR';
        document.querySelectorAll('[data-i18n]').forEach(element => {
            element.innerHTML = dictionary[element.dataset.i18n];
        });
        document.title = dictionary.pageTitle;
        languageToggle.dataset.language = activeLanguage;
        languageToggle.querySelector('.language-current').textContent = activeLanguage === 'en' ? 'EN' : 'PT';
        languageToggle.setAttribute('aria-label', activeLanguage === 'en' ? 'Mudar para português' : 'Switch to English');
        languageToggle.title = activeLanguage === 'en' ? 'Mudar para português' : 'Switch to English';
        localStorage.setItem('siteLanguage', activeLanguage);
        if (heroTitle) {
            heroTitle.textContent = dictionary.heroTitle;
        }
    }

    const savedLanguage = localStorage.getItem('siteLanguage');
    setLanguage(savedLanguage === 'en' ? 'en' : 'pt');
    languageToggle.addEventListener('click', () => {
        setLanguage(currentLanguage === 'en' ? 'pt' : 'en');
    });

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
        const run = ++typeWriterRun;
        element.innerHTML = '';
        
        function type() {
            if (run !== typeWriterRun) {
                return;
            }
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplica efeito de digitação no título principal
    heroTitle = document.querySelector('.hero-title .title-highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, heroTitle.textContent, 20);
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