(function () {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animate() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  })();

  /**
   * initCursorHover(hoverSelectors, dragSelectors?)
   * hoverSelectors – CSS selector string for elements that trigger the hover state
   * dragSelectors  – optional CSS selector string for elements that trigger the drag state
   */
  window.initCursorHover = function (hoverSelectors, dragSelectors) {
    document.querySelectorAll(hoverSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    if (dragSelectors) {
      document.querySelectorAll(dragSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('drag'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('drag'));
      });
    }
  };

  /**
   * initScrollReveal(selectors)
   * Fades + slides elements into view as they enter the viewport.
   */
  window.initScrollReveal = function (selectors) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(selectors).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  };
})();
