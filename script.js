document.addEventListener('DOMContentLoaded', function() {
    // --- Scroll Arrow Logic (for scrolling below the cover) ---
    const scrollArrow = document.getElementById('scrollArrow');
    // The target for the scroll arrow is the ABOUT ME section
    const scrollTargetContent = document.getElementById('about-section'); 

    if (scrollArrow && scrollTargetContent) {
        scrollArrow.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior

            // Calculate position relative to the viewport, accounting for fixed header
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
            
            // Handle scrolling to the very top (for #top) - which is the cover section
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

    // --- Business Card Carousel Logic ---
    const businessCardGrid = document.querySelector('.business-card-designs-grid');
    const businessCardCarousel = document.querySelector('.business-card-carousel');
    const carouselArrowLeft = document.querySelector('.carousel-nav-arrow.left');
    const carouselArrowRight = document.querySelector('.carousel-nav-arrow.right');

    if (businessCardCarousel && carouselArrowLeft && carouselArrowRight) {
        // Function to update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            if (businessCardCarousel.scrollLeft <= 0) {
                carouselArrowLeft.disabled = true;
            } else {
                carouselArrowLeft.disabled = false;
            }

            // Check if scrolled to the end (allow a small tolerance for fractional pixels)
            if (businessCardCarousel.scrollLeft + businessCardCarousel.clientWidth >= businessCardCarousel.scrollWidth - 5) {
                carouselArrowRight.disabled = true;
            } else {
                carouselArrowRight.disabled = false;
            }
        };

        // Scroll amount (e.g., width of one card + gap)
        const getScrollAmount = () => {
            if (window.innerWidth <= 480) { // For very small phones, scroll one card at a time
                return businessCardCarousel.querySelector('.logo-design-card').offsetWidth + 10; // Card width + gap
            } else { // For tablets/larger mobiles, scroll two cards at a time
                return businessCardCarousel.querySelector('.logo-design-card').offsetWidth * 2 + 15; // Two cards width + gap
            }
        };

        // Event listeners for arrows
        carouselArrowRight.addEventListener('click', () => {
            businessCardCarousel.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        carouselArrowLeft.addEventListener('click', () => {
            businessCardCarousel.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Update visibility on scroll and resize
        businessCardCarousel.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);

        // Initial check for arrow visibility
        updateArrowVisibility();
    } else {
        // console.warn("Business card carousel elements not found. Carousel will not be interactive.");
        // Hide arrows if JS is not active or elements not found (for desktop or non-js users)
        if (carouselArrowLeft) carouselArrowLeft.style.display = 'none';
        if (carouselArrowRight) carouselArrowRight.style.display = 'none';
    }


    // Accessibility: Reduce Motion for video (if applicable) - No video in current HTML
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReduceMotion(mediaQuery) {
        // This part is effectively a placeholder as there's no video element in the current HTML
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