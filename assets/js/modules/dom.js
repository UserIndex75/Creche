/* Tiny DOM helpers shared by every module (namespace: window.Creche) */
(function (App) {
  "use strict";
  const root = document.documentElement;
  const reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (reduced) root.classList.add("reduced-motion");

  App.dom = {
    root,
    reduced,
    $:  (sel, ctx) => (ctx || document).querySelector(sel),
    $$: (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel))
  };
})(window.Creche = window.Creche || {});
