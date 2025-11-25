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
