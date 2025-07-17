// Scroll to specific section (keeping for the scroll indicator in hero section)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Horizontal project navigation
const projectsContainer = document.getElementById('projects-container');
const projectCards = projectsContainer ? projectsContainer.querySelectorAll('.project-card') : [];
const projectNavDots = document.getElementById('projectNavDots') ? document.getElementById('projectNavDots').querySelectorAll('.nav-dot') : [];

// Add click event listeners to project navigation dots
projectNavDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (projectCards[index]) {
            projectCards[index].scrollIntoView({ 
                behavior: 'smooth', 
                inline: 'center',
                block: 'nearest'
            });
        }
    });
});

// Update active dot based on horizontal scroll position
if (projectsContainer) {
    projectsContainer.addEventListener('scroll', () => {
        const containerScrollLeft = projectsContainer.scrollLeft;
        const containerWidth = projectsContainer.offsetWidth;
        
        projectCards.forEach((card, index) => {
            const cardLeft = card.offsetLeft;
            const cardWidth = card.offsetWidth;
            
            // Check if this card is centered in view (or close to it)
            const cardCenter = cardLeft + cardWidth / 2;
            const containerCenter = containerScrollLeft + containerWidth / 2;
            
            if (Math.abs(cardCenter - containerCenter) < cardWidth / 2) {
                projectNavDots.forEach(dot => dot.classList.remove('active'));
                if (projectNavDots[index]) {
                    projectNavDots[index].classList.add('active');
                }
            }
        });
    });
}

// Initialize first dot as active
if (projectNavDots.length > 0) {
    projectNavDots[0].classList.add('active');
}
