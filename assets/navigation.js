(() => {
  const template = document.createElement('template');
  template.innerHTML = "    <!-- Header Navigation with 3-Line App Menu Button -->\n    <header>\n        <div class=\"container nav-wrapper\">\n            <a href=\"index.html\" class=\"logo\">\n                <img src=\"assets/logo.webp\" alt=\"CYT - CodeYantra Technologies\"> \n                <span class=\"brand-name\">CYT<span class=\"logo-tag\">CodeYantra Technologies</span></span>\n            </a>\n\n            <!-- 3-Line Hamburger App Button -->\n            <button class=\"hamburger-btn\" id=\"menuToggle\" aria-label=\"Open Navigation Menu\" aria-controls=\"sideDrawer\" aria-expanded=\"false\">\n                <span></span>\n                <span></span>\n                <span></span>\n            </button>\n        </div>\n    </header>\n\n    <!-- Slide-in Drawer -->\n    <div class=\"drawer-overlay\" id=\"drawerOverlay\"></div>\n    <aside role=\"dialog\" aria-modal=\"true\" class=\"side-drawer\" id=\"sideDrawer\" aria-label=\"Site navigation\" inert>\n        <div class=\"drawer-header\">\n            <div class=\"logo\">\n                <img src=\"assets/logo.webp\" alt=\"CYT Logo\"> CYT\n            </div>\n            <button class=\"drawer-close-btn\" id=\"drawerClose\" aria-label=\"Close navigation\">&times;</button>\n        </div>\n        \n        <nav class=\"drawer-links\" aria-label=\"Primary navigation\">\n            <a href=\"index.html\" class=\"drawer-item\">Home</a>\n            <p class=\"drawer-category\">SOLUTIONS & PRODUCTS</p>\n            <a href=\"index.html#products\" class=\"drawer-item\"><i class=\"fas fa-cubes\"></i> Products Overview</a>\n            <a href=\"fuelmate.html\" class=\"drawer-item\"><i class=\"fas fa-gas-pump\"></i> FuelMate ERP</a>\n            <a href=\"Fuelmate_pro.html\" class=\"drawer-item\"><i class=\"fas fa-chart-line\"></i> FuelMate Pro</a>\n            <a href=\"easy_invoice.html\" class=\"drawer-item\"><i class=\"fas fa-file-invoice-dollar\"></i> Easy Invoice</a>\n            <a href=\"nexafield.html\" class=\"drawer-item\"><i class=\"fas fa-people-group\" aria-hidden=\"true\"></i> NexaField</a>\n            <a href=\"maskchat.html\" class=\"drawer-item\"><i class=\"fas fa-comment-dots\"></i> MaskChat</a>\n            <a href=\"veltrix.html\" class=\"drawer-item\"><i class=\"fas fa-microchip\"></i> Veltrix Platform</a>\n            \n            <p class=\"drawer-category\">COMPANY & STORY</p>\n            <a href=\"about.html\" class=\"drawer-item\"><i class=\"fas fa-building\"></i> About CYT</a>\n            <a href=\"founder.html\" class=\"drawer-item\"><i class=\"fas fa-user-tie\"></i> Founder Story</a>\n            <a href=\"index.html#journey\" class=\"drawer-item\"><i class=\"fas fa-route\"></i> Our Journey</a>\n            <a href=\"index.html#trust\" class=\"drawer-item\"><i class=\"fas fa-shield-alt\"></i> Trust & Security</a>\n\n            <p class=\"drawer-category\">COMMUNICATION</p>\n            <a href=\"index.html#support\" class=\"drawer-item\"><i class=\"fas fa-headset\"></i> Support Desk</a>\n            <a href=\"index.html#contact\" class=\"drawer-item\"><i class=\"fas fa-paper-plane\"></i> Get in Touch</a>\n            <div id=\"pageLinks\"></div>\n        </nav>\n    </aside>\n\n";
  class CytNavigation extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const root = this.attachShadow({mode:'open'});
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet'; stylesheet.href = 'assets/navigation.css';
      root.append(stylesheet, template.content.cloneNode(true));
      const icons = document.createElement('link');
      icons.rel = 'stylesheet'; icons.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      root.prepend(icons);
      const local = this.querySelector('template[data-page-links]');
      if (local) {
        const group = root.getElementById('pageLinks');
        const heading = document.createElement('p');
        heading.className = 'drawer-category'; heading.textContent = 'ON THIS PAGE';
        group.append(heading, local.content.cloneNode(true));
        group.querySelectorAll('a').forEach(a => a.classList.add('drawer-item'));
      }
      const toggle = root.getElementById('menuToggle');
      const drawer = root.getElementById('sideDrawer');
      const overlay = root.getElementById('drawerOverlay');
      const close = root.getElementById('drawerClose');
      let previousOverflow = '', background = [];
      const setOpen = open => {
        if (open === drawer.classList.contains('open')) return;
        toggle.setAttribute('aria-expanded', String(open));
        drawer.inert = !open;
        drawer.classList.toggle('open', open);
        overlay.classList.toggle('active', open);
        if (open) {
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          background = [...document.body.children].filter(el => el !== this).map(el => [el, el.inert]);
          background.forEach(([el]) => { el.inert = true; });
          close.focus();
        } else {
          document.body.style.overflow = previousOverflow;
          background.forEach(([el, inert]) => { el.inert = inert; });
          toggle.focus();
        }
      };
      toggle.addEventListener('click', () => setOpen(true));
      close.addEventListener('click', () => setOpen(false));
      overlay.addEventListener('click', () => setOpen(false));
      root.addEventListener('keydown', event => {
        if (!drawer.classList.contains('open')) return;
        if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
        if (event.key === 'Tab') {
          const items = [...drawer.querySelectorAll('button,a[href]')];
          const first = items[0], last = items[items.length - 1];
          if (event.shiftKey && root.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && root.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      });
      const updateActive = () => {
        const current = new URL(location.href);
        const currentPath = current.pathname.endsWith('/') ? current.pathname + 'index.html' : current.pathname;
        root.querySelectorAll('.drawer-item').forEach(a => {
          const target = new URL(a.getAttribute('href'), location.href);
          a.removeAttribute('aria-current');
          if (target.pathname === currentPath && target.hash === current.hash) a.setAttribute('aria-current', target.hash ? 'location' : 'page');
        });
      };
      root.querySelectorAll('.drawer-item').forEach(a => a.addEventListener('click', event => {
        setOpen(false);
        const target = new URL(a.href, location.href);
        if (target.pathname === location.pathname && target.hash && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          const section = document.getElementById(decodeURIComponent(target.hash.slice(1)));
          if (section) {
            event.preventDefault(); history.pushState(null, '', target.hash);
            const top = section.getBoundingClientRect().top + window.scrollY - this.getBoundingClientRect().height;
            window.scrollTo({top, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
            updateActive();
          }
        }
      }));
      window.addEventListener('hashchange', updateActive);
      window.addEventListener('popstate', updateActive);
      updateActive();
    }
  }
  customElements.define('cyt-navigation', CytNavigation);
})();
