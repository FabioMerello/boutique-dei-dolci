'use strict';
const PHONE = '3400549962';   // numero senza +39
const DEFAULT_MSG = 'Ciao, vorrei informazioni dalla Boutique dei Dolci.';

document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = `https://wa.me/39${PHONE}?text=${encodeURIComponent(a.dataset.msg || DEFAULT_MSG)}`;
  a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-tel]').forEach(a => { a.href = `tel:+39${PHONE}`; });

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open){
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) setMenu(false); });
window.matchMedia('(min-width:900px)').addEventListener('change', () => setMenu(false));

/* Modulo → messaggio WhatsApp precompilato */
const dateInput = document.getElementById('fDate');
dateInput.min = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date());
document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const lines = ['Ciao, vorrei ordinare dalla Boutique dei Dolci.', `Cosa: ${v('fType')}`];
  if (v('fDate')) {
    const [y, m, d] = v('fDate').split('-');
    lines.push(`Per il: ${d}/${m}/${y}`);
  }
  if (v('fPeople')) lines.push(`Persone: ${v('fPeople')}`);
  lines.push(`Modalità: ${v('fMode')}`);
  if (v('fNotes')) lines.push(`Note: ${v('fNotes')}`);
  window.open(`https://wa.me/39${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});
document.getElementById('year').textContent = new Date().getFullYear();
