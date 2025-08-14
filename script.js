// Imperial Motors - Professional JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Fade In Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .car-card, .value-card, .esg-item, .contact-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Active Navigation Link Highlighting
    const currentPath = window.location.pathname;
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    navLinksAll.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath.includes('index.html') && linkPath.includes('index.html')) ||
            (currentPath === '/' && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });

    // Car Cards Hover Effects
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Simulate Car Purchase Form
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const customerName = formData.get('name');
            const selectedCar = formData.get('car');
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processando...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showMessage(`
                    <div class="message success">
                        <h3>🎉 Simulação Concluída com Sucesso!</h3>
                        <p>Obrigado <strong>${customerName}</strong> por simular sua compra do <strong>${selectedCar}</strong> na Imperial Motors.</p>
                        <p>Um de nossos consultores exclusivos entrará em contato em breve para finalizar todos os detalhes.</p>
                        <p><em>"Excelência sobre rodas"</em></p>
                    </div>
                `, 'success');
                
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Smooth scroll to message
                document.querySelector('.message').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 2000);
        });
    }

    // Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const customerName = formData.get('name');
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showMessage(`
                    <div class="message success">
                        <h3>✉️ Mensagem Enviada com Sucesso!</h3>
                        <p>Obrigado <strong>${customerName}</strong> por entrar em contato conosco.</p>
                        <p>Nossa equipe exclusiva responderá em até 24 horas.</p>
                        <p><em>Imperial Motors - "Excelência sobre rodas"</em></p>
                    </div>
                `, 'success');
                
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Smooth scroll to message
                document.querySelector('.message').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 1500);
        });
    }

    // Dynamic Car Price Formatting
    const priceElements = document.querySelectorAll('.car-price');
    priceElements.forEach(element => {
        const price = element.textContent;
        if (price.includes('R$')) {
            element.innerHTML = price.replace(/R\$ ([\d.,]+)/, '<span style="font-size: 0.8em;">R$</span> $1');
        }
    });

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Loading Animation for Images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    // ESG Section Interactive Effects
    const esgSections = document.querySelectorAll('.esg-section');
    esgSections.forEach(section => {
        const letter = section.querySelector('.esg-letter');
        if (letter) {
            section.addEventListener('mouseenter', () => {
                letter.style.transform = 'scale(1.1) rotate(5deg)';
                letter.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            
            section.addEventListener('mouseleave', () => {
                letter.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });

    // Typing Effect for Hero Title (only on homepage)
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle && window.location.pathname.includes('index.html')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Utils Functions
    function showMessage(content, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = content;
        
        // Insert at the top of the main content
        const main = document.querySelector('main') || document.body;
        const firstChild = main.firstElementChild;
        main.insertBefore(messageDiv.firstElementChild, firstChild);
        
        // Auto-remove message after 10 seconds
        setTimeout(() => {
            const message = document.querySelector('.message');
            if (message) {
                message.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => message.remove(), 500);
            }
        }, 10000);
    }

    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Car Simulation Interactive Features
    const carButtons = document.querySelectorAll('.car-button');
    carButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const carName = this.closest('.car-card').querySelector('.car-name').textContent;
            const carPrice = this.closest('.car-card').querySelector('.car-price').textContent;
            
            // Store selected car data in sessionStorage for the purchase page
            sessionStorage.setItem('selectedCar', JSON.stringify({
                name: carName,
                price: carPrice
            }));
        });
    });

    // Auto-populate purchase form if coming from car selection
    const carSelect = document.getElementById('car');
    if (carSelect) {
        const selectedCar = JSON.parse(sessionStorage.getItem('selectedCar') || '{}');
        if (selectedCar.name) {
            // Find and select the matching option
            const options = carSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.textContent.includes(selectedCar.name.split(' ')[0])) {
                    option.selected = true;
                }
            });
            
            // Clear the stored data
            sessionStorage.removeItem('selectedCar');
        }
    }

    // Add hover sound effects (optional, commented out for now)
    /*
    function playHoverSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmzhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuL1/LNegsFJHfH8N2QQAoUXrTp66hVFA==');
        audio.volume = 0.1;
        audio.play().catch(() => {});
    }
    
    const interactiveElements = document.querySelectorAll('.cta-button, .car-button, .submit-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
    */

    console.log('🏎️ Imperial Motors - Sistema carregado com sucesso!');
    console.log('✨ "Excelência sobre rodas" ✨');
});
