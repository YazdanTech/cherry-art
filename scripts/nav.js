const top = document.querySelector('.top');
const burger = top.querySelector('.burger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const lang = top.querySelector('.lang');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', !open);
}

burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
overlay.addEventListener('click', () => setMenu(false));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

lang.addEventListener('click', () => {
  const ar = lang.textContent === 'EN';
  lang.textContent = ar ? 'AR' : 'EN';
  document.documentElement.lang = ar ? 'ar' : 'en';
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
});