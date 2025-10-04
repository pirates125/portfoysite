// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize theme
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
  const themeIcon = document.querySelector("#theme-toggle i");
  if (currentTheme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Mobile Menu
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Navbar Scroll Effect
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

// Scroll Animations
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

  // Observe elements for animations
  document.querySelectorAll(".feature-card").forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  document.querySelectorAll(".review-card").forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  document.querySelectorAll(".spec-item").forEach((el, index) => {
    el.classList.add("slide-in-left");
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Hero elements
  const heroText = document.querySelector(".hero-text");
  const heroImage = document.querySelector(".hero-image");

  if (heroText) {
    heroText.classList.add("slide-in-left");
    observer.observe(heroText);
  }

  if (heroImage) {
    heroImage.classList.add("slide-in-right");
    observer.observe(heroImage);
  }
}

// Parallax Effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-icon");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Form Handling
function initFormHandling() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate form submission
      showNotification(
        "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        "success"
      );

      // Reset form
      contactForm.reset();
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === "success" ? "check-circle" : "info-circle"
      }"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  notification.querySelector(".notification-content").style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `;

  notification.querySelector(".notification-close").style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: auto;
  `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => notification.remove(), 300);
    });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Hover Effects
function initHoverEffects() {
  // Feature cards hover effect
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Review cards hover effect
  document.querySelectorAll(".review-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Button hover effects
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
    });
  });
}

// Price Animation
function initPriceAnimation() {
  const priceElements = document.querySelectorAll(".price-new");

  priceElements.forEach((price) => {
    price.addEventListener("mouseenter", () => {
      price.style.transform = "scale(1.1)";
      price.style.color = "var(--accent-color)";
    });

    price.addEventListener("mouseleave", () => {
      price.style.transform = "scale(1)";
      price.style.color = "";
    });
  });
}

// Floating Elements Animation
function initFloatingElements() {
  const floatingIcons = document.querySelectorAll(".floating-icon");

  floatingIcons.forEach((icon, index) => {
    // Random movement
    setInterval(() => {
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;

      icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + index * 1000);
  });
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const titleElement = document.querySelector(".hero-title");
  if (!titleElement) return;

  const originalText = titleElement.innerHTML;
  titleElement.innerHTML = "";

  let i = 0;
  const typeSpeed = 100;

  function typeWriter() {
    if (i < originalText.length) {
      titleElement.innerHTML += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, typeSpeed);
    }
  }

  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScrolling();
  initNavbarScroll();
  initScrollAnimations();
  initParallax();
  initCounterAnimation();
  initFormHandling();
  initHoverEffects();
  initPriceAnimation();
  initFloatingElements();
  initTypingEffect();
});

// Theme toggle event listener
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Add some dynamic effects
window.addEventListener("load", () => {
  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 10001;
    transition: width 0.1s ease;
  `;

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// Initialize scroll progress
initScrollProgress();
