// =================== DANH SÁCH SẢN PHẨM NGUYÊN BẢN (ID + giá + ảnh) ===================
const products = [
  { id: 1, price: 35000, img: "images/30nb.png" },
  { id: 2, price: 45000, img: "images/35nb.png" },
  { id: 3, price: 75000, img: "images/40nb.png" },
  { id: 4, price: 60000, img: "images/60nb.png" },
  { id: 5, price: 50000, img: "images/12nb.png" },
  { id: 6, price: 65000, img: "images/60dbb.png" },
  { id: 7, price: 25000, img: "images/20nb.png" }
];

// =================== BẢN DỊCH SẢN PHẨM ===================
const productTranslations = {
  vi: {
    1: { title: "Nước mắm 584 30°N (500ml)", desc: "Ngon đậm vị, thích hợp chấm và nấu" },
    2: { title: "Nước mắm 584 35°N (500ml)", desc: "Đậm đà vị cá cơm truyền thống" },
    3: { title: "Nước mắm nhĩ đặc biệt 40°N (500ml)-Bán chạy", desc: "Tinh túy giọt nhĩ đầu tiên" },
    4: { title: "Nước mắm 584 Gold 60°N (200ml)", desc: "Dành cho bữa ăn sang trọng" },
    5: { title: "Nước mắm 584 đại chúng 12°N (5l)-Đã hết", desc: "Cá cơm là đây" },
    6: { title: "Nước mắm nhĩ thượng hạng 60°N (200ml)-Đang nhập hàng", desc: "Dành cho người sành ăn, vị mặn mà tự nhiên" },
    7: { title: "Nước mắm 584 truyền thống 20°N (500ml)", desc: "Hương vị nhẹ, phù hợp nấu ăn hàng ngày" }
  },
  en: {
    1: { title: "Fish sauce 584 30°N (500ml)", desc: "Rich flavor, perfect for dipping and cooking" },
    2: { title: "Fish sauce 584 35°N (500ml)", desc: "Traditional anchovy taste, full-bodied" },
    3: { title: "Special Nuoc Mam 584 40°N (500ml) - Best Seller", desc: "Essence of first fish extract" },
    4: { title: "Nuoc Mam 584 Gold 60°N (200ml)", desc: "For a luxurious dining experience" },
    5: { title: "Nuoc Mam 584 Popular 12°N (5l) - Sold Out", desc: "Anchovies at their best" },
    6: { title: "Premium Nuoc Mam 584 60°N (200ml) - Incoming", desc: "For connoisseurs, naturally salty" },
    7: { title: "Nuoc Mam 584 Traditional 20°N (500ml)", desc: "Light flavor, suitable for daily cooking" }
  },
  cn: {
    1: { title: "584鱼露 30°N (500ml)", desc: "味道浓郁，适合蘸食和烹饪" },
    2: { title: "584鱼露 35°N (500ml)", desc: "传统凤尾鱼风味" },
    3: { title: "特制584鱼露 40°N (500ml)-畅销", desc: "首滴鱼露精华" },
    4: { title: "584鱼露金牌 60°N (200ml)", desc: "适合高档餐饮" },
    5: { title: "584鱼露大众 12°N (5l)-已售罄", desc: "正宗凤尾鱼" },
    6: { title: "584鱼露高级 60°N (200ml)-即将到货", desc: "适合美食家，自然咸味" },
    7: { title: "584鱼露传统 20°N (500ml)", desc: "口味轻，适合日常烹饪" }
  },
  jp: {
    1: { title: "584ヌックマム 30°N (500ml)", desc: "濃厚な味わいで、ディップや料理に最適" },
    2: { title: "584ヌックマム 35°N (500ml)", desc: "伝統的なアンチョビ風味" },
    3: { title: "特別なヌックマム 584 40°N (500ml)-ベストセラー", desc: "最初の魚エッセンス" },
    4: { title: "ヌックマム 584 ゴールド 60°N (200ml)", desc: "豪華な食事向け" },
    5: { title: "ヌックマム 584 一般 12°N (5l)-売り切れ", desc: "アンチョビの本物" },
    6: { title: "ヌックマム 584 プレミアム 60°N (200ml)-入荷予定", desc: "グルメ向け、自然な塩味" },
    7: { title: "ヌックマム 584 伝統 20°N (500ml)", desc: "軽い風味、日常料理向け" }
  },
  kr: {
    1: { title: "584 누억맘 30°N (500ml)", desc: "풍부한 맛, 찍어 먹거나 요리에 적합" },
    2: { title: "584 누억맘 35°N (500ml)", desc: "전통 멸치 맛" },
    3: { title: "특별 누억맘 584 40°N (500ml)-베스트셀러", desc: "첫 번째 액젓 정수" },
    4: { title: "누억맘 584 골드 60°N (200ml)", desc: "고급 식사용" },
    5: { title: "누억맘 584 일반 12°N (5l)-품절", desc: "멸치가 여기 있음" },
    6: { title: "프리미엄 누억맘 584 60°N (200ml)-입고중", desc: "맛집용, 자연스러운 짠맛" },
    7: { title: "누억맘 584 전통 20°N (500ml)", desc: "가벼운 맛, 일상 요리에 적합" }
  }
};

