(() => {
    'use strict';

    const mobileMenu = document.getElementById('mobile_menu');
    if (!mobileMenu) return;

    const openBtn = document.querySelector('.open_menu');
    const closeBtn = document.getElementById('menu_close');

    if (openBtn) openBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

    mobileMenu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
})();