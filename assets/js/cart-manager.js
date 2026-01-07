// Cart and Wishlist Manager - Used across all pages

// Update cart count in navbar
function updateCartCountNavbar() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;
  
  cart.forEach(item => {
    totalItems += (item.quantity || 1);
  });
  
  // Update all cart count badges
  document.querySelectorAll('.count').forEach(badge => {
    const icon = badge.parentElement.querySelector('ion-icon');
    if (icon && (icon.getAttribute('name') === 'bag-handle-outline' || icon.getAttribute('name') === 'bag-outline')) {
      badge.textContent = totalItems;
    }
  });
}

// Update wishlist count in navbar
function updateWishlistCountNavbar() {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  document.querySelectorAll('.count').forEach(badge => {
    const icon = badge.parentElement.querySelector('ion-icon');
    if (icon && icon.getAttribute('name') === 'heart-outline') {
      badge.textContent = wishlist.length;
    }
  });
}

// Add to cart with image
function addToCartWithImage(productName, price, imagePath = './assets/images/products/whey-powder.webp') {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1,
      image: imagePath
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCountNavbar();
  showNotification(productName + ' added to cart!', 'success');
}

// Add to wishlist with image
function addToWishlistWithImage(productName, price, imagePath = './assets/images/products/whey-powder.webp') {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  const existingProduct = wishlist.find(item => item.name === productName);
  
  if (!existingProduct) {
    wishlist.push({
      name: productName,
      price: price,
      image: imagePath
    });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCountNavbar();
    showNotification(productName + ' added to wishlist!', 'success');
  } else {
    showNotification(productName + ' is already in your wishlist!', 'info');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Simple alert - can be enhanced with toast notifications later
  alert(message);
}

// Remove from cart
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCountNavbar();
}

// Clear cart
function clearCart() {
  localStorage.setItem('cart', JSON.stringify([]));
  updateCartCountNavbar();
}

// Get cart items
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Get wishlist items
function getWishlistItems() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Calculate cart total
function calculateCartTotal() {
  let cart = getCartItems();
  let total = 0;
  
  cart.forEach(item => {
    total += (item.price * (item.quantity || 1));
  });
  
  return total;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCountNavbar();
  updateWishlistCountNavbar();
});
