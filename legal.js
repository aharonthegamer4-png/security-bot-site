"use strict";
// Language + theme for /terms and /privacy (shares the main site's saved choices)
(function () {
  const store = {get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }};
  const d = document.documentElement;
  let lang = store.get("sg_lang") || ((navigator.language || "en").toLowerCase().startsWith("he") ? "he" : "en");
  if (lang !== "he") lang = "en";
  let theme = store.get("sg_theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const SUPPORT = "https://discord.gg/YjHkkwr5dD";
  function apply() {
    d.lang = lang; d.dir = lang === "he" ? "rtl" : "ltr"; d.dataset.theme = theme;
    const t = document.querySelector("[data-l=" + lang + "] h1");
    if (t) document.title = t.textContent + " - Security Bot";
    document.querySelectorAll("[data-setlang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.setlang === lang)));
    document.querySelectorAll("[data-support]").forEach(a => { a.href = SUPPORT; a.target = "_blank"; a.rel = "noopener"; });
  }
  document.querySelectorAll("[data-setlang]").forEach(b => b.addEventListener("click", () => { lang = b.dataset.setlang; store.set("sg_lang", lang); apply(); }));
  const bt = document.getElementById("bt");
  if (bt) bt.addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; store.set("sg_theme", theme); apply(); });
  const y = document.getElementById("y"); if (y) y.textContent = new Date().getFullYear();
  apply();
})();
