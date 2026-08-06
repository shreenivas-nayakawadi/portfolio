(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "theme";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- theme ---- */

  function apply(theme) {
    if (theme === "light") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored) apply(stored);
  else if (window.matchMedia("(prefers-color-scheme: light)").matches) apply("light");

  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* ---- mobile nav ---- */

  var navBtn = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- sticky header border ---- */

  var bar = document.querySelector(".nav-bar");
  function onScroll() {
    if (bar) bar.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- scroll reveal ---- */

  var items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentNode.children).filter(function (n) {
          return n.classList.contains("reveal");
        });
        el.style.transitionDelay = Math.min(siblings.indexOf(el), 4) * 80 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- counters ---- */

  var nums = document.querySelectorAll(".stat-num");
  function runCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduced) { el.textContent = target.toFixed(decimals); return; }
    var start = performance.now();
    var dur = 1500;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = decimals
        ? val.toFixed(decimals)
        : Math.round(val).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { co.observe(el); });
  } else {
    nums.forEach(runCount);
  }

  /* ---- active nav link ---- */

  var sections = document.querySelectorAll("section[id]");
  var links = {};
  document.querySelectorAll(".nav a").forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { threshold: 0.25, rootMargin: "-80px 0px -55% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---- year ---- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
