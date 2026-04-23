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

// Carrossel
class Carousel {
  constructor() {
    this.container = document.getElementById('carousel-container');
    this.wrapper = document.querySelector('.carousel-wrapper');
    this.images = document.querySelectorAll('.carousel-wrapper img');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.indicators = document.querySelectorAll('.carousel-indicator');
    this.currentIndex = 0;
    this.totalImages = this.images.length;
    this.autoPlayInterval = null;

    if (this.prevBtn && this.nextBtn) {
      this.init();
    }
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    this.autoPlay();
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.wrapper.style.transform = `translateX(${offset}%)`;
    this.updateIndicators();
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.remove('bg-white/50');
        indicator.classList.add('bg-white');
      } else {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
      }
    });
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
      this.updateCarousel();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.autoPlay();
  }
}

// Inicializar o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});


