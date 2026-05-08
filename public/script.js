let cart = [];

let menuItems = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    category: "Biryani",
    prices: { Single: 180, Full: 300 },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
  },
  {
    id: 2,
    name: "Mutton Biryani",
    category: "Biryani",
    prices: { Single: 250, Full: 420 },
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600"
  },
  {
    id: 3,
    name: "Prawns Biryani",
    category: "Biryani",
    prices: { Single: 240, Full: 400 },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
  },
  {
    id: 4,
    name: "Veg Biryani",
    category: "Biryani",
    prices: { Single: 140, Full: 240 },
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600"
  },
  {
    id: 5,
    name: "Paneer Biryani",
    category: "Biryani",
    prices: { Single: 170, Full: 290 },
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600"
  },
  {
    id: 6,
    name: "Egg Biryani",
    category: "Biryani",
    prices: { Single: 130, Full: 220 },
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600"
  },
  {
    id: 7,
    name: "Margherita Pizza",
    category: "Pizza",
    prices: { Regular: 220 },
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600"
  },
  {
    id: 8,
    name: "Veg Burger",
    category: "Burgers",
    prices: { Regular: 120 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 9,
    name: "Hakka Noodles",
    category: "Starters",
    prices: { Regular: 150 },
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600"
  },
  {
    id: 10,
    name: "South Indian Meals",
    category: "Meals",
    prices: { Regular: 140 },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
  },
  {
    id: 11,
    name: "Chocolate Dessert",
    category: "Desserts",
    prices: { Regular: 99 },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },
  {
    id: 12,
    name: "Fresh Lime Drink",
    category: "Drinks",
    prices: { Regular: 60 },
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600"
  },
  {
    id: 13,
    name: "Chicken Pizza",
    category: "Pizza",
    prices: { Regular: 260, Large: 420 },
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600"
  },
  {
    id: 14,
    name: "Paneer Pizza",
    category: "Pizza",
    prices: { Regular: 240, Large: 390 },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    id: 15,
    name: "Chicken Burger",
    category: "Burgers",
    prices: { Regular: 160 },
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
  },
  {
    id: 16,
    name: "Cheese Burger",
    category: "Burgers",
    prices: { Regular: 150 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 17,
    name: "Veg Meals",
    category: "Meals",
    prices: { Regular: 140, Full: 220 },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
  },
  {
    id: 18,
    name: "Chicken Meals",
    category: "Meals",
    prices: { Regular: 180, Full: 280 },
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=600"
  }
];

async function loadMenu() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "flex";

  const res = await fetch("/api/menu");
  menuItems = await res.json();

  displayMenu(menuItems);
  loadPopular();
  displayCart();
  updateCartCount();

  if (loader) loader.style.display = "none";
}

function displayMenu(items) {
  const foodList = document.getElementById("foodList");

  foodList.innerHTML = items.map(item => {
    const prices = item.prices || { Regular: item.price };
    const firstPrice = Object.values(prices)[0];

    const sizeOptions = Object.keys(prices).map(size =>
      `<option value="${size}">${size} - ₹${prices[size]}</option>`
    ).join("");

    return `
      <div class="food-card premium-card">
        <div class="food-img-box">
          <img src="${item.image}" alt="${item.name}">
          <span class="rating-badge">⭐ 4.8</span>
          <span class="best-badge">🔥 Best Seller</span>
        </div>

        <div class="food-info">
          <h3>${item.name}</h3>

          <div class="food-meta">
            <span>🚚 30-40 mins</span>
            <span>🔥 Fresh</span>
          </div>

          <h4 class="food-price">From ₹${firstPrice}</h4>

          <select id="size-${item.id}">
            ${sizeOptions}
          </select>

          <input type="number" id="qty-${item.id}" value="1" min="1">

          <div class="card-buttons">
            <button onclick="addToCart(${item.id})">Add to Cart</button>
            <a href="https://wa.me/919347479356" target="_blank" class="order-btn">Order Now</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function filterCategory(cat, event) {
  document.querySelectorAll(".categories button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (event) {
    event.target.classList.add("active");
    createRipple(event);
  }

  const filtered = cat === "All"
    ? menuItems
    : menuItems.filter(item => item.category === cat);

  displayMenu(filtered);
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

function searchFood() {
  const searchInput = document.querySelector(".search-box input");
  if (!searchInput) return;

  const q = searchInput.value.toLowerCase();

  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );

  displayMenu(filtered);
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

function addToCart(id) {
  const item = menuItems.find(food => food.id === id);
  if (!item) return;

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
  showToast(`${item.name} added to cart 🛒`);
  showViewCart();
}

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");
  const bar = document.getElementById("viewCartBar");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">Your cart is empty 🛒</p>
      <a href="#menu" class="btn">Browse Menu</a>
    `;

    totalBox.textContent = "0";

    if (bar) bar.style.display = "none";
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

  if (bar) {
    bar.style.display = "flex";
    document.getElementById("viewCartText").textContent = `View Cart (₹${total})`;
  }
}

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

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = count;
  }
}

