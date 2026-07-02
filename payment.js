let currentOrder = null;
let countdownInterval = null;

function setStep(step) {
  [1, 2, 3].forEach((n) => {
    document.getElementById("stepPill" + n).classList.toggle("active", n <= step);
  });
}

function renderShippingForm() {
  const wrap = document.getElementById("paymentWrap");
  const cart = getCart();

  if (cart.length === 0 && !sessionStorage.getItem("fn_active_order")) {
    wrap.innerHTML = `
      <div class="card empty-state">
        <div class="why-icon" style="margin:0 auto 20px">🧾</div>
        <h2>Belum ada pesanan</h2>
        <p>Silakan pilih layanan terlebih dahulu sebelum checkout.</p>
        <a href="pricelist.html" class="btn btn-primary">Lihat Pricelist</a>
      </div>`;
    return;
  }

  const draft = JSON.parse(sessionStorage.getItem("fn_checkout_draft") || "{}");
  const subtotal = draft.subtotal ?? getCartSubtotal();
  const discount = draft.discount ?? 0;
  const total = draft.total ?? subtotal - discount + ADMIN_FEE;
  const hasPresson = draft.hasPresson ?? cart.some((i) => i.type === "presson");

  wrap.innerHTML = `
    <form class="form-card reveal in" id="shippingForm">
      <div class="form-row">
        <label for="pName">Nama</label>
        <input type="text" id="pName" placeholder="Nama lengkap" required>
      </div>
      <div class="form-row">
        <label for="pPhone">Nomor HP</label>
        <input type="tel" id="pPhone" placeholder="08xxxxxxxxxx" required>
      </div>
      ${hasPresson ? `
      <div class="form-row">
        <label for="pAddress">Alamat Pengiriman <span class="hint">(untuk Press On Nails)</span></label>
        <textarea id="pAddress" placeholder="Alamat lengkap penerima" required></textarea>
      </div>` : ""}
      <div class="form-row">
        <label for="pNotes">Catatan</label>
        <textarea id="pNotes" placeholder="Catatan tambahan (opsional)">${draft.notes || ""}</textarea>
      </div>
      <div class="form-row">
        <label>Metode Pembayaran</label>
        <div class="chip-group"><div class="chip selected">✅ QRIS</div></div>
      </div>
      <div class="summary-row total" style="margin-bottom:20px">
        <span>Total Pembayaran</span><span>${formatRupiah(total)}</span>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Bayar Sekarang</button>
    </form>`;

  document.getElementById("shippingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("pName").value.trim();
    const phone = document.getElementById("pPhone").value.trim();
    const address = hasPresson ? document.getElementById("pAddress").value.trim() : "";
    const notes = document.getElementById("pNotes").value.trim();

    if (!name || !phone || (hasPresson && !address)) {
      showToast("Mohon lengkapi data yang wajib diisi", "⚠️");
      return;
    }

    const order = saveOrder({
      name, phone, address, notes,
      items: cart,
      subtotal, discount, adminFee: ADMIN_FEE, total,
      method: "QRIS",
    });
    currentOrder = order;
    sessionStorage.setItem("fn_active_order", order.id);
    setStep(2);
    renderQrisStep(order);
  });
}

function renderQrisStep(order) {
  const wrap = document.getElementById("paymentWrap");
  const DURATION = 15 * 60; // 15 minutes
  let remaining = DURATION;

  wrap.innerHTML = `
    <div class="card qris-box reveal in">
      <span class="status-pill" id="statusPill"><span class="dot-anim"></span> Menunggu Pembayaran</span>
      <img src="images/qris.png" alt="QRIS Futichan Nails">
      <p style="margin-bottom:4px">Total Pembayaran</p>
      <h2 style="color:var(--rose-gold);margin-bottom:10px">${formatRupiah(order.total)}</h2>
      <p style="font-size:12.5px">Scan QRIS di atas menggunakan aplikasi e-wallet / m-banking favoritmu.</p>
      <div class="countdown" id="countdown">15:00</div>
      <p class="hint" style="margin-bottom:24px">Selesaikan pembayaran sebelum waktu habis</p>

      <div class="form-row" style="text-align:left">
        <label>Upload Bukti Transfer</label>
        <label class="file-drop">
          <input type="file" id="proofFile" accept="image/*">
          <span id="proofText">📎 Klik untuk upload bukti transfer</span>
        </label>
        <div class="file-preview" id="proofPreview"></div>
      </div>
      <button type="button" class="btn btn-primary btn-block" id="confirmPayBtn" disabled>Konfirmasi Pembayaran</button>
    </div>`;

  let proofData = null;
  const fileInput = document.getElementById("proofFile");
  const proofText = document.getElementById("proofText");
  const proofPreview = document.getElementById("proofPreview");
  const confirmBtn = document.getElementById("confirmPayBtn");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      proofData = e.target.result;
      proofPreview.innerHTML = `<img src="${proofData}" alt="Bukti transfer">`;
      proofText.textContent = "✅ " + file.name;
      confirmBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });

  confirmBtn.addEventListener("click", () => {
    updateOrderStatus(order.id, "Menunggu Verifikasi", proofData);
    clearInterval(countdownInterval);
    clearCart();
    sessionStorage.removeItem("fn_active_order");
    sessionStorage.removeItem("fn_checkout_draft");
    setStep(3);
    renderSuccessStep(order);
  });

  const countdownEl = document.getElementById("countdown");
  countdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = "00:00";
      document.getElementById("statusPill").innerHTML = "⏰ Waktu Habis";
      confirmBtn.disabled = true;
      return;
    }
    const m = String(Math.floor(remaining / 60)).padStart(2, "0");
    const s = String(remaining % 60).padStart(2, "0");
    countdownEl.textContent = `${m}:${s}`;
  }, 1000);
}

function renderSuccessStep(order) {
  const wrap = document.getElementById("paymentWrap");
  wrap.innerHTML = `
    <div class="card center reveal in" style="padding:50px 30px">
      <div class="why-icon" style="margin:0 auto 20px;font-size:30px">🎉</div>
      <h2>Pembayaran Diterima!</h2>
      <p>Terima kasih, ${order.name}. Bukti transfer kamu sedang kami verifikasi. Kami akan menghubungi kamu melalui WhatsApp untuk konfirmasi jadwal/pengiriman.</p>
      <p style="font-size:12.5px;color:var(--ink-faint)">No. Pesanan: ${order.id}</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:10px">Kembali ke Beranda</a>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  setStep(1);
  renderShippingForm();
});
