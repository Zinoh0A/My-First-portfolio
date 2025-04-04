document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let nightSky = null;
    let animationFrameId = null;
    let lastShootingStarTime = 0;

    // Function to create stars and celestial elements
    function createStars() {
        if (nightSky) return;

        // Create the night sky container
        nightSky = document.createElement('div');
        nightSky.className = 'night-sky';
        document.body.appendChild(nightSky);

        // Create the Milky Way
        const milkyWay = document.createElement('div');
        milkyWay.className = 'milky-way';
        milkyWay.style.top = '30%';
        milkyWay.style.left = '-20%';
        nightSky.appendChild(milkyWay);

        // Create 3 nebulas instead of 5 for better performance
        const nebulaColors = [
            'radial-gradient(ellipse at center, rgba(255, 100, 100, 0.2) 0%, rgba(255, 100, 100, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(100, 100, 255, 0.2) 0%, rgba(100, 100, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(100, 255, 255, 0.2) 0%, rgba(100, 255, 255, 0) 70%)'
        ];

        for (let i = 0; i < 3; i++) {
            const nebula = document.createElement('div');
            nebula.className = 'nebula';
            nebula.style.top = `${Math.random() * 80}%`;
            nebula.style.left = `${Math.random() * 80}%`;
            nebula.style.background = nebulaColors[i];
            nebula.style.width = `${Math.random() * 200 + 150}px`;
            nebula.style.height = `${Math.random() * 200 + 150}px`;
            nebula.style.animationDelay = `${Math.random() * 10}s`;
            nightSky.appendChild(nebula);
        }

        // Create moon
        const moon = document.createElement('div');
        moon.className = 'moon';
        moon.style.top = '10%';
        moon.style.right = '10%';
        nightSky.appendChild(moon);

        // Create stars with reduced quantity for mobile
        function createRegularStars() {
            // Reduced star count for mobile performance
            const starCount = window.innerWidth < 768 ? 300 : 600;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';

                const size = Math.random() * 100;
                if (size < 70) {
                    star.classList.add('tiny');
                } else if (size < 90) {
                    star.classList.add('small');
                } else if (size < 97) {
                    star.classList.add('medium');
                } else {
                    star.classList.add('large');
                }

                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 20}s`;
                nightSky.appendChild(star);
            }

            // Reduced bright stars
            const brightStarCount = window.innerWidth < 768 ? 10 : 15;
            for (let i = 0; i < brightStarCount; i++) {
                const brightStar = document.createElement('div');
                brightStar.className = 'bright-star';
                brightStar.style.top = `${Math.random() * 100}%`;
                brightStar.style.left = `${Math.random() * 100}%`;
                brightStar.style.animationDelay = `${Math.random() * 8}s`;
                nightSky.appendChild(brightStar);
            }

            // Reduced colored stars
            const coloredStarCount = window.innerWidth < 768 ? 15 : 20;
            for (let i = 0; i < coloredStarCount; i++) {
                const coloredStar = document.createElement('div');
                coloredStar.className = 'colored-star';
                coloredStar.style.top = `${Math.random() * 100}%`;
                coloredStar.style.left = `${Math.random() * 100}%`;
                coloredStar.style.animationDelay = `${Math.random() * 15}s`;
                nightSky.appendChild(coloredStar);
            }
        }

        createRegularStars();

        // Optimized shooting stars with requestAnimationFrame
        function createShootingStar(timestamp) {
            if (!nightSky) return;

            // Throttle shooting star creation
            if (timestamp - lastShootingStarTime < 3000) {
                animationFrameId = requestAnimationFrame(createShootingStar);
                return;
            }

            lastShootingStarTime = timestamp;

            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';

            const startX = Math.random() * 80;
            const startY = Math.random() * 30;
            const travelDistance = 200 + Math.random() * 300;
            const travelY = 50 + Math.random() * 100;
            const angle = Math.atan2(travelY, travelDistance) * (180 / Math.PI);

            shootingStar.style.top = `${startY}%`;
            shootingStar.style.left = `${startX}%`;
            shootingStar.style.width = `${Math.random() * 60 + 80}px`;
            shootingStar.style.setProperty('--travel-distance', `${travelDistance}px`);
            shootingStar.style.setProperty('--travel-y', `${travelY}px`);
            shootingStar.style.setProperty('--angle', `${angle}deg`);
            
            const duration = Math.random() * 1.5 + 0.5;
            shootingStar.style.animationDuration = `${duration}s`;

            nightSky.appendChild(shootingStar);

            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.remove();
                }
            }, duration * 1000);

            animationFrameId = requestAnimationFrame(createShootingStar);
        }

        // Start shooting stars
        animationFrameId = requestAnimationFrame(createShootingStar);
    }

    // Function to remove stars
    function removeStars() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        if (nightSky) {
            nightSky.remove();
            nightSky = null;
        }
    }

    // Initialize stars
    createStars();

    // Cleanup on page unload
    window.addEventListener('beforeunload', removeStars);
});