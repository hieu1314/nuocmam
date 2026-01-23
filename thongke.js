// thongke.js — Firebase COMPAT

document.addEventListener("DOMContentLoaded", () => {
  if (!window.db) {
    console.warn("❌ Firebase chưa sẵn sàng (thống kê)");
    return;
  }

  const db = window.db;

  /* ========= DATE ========= */
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const yesterdayKey = new Date(now - 86400000).toISOString().slice(0, 10);

  const daysRef = db.ref("visitors/days");

  /* ========= TĂNG LƯỢT HÔM NAY ========= */
  db.ref("visitors/days/" + todayKey)
    .get()
    .then(snap => {
      const count = snap.exists() ? snap.val() : 0;
      db.ref("visitors/days/" + todayKey).set(count + 1);
    });

  /* ========= ONLINE ========= */
  const uid = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const onlineRef = db.ref("visitors/online/" + uid);

  onlineRef.set(true);
  onlineRef.onDisconnect().remove();

  db.ref("visitors/online").on("value", snap => {
    const el = document.getElementById("online");
    if (el) {
      el.textContent = snap.val()
        ? Object.keys(snap.val()).length
        : 0;
    }
  });

  /* ========= NGÀY / TUẦN / THÁNG ========= */
  daysRef.on("value", snap => {
    const data = snap.val() || {};

    const today = data[todayKey] || 0;
    const yesterday = data[yesterdayKey] || 0;

    let thisWeek = 0, lastWeek = 0;
    let thisMonth = 0, lastMonth = 0;

    const nowDate = new Date();
    const weekNow = getWeek(nowDate);
    const monthNow = nowDate.getMonth();
    const yearNow = nowDate.getFullYear();

    Object.entries(data).forEach(([dateStr, count]) => {
      const d = new Date(dateStr);
      if (isNaN(d)) return;

      const w = getWeek(d);
      const m = d.getMonth();
      const y = d.getFullYear();

      if (y === yearNow && w === weekNow) thisWeek += count;
      if (y === yearNow && w === weekNow - 1) lastWeek += count;

      if (y === yearNow && m === monthNow) thisMonth += count;
      if (y === yearNow && m === monthNow - 1) lastMonth += count;
    });

    setText("today", today);
    setText("yesterday", yesterday);
    setText("thisweek", thisWeek);
    setText("lastweek", lastWeek);
    setText("thismonth", thisMonth);
    setText("lastmonth", lastMonth);
  });

  /* ========= TOGGLE PANEL ========= */
  const statsToggle = document.getElementById("stats-toggle");
  const statsPanel = document.getElementById("stats-panel");

  if (statsToggle && statsPanel) {
    statsToggle.addEventListener("click", () => {
      statsToggle.classList.toggle("open");
      statsPanel.classList.toggle("open");
      statsToggle.textContent =
        statsPanel.classList.contains("open") ? "❮" : "💖";
    });
  }
});

/* ========= HELPERS ========= */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function getWeek(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
