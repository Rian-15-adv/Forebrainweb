class Slideshow {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.prevBtn = this.container.querySelector('.prev');
    this.nextBtn = this.container.querySelector('.next');
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.transitionDuration = options.transitionDuration || 500;
    this.slideInterval = options.slideInterval || 5000;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Set initial active slide
    this.showSlide(this.currentIndex);

    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Start auto sliding
    this.startAutoSlide();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.container.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  showSlide(index) {
    if (this.isTransitioning || index < 0 || index >= this.slides.length) return;

    this.isTransitioning = true;
    
    // Fade out current slide
    this.slides[this.currentIndex].style.opacity = 0;
    this.slides[this.currentIndex].classList.remove('active');

    setTimeout(() => {
      // Update current index
      this.currentIndex = index;
      
      // Fade in new slide
      this.slides[this.currentIndex].style.opacity = 1;
      this.slides[this.currentIndex].classList.add('active');
      
      this.isTransitioning = false;
    }, this.transitionDuration);
  }

  nextSlide() {
    this.stopAutoSlide();
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
    this.startAutoSlide();
  }

  prevSlide() {
    this.stopAutoSlide();
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
    this.startAutoSlide();
  }

  startAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.autoSlideInterval = setInterval(() => this.nextSlide(), this.slideInterval);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Slideshow('.slider-container', {
    slideInterval: 5000, // 5 seconds
    transitionDuration: 500 // 0.5 second fade
  });
});
