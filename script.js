// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");

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
    ".section-header, .about-text, .about-image, .skill-category, .project-card, .contact-info, .contact-form"
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
      el.classList.contains("skill-category") ||
      el.classList.contains("project-card")
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

// Typing animation for hero title
function initTypingAnimation() {
  const titleElement = document.querySelector(".hero-title");
  const text = titleElement.innerHTML;
  titleElement.innerHTML = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      titleElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroContent) {
      heroContent.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Skill items hover effect
function initSkillHoverEffects() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.1) rotate(5deg)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

// Project cards hover effect
function initProjectHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
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
  const stats = document.querySelectorAll(".stat h4");

  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target === 100 ? "%" : "+");
    }, 20);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent);
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
  initTypingAnimation();
  initParallax();
  initSkillHoverEffects();
  initProjectHoverEffects();
  initContactForm();
  initCounterAnimation();
  initRevealAnimation();

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  hamburger.addEventListener("click", toggleMobileMenu);

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      smoothScroll(target);
      closeMobileMenu();
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
