/* =========================================================
   Ahmad Hassan — Portfolio
   Vanilla JS. No dependencies.
========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     Hero role cycler
  --------------------------------------------------------- */
  var roles = ["Penetration Tester", "Digital Forensics Analyst", "CTF Player"];
  var roleEl = document.getElementById("role-cycle");

  if (roleEl) {
    if (reduceMotion) {
      roleEl.textContent = roles.join(" · ");
    } else {
      var idx = 0;
      setInterval(function () {
        idx = (idx + 1) % roles.length;
        roleEl.style.opacity = "0";
        setTimeout(function () {
          roleEl.textContent = roles[idx];
          roleEl.style.opacity = "1";
        }, 220);
      }, 2600);
      roleEl.style.transition = "opacity 220ms ease";
    }
  }

  /* ---------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".section, .hero__content, .id-card");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------
     Certification filter chips
  --------------------------------------------------------- */
  var filterBar = document.getElementById("cert-filter");
  var certGrid = document.getElementById("cert-grid");

  if (filterBar && certGrid) {
    var chips = filterBar.querySelectorAll(".cert-filter__chip");
    var cards = certGrid.querySelectorAll(".cert-card");

    filterBar.addEventListener("click", function (e) {
      var chip = e.target.closest(".cert-filter__chip");
      if (!chip) return;

      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");

      var filter = chip.getAttribute("data-filter");
      cards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  }

  /* ---------------------------------------------------------
     Lightbox
  --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lastFocused = null;

  function openLightbox(src, alt, caption) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  if (lightbox) {
    // Any inline certificate image
    document.querySelectorAll(".js-lightbox-img").forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt, img.getAttribute("data-caption"));
      });
    });

    // Buttons that reference a hidden source image (flagship "View certificate", NCCIA evidence)
    document.querySelectorAll(".js-lightbox-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-target");
        var src = document.getElementById("src-" + targetId);
        if (src) {
          openLightbox(src.src, src.alt, src.getAttribute("data-caption"));
        }
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Discord "click to copy"
  --------------------------------------------------------- */
  var discordBtn = document.getElementById("discord-copy");
  if (discordBtn) {
    discordBtn.addEventListener("click", function () {
      var value = discordBtn.getAttribute("data-copy-value");
      var small = discordBtn.querySelector("small");
      var original = small.getAttribute("data-default") + " · click to copy";

      function flash(text) {
        small.textContent = text;
        discordBtn.classList.add("is-copied");
        setTimeout(function () {
          small.textContent = original;
          discordBtn.classList.remove("is-copied");
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () {
          flash("Copied \u201c" + value + "\u201d to clipboard");
        }).catch(function () {
          flash(value + " (copy failed — select manually)");
        });
      } else {
        flash(value + " (copy not supported here)");
      }
    });
  }

})();
