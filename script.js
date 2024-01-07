let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productId) {
  const productElement = document.querySelector(`[data-id="${productId}"]`);
  const productName = productElement.dataset.name;
  const productPrice = parseFloat(productElement.dataset.price);
  const productImage = productElement.querySelector('img').src;

  const existingItemIndex = findCartItemIndex(productId);
  if (existingItemIndex !== -1) {
    // Increment quantity if item already in the cart
    cart[existingItemIndex].quantity++;
  } else {
    // Add new item to the cart with quantity 1
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    };
    cart.push(item);
  }

  // Save updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCart();
}

// Function to find the index of a cart item by productId
function findCartItemIndex(productId) {
  return cart.findIndex(item => item.id === productId);
}

// Function to update the cart display
function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = ''; // Clear the cart list

  // Retrieve cart from localStorage or initialize an empty array
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      ${item.name} - $${(item.price * item.quantity).toFixed(2)}
      <div><button onclick="decrementQuantity(${item.id})">-</button>
      ${item.quantity}
      <button onclick="incrementQuantity(${item.id})">+</button></div>
    `;
    cartList.appendChild(listItem);
  });

  // Update the total price
  updateTotalPrice();
}

// Function to increment the quantity of a cart item
function incrementQuantity(productId) {
  const existingItemIndex = findCartItemIndex(productId);
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// Function to decrement the quantity of a cart item
function decrementQuantity(productId) {
  const existingItemIndex = findCartItemIndex(productId);
  if (existingItemIndex !== -1) {
    if (cart[existingItemIndex].quantity > 1) {
      // Decrease quantity if greater than 1
      cart[existingItemIndex].quantity--;
    } else {
      // Remove item from cart if quantity is 1
      cart.splice(existingItemIndex, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// Function to update the total price
function updateTotalPrice() {
  const totalPriceElement = document.getElementById('total-price');
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Initial update when the page loads
updateCart();