const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.menu-toggle');
const navigation = header?.querySelector('nav');

if (toggle && navigation) {
  const isSpanish = document.documentElement.lang === 'es';
  const setOpen = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', isSpanish
      ? (open ? 'Cerrar menú' : 'Abrir menú')
      : (open ? 'Close menu' : 'Open menu'));
  };
  toggle.hidden = false;
  header.classList.add('menu-ready');
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  window.matchMedia('(max-width: 768px)').addEventListener('change', () => setOpen(false));
}
