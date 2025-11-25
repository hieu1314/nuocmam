// =================== LANGUAGE SWITCH ===================
let currentLang = localStorage.getItem("lang") || "vi";

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.getAttribute('data-key-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  localStorage.setItem('lang', lang);
  renderProducts(currentLang);
  renderCart();
}
