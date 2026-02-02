// admin.js — Firebase COMPAT — FULL VERSION

/* ================= LOGIN ================= */
const ADMIN_PASSWORD = "584ADMIN"; // 🔴 đổi tại đây

function showAdmin() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

window.logout = function () {
  sessionStorage.removeItem("admin");
  location.reload();
};

if (sessionStorage.getItem("admin") === "1") {
  showAdmin();
} else {
  document.getElementById("adminPanel").style.display = "none";
}

/* ================= DATA ================= */
const ordersDiv = document.getElementById("orders");
const ordersRef = window.db.ref("orders");
let allOrders = [];

/* ================= COLORS ================= */
const statusColor = {
  new: "#e53935",
  called: "#fb8c00",
  shipping: "#1e88e5",
  done: "#43a047",
  cancel: "#757575"
};

/* ================= LOAD ================= */
ordersRef.on("value", snap => {
  const data = snap.val();
  if (!data) {
    allOrders = [];
  } else {
    allOrders = Object.entries(data).map(([id, o]) => {
  const status = String(o.status || "").toLowerCase();

  // 🔥 BACKFILL doneAt CHO ĐƠN ĐÃ DONE
  if (status === "done" && !o.doneAt) {
    o.doneAt = Date.now(); 
    // ⚠️ cố ý dùng NOW → vì admin đang xác nhận DONE
  }

  return {
    id,
    ...o,
    status
  };
});

  }

  if (sessionStorage.getItem("admin") === "1") {
    renderOrders(allOrders);
  }
});

