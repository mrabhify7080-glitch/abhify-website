/* ============================================================
   RedSun AI SaaS Landing Page — Interactivity & Animations
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 2. GSAP ScrollTrigger Animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in slide-up for sections
    const revealElements = document.querySelectorAll(".gsap-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Stagger animation for feature cards
    const cardStagger = document.querySelectorAll(".gsap-stagger-card");
    if (cardStagger.length > 0) {
      gsap.fromTo(
        cardStagger,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#features",
            start: "top 75%",
          },
        }
      );
    }
  }

  // 3. Mouse Parallax for Glowing Eclipse Blob
  const eclipseOrb = document.getElementById("hero-eclipse");
  if (eclipseOrb) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      eclipseOrb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // 4. Navbar Sticky Glass Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("bg-black/80", "backdrop-blur-xl", "border-b", "border-white/10", "py-3");
      navbar.classList.remove("py-5");
    } else {
      navbar.classList.remove("bg-black/80", "backdrop-blur-xl", "border-b", "border-white/10", "py-3");
      navbar.classList.add("py-5");
    }
  });

  // 5. Pricing Toggle (Monthly vs Annual)
  const billingToggle = document.getElementById("billing-toggle");
  const priceStarter = document.getElementById("price-starter");
  const pricePro = document.getElementById("price-pro");
  const priceUltimate = document.getElementById("price-ultimate");
  const periodText = document.querySelectorAll(".price-period");

  if (billingToggle) {
    billingToggle.addEventListener("change", (e) => {
      const isAnnual = e.target.checked;
      if (isAnnual) {
        priceStarter.textContent = "$23";
        pricePro.textContent = "$63";
        priceUltimate.textContent = "$159";
        periodText.forEach((el) => (el.textContent = "/mo (billed yearly)"));
      } else {
        priceStarter.textContent = "$29";
        pricePro.textContent = "$79";
        priceUltimate.textContent = "$199";
        periodText.forEach((el) => (el.textContent = "/month"));
      }
    });
  }

  // 6. Mobile Menu Toggle
  const burgerBtn = document.getElementById("mobile-burger");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeDrawerBtn = document.getElementById("close-drawer");

  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener("click", () => {
      mobileDrawer.classList.remove("translate-x-full");
    });
  }
  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("translate-x-full");
    });
  }

  // Close mobile drawer on link click
  document.querySelectorAll("#mobile-drawer a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileDrawer) mobileDrawer.classList.add("translate-x-full");
    });
  });

  // 7. Demo Booking Modal
  const demoModal = document.getElementById("demo-modal");
  const openDemoBtns = document.querySelectorAll(".open-demo-modal");
  const closeDemoBtn = document.getElementById("close-demo-modal");

  openDemoBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (demoModal) demoModal.classList.remove("hidden");
    });
  });

  if (closeDemoBtn && demoModal) {
    closeDemoBtn.addEventListener("click", () => {
      demoModal.classList.add("hidden");
    });
  }

  if (demoModal) {
    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) demoModal.classList.add("hidden");
    });
  }

  // 8. Shopping Cart Drawer
  const cartBtn = document.getElementById("cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCartBtn = document.getElementById("close-cart");

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cartDrawer.classList.remove("translate-x-full");
    });
  }
  if (closeCartBtn && cartDrawer) {
    closeCartBtn.addEventListener("click", () => {
      cartDrawer.classList.add("translate-x-full");
    });
  }

  // 9. CTA Form Submission Mock
  const ctaForm = document.getElementById("cta-email-form");
  const ctaSuccessMsg = document.getElementById("cta-success-msg");

  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = ctaForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        ctaForm.classList.add("hidden");
        if (ctaSuccessMsg) ctaSuccessMsg.classList.remove("hidden");
      }
    });
  }
});