function loadPopular() {
  const box = document.getElementById("popularItems");
  if (!box) return;

  box.innerHTML = menuItems.slice(0, 4).map(item => {
    const prices = item.prices || { Regular: item.price };
    const firstPrice = Object.values(prices)[0];

    return `
      <div class="food-card premium-card">
        <div class="food-img-box">
          <img src="${item.image}" alt="${item.name}">
          <span class="rating-badge">⭐ 4.8</span>
          <span class="best-badge">Popular</span>
        </div>

        <div class="food-info">
          <h3>${item.name}</h3>

          <div class="food-meta">
            <span>🚚 30-40 mins</span>
            <span>🔥 Fresh</span>
          </div>

          <h4 class="food-price">From ₹${firstPrice}</h4>

          <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;
  }).join("");
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});

function togglePaymentFields() {
  const payment = document.getElementById("payment").value;

  const upi = document.getElementById("upiInput");
  const cardNumber = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");

  document.getElementById("upiBox").style.display = "none";
  document.getElementById("cardBox").style.display = "none";

  if (upi) upi.required = false;
  if (cardNumber) cardNumber.required = false;
  if (expiry) expiry.required = false;
  if (cvv) cvv.required = false;

  if (payment === "UPI") {
    document.getElementById("upiBox").style.display = "block";
    if (upi) upi.required = true;
  }

  if (payment === "Card") {
    document.getElementById("cardBox").style.display = "block";
    if (cardNumber) cardNumber.required = true;
    if (expiry) expiry.required = true;
    if (cvv) cvv.required = true;
  }
}

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (cart.length === 0) {
    alert("Please add items to cart first");
    return;
  }

  if (!name || !phone || !address || !payment) {
    alert("Please fill all required fields");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Enter valid 10 digit phone number");
    return;
  }

  const orderData = {
    customerName: name,
    phone,
    address,
    payment,
    items: cart,
    total: document.getElementById("total").textContent
  };

  showPopup();
  showToast("Order placed successfully 🎉");

  cart = [];
  displayCart();
  updateCartCount();
  this.reset();
  togglePaymentFields();
});

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hi, I want to order:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${item.quantity}x ${item.name} (${item.size}) - ₹${itemTotal}%0A`;
  });

  message += `%0ATotal: ₹${total}%0A`;
  message += `%0A----------------------%0A`;
  message += `Name: ______%0A`;
  message += `Phone: ______%0A`;
  message += `Address: ______%0A`;
  message += `----------------------`;

  const phoneNumber = "919347479356";
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, "_blank");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function showViewCart() {
  const bar = document.getElementById("viewCartBar");
  const total = document.getElementById("total").textContent;

  if (bar) {
    bar.style.display = "flex";
    document.getElementById("viewCartText").textContent = `View Cart • ₹${total}`;
  }
}

function scrollToCart() {
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
}

window.onload = () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

function loadMenu() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "flex";

  displayMenu(menuItems);
  loadPopular();
  displayCart();
  updateCartCount();

  if (loader) loader.style.display = "none";
}