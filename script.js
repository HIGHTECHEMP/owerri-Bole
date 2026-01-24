let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- CART ---------- */

function addToCart(name, price, inputId) {
  const qty = parseInt(document.getElementById(inputId).value);
  if (qty <= 0) return;

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  if (!cartList) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x ${item.qty} = ₦${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartList.appendChild(li);
    total += item.price * item.qty;
  });

  totalEl.textContent = total;
}

/* ---------- CHECKOUT ---------- */

function renderCheckout() {
  const checkoutBox = document.getElementById("checkoutItems");
  const totalEl = document.getElementById("checkoutTotal");
  if (!checkoutBox || !totalEl) return;

  checkoutBox.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.name} x ${item.qty} = ₦${item.price * item.qty}`;
    checkoutBox.appendChild(p);
    total += item.price * item.qty;
  });

  totalEl.textContent = total;
}

/* ---------- FLUTTERWAVE PAYMENT ---------- */

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X", // Replace with your real key
      tx_ref: "OWERRIBOLE-" + Date.now(),
      amount: total,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone").value,
        name: document.getElementById("name").value,
      },
      callback: function (data) {
        saveOrder(data.transaction_id);
        window.location.href = "success.html";
      },
      onclose: function () {
        alert("Payment cancelled");
      },
      customizations: {
        title: "Owerri Bole",
        description: "Food Order Payment",
      },
    });
  });
}

/* ---------- SAVE ORDER ---------- */

function saveOrder(reference) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const customer = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
  };

  orders.push({
    id: Date.now(),
    reference,
    items: cart,
    customer,
    date: new Date().toLocaleString(),
    status: "Paid"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
}

/* ---------- ADMIN DASHBOARD ---------- */

function renderAdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  ordersList.innerHTML = "";

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "menu-card";
    div.innerHTML = `
      <h4>Order Ref: ${order.reference}</h4>
      <p><strong>${order.customer.name}</strong> (${order.customer.phone})</p>
      <p>${order.customer.address}</p>
      <p>Date: ${order.date}</p>
      <p>Status:
        <select onchange="updateStatus(${index}, this.value)">
          <option ${order.status === "Paid" ? "selected" : ""}>Paid</option>
          <option ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
          <option ${order.status === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
          <option ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </p>
      <hr>
      ${order.items.map(i => `<p>${i.name} x ${i.qty}</p>`).join("")}
    `;
    ordersList.appendChild(div);
  });
}

function updateStatus(index, status) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
}
renderCart();
    renderCheckout();
/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", function () {
    
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
});