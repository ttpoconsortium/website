document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('ul').forEach(function (menu) {
    if (menu.closest('footer')) return;
    const registrationLink = menu.querySelector('a[href*="membership.html"]');
    if (!registrationLink) return;

    const registrationItem = registrationLink.closest('li');
    const removeDuplicate = function (link) {
      const item = link.closest('li');
      if (item) item.remove();
    };

    menu.querySelectorAll('a[href*="meetings.html"], a[href*="gallery.html"], a[href*="events.html"], a[href*="career-nexus.html"]')
      .forEach(removeDuplicate);

    const createNavItem = function (href, label) {
      const item = registrationItem.cloneNode(true);
      const link = item.querySelector('a');
      link.href = href;
      link.textContent = label;
      return item;
    };

    registrationItem.insertAdjacentElement('afterend', createNavItem('/career-nexus.html', 'CAREER NEXUS'));
    registrationItem.insertAdjacentElement('afterend', createNavItem('/events.html', 'EVENTS'));
  });

  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('#mobile-menu a');

  if (!menuToggle || !closeMenu || !mobileMenu) return;

  // Function to open the menu with smooth transition
  function openMenu() {
    // Make the menu visible but keep it off-screen
    mobileMenu.classList.remove('pointer-events-none');

    // Short delay to ensure CSS transitions work properly
    setTimeout(() => {
      mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
      mobileMenu.classList.add('translate-y-0', 'opacity-100');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }, 10);
  }

  // Function to close the menu with smooth transition
  function closeMenuAction() {
    mobileMenu.classList.remove('translate-y-0', 'opacity-100');
    mobileMenu.classList.add('-translate-y-full', 'opacity-0');

    // Wait for the transition to complete before hiding completely
    setTimeout(() => {
      mobileMenu.classList.add('pointer-events-none');
      document.body.style.overflow = ''; // Re-enable scrolling
    }, 700); // Match this duration with the CSS transition
  }

  // Toggle menu open
  menuToggle.addEventListener('click', openMenu);

  // Close menu when X is clicked
  closeMenu.addEventListener('click', closeMenuAction);

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuAction);
  });
});