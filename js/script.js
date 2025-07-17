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

// Prevent normal scrolling behavior
sectionContainer.addEventListener('wheel', (e) => {
    e.preventDefault();

    const currentSectionIndex = sections.findIndex(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        return Math.abs(rect.top) < window.innerHeight / 2;
    });

    let nextSectionIndex = currentSectionIndex;

    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scroll down
        nextSectionIndex = currentSectionIndex + 1;
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up
        nextSectionIndex = currentSectionIndex - 1;
    }

    if (nextSectionIndex !== currentSectionIndex) {
        scrollToSection(sections[nextSectionIndex]);
    }
});