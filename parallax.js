document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
      // Scrolling down
      body.classList.add('scrolling');
    } else {
      // Scrolling up
      body.classList.remove('scrolling');
    }
    
    lastScroll = currentScroll;
  });
});
