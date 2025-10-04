// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");
const newsletterForm = document.querySelector(".newsletter-form");
const searchInput = document.querySelector(".search-input");

// Cart and Wishlist Elements
const cartBtn = document.getElementById("cart-btn");
const wishlistBtn = document.getElementById("wishlist-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const wishlistSidebar = document.getElementById("wishlist-sidebar");
const closeCart = document.getElementById("close-cart");
const closeWishlist = document.getElementById("close-wishlist");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const wishlistItems = document.getElementById("wishlist-items");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");
const cartTotal = document.getElementById("cart-total");

// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

// Apply theme on load
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon();

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
  updateNavbarStyle();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  if (currentTheme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const offsetTop = element.offsetTop - 70; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Cart and Wishlist Management
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Product data
const products = {
  1: {
    name: "iPhone 15 Pro Max",
    price: 45999,
    category: "Telefon",
    icon: "fas fa-mobile-alt",
  },
  2: {
    name: "MacBook Pro M3",
    price: 35999,
    category: "Laptop",
    icon: "fas fa-laptop",
  },
  3: {
    name: "AirPods Pro 2",
    price: 7999,
    category: "Aksesuar",
    icon: "fas fa-headphones",
  },
  4: {
    name: "PlayStation 5",
    price: 18999,
    category: "Gaming",
    icon: "fas fa-gamepad",
  },
  5: {
    name: "iPad Air 5",
    price: 12999,
    category: "Tablet",
    icon: "fas fa-tablet-alt",
  },
  6: {
    name: 'iMac 24" M2',
    price: 28999,
    category: "Masaüstü",
    icon: "fas fa-desktop",
  },
};

// Update cart/wishlist counts
function updateCounts() {
  cartCount.textContent = cart.length;
  wishlistCount.textContent = wishlist.length;
}

// Add to cart
function addToCart(productId) {
  const product = products[productId];
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCounts();
  updateCartDisplay();
  showNotification(`${product.name} sepete eklendi!`, "success");
}

// Add to wishlist
function addToWishlist(productId) {
  const product = products[productId];
  if (!product) return;

  const existingItem = wishlist.find((item) => item.id === productId);
  if (existingItem) {
    showNotification("Bu ürün zaten favorilerinizde!", "warning");
    return;
  }

  wishlist.push({ id: productId, ...product });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCounts();
  updateWishlistDisplay();
  showNotification(`${product.name} favorilere eklendi!`, "success");
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCounts();
  updateCartDisplay();
  showNotification("Ürün sepetten kaldırıldı!", "info");
}

// Remove from wishlist
function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCounts();
  updateWishlistDisplay();
  showNotification("Ürün favorilerden kaldırıldı!", "info");
}

// Update cart display
function updateCartDisplay() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Sepetiniz boş</div>';
    cartTotal.textContent = "₺0";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <i class="${item.icon}"></i>
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.category}</p>
        <div class="cart-item-price">₺${item.price.toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = `₺${total.toLocaleString()}`;
}

