/* Fullscreen photo viewer: click, keyboard (← → Esc) and swipe — follows RTL */
(function (App) {
  "use strict";
  const { $, $$, root } = App.dom;

  function init() {
    const thumbs = $$(".g-open");
    const box = $("#lightbox");
    if (!box || !thumbs.length) return;

    const big = $("#lbImg");
    let current = 0, opener = null;

    const show = i => {
      current = (i + thumbs.length) % thumbs.length;
      const thumb = thumbs[current];
      big.src = thumb.dataset.full;
      big.alt = $("img", thumb).alt;
    };
    const open = i => {
      show(i);
      box.hidden = false;
      document.body.classList.add("lock-scroll");
      $("#lbClose").focus();
    };
    const close = () => {
      box.hidden = true;
      document.body.classList.remove("lock-scroll");
      if (opener) opener.focus();
    };
    const step = d => show(current + d);

    thumbs.forEach((b, i) => b.addEventListener("click", () => { opener = b; open(i); }));
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", () => step(-1));
    $("#lbNext").addEventListener("click", () => step(1));
    box.addEventListener("click", e => { if (e.target === box) close(); });

    document.addEventListener("keydown", e => {
      if (box.hidden) return;
      const rtl = root.dir === "rtl";
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft")  step(rtl ? 1 : -1);
    });

    let startX = null;
    box.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", e => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) step((dx < 0) !== (root.dir === "rtl") ? 1 : -1);   // swipe follows reading direction
    }, { passive: true });
  }

  App.lightbox = { init };
})(window.Creche = window.Creche || {});
