document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let morningSky = null;

    // Function to create morning sky and elements
    function createMorningSky() {
        if (morningSky) return; // Avoid creating elements multiple times

        // Create the morning sky container
        morningSky = document.createElement('div');
        morningSky.className = 'morning-sky';
        document.body.appendChild(morningSky);

        // Create sun
        const sun = document.createElement('div');
        sun.className = 'sun';
        morningSky.appendChild(sun);

        // Create light rays from the sun
        const lightRay = document.createElement('div');
        lightRay.className = 'light-ray';
        morningSky.appendChild(lightRay);

        // Create sky accents (subtle color variations)
        const accentColors = [
            'radial-gradient(ellipse at center, rgba(255, 200, 150, 0.3) 0%, rgba(255, 200, 150, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(180, 220, 255, 0.3) 0%, rgba(180, 220, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(230, 240, 255, 0.3) 0%, rgba(230, 240, 255, 0) 70%)',
            'radial-gradient(ellipse at center, rgba(255, 230, 210, 0.3) 0%, rgba(255, 230, 210, 0) 70%)'
        ];

        for (let i = 0; i < 4; i++) {
            const skyAccent = document.createElement('div');
            skyAccent.className = 'sky-accent';
            skyAccent.style.top = `${Math.random() * 50}%`;
            skyAccent.style.left = `${Math.random() * 80}%`;
            skyAccent.style.width = `${Math.random() * 300 + 300}px`;
            skyAccent.style.height = `${Math.random() * 300 + 200}px`;
            skyAccent.style.background = accentColors[i];
            skyAccent.style.animationDelay = `${Math.random() * 5}s`;
            morningSky.appendChild(skyAccent);
        }

        // Create morning mist at the bottom
        const morningMist = document.createElement('div');
        morningMist.className = 'morning-mist';
        morningSky.appendChild(morningMist);

        // Create clouds
        function createClouds() {
            // Create 8 main clouds
            for (let i = 0; i < 8; i++) {
                createCloud(i);
            }

            // Create 15 small wisps of clouds
            for (let i = 0; i < 15; i++) {
                const wisp = document.createElement('div');
                wisp.className = 'wisp';
                wisp.style.top = `${Math.random() * 50}%`;
                wisp.style.left = `${Math.random() * 100}%`;
                wisp.style.width = `${Math.random() * 60 + 40}px`;
                wisp.style.height = `${Math.random() * 30 + 20}px`;
                wisp.style.opacity = `${Math.random() * 0.4 + 0.3}`;
                wisp.style.animationDuration = `${Math.random() * 60 + 40}s`;
                wisp.style.animationDelay = `-${Math.random() * 40}s`;
                morningSky.appendChild(wisp);
            }
        }

        // Function to create a single complex cloud
        function createCloud(index) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            // Vary cloud positions across the sky
            const topPosition = Math.random() * 30 + (index % 3) * 15;
            cloud.style.top = `${topPosition}%`;
            
            // Set initial position and animation timing
            cloud.style.left = `${Math.random() * 100}%`;
            cloud.style.animationDuration = `${Math.random() * 60 + 80}s`;
            cloud.style.animationDelay = `-${Math.random() * 80}s`;
            
            // Base cloud size
            const cloudWidth = Math.random() * 100 + 150;
            const cloudHeight = cloudWidth * (Math.random() * 0.3 + 0.4);
            
            cloud.style.width = `${cloudWidth}px`;
            cloud.style.height = `${cloudHeight}px`;
            
            morningSky.appendChild(cloud);
            
            // Add cloud parts to make it fluffy
            const numParts = Math.floor(Math.random() * 5) + 5;
            
            for (let i = 0; i < numParts; i++) {
                const part = document.createElement('div');
                part.className = 'cloud-part';
                
                // Position parts around the main cloud body
                const partSize = Math.random() * 60 + 40;
                const xPos = Math.random() * cloudWidth - partSize/4;
                const yPos = Math.random() * cloudHeight - partSize/4;
                
                part.style.width = `${partSize}px`;
                part.style.height = `${partSize}px`;
                part.style.left = `${xPos}px`;
                part.style.top = `${yPos}px`;
                
                // Vary opacity slightly for depth
                part.style.opacity = `${Math.random() * 0.3 + 0.7}`;
                
                cloud.appendChild(part);
            }
        }

        createClouds();
    }

    // Function to remove morning sky
    function removeMorningSky() {
        if (morningSky) {
            morningSky.remove();
            morningSky = null;
        }
    }

    // Check if the page has a light/dark mode toggle
    const toggleButton = document.getElementById('toggleButton');
    
    // Initial setup based on current mode
    if (!body.classList.contains('dark-mode')) {
        createMorningSky(); // Create morning sky only in light mode
    }

    // Listen for mode changes if there's a toggle button
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            if (body.classList.contains('dark-mode')) {
                removeMorningSky(); // Remove morning sky when in dark mode
            } else {
                createMorningSky(); // Create morning sky when in light mode
            }
        });
    }
    
    // Also handle class changes made by other scripts
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                // Check if dark mode is active
                if (body.classList.contains('dark-mode')) {
                    removeMorningSky(); // Remove morning sky in dark mode
                } else {
                    createMorningSky(); // Create morning sky in light mode
                }
            }
        });
    });
    
    // Start observing the body element for class changes
    observer.observe(body, { attributes: true });
});