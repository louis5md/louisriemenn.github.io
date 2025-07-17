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

// DRAG TO SCROLL IMPLEMENTATION
let isDown = false;
let startX;
let scrollLeftPos;

if (projectsContainer) {
    projectsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsContainer.style.cursor = 'grabbing';
        startX = e.pageX - projectsContainer.offsetLeft;
        scrollLeftPos = projectsContainer.scrollLeft;
        e.preventDefault();
    });

    projectsContainer.addEventListener('mouseleave', () => {
        if(isDown) {
            isDown = false;
            projectsContainer.style.cursor = 'grab';
            snapToClosestProject();
        }
    });

    projectsContainer.addEventListener('mouseup', () => {
        if(isDown) {
            isDown = false;
            projectsContainer.style.cursor = 'grab';
            snapToClosestProject();
        }
    });

    projectsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Increase sensitivity by factor 1.5
        projectsContainer.scrollLeft = scrollLeftPos - walk;
    });
}

// SNAP TO CLOSEST PROJECT FUNCTION
function snapToClosestProject() {
    if (!projectsContainer || projectCards.length === 0) return;
    
    const containerCenter = projectsContainer.scrollLeft + projectsContainer.clientWidth / 2;
    let closestCard = projectCards[0];
    let closestDistance = Infinity;
    
    projectCards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        let distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });
    
    // Snap the container to the closest card
    closestCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// LEFT/RIGHT BUTTON NAVIGATION
const btnPrev = document.getElementById('btn-scroll-prev');
const btnNext = document.getElementById('btn-scroll-next');

function getCurrentProjectIndex() {
    if (!projectsContainer || projectCards.length === 0) return 0;
    const containerCenter = projectsContainer.scrollLeft + projectsContainer.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    projectCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        let distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });
    return closestIndex;
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        const index = getCurrentProjectIndex();
        if (index > 0) {
            projectCards[index - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        const index = getCurrentProjectIndex();
        if (index < projectCards.length - 1) {
            projectCards[index + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    });
}

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
