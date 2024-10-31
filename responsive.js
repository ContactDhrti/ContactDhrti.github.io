document.addEventListener('DOMContentLoaded', function() {
    // Add hamburger menu to navigation
    const nav = document.querySelector('.nav-container');
    const menuButton = document.createElement('div');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '☰';
    nav.insertBefore(menuButton, nav.querySelector('.nav-links'));

    // Toggle menu
    menuButton.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        menuButton.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdownMenu = this.querySelector('.dropdown-menu');
                dropdownMenu.style.display = 
                    dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            document.querySelector('.nav-links').classList.remove('active');
            menuButton.innerHTML = '☰';
        }
    });
});
