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
