// Reveal Animation
let reveals = document.querySelectorAll(".reveal");

// Mobile Menu
let menuToggle = document.querySelector(".menu-toggle");
let mobileMenu = document.querySelector(".mobile-menu");

// Search
let searchIcon = document.getElementById("searchIcon");
let searchInput = document.getElementById("searchInput");

// Cart
let addButtons = document.querySelectorAll(".add-to-cart");
let cartItemsBox = document.getElementById("cartItems");
let summaryItems = document.getElementById("summaryItems");
let summaryTotal = document.getElementById("summaryTotal");
let clearCartBtn = document.getElementById("clearCartBtn");
let checkoutBtn = document.getElementById("checkoutBtn");
let cartCounts = document.querySelectorAll(".cart-count");

let cart = JSON.parse(localStorage.getItem("digicamCart")) || [];

for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener("click", function () {
    let product = {
      name: addButtons[i].getAttribute("data-name"),
      price: Number(addButtons[i].getAttribute("data-price")),
      image: addButtons[i].getAttribute("data-image"),
      quantity: 1
    };

    addToCart(product);
    addButtons[i].innerHTML = "Added ✓";

    setTimeout(function () {
      addButtons[i].innerHTML = "Add to Cart";
    }, 900);
  });
}

function addToCart(product) {
  let existingProduct = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name) {
      existingProduct = cart[i];
    }
  }

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(product);
  }

  saveCart();
  displayCart();
}

function saveCart() {
  localStorage.setItem("digicamCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }

  for (let i = 0; i < cartCounts.length; i++) {
    cartCounts[i].innerHTML = totalQuantity;
  }
}

function displayCart() {
  if (!cartItemsBox) {
    updateCartCount();
    return;
  }

  cartItemsBox.innerHTML = "";

  if (cart.length === 0) {
    cartItemsBox.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start adding your favorite vintage cameras.</p>
        <a href="shop.html">Go to Shop</a>
      </div>
    `;
  }

  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
    totalQuantity += cart[i].quantity;

    cartItemsBox.innerHTML += `
      <div class="cart-item">
        <img src="${cart[i].image}" alt="${cart[i].name}">

        <div>
          <h3>${cart[i].name}</h3>
          <p>$${cart[i].price}</p>

          <div class="quantity-box">
            <button onclick="changeQuantity(${i}, -1)">-</button>
            <span>${cart[i].quantity}</span>
            <button onclick="changeQuantity(${i}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  }

  if (summaryItems) {
    summaryItems.innerHTML = totalQuantity;
  }

  if (summaryTotal) {
    summaryTotal.innerHTML = "$" + totalPrice;
  }

  updateCartCount();
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    cart = [];
    saveCart();
    displayCart();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      alert("Order Is Placed, Thank You.");
    }
  });
}

displayCart();

// Reveal Elements When Scrolling
function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    if (window.scrollY > 300) {
      reveals[i].classList.add("active");
    }
  }
}


// Mobile Menu
function openMobileMenu() {
  if (mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
  } else {
    mobileMenu.classList.add("open");
  }
}


// Search Input
function openSearchInput() {
  if (searchInput.classList.contains("active")) {
    searchInput.classList.remove("active");
  } else {
    searchInput.classList.add("active");
  }
}




// Reveal Animation
window.addEventListener("scroll", revealOnScroll);

// OpenMobileMenu
menuToggle.addEventListener("click", openMobileMenu);

//openSearchInput
searchIcon.addEventListener("click", openSearchInput);
