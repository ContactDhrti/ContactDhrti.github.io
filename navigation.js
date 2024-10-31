document.addEventListener('DOMContentLoaded', function() {
    // Store the current page URL
    const currentPage = window.location.pathname;

    // Function to handle page navigation
    function handleNavigation(event) {
        const link = event.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // Always allow navigation to new pages
        if (href && href.endsWith('.html')) {
            // Don't prevent default - let the browser handle the navigation
            return true;
        }

        // For internal links (anchors)
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            if (menu) menu.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (menu) menu.style.display = 'none';
        });
    });

    // Add click event listeners
    document.querySelectorAll('.nav-links a').forEach(link => {
        // Remove any existing event listeners first
        link.removeEventListener('click', handleNavigation);
        // Add new event listener
        link.addEventListener('click', handleNavigation);
    });
}); 