// Update wishlist display
function updateWishlistDisplay() {
  wishlistItems.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItems.innerHTML =
      '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Favorileriniz boş</div>';
    return;
  }

  wishlist.forEach((item) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.className = "cart-item";
    wishlistItem.innerHTML = `
      <div class="cart-item-image">
        <i class="${item.icon}"></i>
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.category}</p>
        <div class="cart-item-price">₺${item.price.toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromWishlist(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    wishlistItems.appendChild(wishlistItem);
  });
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  updateCartDisplay();
}

// Toggle wishlist sidebar
function toggleWishlist() {
  wishlistSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  updateWishlistDisplay();
}

// Close sidebars
function closeSidebars() {
  cartSidebar.classList.remove("active");
  wishlistSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".section-header, .product-card, .category-card, .feature-card, .about-text, .about-image, .contact-info, .contact-form"
  );

  animatedElements.forEach((el, index) => {
    // Add different animation classes based on element type
    if (el.classList.contains("section-header")) {
      el.classList.add("fade-in");
    } else if (
      el.classList.contains("about-text") ||
      el.classList.contains("contact-info")
    ) {
      el.classList.add("slide-in-left");
    } else if (
      el.classList.contains("about-image") ||
      el.classList.contains("contact-form")
    ) {
      el.classList.add("slide-in-right");
    } else if (
      el.classList.contains("product-card") ||
      el.classList.contains("category-card") ||
      el.classList.contains("feature-card")
    ) {
      el.classList.add("scale-in");
    }

    // Stagger animations
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  // Set initial navbar style based on theme
  updateNavbarStyle();

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background =
        currentTheme === "dark"
          ? "rgba(15, 23, 42, 0.98)"
          : "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow =
        currentTheme === "dark"
          ? "0 2px 20px rgba(0, 0, 0, 0.3)"
          : "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      updateNavbarStyle();
    }

    lastScrollTop = scrollTop;
  });
}

// Update navbar style based on current theme
function updateNavbarStyle() {
  const navbar = document.querySelector(".navbar");
  if (currentTheme === "dark") {
    navbar.style.background = "rgba(15, 23, 42, 0.95)";
    navbar.style.boxShadow = "none";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
}

// Product cards hover effect
function initProductHoverEffects() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Category cards hover effect
function initCategoryHoverEffects() {
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Search functionality
function initSearch() {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const productId = card.dataset.product;
      const product = products[productId];

      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      ) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.opacity = "0.3";
      }
    });
  });
}

// Contact form handling
function initContactForm() {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      showNotification("Lütfen tüm alanları doldurun!", "error");
      return;
    }

    // Simulate form submission
    showNotification("Mesajınız gönderiliyor...", "info");

    setTimeout(() => {
      showNotification("Mesajınız başarıyla gönderildi!", "success");
      contactForm.reset();
    }, 2000);
  });
}

// Newsletter form handling
function initNewsletterForm() {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector("input[type='email']").value;

    if (!email) {
      showNotification("Lütfen e-posta adresinizi girin!", "error");
      return;
    }

    // Simulate newsletter subscription
    showNotification("Bülten aboneliğiniz başarıyla oluşturuldu!", "success");
    newsletterForm.reset();
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  };

  notification.style.backgroundColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Counter animation for stats
function initCounterAnimation() {
  const stats = document.querySelectorAll(".stat h3");

  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target >= 1000 ? "+" : "");
    }, 20);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent.replace(/[^\d]/g, ""));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}

// Smooth reveal animation for sections
function initRevealAnimation() {
  const sections = document.querySelectorAll("section");

  const revealSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15,
  });

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    sectionObserver.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initScrollAnimations();
  initNavbarScroll();
  initProductHoverEffects();
  initCategoryHoverEffects();
  initSearch();
  initContactForm();
  initNewsletterForm();
  initCounterAnimation();
  initRevealAnimation();

  // Update counts on load
  updateCounts();

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  hamburger.addEventListener("click", toggleMobileMenu);
  cartBtn.addEventListener("click", toggleCart);
  wishlistBtn.addEventListener("click", toggleWishlist);
  closeCart.addEventListener("click", closeSidebars);
  closeWishlist.addEventListener("click", closeSidebars);
  overlay.addEventListener("click", closeSidebars);

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      smoothScroll(target);
      closeMobileMenu();
    });
  });

  // Add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(
        e.target.closest("[data-product]").dataset.product
      );
      addToCart(productId);
    });
  });

  // Wishlist buttons
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(
        e.target.closest("[data-product]").dataset.product
      );
      addToWishlist(productId);
    });
  });

  // Category filter
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const category = card.dataset.category;
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((productCard) => {
        const productId = productCard.dataset.product;
        const product = products[productId];

        if (
          category === "all" ||
          product.category.toLowerCase().includes(category)
        ) {
          productCard.style.display = "block";
          productCard.style.opacity = "1";
        } else {
          productCard.style.display = "none";
        }
      });
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  if (!cursor) {
    const newCursor = document.createElement("div");
    newCursor.className = "cursor";
    newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
    document.body.appendChild(newCursor);
  }

  const cursorElement = document.querySelector(".cursor");
  if (cursorElement) {
    cursorElement.style.left = e.clientX - 10 + "px";
    cursorElement.style.top = e.clientY - 10 + "px";
  }
});

// Add click effect to buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
    const button = e.target.classList.contains("btn")
      ? e.target
      : e.target.closest(".btn");

    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
