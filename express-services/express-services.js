
(() => {
  'use strict';

  // Configure hosted checkout URLs only after service scope and pricing
  // have been approved. Never place payment credentials in this file.
  const checkoutUrls = {
    'company-establishment': '',
    'national-credit-registration': '',
    'trademark-search-filing': ''
  };

  // Mobile navigation
  const toggle = document.querySelector(
    '.express-page .menu-toggle'
  );

  const nav = document.querySelector(
    '.express-page #primary-nav'
  );

  if (toggle && nav) {
    const closeMenu = ({ returnFocus = false } = {}) => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');

      if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener('click', () => {
      const isExpanded =
        toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute(
        'aria-expanded',
        String(!isExpanded)
      );

      nav.classList.toggle('is-open', !isExpanded);
    });

    nav.addEventListener('click', event => {
      if (
        event.target instanceof Element &&
        event.target.closest('a')
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (
        event.key === 'Escape' &&
        toggle.getAttribute('aria-expanded') === 'true'
      ) {
        closeMenu({ returnFocus: true });
      }
    });
  }

  // Checkout controls
  document
    .querySelectorAll('.express-page [data-checkout]')
    .forEach(button => {
      const checkoutUrl =
        checkoutUrls[button.dataset.checkout]?.trim();

      // Checkout remains disabled until a valid URL is configured.
      if (!checkoutUrl) {
        button.disabled = true;
        button.textContent = 'Checkout unavailable';

        button.setAttribute(
          'aria-label',
          'Checkout is not available yet'
        );

        button.title =
          'Checkout will be enabled after the service and payment setup are approved.';

        return;
      }

      button.disabled = false;
      button.textContent = 'Proceed to checkout';

      button.removeAttribute('aria-label');
      button.removeAttribute('title');

      button.addEventListener('click', () => {
        window.location.assign(checkoutUrl);
      });
    });
})();