/* ================= RENDER ================= */
function renderOrders(orders) {
  ordersDiv.innerHTML = "";
  let todayTotal = 0;
  let monthTotal = 0;

  const now = new Date();
  orders.sort((a, b) => b.createdAt - a.createdAt);

  orders.forEach(order => {
    const time = order.doneAt || order.createdAt;
    const d = new Date(time);
    const total = Number(order.total) || 0;

   // chỉ tính doanh thu khi DONE
  if (order.status === "done") {

    if (d.toDateString() === now.toDateString()) {
      todayTotal += total;
    }

    if (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    ) {
      monthTotal += total;
    }

  }

    const div = document.createElement("div");
    div.className = "order";
    div.style.borderLeft = `6px solid ${statusColor[order.status] || "#999"}`;

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
}

/* ================= ACTIONS ================= */
window.updateStatus = (id, status) => {
  status = status.toLowerCase();

  const order = allOrders.find(o => o.id === id);
  if (order) {
    order.status = status;
    if (status === "done") {
      order.doneAt = Date.now(); // 👈 QUAN TRỌNG
    }
  }

  renderOrders(allOrders);

  const updateData = { status };
  if (status === "done") {
    updateData.doneAt = Date.now();
  }

  window.db.ref("orders/" + id).update(updateData);
};

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

/* ================= FILTER ================= */
window.filterOrders = function () {
  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;

  if (!from || !to) {
    alert("Chọn đủ ngày");
    return;
  }

  const fromTime = new Date(from).setHours(0, 0, 0, 0);
  const toTime = new Date(to).setHours(23, 59, 59, 999);

  renderOrders(allOrders.filter(o =>
    (o.doneAt || o.createdAt) >= fromTime
 && o.createdAt <= toTime
  ));
};

window.clearFilter = () => renderOrders(allOrders);

/* ================= EXPORT EXCEL ================= */
window.exportExcel = function () {
  const rows = [];

  allOrders.forEach(o => {
    o.items.forEach(i => {
      rows.push({
        Ngày: new Date(o.createdAt).toLocaleString(),
        Khách: o.customer.name,
        SĐT: o.customer.phone,
        Địa_chỉ: o.customer.address,
        Sản_phẩm: i.title,
        SL: i.quantity,
        Giá: i.price,
        Thành_tiền: i.price * i.quantity,
        Trạng_thái: o.status
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");
  XLSX.writeFile(wb, "don-hang.xlsx");
};

// ================== TRASH / RESTORE ==================
const trashModal = document.getElementById("trashModal");
const trashList = document.getElementById("trashList");

window.openTrash = () => {
  trashModal.classList.remove("hidden");
  loadTrash();
};

window.closeTrash = () => {
  trashModal.classList.add("hidden");
};

function loadTrash() {
  trashList.innerHTML = "⏳ Đang tải...";

  window.db.ref("orders_backup").once("value", snap => {
    const data = snap.val();
    if (!data) {
      trashList.innerHTML = "🚫 Không có đơn backup";
      return;
    }

    let html = "";

    Object.entries(data).forEach(([month, orders]) => {
      Object.entries(orders).forEach(([id, o]) => {
        html += `
          <div class="trash-item">
            <p><b>${o.customer.name}</b> – ${o.total.toLocaleString()}₫</p>
            <small>${new Date(o.createdAt).toLocaleString()}</small><br>
            <button class="btn primary" onclick="restoreOrder('${month}','${id}')">
              ♻️ Restore
            </button>
          </div>
        `;
      });
    });

    trashList.innerHTML = html || "🚫 Không có đơn backup";
  });
}

window.restoreOrder = async (month, id) => {
  if (!confirm("♻️ Khôi phục đơn này?")) return;

  try {
    const snap = await window.db
      .ref(`orders_backup/${month}/${id}`)
      .once("value");

    if (!snap.exists()) {
      alert("❌ Không tìm thấy đơn backup");
      return;
    }

    await window.db.ref("orders/" + id).set(snap.val());
    alert("✅ Đã khôi phục đơn!");
    closeTrash();

  } catch (err) {
    console.error(err);
    alert("❌ Restore thất bại");
  }
};

function toggleMenu() {
  document.getElementById('adminMenu').classList.toggle('hidden');
}

/* click ra ngoài thì đóng menu */
document.addEventListener('click', function(e) {
  const menu = document.getElementById('adminMenu');
  const btn = document.querySelector('.icon-btn');

  if (!menu || !btn) return;

  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.add('hidden');
  }
});


/* ================== CREEPY SHOW PASSWORD ================== */
const creepyBtn = document.getElementById("togglePassword");
const passInput = document.getElementById("adminPass");
const pupils = creepyBtn.querySelectorAll(".creepy-btn_pupil");

let showPass = false;

creepyBtn.addEventListener("click", () => {
  showPass = !showPass;

  passInput.type = showPass ? "text" : "password";

  // 👁 mở nắp khi show password
  creepyBtn.classList.toggle("show", showPass);

  // đổi icon
  creepyBtn.querySelector(".creepy-btn_cover").textContent =
    showPass ? "🙈" : "👁";
});

/* ====== AUTO OPEN WHEN FOCUS PASSWORD INPUT ====== */
passInput.addEventListener("focus", () => {
  if (!showPass) creepyBtn.classList.add("focus");
});

passInput.addEventListener("blur", () => {
  creepyBtn.classList.remove("focus");
});

const eyesRef = creepyBtn.querySelector(".creepy-btn_eyes");
/* Eye tracking */
function updateEyes(e) {
  const event = e.touches ? e.touches[0] : e;

  const rect = eyesRef.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;

  const angle = Math.atan2(-dy, dx) + Math.PI / 2;
  const distance = Math.hypot(dx, dy);

  const x = Math.sin(angle) * distance / 180;
  const y = Math.cos(angle) * distance / 75;

  pupils.forEach(pupil => {
    pupil.style.transform =
      `translate(${ -50 + x * 50 }%, ${ -50 + y * 50 }%)`;
  });
}
/* Eye tracking */
creepyBtn.addEventListener("mousemove", updateEyes);
creepyBtn.addEventListener("touchmove", updateEyes);

/* Lưu pass*/
window.login = function () {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("admin", "1");
    localStorage.setItem("admin_pass", pass);
    showAdmin();
    
  } else {
    // 👁 rung mắt TRƯỚC
    creepyBtn.classList.add("shake");

    // ⏳ rung 3s rồi mới báo sai
    setTimeout(() => {
      creepyBtn.classList.remove("shake");
      alert("❌ Sai mật khẩu");
    }, 3000);
  }
};

