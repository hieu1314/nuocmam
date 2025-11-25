// =================== GIỎ HÀNG ===================
let cart = {};

// Lấy phần tử web cart
const cartSection = document.getElementById('giohang');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// =================== MOBILE CART ICON ===================
let cartIcon, cartBadge;
if (window.innerWidth <= 768) {
  // 1. Tạo icon 🛒
  cartIcon = document.createElement('div');
  cartIcon.className = 'cart-mobile-icon';
  cartIcon.innerHTML = '🛒 <span class="cart-badge">0</span>';
  document.body.appendChild(cartIcon);

  cartBadge = cartIcon.querySelector('.cart-badge');
  cartBadge.style.display = 'none';

  // 2. Click icon toggle mở/đóng cart
  cartIcon.addEventListener('click', () => {
    const isActive = cartSection.classList.toggle('active');
    if (isActive) {
      cartSection.style.display = 'block';
    } else {
      cartSection.style.display = 'none';
    }
  });

  // 3. Khi renderCart, cập nhật badge
  const oldRenderCart = renderCart;
  renderCart = function () {
    oldRenderCart();
    const totalQty = Object.values(cart).reduce((sum, v) => sum + v, 0);
    if (totalQty > 0) {
      cartBadge.textContent = totalQty;
      cartBadge.style.display = 'inline-flex';
    } else {
      cartBadge.style.display = 'none';
      cartSection.classList.remove('active');
      cartSection.style.display = 'none';
    }
  };

  // 4. Ban đầu giấu cartSection
  cartSection.style.display = 'none';
  cartSection.classList.remove('active');
}

// =================== GIỎ HÀNG WEB ===================
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
}

function changeQuantity(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function clearCart() {
  cart = {};
  renderCart();
}

// =================== HIỂN THỊ GIỎ HÀNG ===================
function renderCart() {
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    cartItems.innerHTML = `<p>${translations[currentLang]?.cart_empty || 'Giỏ hàng trống'}</p>`;
    cartTotal.textContent = "0₫";
    return;
  }

  let total = 0;
  cartItems.innerHTML = ids.map(k => {
    const p = products.find(x => x.id == k);
    const title = productTranslations[currentLang][p.id].title;
    const qty = cart[k];
    total += p.price * qty;

    return `
      <div class="cart-item">
        <img class="cart-thumb" src="${p.img}" alt="${title}">
        <div class="cart-info">
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

  cartTotal.textContent = total.toLocaleString() + "₫";
}
