const VOUCHERS = {
  FUTI10: 0.10,
  NAILS5: 0.05,
};

let appliedVoucher = null;

function renderCart() {
  const wrap = document.getElementById("cartWrap");
  const cart = getCart();

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="card empty-state reveal in">
        <div class="why-icon" style="margin:0 auto 20px">🛍️</div>
        <h2>Keranjang kamu masih kosong</h2>
        <p>Yuk pilih layanan favoritmu dulu.</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;flex-wrap:wrap">
          <a href="pricelist.html" class="btn btn-primary">Lihat Pricelist</a>
          <a href="presson.html" class="btn btn-outline">Lihat Press On Nails</a>
        </div>
      </div>`;
    return;
  }

  const itemsHtml = cart.map((item) => {
    const metaHtml = item.meta
      ? Object.entries(item.meta).map(([k, v]) => `<span>${k}: ${v}</span>`).join("")
      : "";
    const showStepper = item.type !== "booking";
    return `
      <div class="card cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="meta">
          <h3>${item.name}</h3>
          ${metaHtml}
          <div class="price">${formatRupiah(item.price)}</div>
        </div>
        <div class="cart-actions-col">
          ${showStepper ? `
          <div class="qty-stepper" data-uid="${item.uid}">
            <button type="button" class="qty-minus">−</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" class="qty-plus">+</button>
          </div>` : `<span style="font-size:12px;color:var(--ink-faint)">Qty: ${item.qty}</span>`}
          <button type="button" class="remove-btn" data-uid="${item.uid}">Hapus</button>
        </div>
      </div>`;
  }).join("");

  const subtotal = getCartSubtotal();
  const discount = appliedVoucher ? Math.round(subtotal * appliedVoucher) : 0;
  const total = subtotal - discount + ADMIN_FEE;

  wrap.innerHTML = `
    <div class="cart-layout">
      <div>
        ${itemsHtml}
        <div class="form-row" style="margin-top:20px">
          <label for="cartNotes">Catatan Pesanan</label>
          <textarea id="cartNotes" placeholder="Contoh: tolong warna pastel semua ya kak">${sessionStorage.getItem("fn_cart_notes") || ""}</textarea>
        </div>
      </div>
      <div class="card summary-card">
        <h3 style="margin-bottom:18px">Ringkasan Belanja</h3>
        <div class="voucher-row">
          <input type="text" id="voucherInput" placeholder="Kode voucher" value="${appliedVoucher ? Object.keys(VOUCHERS).find(k => VOUCHERS[k] === appliedVoucher) : ''}">
          <button type="button" class="btn btn-outline btn-sm" id="applyVoucher">Pakai</button>
        </div>
        <div class="summary-row"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
        ${discount > 0 ? `<div class="summary-row" style="color:var(--success)"><span>Diskon Voucher</span><span>-${formatRupiah(discount)}</span></div>` : ""}
        <div class="summary-row"><span>Biaya Admin</span><span>${formatRupiah(ADMIN_FEE)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatRupiah(total)}</span></div>
        <a href="payment.html" class="btn btn-primary btn-block" id="checkoutBtn">Lanjut ke Pembayaran</a>
        <p class="hint" style="text-align:center;margin-top:12px">Coba kode: <strong>FUTI10</strong> atau <strong>NAILS5</strong></p>
      </div>
    </div>`;

  // bind qty controls
  wrap.querySelectorAll(".qty-stepper").forEach((stepper) => {
    const uid = stepper.dataset.uid;
    stepper.querySelector(".qty-minus").addEventListener("click", () => {
      updateCartQty(uid, -1);
      renderCart();
    });
    stepper.querySelector(".qty-plus").addEventListener("click", () => {
      updateCartQty(uid, 1);
      renderCart();
    });
  });

  wrap.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.uid);
      showToast("Item dihapus dari keranjang", "🗑️");
      renderCart();
    });
  });

  document.getElementById("applyVoucher").addEventListener("click", () => {
    const code = document.getElementById("voucherInput").value.trim().toUpperCase();
    if (VOUCHERS[code]) {
      appliedVoucher = VOUCHERS[code];
      showToast(`Voucher ${code} berhasil digunakan!`, "🎉");
      renderCart();
    } else {
      showToast("Kode voucher tidak valid", "⚠️");
    }
  });

  const notesEl = document.getElementById("cartNotes");
  notesEl.addEventListener("input", () => {
    sessionStorage.setItem("fn_cart_notes", notesEl.value);
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    // persist a draft order summary for the payment page
    const draft = {
      subtotal, discount, adminFee: ADMIN_FEE, total,
      notes: notesEl.value,
      hasPresson: cart.some((i) => i.type === "presson"),
    };
    sessionStorage.setItem("fn_checkout_draft", JSON.stringify(draft));
  });
}

document.addEventListener("DOMContentLoaded", renderCart);
