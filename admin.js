// admin.js — Firebase COMPAT ONLY

/* ========== LOGIN ========== */
const ADMIN_PASSWORD = "584ADMIN"; // 🔴 đổi tại đây

function showAdmin() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

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

if (sessionStorage.getItem("admin") === "1") {
  showAdmin();
}

/* ========== ORDERS ========== */
const ordersDiv = document.getElementById("orders");
const ordersRef = window.db.ref("orders");

ordersRef.on("value", snap => {
  ordersDiv.innerHTML = "";
  let todayTotal = 0;
  let monthTotal = 0;

  const now = new Date();
  const data = snap.val();
  if (!data) return;

  const orders = Object.entries(data).map(([id, o]) => ({ id, ...o }));
  orders.sort((a, b) => b.createdAt - a.createdAt);

  orders.forEach(order => {
    const d = new Date(order.createdAt);

    // ===== THỐNG KÊ =====
    if (d.toDateString() === now.toDateString())
      todayTotal += order.total;

    if (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    )
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
          `<li>${i.title} × ${i.quantity} (${(i.price * i.quantity).toLocaleString()}₫)</li>`
        ).join("")}
      </ul>

      <p class="total">💰 ${order.total.toLocaleString()}₫</p>

      <p>
        📌
        <select onchange="updateStatus('${order.id}', this.value)">
          ${["new","called","shipping","done","cancel"]
            .map(s => `<option value="${s}" ${order.status === s ? "selected" : ""}>${s}</option>`)
            .join("")}
        </select>
      </p>

      <small>${d.toLocaleString()}</small><br><br>

      <button onclick="printOrder(this)">🧾 In</button>
      <button onclick="deleteOrder('${order.id}')">🗑 Xoá</button>
    `;

    ordersDiv.appendChild(div);
  });

  document.getElementById("todayTotal").textContent =
    todayTotal.toLocaleString() + "₫";
  document.getElementById("monthTotal").textContent =
    monthTotal.toLocaleString() + "₫";
});

/* ========== ACTIONS ========== */
window.updateStatus = (id, status) =>
  window.db.ref("orders/" + id).update({ status });

window.deleteOrder = id => {
  if (confirm("❗ Xoá đơn hàng này?")) {
    window.db.ref("orders/" + id).remove();
  }
};

window.printOrder = btn => {
  const div = btn.closest(".order");
  const w = window.open("", "", "width=600");
  w.document.write("<html><body>" + div.innerHTML + "</body></html>");
  w.print();
  w.close();
};
