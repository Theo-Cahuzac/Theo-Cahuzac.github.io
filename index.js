// Fonction de scroll fluide vers les sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gestion de l'apparence du header au scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    } else {
        header.style.boxShadow = "none";
        header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleHeaderScroll);

    // Appel initial pour l'état au chargement
    handleHeaderScroll();

    console.log('Portfolio de Théo prêt ! 🚀');
});