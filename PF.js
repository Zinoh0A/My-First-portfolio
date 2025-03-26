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

    // Toggle dark/light mode
    toggleButton.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            modeImage.src = 'PF/Lightmode.gif';
            icon.textContent = '☀️'; // Sun icon for light mode
            portfolioArrow.querySelector('.arrow-icon').textContent = '☁️'; // Cloud icon for light mode
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            modeImage.src = 'PF/Darkmode.gif';
            icon.textContent = '🌙'; // Moon icon for dark mode
            portfolioArrow.querySelector('.arrow-icon').textContent = '⭐'; // Star icon for dark mode
        }
    });

    // Toggle portfolio menu with enhanced animation
    portfolioArrow.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the document click event from firing
        
        if (portfolioMenu.classList.contains('show')) {
            // Hide menu with suck-in animation
            portfolioMenu.classList.remove('show');
            portfolioMenu.classList.add('hide');
            setTimeout(() => {
                portfolioMenu.style.display = 'none'; // Hide after animation
                portfolioMenu.classList.remove('hide');
            }, 500); // Match the animation duration
        } else {
            // Show menu with pop-out animation
            portfolioMenu.style.display = 'flex'; // Ensure it's visible before animation
            portfolioMenu.classList.add('show');
            
            // When showing the menu, add ear tracking
            setTimeout(() => {
                addEarTracking();
                addEyeAnimations(); // Add eye animations when menu is shown
            }, 600); // After animation completes
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!portfolioArrow.contains(event.target) && !portfolioMenu.contains(event.target)) {
            if (portfolioMenu.classList.contains('show')) {
                // Hide menu with suck-in animation
                portfolioMenu.classList.remove('show');
                portfolioMenu.classList.add('hide');
                setTimeout(() => {
                    portfolioMenu.style.display = 'none'; // Hide after animation
                    portfolioMenu.classList.remove('hide');
                }, 500); // Match the animation duration
            }
        }
    });

    // Prevent closing when clicking inside the menu
    portfolioMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Enhanced typing effect for floating text with author name reveal
    const text = "WELCOME TO MY PORTFOLIO";
    let i = 0;
    let typingSpeed = 100; // Adjust typing speed here
    
    function typeWriter() {
        if (i < text.length) {
            floatingText.textContent += text.charAt(i);
            i++;
            
            // Add a slight random delay for more realistic typing
            const randomDelay = Math.floor(Math.random() * 50) + typingSpeed;
            setTimeout(typeWriter, randomDelay);
            
            // Add subtle animation to the text as it's typed
            floatingText.style.textShadow = `0 0 ${10 + Math.random() * 5}px rgba(0, 128, 255, 0.8), 0 0 ${20 + Math.random() * 5}px rgba(0, 128, 255, 0.4)`;
        } else {
            // When typing is complete, add a subtle pulsing effect
            floatingText.classList.add('pulse-glow');
            
            // Reveal author name with fade-in animation
            setTimeout(() => {
                authorName.style.opacity = '1';
                authorName.style.transform = 'translate(-50%, 0) scale(1.05)';
                
                // Add subtle floating animation to author name
                setTimeout(() => {
                    authorName.style.animation = 'float 3s ease-in-out infinite';
                }, 500);
            }, 800);
        }
    }
    
    // Add enhanced ear animations based on mouse movement
    function addEarTracking() {
        document.addEventListener('mousemove', function(e) {
            // Only animate if menu is visible
            if (portfolioMenu.classList.contains('show')) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Get menu position
                const menuRect = portfolioMenu.getBoundingClientRect();
                const menuCenterX = menuRect.left + menuRect.width / 2;
                const menuCenterY = menuRect.top - 20; // Approximate ear position
                
                // Calculate angle from menu to mouse
                const deltaX = mouseX - menuCenterX;
                const deltaY = mouseY - menuCenterY;
                
                // Limit rotation to reasonable amounts
                const maxRotation = 20;
                const rotationX = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 50));
                const rotationY = Math.max(-maxRotation, Math.min(maxRotation, deltaY / 50));
                
                // Apply rotation to ears - with CSS variables for smooth animation
                portfolioMenu.style.setProperty('--left-ear-rotation', `${-15 + rotationX}deg`);
                portfolioMenu.style.setProperty('--right-ear-rotation', `${15 + rotationX}deg`);
            }
        });
    }

    // Add eye animations (giggling and closing)
    function addEyeAnimations() {
        const eyes = [leftEye, rightEye];

        // Function to make eyes giggle
        function giggleEyes() {
            eyes.forEach(eye => {
                eye.style.animation = 'giggle 0.5s ease-in-out infinite';
            });
        }

        // Function to make eyes blink
        function blinkEyes() {
            eyes.forEach(eye => {
                eye.style.animation = 'blink 0.3s ease-in-out';
            });

            setTimeout(() => {
                eyes.forEach(eye => {
                    eye.style.animation = '';
                });
            }, 300);
        }

        // Giggle eyes every 3 seconds
        setInterval(giggleEyes, 500);

        // Blink eyes every 5 seconds
        setInterval(blinkEyes, 2000);
    }

    // Add CSS for the pulsing effect, floating animation, and cat ears
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0% { text-shadow: 0 0 10px rgba(201, 228, 255, 0.8), 0 0 20px rgba(0, 128, 255, 0.4); }
            50% { text-shadow: 0 0 15px rgba(124, 224, 255, 0.9), 0 0 30px rgba(0, 195, 255, 0.6); }
            100% { text-shadow: 0 0 10px rgba(46, 151, 255, 0.8), 0 0 20px rgba(0, 128, 255, 0.4); }
        }
        .pulse-glow {
            animation: pulse-glow 2s infinite ease-in-out;
        }
        
        @keyframes float {
            0% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -5px); }
            100% { transform: translate(-50%, 0); }
        }
        
        .portfolio-menu {
            --left-ear-rotation: -15deg;
            --right-ear-rotation: 15deg;
        }
        
        .portfolio-menu::before {
            transform: rotate(var(--left-ear-rotation));
            transition: transform 0.3s ease;
        }
        
        .portfolio-menu::after {
            transform: rotate(var(--right-ear-rotation));
            transition: transform 0.3s ease;
        }
        
        @keyframes leftEarWiggle {
            0%, 100% { transform: rotate(-15deg); }
            30% { transform: rotate(-5deg); }
            50% { transform: rotate(-25deg); }
            70% { transform: rotate(-10deg); }
        }
        
        @keyframes rightEarWiggle {
            0%, 100% { transform: rotate(15deg); }
            30% { transform: rotate(25deg); }
            50% { transform: rotate(5deg); }
            70% { transform: rotate(20deg); }
        }

        @keyframes giggle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        @keyframes blink {
            0%, 100% { height: 4.5px; }
            50% { height: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Set initial empty state
    floatingText.textContent = '';
    
    // Start the typing animation with a brief delay
    setTimeout(typeWriter, 800);
});