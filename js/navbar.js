document.addEventListener('DOMContentLoaded', function () {
  // Canonical links that must appear (in order) right after MEMBER REGISTRATION.
  var NAV = [
    { href: '/events.html', label: 'EVENTS' },
    { href: '/career-nexus.html', label: 'CAREER NEXUS' },
    { href: '/our-partners.html', label: 'OUR PARTNERS' }
  ];

  function norm(s) {
    return s.replace(/\s+/g, ' ').trim();
  }

  document.querySelectorAll('ul').forEach(function (menu) {
    if (menu.closest('footer')) return;
    var registrationLink = menu.querySelector('a[href*="membership.html"]');
    if (!registrationLink) return;

    var registrationItem = registrationLink.closest('li');
    if (!registrationItem) return;

    // Drop legacy links from old navbars.
    menu.querySelectorAll('a[href*="meetings.html"], a[href*="gallery.html"]')
      .forEach(function (link) {
        var item = link.closest('li');
        if (item) item.remove();
      });

    // Remove existing EVENTS / CAREER NEXUS / OUR PARTNERS items (matched by
    // label text, so stale duplicates and wrong-href variants are covered too),
    // remembering which one was highlighted as the current page.
    var labels = NAV.map(function (n) { return n.label; });
    var activeLabels = {};
    Array.prototype.slice.call(menu.querySelectorAll('li')).forEach(function (item) {
      var a = item.querySelector('a');
      if (!a) return;
      if (labels.indexOf(norm(a.textContent)) !== -1) {
        if (a.classList.contains('text-white')) activeLabels[norm(a.textContent)] = true;
        item.remove();
      }
    });

    var createNavItem = function (spec) {
      var item = registrationItem.cloneNode(true);
      var link = item.querySelector('a');
      link.setAttribute('href', spec.href);
      link.textContent = spec.label;
      if (activeLabels[spec.label]) {
        var gray = Array.prototype.slice.call(link.classList).filter(function (cls) {
          return /^text-gray-\d+$/.test(cls);
        })[0];
        if (gray) link.classList.replace(gray, 'text-white');
      }
      return item;
    };

    var anchor = registrationItem;
    NAV.forEach(function (spec) {
      var item = createNavItem(spec);
      anchor.insertAdjacentElement('afterend', item);
      anchor = item;
    });
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
