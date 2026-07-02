/* ==========================================================================
   Futichan Nails — Shared Data
   Edit the arrays below to change services, prices, technicians, etc.
   ========================================================================== */

// Format number to Rupiah currency
function formatRupiah(num) {
  return "Rp" + Number(num).toLocaleString("id-ID");
}

// ---- Pricelist categories & services -------------------------------------
const PRICELIST = [
  {
    id: "basic-gel",
    name: "Basic Gel",
    items: [
      { id: "bg-1", name: "Basic Gel Natural", price: 55000, img: "images/basic-gel-1.jpg", desc: "Gel polish satu warna, hasil rapi & tahan lama untuk tampilan sehari-hari." },
      { id: "bg-2", name: "Basic Gel + Nail Art Tipis", price: 75000, img: "images/basic-gel-2.jpg", desc: "Gel dasar dengan tambahan garis/dot art sederhana." },
    ],
  },
  {
    id: "gel-polish",
    name: "Gel Polish",
    items: [
      { id: "gp-1", name: "Gel Polish Color", price: 65000, img: "images/gel-polish-1.jpg", desc: "Pilihan warna gel polish premium, glossy & awet hingga 3 minggu." },
      { id: "gp-2", name: "Gel Polish Glitter", price: 85000, img: "images/gel-polish-2.jpg", desc: "Sentuhan glitter halus untuk kesan berkilau elegan." },
    ],
  },
  {
    id: "french",
    name: "French",
    items: [
      { id: "fr-1", name: "Classic French Tip", price: 90000, img: "images/french-1.jpg", desc: "French manicure klasik dengan garis ujung yang rapi." },
      { id: "fr-2", name: "Colored French", price: 100000, img: "images/french-2.jpg", desc: "French tip modern dengan variasi warna pastel." },
    ],
  },
  {
    id: "cat-eye",
    name: "Cat Eye",
    items: [
      { id: "ce-1", name: "Cat Eye Magnetic", price: 95000, img: "images/cat-eye-1.jpg", desc: "Efek shimmer magnetik yang bergerak seperti mata kucing." },
      { id: "ce-2", name: "Cat Eye Galaxy", price: 110000, img: "images/cat-eye-2.jpg", desc: "Efek cat eye dengan gradasi warna galaxy yang dramatis." },
    ],
  },
  {
    id: "chrome",
    name: "Chrome",
    items: [
      { id: "ch-1", name: "Chrome Mirror", price: 100000, img: "images/chrome-1.jpg", desc: "Efek cermin metalik yang memantulkan cahaya sempurna." },
      { id: "ch-2", name: "Chrome Aurora", price: 120000, img: "images/chrome-2.jpg", desc: "Perpaduan chrome dengan gradasi warna aurora." },
    ],
  },
  {
    id: "ombre",
    name: "Ombre",
    items: [
      { id: "om-1", name: "Ombre Classic", price: 90000, img: "images/ombre-1.jpg", desc: "Gradasi dua warna yang smooth dari pangkal ke ujung kuku." },
      { id: "om-2", name: "Ombre Glitter Fade", price: 110000, img: "images/ombre-2.jpg", desc: "Gradasi warna dipadukan glitter fade yang lembut." },
    ],
  },
  {
    id: "character",
    name: "Character",
    items: [
      { id: "ct-1", name: "Character Simple", price: 120000, img: "images/character-1.jpg", desc: "Nail art karakter kesukaanmu dengan detail simpel." },
      { id: "ct-2", name: "Character Full Detail", price: 160000, img: "images/character-2.jpg", desc: "Karakter custom dengan detail penuh di seluruh kuku." },
    ],
  },
  {
    id: "3d-art",
    name: "3D Art",
    items: [
      { id: "3d-1", name: "3D Flower Art", price: 130000, img: "images/3d-art-1.jpg", desc: "Aksen bunga timbul 3D yang cantik & feminin." },
      { id: "3d-2", name: "3D Charm Deluxe", price: 170000, img: "images/3d-art-2.jpg", desc: "Kombinasi charm, stone, dan ornamen 3D premium." },
    ],
  },
  {
    id: "extension",
    name: "Extension",
    items: [
      { id: "ex-1", name: "Extension Tip Natural", price: 150000, img: "images/extension-1.jpg", desc: "Sambungan kuku natural untuk menambah panjang & bentuk." },
      { id: "ex-2", name: "Extension Sculpture", price: 190000, img: "images/extension-2.jpg", desc: "Extension teknik sculpture untuk hasil maksimal & kokoh." },
    ],
  },
  {
    id: "repair",
    name: "Repair",
    items: [
      { id: "rp-1", name: "Repair 1 Kuku", price: 20000, img: "images/repair-1.jpg", desc: "Perbaikan satu kuku yang patah/rusak." },
      { id: "rp-2", name: "Repair Full Set", price: 70000, img: "images/repair-2.jpg", desc: "Perbaikan menyeluruh untuk seluruh set kuku." },
    ],
  },
  {
    id: "removal",
    name: "Removal",
    items: [
      { id: "rm-1", name: "Soak Off Gel", price: 30000, img: "images/removal-1.jpg", desc: "Pelepasan gel polish dengan aman tanpa merusak kuku asli." },
      { id: "rm-2", name: "Removal + Extension", price: 45000, img: "images/removal-2.jpg", desc: "Pelepasan extension/sculpture secara menyeluruh." },
    ],
  },
];

