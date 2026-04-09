const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
const mobileMenuClose = document.querySelector('[data-mobile-menu-close]');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('mobile-menu-open-icon');
const closeIcon = document.getElementById('mobile-menu-close-icon');

function toggleMenu() {
  mobileMenu.classList.toggle('hidden');
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
}

if (mobileMenuButton && mobileMenu && openIcon) {
  mobileMenuButton.addEventListener('click', toggleMenu);

  // Close menu when clicking overlay (outside the sidebar)
  document.addEventListener('click', (e) => {
    const isClickInsideSidebar = mobileMenu.contains(e.target);
    const isClickOnButton = mobileMenuButton.contains(e.target);
    
    if (!isClickInsideSidebar && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when a link is clicked
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close button in mobile menu
if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
}