// =================== TRANSLATIONS ===================
const translations = {
  vi: {
    title: "Nước Mắm 584 - Đại lý HCMC",
    home: "Trang chủ ▾",
    about: "Giới thiệu",
    product_link: "Sản phẩm",
    language: "Ngôn ngữ ▾",
    product_list: "DANH MỤC SẢN PHẨM",
    cart_title: "GIỎ HÀNG CỦA BẠN",
    total: "Tổng tiền:",
    buy: "Mua hàng",
    clear: "Xóa giỏ hàng",
    checkout_title: "THÔNG TIN GIAO HÀNG",
    label_name: "Họ tên:",
    label_phone: "SĐT:",
    label_address: "Địa chỉ:",
    placeholder_name: "Nhập họ tên",
    placeholder_phone: "Nhập số điện thoại",
    placeholder_address: "Nhập địa chỉ",
    checkout_confirm: "✅ Xác nhận đặt hàng",
    cancel: "❌ Hủy",
    cart_empty: "Chưa có sản phẩm trong giỏ."
  },
  en: {
    title: "FISH SAUCE 584 - HCMC Distributor",
    home: "Home ▾",
    about: "About",
    product_link: "Products",
    language: "Language ▾",
    product_list: "PRODUCT LIST",
    cart_title: "YOUR CART",
    total: "Total:",
    buy: "Buy",
    clear: "Clear Cart",
    checkout_title: "SHIPPING INFORMATION",
    label_name: "Name:",
    label_phone: "Phone:",
    label_address: "Address:",
    placeholder_name: "Enter your name",
    placeholder_phone: "Enter phone number",
    placeholder_address: "Enter address",
    checkout_confirm: "✅ Confirm Order",
    cancel: "❌ Cancel",
    cart_empty: "Your cart is empty."
  },
  cn: {
    title: "584鱼露 - 胡志明市代理",
    home: "主页 ▾",
    about: "介绍",
    product_link: "产品",
    language: "语言 ▾",
    product_list: "产品列表",
    cart_title: "您的购物车",
    total: "总价:",
    buy: "购买",
    clear: "清空购物车",
    checkout_title: "送货信息",
    label_name: "姓名:",
    label_phone: "电话:",
    label_address: "地址:",
    placeholder_name: "输入姓名",
    placeholder_phone: "输入电话",
    placeholder_address: "输入地址",
    checkout_confirm: "✅ 确认订单",
    cancel: "❌ 取消",
    cart_empty: "购物车为空。"
  },
  jp: {
    title: "584ヌックマム - ホーチミン代理店",
    home: "ホーム ▾",
    about: "紹介",
    product_link: "商品",
    language: "言語 ▾",
    product_list: "商品一覧",
    cart_title: "カート",
    total: "合計:",
    buy: "購入",
    clear: "カートを空にする",
    checkout_title: "配送情報",
    label_name: "名前:",
    label_phone: "電話:",
    label_address: "住所:",
    placeholder_name: "名前を入力",
    placeholder_phone: "電話番号を入力",
    placeholder_address: "住所を入力",
    checkout_confirm: "✅ 注文確認",
    cancel: "❌ キャンセル",
    cart_empty: "カートに商品がありません。"
  },
  kr: {
    title: "584 누억맘 - 호치민 대리점",
    home: "홈 ▾",
    about: "소개",
    product_link: "제품",
    language: "언어 ▾",
    product_list: "제품 목록",
    cart_title: "장바구니",
    total: "총액:",
    buy: "구매",
    clear: "장바구니 비우기",
    checkout_title: "배송 정보",
    label_name: "이름:",
    label_phone: "전화:",
    label_address: "주소:",
    placeholder_name: "이름 입력",
    placeholder_phone: "전화번호 입력",
    placeholder_address: "주소 입력",
    checkout_confirm: "✅ 주문 확인",
    cancel: "❌ 취소",
    cart_empty: "장바구니가 비어 있습니다."
  }
};

let currentLang = localStorage.getItem("lang") || "vi";

// =================== HIỂN THỊ SẢN PHẨM ===================
function renderProducts(lang = currentLang) {
  const container = document.getElementById("product-list");
  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${productTranslations[lang][p.id].title}">
      <h3>${productTranslations[lang][p.id].title}</h3>
      <p>${productTranslations[lang][p.id].desc}</p>
      <p><strong>${p.price.toLocaleString()}₫</strong></p>
      <button onclick="addToCart(${p.id})" data-key="buy">${translations[lang].buy}</button>
    </div>
  `).join("");
}

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

// =================== MODAL ẢNH SẢN PHẨM ===================
function initImageModal() {
  const imageModal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");

  document.getElementById("product-list").addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      modalImg.src = e.target.src;
      imageModal.classList.remove("hidden");
    }
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    imageModal.classList.add("hidden");
  });

  imageModal.addEventListener("click", e => {
    if (e.target === imageModal) imageModal.classList.add("hidden");
  });
}

// =================== DROPDOWN ===================
function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach(drop => {
    const btn = drop.querySelector("a");
    const menu = drop.querySelector(".dropdown-content");

    btn.addEventListener("click", e => {
      e.preventDefault();
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(item => {
      item.addEventListener("click", () => menu.classList.remove("active"));
    });
  });

  document.addEventListener("click", e => {
    document.querySelectorAll(".dropdown").forEach(drop => {
      const menu = drop.querySelector(".dropdown-content");
      if (!drop.contains(e.target)) menu.classList.remove("active");
    });
  });
}

// =================== LANGUAGE SWITCH ===================
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

