/* ==========================================================================
   Futichan Nails — LocalStorage Data Layer
   Keys: fn_cart, fn_bookings, fn_orders
   ========================================================================== */

const LS_KEYS = {
  cart: "fn_cart",
  bookings: "fn_bookings",
  orders: "fn_orders",
};

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Storage read error:", e);
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

/* ---------------- CART ---------------------------------------------- */
function getCart() {
  return lsGet(LS_KEYS.cart, []);
}

function saveCart(cart) {
  lsSet(LS_KEYS.cart, cart);
  updateCartBadge();
}

// item: { id, type ('service' | 'presson' | 'booking'), name, price, qty, img, meta }
function addToCart(item) {
  const cart = getCart();
  // For services/presson, merge if same id + same options
  const existing = cart.find(
    (c) => c.id === item.id && c.type === item.type && JSON.stringify(c.options || {}) === JSON.stringify(item.options || {})
  );
  if (existing && item.type !== "booking") {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, uid: item.uid || "c" + Date.now() + Math.random().toString(16).slice(2) });
  }
  saveCart(cart);
}

function updateCartQty(uid, delta) {
  const cart = getCart();
  const item = cart.find((c) => c.uid === uid);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveCart(cart);
}

function removeFromCart(uid) {
  const cart = getCart().filter((c) => c.uid !== uid);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
}

const ADMIN_FEE = 5000;

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.textContent = getCartCount();
  });
}

/* ---------------- BOOKINGS -------------------------------------------- */
function getBookings() {
  return lsGet(LS_KEYS.bookings, []);
}

function saveBooking(booking) {
  const bookings = getBookings();
  booking.id = "BK" + Date.now();
  booking.createdAt = new Date().toISOString();
  bookings.push(booking);
  lsSet(LS_KEYS.bookings, bookings);
  return booking;
}

/* ---------------- ORDERS (from payment page) ---------------------------- */
function getOrders() {
  return lsGet(LS_KEYS.orders, []);
}

function saveOrder(order) {
  const orders = getOrders();
  order.id = "ORD" + Date.now();
  order.createdAt = new Date().toISOString();
  order.status = order.status || "Menunggu Pembayaran";
  orders.push(order);
  lsSet(LS_KEYS.orders, orders);
  return order;
}

function updateOrderStatus(orderId, status, proofDataUrl) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    if (proofDataUrl) order.proof = proofDataUrl;
  }
  lsSet(LS_KEYS.orders, orders);
  return order;
}
