/* Estes Painting — site behaviour (no dependencies) */
(function () {
  "use strict";

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* YouTube facades: load the real player only when clicked */
  document.querySelectorAll(".yt").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-yt");
      if (!id || btn.querySelector("iframe")) return;
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = btn.getAttribute("data-title") || "Estes Painting video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("allowfullscreen", "");
      btn.innerHTML = "";
      btn.appendChild(iframe);
    });
  });

  /* Gallery filters + lightbox */
  var grid = document.querySelector(".gallery-grid");
  if (grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll("a"));
    var count = document.querySelector(".gallery-count");
    var filterBar = document.querySelector(".filter-bar");
    function applyFilter(cat) {
      var shown = 0;
      items.forEach(function (a) {
        var ok = cat === "all" || (a.getAttribute("data-cat") || "").split(" ").indexOf(cat) !== -1;
        if (ok) { a.removeAttribute("hidden"); shown++; } else { a.setAttribute("hidden", ""); }
      });
      if (count) count.textContent = shown + " photo" + (shown === 1 ? "" : "s");
    }
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        filterBar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        applyFilter(b.getAttribute("data-filter"));
      });
    }
    applyFilter("all");

    var lb = document.querySelector(".lightbox");
    if (lb) {
      var lbImg = lb.querySelector("img");
      var lbCap = lb.querySelector(".lb-caption");
      var current = -1;
      function visible() { return items.filter(function (a) { return !a.hasAttribute("hidden"); }); }
      function show(i) {
        var v = visible();
        if (!v.length) return;
        current = (i + v.length) % v.length;
        var a = v[current];
        lbImg.src = a.getAttribute("href");
        lbImg.alt = a.querySelector("img").alt;
        lbCap.textContent = a.querySelector("img").alt;
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
      items.forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          show(visible().indexOf(a));
        });
      });
      lb.querySelector(".lb-close").addEventListener("click", close);
      lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
      lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
      });
      var touchX = null;
      lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
        touchX = null;
      });
    }
  }
})();
