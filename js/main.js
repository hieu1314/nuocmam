// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(currentLang);
  renderCart();
  initImageModal();
  initDropdowns();
  setLanguage(currentLang);

  document.getElementById("clear-btn").addEventListener("click", clearCart);
  document.getElementById("year").textContent = new Date().getFullYear();
});
