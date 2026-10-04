/* Fade-in on scroll for every .reveal element */
(function (App) {
  "use strict";
  const { $$ } = App.dom;

  function init() {
    const targets = $$(".reveal");
    if (!("IntersectionObserver" in window)) { targets.forEach(el => el.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(el => io.observe(el));
  }

  App.reveal = { init };
})(window.Creche = window.Creche || {});
