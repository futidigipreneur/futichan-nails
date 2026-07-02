document.addEventListener("DOMContentLoaded", () => {
  const serviceSelect = document.getElementById("bService");
  getServiceOptions().forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    serviceSelect.appendChild(opt);
  });

  // Set min date to today
  const dateInput = document.getElementById("bDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // Technician chips
  const chipWrap = document.getElementById("technicianChips");
  let selectedTech = TECHNICIANS[0].name;
  TECHNICIANS.forEach((t, i) => {
    const chip = document.createElement("div");
    chip.className = "chip" + (i === 0 ? " selected" : "");
    chip.textContent = t.name;
    chip.addEventListener("click", () => {
      chipWrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("selected"));
      chip.classList.add("selected");
      selectedTech = t.name;
    });
    chipWrap.appendChild(chip);
  });

  // File upload preview (stored as base64 in booking record)
  const fileInput = document.getElementById("bFile");
  const filePreview = document.getElementById("filePreview");
  const dropText = document.getElementById("fileDropText");
  let uploadedImage = null;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Ukuran file maksimal 2MB", "⚠️");
      fileInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = e.target.result;
      filePreview.innerHTML = `<img src="${uploadedImage}" alt="Inspirasi upload">`;
      dropText.textContent = "✅ " + file.name;
    };
    reader.readAsDataURL(file);
  });

  // Submit
  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("bName").value.trim();
    const wa = document.getElementById("bWa").value.trim();
    const date = document.getElementById("bDate").value;
    const time = document.getElementById("bTime").value;
    const service = serviceSelect.value;
    const notes = document.getElementById("bNotes").value.trim();

    if (!name || !wa || !date || !time || !service) {
      showToast("Mohon lengkapi semua field wajib", "⚠️");
      return;
    }

    const booking = {
      name, wa, date, time, service, notes,
      technician: selectedTech,
      inspiration: uploadedImage,
    };
    const saved = saveBooking(booking);

    // Find a representative price for chosen service category (uses first item's price)
    const cat = PRICELIST.find((c) => c.name === service);
    const price = cat ? cat.items[0].price : 0;

    addToCart({
      id: saved.id,
      type: "booking",
      name: `Booking: ${service}`,
      price: price,
      qty: 1,
      img: cat ? cat.items[0].img : "images/gallery1.jpg",
      meta: { Tanggal: date, Jam: time, Teknisi: selectedTech },
    });

    showToast("Booking berhasil ditambahkan ke keranjang!", "💅");
    form.reset();
    filePreview.innerHTML = "";
    dropText.textContent = "📎 Klik untuk upload gambar inspirasi";
    uploadedImage = null;
    chipWrap.querySelectorAll(".chip").forEach((c, i) => c.classList.toggle("selected", i === 0));
    selectedTech = TECHNICIANS[0].name;

    setTimeout(() => { window.location.href = "cart.html"; }, 1200);
  });
});
