'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// Wishlist functionality
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const wishlistIcon = document.querySelector('[data-heart-icon]') || 
                      document.querySelectorAll('.header-user-actions .action-btn')[1];
let wishlistCount = 0;

// Load wishlist from localStorage
function loadWishlist() {
  const savedWishlist = localStorage.getItem('nubaco-wishlist');
  if (savedWishlist) {
    const wishlist = JSON.parse(savedWishlist);
    wishlistCount = wishlist.length;
    updateWishlistCount();
    
    // Mark items as added to wishlist
    wishlist.forEach(productId => {
      const btn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
      if (btn) {
        btn.classList.add('active');
        btn.innerHTML = '<ion-icon name="heart"></ion-icon>';
      }
    });
  }
}

// Save wishlist to localStorage
function saveWishlist(products) {
  localStorage.setItem('nubaco-wishlist', JSON.stringify(products));
}

// Get wishlist from localStorage
function getWishlist() {
  const savedWishlist = localStorage.getItem('nubaco-wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
}

// Update wishlist count
function updateWishlistCount() {
  const countElements = document.querySelectorAll('.header-user-actions .action-btn:nth-child(2) .count');
  countElements.forEach(el => {
    el.textContent = wishlistCount;
  });
}

// Add to wishlist functionality
wishlistBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const productId = this.getAttribute('data-product-id');
    let wishlist = getWishlist();
    
    if (wishlist.includes(parseInt(productId))) {
      // Remove from wishlist
      wishlist = wishlist.filter(id => id !== parseInt(productId));
      this.classList.remove('active');
      this.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
    } else {
      // Add to wishlist
      wishlist.push(parseInt(productId));
      this.classList.add('active');
      this.innerHTML = '<ion-icon name="heart"></ion-icon>';
    }
    
    wishlistCount = wishlist.length;
    saveWishlist(wishlist);
    updateWishlistCount();
  });
});

// View product details functionality
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const productCard = this.closest('.showcase');
    const productTitle = productCard.querySelector('.showcase-title').textContent;
    const productImage = productCard.querySelector('.product-img.default').src;
    const productPrice = productCard.querySelector('.price').textContent;
    const productOldPrice = productCard.querySelector('del') ? productCard.querySelector('del').textContent : '';
    const productCategory = productCard.querySelector('.showcase-category').textContent;
    
    // Store product data
    const productData = {
      title: productTitle,
      image: productImage,
      price: productPrice,
      oldPrice: productOldPrice,
      category: productCategory
    };
    
    localStorage.setItem('selected-product', JSON.stringify(productData));
    
    // Navigate to product details page
    window.location.href = 'product-details.html';
  });
});

// Load wishlist on page load
document.addEventListener('DOMContentLoaded', loadWishlist);

// Add to Cart functionality
const addCartBtns = document.querySelectorAll('.add-cart-btn');
let cartCount = 0;

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('nubaco-cart');
  if (savedCart) {
    const cart = JSON.parse(savedCart);
    cartCount = cart.length;
    updateCartCount();
  }
}

// Save cart to localStorage
function saveCart(products) {
  localStorage.setItem('nubaco-cart', JSON.stringify(products));
}

// Get cart from localStorage
function getCart() {
  const savedCart = localStorage.getItem('nubaco-cart');
  return savedCart ? JSON.parse(savedCart) : [];
}

// Update cart count in header
function updateCartCount() {
  const countElements = document.querySelectorAll('.header-user-actions .action-btn:nth-child(3) .count');
  countElements.forEach(el => {
    el.textContent = cartCount;
  });
  
  // Also update mobile cart count
  const mobileCartCount = document.querySelectorAll('.mobile-bottom-navigation .action-btn:nth-child(2) .count');
  mobileCartCount.forEach(el => {
    el.textContent = cartCount;
  });
}

// Add to cart functionality
addCartBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const productCard = this.closest('.showcase');
    const productTitle = productCard.querySelector('.showcase-title').textContent;
    const productImage = productCard.querySelector('.product-img.default').src;
    const productPrice = productCard.querySelector('.price').textContent;
    const productOldPrice = productCard.querySelector('del') ? productCard.querySelector('del').textContent : '';
    
    // Create cart item
    const cartItem = {
      id: Math.random(),
      title: productTitle,
      image: productImage,
      price: productPrice,
      oldPrice: productOldPrice,
      quantity: 1
    };
    
    let cart = getCart();
    cart.push(cartItem);
    cartCount = cart.length;
    
    saveCart(cart);
    updateCartCount();
    
    // Show notification
    alert('✓ Item added to cart!');
  });
});

// Load cart on page load
document.addEventListener('DOMContentLoaded', loadCart);