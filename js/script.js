// Scroll to specific section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active nav dot based on scroll position
const sectionContainer = document.getElementById('section-container');
const navDots = document.querySelectorAll('.nav-dot');
const sections = ['home', 'project1', 'project2', 'project3'];

sectionContainer.addEventListener('scroll', () => {
    const scrollPosition = sectionContainer.scrollTop;
    const windowHeight = window.innerHeight;

    sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        }
    });
});

// Allow normal scrolling within sections, but enable section navigation with larger scroll movements
let scrollTimeout;
let isScrolling = false;

sectionContainer.addEventListener('wheel', (e) => {
    // Don't prevent default - allow normal scrolling
    
    // Clear the timeout if it exists
    clearTimeout(scrollTimeout);
    
    // Set scrolling flag
    isScrolling = true;
    
    // Set a timeout to detect when scrolling has stopped
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        
        // Check if we need to snap to a section boundary
        const currentSectionIndex = sections.findIndex(section => {
            const element = document.getElementById(section);
            const rect = element.getBoundingClientRect();
            return rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3;
        });
        
        // If we're between sections or at an awkward position, snap to the nearest section
        if (currentSectionIndex === -1) {
            const nearestSectionIndex = sections.findIndex(section => {
                const element = document.getElementById(section);
                const rect = element.getBoundingClientRect();
                return Math.abs(rect.top) < window.innerHeight;
            });
            
            if (nearestSectionIndex !== -1) {
                scrollToSection(sections[nearestSectionIndex]);
            }
        }
    }, 150); // Wait 150ms after scrolling stops
});
