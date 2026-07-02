document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pressonGrid");

  PRESSON.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card product-card reveal";
    card.innerHTML = `
      <div class="product-media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-price">${formatRupiah(p.price)}</div>
        <p class="product-desc">${p.desc}</p>
        <div class="form-grid-2" style="gap:10px">
          <div class="option-row">
            <label>Ukuran</label>
            <select class="opt-size">${p.sizes.map((s) => `<option value="${s}">${s}</option>`).join("")}</select>
          </div>
          <div class="option-row">
            <label>Bentuk</label>
            <select class="opt-shape">${p.shapes.map((s) => `<option value="${s}">${s}</option>`).join("")}</select>
          </div>
        </div>
        <div class="option-row" style="margin-top:8px">
          <label>Panjang</label>
          <select class="opt-length">${p.lengths.map((s) => `<option value="${s}">${s}</option>`).join("")}</select>
        </div>
        <div class="product-foot">
          <div class="qty-stepper">
            <button type="button" class="qty-minus">−</button>
            <span class="qty-val">1</span>
            <button type="button" class="qty-plus">+</button>
          </div>
          <button type="button" class="btn btn-primary btn-sm add-btn" style="flex:1">Tambah</button>
        </div>
      </div>`;

    let qty = 1;
    const val = card.querySelector(".qty-val");
    card.querySelector(".qty-minus").addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      val.textContent = qty;
    });
    card.querySelector(".qty-plus").addEventListener("click", () => {
      qty += 1;
      val.textContent = qty;
    });

    card.querySelector(".add-btn").addEventListener("click", () => {
      const size = card.querySelector(".opt-size").value;
      const shape = card.querySelector(".opt-shape").value;
      const length = card.querySelector(".opt-length").value;
      addToCart({
        id: p.id,
        type: "presson",
        name: p.name,
        price: p.price,
        qty: qty,
        img: p.img,
        options: { size, shape, length },
        meta: { Ukuran: size, Bentuk: shape, Panjang: length },
      });
      showToast(`${p.name} ditambahkan ke keranjang`, "🛍️");
      qty = 1;
      val.textContent = 1;
    });

    grid.appendChild(card);
  });

  initReveal();
});
