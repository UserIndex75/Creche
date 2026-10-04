/* Intro screen: the envelope opens, then the invitation is revealed */
(function (App) {
  "use strict";
  const { $, reduced } = App.dom;

  function init(audioCtrl) {
    const btn = $("#openBtn"), wrap = $("#envelopeWrap"), intro = $("#intro"),
          site = $("#site"), dot = $("#openBtnDot");
    if (!btn || !wrap || !intro || !site) return;

    let opened = false;
    document.body.classList.add("lock-scroll");

    btn.addEventListener("click", () => {
      if (opened) return;
      opened = true;
      btn.disabled = true;
      dot.hidden = false;
      wrap.classList.add("opening");
      if (audioCtrl) audioCtrl.tryStart();

      setTimeout(() => {
        intro.classList.add("hidden");
        document.body.classList.remove("lock-scroll");
        site.removeAttribute("aria-hidden");
        site.classList.add("show");
        const heading = $("h2", site);
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }, reduced ? 150 : 1700);
    });
  }

  App.envelope = { init };
})(window.Creche = window.Creche || {});
