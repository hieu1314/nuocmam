// =================== CART STATE ===================
window.cart = {};

// =================== ADD / REMOVE ===================
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  updateCartBadge();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
  updateCartBadge();
}

function changeQuantity(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
  updateCartBadge();
}

function clearCart() {
  cart = {};
  renderCart();
  updateCartBadge();
}

// =================== RENDER CART ===================
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const discountEl = document.getElementById("cart-discount");
  const ids = Object.keys(cart);

if (ids.length === 0) {
  container.innerHTML = `<p>${translations[currentLang].cart_empty}</p>`;
  totalEl.textContent = "0₫";
  discountEl.textContent =
    "(Chiết khấu 10% cho mỗi 6 chai cùng loại: 0₫)";
  return;
}

  let total = 0;          // tổng gốc
  let totalDiscount = 0;  // tổng chiết khấu

  container.innerHTML = ids.map(id => {
    const p = products.find(x => x.id == id);
    const qty = cart[id];
    const title = productTranslations[currentLang][p.id].title;

    // ===== CHIẾT KHẤU 6 CHAI =====
    const discountGroups = Math.floor(qty / 6);
    const discountQty = discountGroups * 6;
    const discountAmount = discountQty * p.price * 0.1;

    total += p.price * qty;
    totalDiscount += discountAmount;

    return `
      <div class="cart-item">
        <img class="cart-thumb" src="${p.img}">
        <div>
          <strong>${title}</strong>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="changeQuantity(${p.id}, -1)">–</button>
            <span>${qty}</span>
            <button class="qty-btn" onclick="changeQuantity(${p.id}, 1)">+</button>
          </div>
        </div>
        <button class="delete-btn" onclick="removeItem(${p.id})">Xóa</button>
      </div>
    `;
  }).join("");

  const finalTotal = total - totalDiscount;

  discountEl.textContent =
  `(Chiết khấu 10% cho mỗi 6 chai cùng loại: ${totalDiscount.toLocaleString()}₫)`;

  totalEl.textContent =
  finalTotal.toLocaleString() + "₫";
}

// =================== BADGE ===================
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  let totalQty = 0;

  Object.values(cart).forEach(q => totalQty += q);

  badge.textContent = totalQty;
  badge.style.display = totalQty > 0 ? "flex" : "none";
}

// =================== TOGGLE PANEL ===================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("cart-toggle");
  const panel = document.getElementById("giohang");
  const title = document.getElementById("cart-title");
  const closeBtn = document.getElementById("cart-close");

  toggle.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const rect = toggle.getBoundingClientRect();
      panel.style.transformOrigin =
        `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
    }

    panel.classList.add("open");
    toggle.style.display = "none";
  });

  function closeCart() {
    panel.classList.remove("open");
    setTimeout(() => {
      toggle.style.display = "flex";
    }, 350);
  }

  title.addEventListener("click", closeCart);
  closeBtn.addEventListener("click", closeCart);
});
