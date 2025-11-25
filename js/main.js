// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(currentLang);
  renderCart();
  initImageModal();
  initDropdowns();
  initCheckoutModal();
  setLanguage(currentLang);

  document.getElementById("checkout-btn").addEventListener("click", openCheckout);
  document.getElementById("clear-btn").addEventListener("click", clearCart);
  document.getElementById("year").textContent = new Date().getFullYear();
});
