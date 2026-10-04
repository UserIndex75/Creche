/* Entry point — starts every module once the DOM is ready */
(function (App) {
  "use strict";

  function start() {
    App.i18n.init();
    App.reveal.init();
    App.lightbox.init();
    App.envelope.init(App.audio.init());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})(window.Creche);
