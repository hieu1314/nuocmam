function initCheckoutModal() {
  const overlay = document.getElementById("checkout-overlay");
  const modal = document.getElementById("checkout-modal");
  const confirmBtn = document.getElementById("checkout-confirm-btn");
  const cancelBtn = modal.querySelector("button[data-key='cancel']");

  // ====== ĐÓNG MODAL ======
  function closeModal() {
    overlay.style.display = "none";
    modal.style.display = "none";
  }

  // ====== XÁC NHẬN ĐƠN HÀNG ======
  function confirmCheckout() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    // ====== TẠO NỘI DUNG ĐƠN HÀNG ======
    let orderText = "🛒 ĐƠN HÀNG MỚI\n\n";
    orderText += `👤 Khách hàng: ${name}\n`;
    orderText += `📞 SĐT: ${phone}\n`;
    orderText += `🏠 Địa chỉ: ${address}\n\n`;
    orderText += "📦 SẢN PHẨM:\n";

    let total = 0;

    Object.keys(cart).forEach(id => {
      const p = products.find(x => x.id == id);
      const qty = cart[id];
      const price = p.price * qty;
      total += price;

      orderText += `- ${productTranslations[currentLang][p.id].title}\n`;
      orderText += `  SL: ${qty} | ${price.toLocaleString()}₫\n`;
    });

    orderText += `\n💰 TỔNG TIỀN: ${total.toLocaleString()}₫`;

    // ====== GỬI QUA ZALO ======
    const zaloNumber = "0766786494"; // 👉 số của bạn
    const zaloUrl = `https://zalo.me/${zaloNumber}?text=${encodeURIComponent(orderText)}`;
    window.open(zaloUrl, "_blank");

    // ====== RESET ======
    clearCart();
    closeModal();
  }

  // ====== EVENTS ======
  overlay.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  confirmBtn.addEventListener("click", confirmCheckout);
}

// ====== MỞ MODAL ======
function openCheckout() {
  if (Object.keys(cart).length === 0) {
    alert("🛒 Giỏ hàng đang trống!");
    return;
  }

  document.getElementById("checkout-overlay").style.display = "block";
  document.getElementById("checkout-modal").style.display = "block";
}
