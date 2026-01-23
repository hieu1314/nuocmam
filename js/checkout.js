// checkout.js — Firebase COMPAT — FINAL

document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.getElementById("checkout-overlay");
  const modal = document.getElementById("checkout-modal");
  const checkoutBtn = document.getElementById("checkout-btn");
  const confirmBtn = document.getElementById("checkout-confirm-btn");
  const cancelBtn = modal.querySelector("button[data-key='cancel']");

  function openCheckout() {
    if (!window.cart || Object.keys(window.cart).length === 0) {
      alert("🛒 Giỏ hàng đang trống!");
      return;
    }
    overlay.style.display = "flex";
    modal.style.display = "block";
  }

  function closeCheckout() {
    overlay.style.display = "none";
    modal.style.display = "none";
    name.value = phone.value = address.value = "";
  }

  async function confirmCheckout(e) {
    e.preventDefault();

    if (!window.db) {
      alert("❌ Firebase chưa sẵn sàng");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("⚠️ Nhập đầy đủ thông tin!");
      return;
    }

    let total = 0;
    const items = [];

    for (const id in window.cart) {
      const qty = window.cart[id];
      const p = products.find(x => x.id == id);
      if (!p) continue;

      const title =
        productTranslations[currentLang]?.[id]?.title || "Sản phẩm";

      total += p.price * qty;

      items.push({
        productId: p.id,
        title,
        quantity: qty,
        price: p.price
      });
    }

    const orderData = {
      customer: { name, phone, address },
      items,
      total,
      status: "new",
      createdAt: Date.now()
    };

    try {
      await window.db.ref("orders").push(orderData);
      alert("✅ Đặt hàng thành công!");
      clearCart();
      closeCheckout();
    } catch (err) {
      console.error("🔥 Firebase error:", err);
      alert("❌ Permission denied – kiểm tra Rules!");
    }
  }

  checkoutBtn.onclick = openCheckout;
  confirmBtn.onclick = confirmCheckout;
  cancelBtn.onclick = e => {
    e.preventDefault();
    closeCheckout();
  };
  overlay.onclick = closeCheckout;
});
