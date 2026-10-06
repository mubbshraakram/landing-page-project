/*
  Beans Blossom: interactivity (vanilla JavaScript, no libraries)
  Features:
    1. Mobile hamburger menu (open/close, closes on link click or Esc)
    2. Active nav link highlighting while scrolling
    3. Scroll-reveal animations (IntersectionObserver)
    4. Automatic footer year
    5. "Open now / Closed" status based on opening hours
*/
(function () {
  "use strict";

  /* ---------- 1. Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  // Opens or closes the menu and keeps ARIA attributes in sync for screen readers
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- 2. Active nav link on scroll ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var targets = links
    .map(function (a) {
      var id = a.getAttribute("href");
      return id === "#top" ? document.getElementById("top") : document.querySelector(id);
    });

  // Marks one nav link as active and clears the rest
  function setActive(index) {
    links.forEach(function (a, i) {
      a.classList.toggle("is-active", i === index);
      if (i === index) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // Finds the last section whose top has passed the viewport top
  function onScroll() {
    var y = window.scrollY + 120;
    var current = 0;
    targets.forEach(function (el, i) {
      if (el && el.offsetTop <= y) current = i;
    });
    // bottom of page -> highlight Contact
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = targets.length - 1;
    }
    setActive(current);
  }

  // requestAnimationFrame throttle keeps scrolling smooth
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- 3. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    // stagger siblings (cards / reviews) slightly
    document.querySelectorAll(".menu-grid, .review-list").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (el, i) {
        el.style.setProperty("--delay", (i * 0.12) + "s");
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 4. Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 5. Open / closed status (Portland time) ---------- */
  var status = document.getElementById("open-status");

  // Returns the current weekday and minutes-since-midnight in Portland, OR
  function portlandNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var out = {};
    parts.forEach(function (p) { out[p.type] = p.value; });
    return {
      day: out.weekday,
      minutes: (parseInt(out.hour, 10) % 24) * 60 + parseInt(out.minute, 10)
    };
  }

  // Hours: Mon-Fri 7am-5pm, Sat-Sun 8am-6pm
  function updateStatus() {
    if (!status) return;
    try {
      var now = portlandNow();
      var weekend = now.day === "Sat" || now.day === "Sun";
      var open = (weekend ? 8 : 7) * 60;
      var close = (weekend ? 18 : 17) * 60;
      status.textContent = now.minutes >= open && now.minutes < close
        ? "Open now"
        : "Closed right now";
    } catch (err) {
      status.textContent = "";
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
})();
