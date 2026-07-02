document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("categoryNav");
  const container = document.getElementById("categoryContainer");
  const qtyState = {};

  PRICELIST.forEach((cat) => {
    // category nav pill
    const navLink = document.createElement("a");
    navLink.href = "#cat-" + cat.id;
    navLink.textContent = cat.name;
    nav.appendChild(navLink);

    // category block
    const block = document.createElement("div");
    block.className = "category-block reveal";
    block.id = "cat-" + cat.id;

    const title = document.createElement("div");
    title.className = "category-title";
    title.innerHTML = `<h2 style="margin:0">${cat.name}</h2><span>${cat.items.length} pilihan</span>`;
    block.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "grid grid-4";

    cat.items.forEach((item) => {
      qtyState[item.id] = 1;
      const card = document.createElement("div");
      card.className = "card product-card";
      card.innerHTML = `
        <div class="product-media"><img src="${item.img}" alt="${item.name}"></div>
        <div class="product-body">
          <h3>${item.name}</h3>
          <div class="product-price">${formatRupiah(item.price)}</div>
          <p class="product-desc">${item.desc}</p>
          <div class="product-foot">
            <div class="qty-stepper" data-id="${item.id}">
              <button type="button" class="qty-minus">−</button>
              <span class="qty-val">1</span>
              <button type="button" class="qty-plus">+</button>
            </div>
            <button type="button" class="btn btn-primary btn-sm add-btn" style="flex:1">Tambah</button>
          </div>
        </div>`;

      const minus = card.querySelector(".qty-minus");
      const plus = card.querySelector(".qty-plus");
      const val = card.querySelector(".qty-val");
      minus.addEventListener("click", () => {
        qtyState[item.id] = Math.max(1, qtyState[item.id] - 1);
        val.textContent = qtyState[item.id];
      });
      plus.addEventListener("click", () => {
        qtyState[item.id] = qtyState[item.id] + 1;
        val.textContent = qtyState[item.id];
      });
      card.querySelector(".add-btn").addEventListener("click", () => {
        addToCart({
          id: item.id,
          type: "service",
          name: item.name,
          price: item.price,
          qty: qtyState[item.id],
          img: item.img,
          meta: { Kategori: cat.name },
        });
        showToast(`${item.name} ditambahkan ke keranjang`, "🛍️");
        qtyState[item.id] = 1;
        val.textContent = 1;
      });

      grid.appendChild(card);
    });

    block.appendChild(grid);
    container.appendChild(block);
  });

  // scroll-spy for category nav active state
  const navLinks = [...nav.querySelectorAll("a")];
  const blocks = [...container.querySelectorAll(".category-block")];
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          const link = nav.querySelector(`a[href="#${entry.target.id}"]`);
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  blocks.forEach((b) => obs.observe(b));

  initReveal();
});
