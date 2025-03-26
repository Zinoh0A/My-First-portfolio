document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let nightSky = null;

    // Function to create stars and celestial elements
    function createStars() {
        if (nightSky) return; // Avoid creating stars multiple times

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

        // Create colorful nebulas
        const nebulaColors = [
            'radial-gradient(ellipse at center, rgba(255, 100, 100, 0.3) 0%, rgba(255, 100, 100, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(100, 100, 255, 0.3) 0%, rgba(100, 100, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(255, 100, 255, 0.3) 0%, rgba(255, 100, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(100, 255, 255, 0.3) 0%, rgba(100, 255, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(255, 255, 100, 0.3) 0%, rgba(255, 255, 100, 0) 70%)'
        ];

        for (let i = 0; i < 5; i++) {
            const nebula = document.createElement('div');
            nebula.className = 'nebula';
            nebula.style.top = `${Math.random() * 80}%`;
            nebula.style.left = `${Math.random() * 80}%`;
            nebula.style.background = nebulaColors[i];
            nebula.style.width = `${Math.random() * 300 + 200}px`;
            nebula.style.height = `${Math.random() * 300 + 200}px`;
            nebula.style.animationDelay = `${Math.random() * 5}s`;
            nightSky.appendChild(nebula);
        }

        // Create aurora at the bottom
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        aurora.style.background = 'linear-gradient(to top, rgba(0, 255, 200, 0.2) 0%, rgba(0, 200, 255, 0.1) 50%, transparent 100%)';
        nightSky.appendChild(aurora);

        // Create moon
        const moon = document.createElement('div');
        moon.className = 'moon';
        moon.style.top = '10%';
        moon.style.right = '10%';
        nightSky.appendChild(moon);

        // Create stars
        function createRegularStars() {
            // Create 1000 regular stars
            for (let i = 0; i < 1000; i++) {
                const star = document.createElement('div');
                star.className = 'star';

                // Determine star size
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

                // Position the star
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;

                // Random delay for twinkling
                star.style.animationDelay = `${Math.random() * 10}s`;

                nightSky.appendChild(star);
            }

            // Create 20 bright stars
            for (let i = 0; i < 20; i++) {
                const brightStar = document.createElement('div');
                brightStar.className = 'bright-star';
                brightStar.style.top = `${Math.random() * 100}%`;
                brightStar.style.left = `${Math.random() * 100}%`;
                brightStar.style.animationDelay = `${Math.random() * 5}s`;
                nightSky.appendChild(brightStar);
            }

            // Create 30 colored stars
            for (let i = 0; i < 30; i++) {
                const coloredStar = document.createElement('div');
                coloredStar.className = 'colored-star';
                coloredStar.style.top = `${Math.random() * 100}%`;
                coloredStar.style.left = `${Math.random() * 100}%`;
                coloredStar.style.animationDelay = `${Math.random() * 10}s`;
                nightSky.appendChild(coloredStar);
            }
        }

        createRegularStars();

        // Create shooting stars
        function createShootingStar() {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';

            // Randomize starting position on the upper part of the screen
            const startX = Math.random() * 80;
            const startY = Math.random() * 40;

            // Set travel distance to cross a significant portion of the screen
            const travelDistance = 300 + Math.random() * 500;
            const travelY = 100 + Math.random() * 200;

            // Calculate the angle of the trajectory
            const angle = Math.atan2(travelY, travelDistance) * (180 / Math.PI);

            // Apply styles
            shootingStar.style.top = `${startY}%`;
            shootingStar.style.left = `${startX}%`;
            shootingStar.style.width = `${Math.random() * 80 + 120}px`;

            // Set custom properties for the animation
            shootingStar.style.setProperty('--travel-distance', `${travelDistance}px`);
            shootingStar.style.setProperty('--travel-y', `${travelY}px`);
            shootingStar.style.setProperty('--angle', `${angle}deg`);

            // Duration between 1-3 seconds for a quick but visible streak
            const duration = Math.random() * 2 + 1;
            shootingStar.style.animationDuration = `${duration}s`;

            nightSky.appendChild(shootingStar);

            // Remove after animation completes
            setTimeout(() => {
                shootingStar.remove();
            }, duration * 1000);
        }

        // Schedule shooting stars
        function scheduleShootingStars() {
            const count = Math.random() > 0.3 ? 1 : 2;

            for (let i = 0; i < count; i++) {
                setTimeout(createShootingStar, i * 800);
            }

            const nextInterval = Math.random() * 4000 + 2000;
            setTimeout(scheduleShootingStars, nextInterval);
        }

        scheduleShootingStars();
    }

    // Function to remove stars
    function removeStars() {
        if (nightSky) {
            nightSky.remove();
            nightSky = null;
        }
    }

    // Initial check for dark mode
    if (body.classList.contains('dark-mode')) {
        createStars();
    }

    // Listen for mode changes
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            if (body.classList.contains('light-mode')) {
                removeStars(); // Remove stars when switching to light mode
            } else {
                createStars(); // Create stars when switching to dark mode
            }
        });
    }
});