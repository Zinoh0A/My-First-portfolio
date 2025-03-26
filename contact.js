document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const body = document.body;
    const modeImage = document.getElementById('modeImage');
    const icon = document.querySelector('.icon');
    const portfolioArrow = document.getElementById('portfolioArrow');
    const portfolioMenu = document.getElementById('portfolioMenu');
    const floatingText = document.getElementById('floatingText');
    const authorName = document.getElementById('authorName');
    const leftEye = document.querySelector('.left-eye');
    const rightEye = document.querySelector('.right-eye');
    const emailLink = document.querySelector('.email-link');
    const emailOptions = document.querySelector('.email-options');

    // Toggle dark/light mode
    toggleButton.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            modeImage.src = 'PF/Lightmode.gif';
            icon.textContent = '☀️';
            portfolioArrow.querySelector('.arrow-icon').textContent = '☁️';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            modeImage.src = 'PF/Darkmode.gif';
            icon.textContent = '🌙';
            portfolioArrow.querySelector('.arrow-icon').textContent = '⭐';
        }
    });

    // Toggle portfolio menu
    portfolioArrow.addEventListener('click', function(event) {
        event.stopPropagation();
        
        if (portfolioMenu.classList.contains('show')) {
            portfolioMenu.classList.remove('show');
            portfolioMenu.classList.add('hide');
            setTimeout(() => {
                portfolioMenu.style.display = 'none';
                portfolioMenu.classList.remove('hide');
            }, 500);
        } else {
            portfolioMenu.style.display = 'flex';
            portfolioMenu.classList.add('show');
            
            setTimeout(() => {
                addEarTracking();
            }, 600);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!portfolioArrow.contains(event.target) && !portfolioMenu.contains(event.target)) {
            if (portfolioMenu.classList.contains('show')) {
                portfolioMenu.classList.remove('show');
                portfolioMenu.classList.add('hide');
                setTimeout(() => {
                    portfolioMenu.style.display = 'none';
                    portfolioMenu.classList.remove('hide');
                }, 500);
            }
        }
    });

    // Prevent closing when clicking inside the menu
    portfolioMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Toggle email options
    emailLink.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (emailOptions.style.display === 'flex') {
            emailOptions.style.display = 'none';
        } else {
            emailOptions.style.display = 'flex';
        }
    });

    // Close email options when clicking outside
    document.addEventListener('click', function(event) {
        if (!emailLink.contains(event.target)) {
            emailOptions.style.display = 'none';
        }
    });

    // Typing effect for floating text
    const text = "CONTACT ME";
    let i = 0;
    let typingSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            floatingText.textContent += text.charAt(i);
            i++;
            
            const randomDelay = Math.floor(Math.random() * 50) + typingSpeed;
            setTimeout(typeWriter, randomDelay);
            
            floatingText.style.textShadow = `0 0 ${10 + Math.random() * 5}px rgba(0, 128, 255, 0.8), 0 0 ${20 + Math.random() * 5}px rgba(0, 128, 255, 0.4)`;
        } else {
            floatingText.classList.add('pulse-glow');
            
            setTimeout(() => {
                authorName.style.opacity = '1';
                authorName.style.transform = 'translate(-50%, 0) scale(1.05)';
                
                setTimeout(() => {
                    authorName.style.animation = 'float 3s ease-in-out infinite';
                }, 500);
            }, 800);
        }
    }
    
    // Add ear tracking based on mouse movement
    function addEarTracking() {
        document.addEventListener('mousemove', function(e) {
            if (portfolioMenu.classList.contains('show')) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const menuRect = portfolioMenu.getBoundingClientRect();
                const menuCenterX = menuRect.left + menuRect.width / 2;
                const menuCenterY = menuRect.top + menuRect.height / 2;
                
                const deltaX = mouseX - menuCenterX;
                const deltaY = mouseY - menuCenterY;
                
                if (leftEye && rightEye) {
                    const maxEyeMove = 5;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const normX = deltaX / distance || 0;
                    const normY = deltaY / distance || 0;
                    
                    leftEye.style.transform = `translate(${normX * maxEyeMove}px, ${normY * maxEyeMove}px)`;
                    rightEye.style.transform = `translate(${normX * maxEyeMove}px, ${normY * maxEyeMove}px)`;
                }
            }
        });
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 800);
});