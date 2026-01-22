import {
  ref,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

/* ========== LOGIN ========== */
const ADMIN_PASSWORD = "123456"; // 🔴 ĐỔI MẬT KHẨU Ở ĐÂY

window.login = function () {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("admin", "1");
    showAdmin();
  } else {
    alert("❌ Sai mật khẩu");
  }
};

window.logout = function () {
  sessionStorage.removeItem("admin");
  location.reload();
};

function showAdmin() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

if (sessionStorage.getItem("admin") === "1") showAdmin();

/* ========== ORDERS ========== */
const ordersDiv = document.getElementById("orders");
const ordersRef = ref(window.db, "orders");

onValue(ordersRef, snap => {
  ordersDiv.innerHTML = "";
  let todayTotal = 0;
  let monthTotal = 0;

  const now = new Date();
  const data = snap.val();
  if (!data) return;

  const orders = Object.entries(data).map(([id, o]) => ({ id, ...o }));
  orders.sort((a,b)=>b.createdAt-a.createdAt);

  orders.forEach(order => {
    const d = new Date(order.createdAt);

    // ===== THỐNG KÊ =====
    if (d.toDateString() === now.toDateString())
      todayTotal += order.total;

    if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear())
      monthTotal += order.total;

    // ===== RENDER =====
    const div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <p>👤 ${order.customer.name}</p>
      <p>📞 <a href="tel:${order.customer.phone}">${order.customer.phone}</a></p>
      <p>🏠 ${order.customer.address}</p>

      <ul>
        ${order.items.map(i =>
          `<li>${i.title} × ${i.quantity} (${(i.price*i.quantity).toLocaleString()}₫)</li>`
        ).join("")}
      </ul>

      <p class="total">💰 ${order.total.toLocaleString()}₫</p>

      <p>
        📌
        <select onchange="updateStatus('${order.id}', this.value)">
          ${["new","called","shipping","done","cancel"]
            .map(s=>`<option ${order.status===s?"selected":""}>${s}</option>`)}
        </select>
      </p>

      <small>${d.toLocaleString()}</small><br><br>

      <button onclick="printOrder(this)">🧾 In</button>
      <button onclick="deleteOrder('${order.id}')">🗑 Xoá</button>
    `;

    ordersDiv.appendChild(div);
  });

  document.getElementById("todayTotal").textContent = todayTotal.toLocaleString()+"₫";
  document.getElementById("monthTotal").textContent = monthTotal.toLocaleString()+"₫";
});

/* ========== ACTIONS ========== */
window.updateStatus = (id, status) =>
  update(ref(window.db,"orders/"+id),{status});

window.deleteOrder = id => {
  if (confirm("❗ Xoá đơn hàng này?")) {
    remove(ref(window.db,"orders/"+id));
  }
};

window.printOrder = btn => {
  const div = btn.closest(".order");
  const w = window.open("", "", "width=600");
  w.document.write("<html><body>"+div.innerHTML+"</body></html>");
  w.print();
  w.close();
};
