/* Language switching (FR / AR) + injection of config values into the page */
(function (App) {
  "use strict";
  const { $, $$, root } = App.dom;
  const CFG = window.CRECHE_CONFIG;
  const STRINGS = window.CRECHE_I18N;
  const STORAGE_KEY = "creche-lang";
  let lang = "fr";

  const isSet = v => !!v && !/^\[.*\]$/.test(String(v).trim());
  const pick  = v => (v && typeof v === "object") ? v[lang] : v;
  const t     = k => (STRINGS[lang][k] != null ? STRINGS[lang][k] : STRINGS.fr[k]) || "";

  function render() {
    $$("[data-i18n]").forEach(el => {
      el.textContent = el.dataset.i18n === "brand" ? CFG.name[lang] : t(el.dataset.i18n);
    });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    $$("[data-i18n-aria]").forEach(el => {
      let key = el.dataset.i18nAria;
      if (el.id === "musicToggle" && el.getAttribute("aria-pressed") === "true") key = "musicOff";
      el.setAttribute("aria-label", t(key));
    });

    // config text (date, time, address, phone…) — left untouched while still a [PLACEHOLDER]
    $$("[data-cfg]").forEach(el => {
      const v = pick(CFG[el.dataset.cfg]);
      if (isSet(v)) el.textContent = v;
    });
    // config links
    const links = {
      maps: CFG.maps, whatsapp: CFG.whatsapp, instagram: CFG.instagram,
      facebook: CFG.facebook, phone: CFG.phoneHref
    };
    $$("[data-cfg-href]").forEach(el => {
      const v = links[el.dataset.cfgHref];
      if (isSet(v)) el.setAttribute("href", v);
    });
    // hide blocks whose config value is still a placeholder
    $$("[data-needs]").forEach(el => { el.hidden = !isSet(pick(CFG[el.dataset.needs])); });

    const year = $("#footerYear");
    if (year) year.textContent = new Date().getFullYear();
    document.title = CFG.name[lang] + " — " + t("tagline");
  }

  function setLang(next, save) {
    if (!STRINGS[next]) next = "fr";
    lang = next;
    root.lang = next;
    root.dir = next === "ar" ? "rtl" : "ltr";
    $$(".lang-switch button").forEach(b => {
      const on = b.dataset.lang === next;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
    render();
    if (save) { try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {} }
  }

  function init() {
    let initial = "fr";
    try { initial = localStorage.getItem(STORAGE_KEY) || "fr"; } catch (e) {}
    const fromUrl = new URLSearchParams(location.search).get("lang");   // share …/?lang=ar
    if (fromUrl) initial = fromUrl;
    $$(".lang-switch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang, true)));
    setLang(initial, false);
  }

  App.i18n = { init, setLang, t };
})(window.Creche = window.Creche || {});
