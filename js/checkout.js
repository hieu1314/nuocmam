// =================== CHECKOUT MODAL ===================
function initCheckoutModal() {
  const overlay = document.getElementById("checkout-overlay");
  const modal = document.getElementById("checkout-modal");
  const confirmBtn = document.getElementById("checkout-confirm-btn");
  const cancelBtn = modal.querySelector("button[data-key='cancel']");

  function checkoutConfirm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const zaloNumber = "0766786494";
    const message = `🛍️ Đơn hàng mới:\n👤 Họ tên: ${name}\n📞 SĐT: ${phone}\n🏠 Địa chỉ: ${address}`;
    const zaloUrl = `https://zalo.me/${zaloNumber}?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, "_blank");

    closeCheckoutModal();
    clearCart();
  }

  function closeCheckoutModal() {
    overlay.style.display = "none";
    modal.style.display = "none";
  }

  overlay.addEventListener("click", closeCheckoutModal);
  cancelBtn.addEventListener("click", closeCheckoutModal);
  confirmBtn.addEventListener("click", checkoutConfirm);
}

function openCheckout() {
  if (Object.keys(cart).length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  document.getElementById("checkout-overlay").style.display = "block";
  document.getElementById("checkout-modal").style.display = "block";
}
