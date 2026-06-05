/* =========================================================
   MOVARO — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Header scroll state ---- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("menu-open");
        toggle.classList.remove("open");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      // close siblings within same list for accordion behaviour
      var list = item.closest(".faq-list");
      if (list && !open) {
        list.querySelectorAll(".faq-item.open").forEach(function (other) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          if (oa) oa.style.maxHeight = null;
          var oq = other.querySelector(".faq-q");
          if (oq) oq.setAttribute("aria-expanded", "false");
        });
      }
      item.classList.toggle("open", !open);
      q.setAttribute("aria-expanded", !open ? "true" : "false");
      a.style.maxHeight = !open ? a.scrollHeight + "px" : null;
    });
  });

  /* ---- Toast helper ---- */
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.innerHTML = '<span class="tick">✓</span>' + msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  window.MovaroToast = showToast;

  /* ---- Cart counter (demo only) ---- */
  function addToCart() {
    var count = parseInt(localStorage.getItem("movaro_cart") || "0", 10) + 1;
    localStorage.setItem("movaro_cart", String(count));
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = count;
    });
    showToast("Added to cart — Movaro Cat Calm Wrap");
  }
  function syncCart() {
    var count = localStorage.getItem("movaro_cart") || "0";
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = count;
    });
  }
  syncCart();
  document.querySelectorAll("[data-add-cart]").forEach(function (btn) {
    btn.addEventListener("click", addToCart);
  });

  /* ===================================================
     PRODUCT PAGE
     =================================================== */

  /* Gallery thumbnails */
  var mainImg = document.querySelector(".gallery-main img");
  document.querySelectorAll(".gallery-thumbs .thumb").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var img = thumb.querySelector("img");
      if (mainImg && img) mainImg.src = img.src;
      document.querySelectorAll(".gallery-thumbs .thumb").forEach(function (t) {
        t.classList.remove("active");
      });
      thumb.classList.add("active");
    });
  });

  /* Color swatches */
  document.querySelectorAll(".swatch").forEach(function (sw) {
    sw.addEventListener("click", function () {
      document.querySelectorAll(".swatch").forEach(function (s) { s.classList.remove("active"); });
      sw.classList.add("active");
      var label = document.querySelector("[data-color-value]");
      if (label) label.textContent = sw.getAttribute("data-name") || sw.getAttribute("data-color");
    });
  });

  /* Size selector */
  document.querySelectorAll(".size-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".size-btn").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var label = document.querySelector("[data-size-value]");
      if (label) label.textContent = b.getAttribute("data-size");
    });
  });

  /* Sticky mobile cart show/hide based on main CTA visibility */
  var sticky = document.querySelector(".sticky-cart");
  var mainCta = document.querySelector("#add-cart-main");
  if (sticky && mainCta && "IntersectionObserver" in window) {
    var scObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          sticky.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0);
        });
      },
      { threshold: 0 }
    );
    scObserver.observe(mainCta);
  }

  /* ---- Contact form (demo, no backend) ---- */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = form.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      form.reset();
      showToast("Message sent — we'll reply within 24h");
    });
  }

  /* ---- Smooth anchor focus (year in footer) ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
