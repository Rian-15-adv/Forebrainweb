document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let lastScroll = 0;
  const parallaxFactor = 0.5; // Adjust this for stronger/weaker effect
  const maxOffset = 300; // Maximum parallax movement in pixels

  // Initialize background properties
  body.style.backgroundAttachment = 'fixed';
  body.style.backgroundPosition = 'center center';
  body.style.transition = 'background-position 0.6s ease-out';

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const scrollOffset = Math.min(currentScroll * parallaxFactor, maxOffset);
    
    // Apply parallax effect
    body.style.backgroundPositionY = `calc(50% - ${scrollOffset}px)`;
    
    // Add/remove scrolling class for additional effects
    if (currentScroll > lastScroll) {
      body.classList.add('scrolling');
    } else {
      body.classList.remove('scrolling');
    }
    
    lastScroll = currentScroll;
  });

  // Smooth initial load
  setTimeout(() => {
    body.style.backgroundPositionY = 'center';
  }, 100);
});
