// =================== DANH SÁCH SẢN PHẨM ===================
window.products = [
  { id: 1, price: 45000, img: "images/30nb.png" },
  { id: 2, price: 65000, img: "images/35nb.png" },
  { id: 3, price: 85000, img: "images/40nb.png" },
  { id: 4, price: 60000, img: "images/60nb.png" },
  { id: 5, price: 120000, img: "images/12nb.png" },
  { id: 6, price: 65000, img: "images/60dbb.png" },
  { id: 7, price: 30000, img: "images/20nb.png" }
];

// =================== BẢN DỊCH SẢN PHẨM ===================
const productTranslations = {
  vi: {
    1: { title: "Nước mắm 584 30°N (500ml)", desc: "Ngon đậm vị, thích hợp chấm và nấu" },
    2: { title: "Nước mắm 584 35°N (500ml)", desc: "Đậm đà vị cá cơm truyền thống" },
    3: { title: "Nước mắm nhĩ đặc biệt 40°N (500ml)-Bán chạy", desc: "Tinh túy giọt nhĩ đầu tiên" },
    4: { title: "Nước mắm 584 Gold 60°N (200ml)", desc: "Dành cho bữa ăn sang trọng" },
    5: { title: "Nước mắm 584 đại chúng 12°N (5l)-<span class='sold-out'>Đã hết</span>", desc: "Cá cơm là đây" },
    6: { title: "Nước mắm nhĩ thượng hạng 60°N (200ml)-<span class='sold-out'>Đang nhập hàng</span>", desc: "Dành cho người sành ăn, vị mặn mà tự nhiên" },
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

// =================== HIỂN THỊ SẢN PHẨM ===================
function renderProducts(lang = currentLang) {
  const container = document.getElementById("product-list");
  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${productTranslations[lang][p.id].title}">
      <h3>${productTranslations[lang][p.id].title}</h3>
      <p>${productTranslations[lang][p.id].desc}</p>
      <p><strong>${p.price.toLocaleString()}₫</strong></p>
      <button onclick="addToCart(${p.id})" data-key="buy1">${translations[lang].buy1}</button>
    </div>
  `).join("");
}