// ---- Press-on nails catalogue ---------------------------------------------
const PRESSON = [
  { id: "po-1", name: "Milky Almond Set", price: 85000, img: "images/presson1.jpg", desc: "Set press on nuansa milky nude, elegan untuk sehari-hari.", sizes: ["XS", "S", "M", "L"], shapes: ["Almond", "Coffin", "Square"], lengths: ["Short", "Medium", "Long"] },
  { id: "po-2", name: "Rose Gold Chrome Set", price: 110000, img: "images/presson2.jpg", desc: "Chrome rose gold yang berkilau mewah di setiap sudut.", sizes: ["XS", "S", "M", "L"], shapes: ["Coffin", "Stiletto"], lengths: ["Medium", "Long"] },
  { id: "po-3", name: "Pink French Set", price: 90000, img: "images/presson3.jpg", desc: "French tip modern dengan sentuhan warna pink lembut.", sizes: ["XS", "S", "M", "L"], shapes: ["Almond", "Square"], lengths: ["Short", "Medium"] },
  { id: "po-4", name: "Cat Eye Galaxy Set", price: 120000, img: "images/presson4.jpg", desc: "Efek cat eye galaxy yang dramatis & eye catching.", sizes: ["S", "M", "L"], shapes: ["Coffin", "Almond"], lengths: ["Medium", "Long"] },
  { id: "po-5", name: "3D Floral Set", price: 135000, img: "images/presson5.jpg", desc: "Detail bunga 3D timbul yang feminin dan romantis.", sizes: ["XS", "S", "M", "L"], shapes: ["Almond", "Coffin"], lengths: ["Medium", "Long"] },
  { id: "po-6", name: "Chrome Silver Set", price: 105000, img: "images/presson6.jpg", desc: "Kilau silver chrome untuk tampilan futuristik & bold.", sizes: ["S", "M", "L"], shapes: ["Square", "Stiletto"], lengths: ["Short", "Medium", "Long"] },
  { id: "po-7", name: "Character Cutie Set", price: 140000, img: "images/presson7.jpg", desc: "Nail art karakter lucu, cocok untuk mood playful.", sizes: ["XS", "S", "M", "L"], shapes: ["Almond", "Square"], lengths: ["Short", "Medium"] },
  { id: "po-8", name: "Ombre Sunset Set", price: 95000, img: "images/presson8.jpg", desc: "Gradasi warna sunset yang hangat dan feminin.", sizes: ["XS", "S", "M", "L"], shapes: ["Coffin", "Almond"], lengths: ["Medium", "Long"] },
];

// ---- Technicians -------------------------------------------------------
const TECHNICIANS = [
  { id: "t-1", name: "Kak Futi" },
  { id: "t-2", name: "Kak Nadya" },
  { id: "t-3", name: "Kak Rani" },
  { id: "t-4", name: "Siapa saja (No Preference)" },
];

// ---- Service options for booking dropdown (built from PRICELIST) --------
function getServiceOptions() {
  return PRICELIST.map((c) => c.name);
}
