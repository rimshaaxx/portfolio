document.addEventListener('DOMContentLoaded', function() {
    // --- Scroll Arrow Logic (for scrolling below the cover) ---
    const scrollArrow = document.getElementById('scrollArrow');
    // For smooth scrolling to the ABOUT ME section, target it directly
    const scrollTargetContent = document.getElementById('about-section'); 

    if (scrollArrow && scrollTargetContent) {
        scrollArrow.addEventListener('click', function(event) {
            event.preventDefault();
            // Scroll to the top of the about-section, accounting for fixed header
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const elementPosition = scrollTargetContent.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight; 

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    } else {
        console.error("Scroll arrow or its target element not found for initial scroll!");
    }

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.main-nav a'); // Select all nav links

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior

            const targetId = this.getAttribute('href'); // Get the ID from the href (e.g., "#about-section")
            
            // Handle scrolling to the very top (for #top)
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return; // Stop here, done scrolling
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate position relative to the viewport, considering fixed header
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight; // Subtract header height

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // For links that don't have matching sections in the HTML yet, do nothing or log a warning.
                console.warn(`Target section not found for ID: ${targetId}. This link will not scroll yet.`);
            }
        });
    });

    // Accessibility: Reduce Motion for video (if applicable) - No direct effect on current image
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReduceMotion(mediaQuery) {
        // No video in the current HTML, so this part is effectively a placeholder
        const animatedVideo = document.querySelector('.animated-squares-video');
        if (animatedVideo) {
            if (mediaQuery.matches) {
                animatedVideo.pause();
                animatedVideo.style.display = 'none';
            } else {
                animatedVideo.play();
                animatedVideo.style.display = 'block';
            }
        }
    }
    handleReduceMotion(mediaQuery);
    mediaQuery.addEventListener('change', handleReduceMotion);
});