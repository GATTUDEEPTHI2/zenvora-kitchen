let cart = [];
let menuItems = [];

// LOAD MENU
async function loadMenu() {
  const res = await fetch("/api/menu");
  menuItems = await res.json();
  displayMenu(menuItems);
  loadPopular();
  displayCart();
  updateCartCount();
}

// DISPLAY MENU
function displayMenu(items) {
  const foodList = document.getElementById("foodList");

  foodList.innerHTML = items.map(item => {
    const prices = item.prices || { Regular: item.price };
    const firstPrice = Object.values(prices)[0];

    const sizeOptions = Object.keys(prices).map(size =>
      `<option value="${size}">${size} - ₹${prices[size]}</option>`
    ).join("");

    return `
      <div class="food-card">
        <div class="food-img-box">
          <img src="${item.image}" alt="${item.name}">
          <span class="rating-badge">⭐ 4.5</span>
          <button class="hover-add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>

        <div class="food-info">
          <h3>${item.name}</h3>
          <select id="size-${item.id}">${sizeOptions}</select>
          <input type="number" id="qty-${item.id}" value="1" min="1">
          <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;
  }).join("");
}

// CATEGORY FILTER
function filterCategory(cat, event) {
  document.querySelectorAll(".categories button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (event) {
    event.target.classList.add("active");
    createRipple(event);
  }

  if (cat === "All") {
    displayMenu(menuItems);
  } else {
    const filtered = menuItems.filter(item => item.category === cat);
    displayMenu(filtered);
  }

  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) ripple.remove();

  button.appendChild(circle);
}

// SEARCH FOOD
function searchFood() {
  const q = document.querySelector(".search-box input").value.toLowerCase();

  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );

  displayMenu(filtered);
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

// ADD TO CART
function addToCart(id) {
  const item = menuItems.find(food => food.id === id);
  const prices = item.prices || { Regular: item.price };

  const sizeElement = document.getElementById(`size-${id}`);
  const qtyElement = document.getElementById(`qty-${id}`);

  const size = sizeElement ? sizeElement.value : Object.keys(prices)[0];
  const quantity = qtyElement ? Number(qtyElement.value) : 1;
  const price = prices[size];

  const existingItem = cart.find(
    cartItem => cartItem.id === id && cartItem.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      size,
      price,
      quantity
    });
  }

  displayCart();
  updateCartCount();
}

// DISPLAY CART
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty 🛒</p>`;
    totalBox.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>${item.size} | ₹${item.price}</p>
        </div>

        <div class="cart-controls">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <strong>₹${item.price * item.quantity}</strong>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalBox.textContent = total;
}

// CART CONTROLS
function increaseQty(index) {
  cart[index].quantity++;
  displayCart();
  updateCartCount();
}

function decreaseQty(index) {
  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  displayCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  displayCart();
  updateCartCount();
}

// CART COUNT
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = count;
  }
}

// POPULAR ITEMS
function loadPopular() {
  const box = document.getElementById("popularItems");

  if (!box) return;

  box.innerHTML = menuItems.slice(0, 4).map(item => {
    const prices = item.prices || { Regular: item.price };
    const firstPrice = Object.values(prices)[0];

    return `
      <div class="food-card">
        <div class="food-img-box">
          <img src="${item.image}" alt="${item.name}">
          <span class="rating-badge">⭐ 4.5</span>
          <button class="hover-add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>

        <div class="food-info">
          <h3>${item.name}</h3>
          <button onclick="addToCart(${item.id})">Order Now</button>
        </div>
      </div>
    `;
  }).join("");
}

// MOBILE MENU
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});

// PAYMENT UI
function togglePaymentFields() {
  const payment = document.getElementById("payment").value;

  document.getElementById("upiBox").style.display = "none";
  document.getElementById("cardBox").style.display = "none";

  if (payment === "UPI") {
    document.getElementById("upiBox").style.display = "block";
  }

  if (payment === "Card") {
    document.getElementById("cardBox").style.display = "block";
  }
}

// SUCCESS POPUP
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// CHECKOUT
document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Please add items to cart first");
    return;
  }

  const orderData = {
    customerName: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    payment: document.getElementById("payment").value,
    items: cart,
    total: document.getElementById("total").textContent
  };

  await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  showPopup();

  cart = [];
  displayCart();
  updateCartCount();
  this.reset();
  togglePaymentFields();
});

window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});

loadMenu();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});