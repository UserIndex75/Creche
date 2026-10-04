/* Optional background music — never autoplays before the "open" click */
(function (App) {
  "use strict";
  const { $ } = App.dom;

  function init() {
    const toggle = $("#musicToggle"), audio = $("#bgAudio"), src = window.CRECHE_CONFIG.audio;
    if (!toggle || !audio || !src) return null;

    audio.src = src;
    let ready = false;
    audio.addEventListener("canplaythrough", () => { ready = true; }, { once: true });
    audio.addEventListener("error", () => { toggle.hidden = true; }, { once: true });

    const setPressed = on => {
      toggle.setAttribute("aria-pressed", on);
      toggle.setAttribute("aria-label", App.i18n.t(on ? "musicOff" : "musicOn"));
    };

    toggle.addEventListener("click", () => {
      if (toggle.getAttribute("aria-pressed") === "true") { audio.pause(); setPressed(false); }
      else { audio.play().catch(() => {}); setPressed(true); }
    });

    return {
      tryStart() {
        audio.play().then(
          () => { toggle.hidden = false; toggle.classList.add("show"); setPressed(true); },
          () => { if (ready) { toggle.hidden = false; toggle.classList.add("show"); } }
        );
      }
    };
  }

  App.audio = { init };
})(window.Creche = window.Creche || {});
