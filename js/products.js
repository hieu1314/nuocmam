// =================== DANH SÁCH SẢN PHẨM ===================
window.products = [
  { id: 1, price: 39000, img: "images/30nb.png" },
  { id: 2, price: 55000, img: "images/35nb.png" },
  { id: 3, price: 90000, img: "images/40nb.png" },
  { id: 4, price: 45000, img: "images/60nb.png" },
  { id: 5, price: 90000, img: "images/12nb.png" },
  { id: 6, price: 50000, img: "images/60dbb.png" },
  { id: 7, price: 48000, img: "images/20nb.png" },
  { id: 8, price: 18000, img: "images/15n.jpg" }
];

// =================== BẢN DỊCH SẢN PHẨM ===================

const productTranslations = {
  vi: {
    1: { title: "Nước mắm 584 30°N (500ml)", desc: "Ngon đậm vị, thích hợp chấm và nấu" },
    2: { title: "Nước mắm 584 35°N (500ml)", desc: "Đậm đà vị cá cơm truyền thống" },
    3: { title: "Nước mắm nhĩ đặc biệt 40°N (500ml)-Bán chạy", desc: "Tinh túy giọt nhĩ đầu tiên" },
    4: { title: "Nước mắm 584 Gold 60°N (200ml)", desc: "Dành cho bữa ăn sang trọng" },
    5: { title: "Nước mắm 584 đại chúng 12°N (5l)-<span class='sold-out'>Đã hết</span>", desc: "Cá cơm là đây-Cứu cánh chúng sanh" },
    6: { title: "Nước mắm nhĩ thượng hạng 60°N (200ml)-<span class='sold-out'>Đang nhập hàng</span>", desc: "Dành cho người sành ăn, vị mặn mà tự nhiên" },
    7: { title: "Nước mắm 584 truyền thống 20°N (1 lít)", desc: "Hương vị mặn mà, phù hợp nấu ăn hàng ngày" },
    8: { title: "Nước mắm 584 truyền thống 15°N (500ml)", desc: "Hương vị nhẹ, phù hợp nấu ăn hàng ngày" }
  },

  en: {
    1: { title: "Fish Sauce 584 30°N (500ml)", desc: "Rich flavor, perfect for dipping and cooking" },
    2: { title: "Fish Sauce 584 35°N (500ml)", desc: "Traditional anchovy taste, full-bodied" },
    3: { title: "Special Fish Sauce 584 40°N (500ml) - Best Seller", desc: "Essence of the first fish extract" },
    4: { title: "Fish Sauce 584 Gold 60°N (200ml)", desc: "For a luxurious dining experience" },
    5: { title: "Fish Sauce 584 Popular 12°N (5L) - Sold Out", desc: "Authentic anchovy flavor" },
    6: { title: "Premium Fish Sauce 584 60°N (200ml) - Incoming", desc: "For connoisseurs, naturally savory" },
    7: { title: "Fish Sauce 584 Traditional 20°N (1L)", desc: "Balanced flavor, suitable for daily cooking" },
    8: { title: "Fish Sauce 584 Traditional 15°N (500ml)", desc: "Light flavor, ideal for everyday cooking" }
  },

  cn: {
    1: { title: "584鱼露 30°N (500ml)", desc: "味道浓郁，适合蘸食和烹饪" },
    2: { title: "584鱼露 35°N (500ml)", desc: "传统凤尾鱼风味，口感醇厚" },
    3: { title: "特制584鱼露 40°N (500ml)-畅销", desc: "首滴鱼露精华" },
    4: { title: "584金牌鱼露 60°N (200ml)", desc: "适合高档餐饮" },
    5: { title: "584大众鱼露 12°N (5L)-已售罄", desc: "正宗凤尾鱼风味" },
    6: { title: "584高级鱼露 60°N (200ml)-即将到货", desc: "美食家之选，自然咸香" },
    7: { title: "584传统鱼露 20°N (1L)", desc: "口味适中，适合日常烹饪" },
    8: { title: "584传统鱼露 15°N (500ml)", desc: "口味清淡，适合日常烹饪" }
  },

  jp: {
    1: { title: "584ヌックマム 30°N (500ml)", desc: "濃厚な味わいで、ディップや料理に最適" },
    2: { title: "584ヌックマム 35°N (500ml)", desc: "伝統的なアンチョビの風味" },
    3: { title: "特製ヌックマム 584 40°N (500ml)-ベストセラー", desc: "最初に抽出された魚エキスの精華" },
    4: { title: "584 ヌックマム ゴールド 60°N (200ml)", desc: "高級な食事向け" },
    5: { title: "584 ヌックマム 一般用 12°N (5L)-売り切れ", desc: "本格アンチョビの旨味" },
    6: { title: "584 プレミアム ヌックマム 60°N (200ml)-入荷予定", desc: "通向け、自然な塩味" },
    7: { title: "584 伝統ヌックマム 20°N (1L)", desc: "程よい味わい、毎日の料理に最適" },
    8: { title: "584 伝統ヌックマム 15°N (500ml)", desc: "あっさりした味わい、日常料理向け" }
  },

  kr: {
    1: { title: "584 누억맘 30°N (500ml)", desc: "풍부한 맛으로 찍어 먹거나 요리에 적합" },
    2: { title: "584 누억맘 35°N (500ml)", desc: "전통적인 멸치 풍미" },
    3: { title: "특별 누억맘 584 40°N (500ml)-베스트셀러", desc: "첫 번째 액젓의 정수" },
    4: { title: "584 누억맘 골드 60°N (200ml)", desc: "고급 식사용" },
    5: { title: "584 대중용 누억맘 12°N (5L)-품절", desc: "정통 멸치 풍미" },
    6: { title: "584 프리미엄 누억맘 60°N (200ml)-입고 예정", desc: "미식가용, 자연스러운 감칠맛" },
    7: { title: "584 전통 누억맘 20°N (1L)", desc: "균형 잡힌 맛, 일상 요리에 적합" },
    8: { title: "584 전통 누억맘 15°N (500ml)", desc: "담백한 맛, 매일 요리에 적합" }
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
