/* ---------- CART STATE ---------- */
let cart = [];

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}


/* ---------- QTY ---------- */
function changeQty(button, change) {
  const input = button.closest(".qty-wrapper").querySelector(".qty-input");
  let value = parseInt(input.value) || 1;
  value = Math.max(1, value + change);
  input.value = value;
}

/* ---------- ADD TO CART ---------- */
function addToCart(button, name, price) {
  const card = button.closest(".menu-card");
  const qty = parseInt(card.querySelector(".qty-input").value);

  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();
  showToast("Added to cart ✅");
}

/* ---------- REMOVE ---------- */
function removeItem(index) {
  loadCart();
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  renderCartPage();
}


/* ---------- RENDER CART ---------- */
function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const list = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (countEl) {
    countEl.textContent = cart.reduce((s, i) => s + i.qty, 0);
  }

  if (!list || !totalEl) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty} — ₦${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = total;
}

/* ---------- CART TOGGLE ---------- */
function openCartPage() {
  window.location.href = "cart.html";
}

/* ---------- TOAST ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 1500);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", updateCartUI);

function renderCartPage() {
  loadCart();

  const container = document.getElementById("cartPageItems");
  const totalEl = document.getElementById("cartPageTotal");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = 0;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="images/bole1.jpg" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>₦${item.price} × ${item.qty}</p>
        <strong>₦${item.price * item.qty}</strong>
      </div>
      <button onclick="removeItem(${index})">❌</button>
    `;

    container.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function updateCartCount() {
  loadCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

function goBack() {
  window.location.href = "order.html";
}

document.addEventListener("DOMContentLoaded", function () {
const reveals = document.querySelectorAll(".reveal"); function revealOnScroll() { reveals.forEach(el => { const windowHeight = window.innerHeight; const elementTop = el.getBoundingClientRect().top; const revealPoint = 100; if (elementTop < windowHeight - revealPoint) { el.classList.add("active"); } }); } window.addEventListener("scroll", revealOnScroll); revealOnScroll(); });
const menuToggle = document.getElementById("menuToggle"); const navLinks = document.getElementById("navLinks"); menuToggle.addEventListener("click", () => { navLinks.classList.toggle("active"); }); function toggleCart() { document.getElementById("cartBox").classList.toggle("hidden");}