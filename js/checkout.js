// checkout.js — Firebase COMPAT — FINAL + AUTO BACKUP

document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.getElementById("checkout-overlay");
  const modal = document.getElementById("checkout-modal");
  const checkoutBtn = document.getElementById("checkout-btn");
  const confirmBtn = document.getElementById("checkout-confirm-btn");
  const cancelBtn = modal.querySelector("button[data-key='cancel']");

  // ================== OPEN MODAL ==================
  function openCheckout() {
    if (!window.cart || Object.keys(window.cart).length === 0) {
      alert("🛒 Giỏ hàng đang trống!");
      return;
    }
    overlay.style.display = "flex";
    modal.style.display = "block";
  }

  // ================== CLOSE MODAL ==================
  function closeCheckout() {
    overlay.style.display = "none";
    modal.style.display = "none";

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
  }

  // ================== CONFIRM ==================
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

    let total = 0;          // tổng gốc
    let totalDiscount = 0;  // tổng chiết khấu
    const items = [];

    for (const id in window.cart) {
      const qty = window.cart[id];
      const p = products.find(x => x.id == id);
      if (!p) continue;

      const title =
        productTranslations[currentLang]?.[id]?.title || "Sản phẩm";

      // ===== CHIẾT KHẤU 6 CHAI =====
      const discountGroups = Math.floor(qty / 6);
      const discountQty = discountGroups * 6;
      const discountAmount = discountQty * p.price * 0.1;

      total += p.price * qty;
      totalDiscount += discountAmount;

      items.push({
        productId: p.id,
        title,
        quantity: qty,
        price: p.price,
        discountApplied: discountAmount
      });
    }

    if (items.length === 0) {
      alert("❌ Giỏ hàng lỗi");
      return;
    }

    const finalTotal = total - totalDiscount;

    const orderData = {
      customer: { name, phone, address },
      items,
      total: finalTotal,
      discount: totalDiscount,
      status: "new",
      createdAt: Date.now()
    };

    try {
      const orderRef = window.db.ref("orders").push();
      await orderRef.set(orderData);

      const monthKey = new Date().toISOString().slice(0, 7);
      await window.db
        .ref("orders_backup/" + monthKey + "/" + orderRef.key)
        .set(orderData);

      alert(
        "✅ Đặt hàng thành công!\n\n" +
        "Chúng tôi sẽ liên hệ với bạn sau nhé.\n" +
        "👉 Nhớ xem tin nhắn hoặc nghe điện thoại nha 📞"
      );

      clearCart();
      closeCheckout();

    } catch (err) {
      console.error("🔥 Firebase error:", err);
      alert("❌ Không gửi được đơn – kiểm tra Firebase Rules!");
    }
  }

  // ================== EVENTS ==================
  checkoutBtn.onclick = openCheckout;
  confirmBtn.onclick = confirmCheckout;

  cancelBtn.onclick = e => {
    e.preventDefault();
    closeCheckout();
  };

  overlay.onclick = closeCheckout;
});
