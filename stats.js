(function () {
  var he = (function () { try { return (localStorage.getItem("sg_lang") || navigator.language || "he").toLowerCase().indexOf("he") === 0; } catch (e) { return true; } })();
  var L = he ? { s: "שרתים מוגנים", b: "באנים שנספרו" } : { s: "Servers protected", b: "Bans counted" };
  fetch("https://security-bot-production-2c03.up.railway.app/api/public/stats", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || typeof d.servers !== "number") return;
      function show(id, n, label, extra) {
        var el = document.getElementById(id); if (!el) return;
        el.querySelector("b").textContent = n.toLocaleString(he ? "he-IL" : "en-US") + (extra ? "" : "");
        el.querySelector("small").textContent = label + (extra || "");
        el.hidden = false;
      }
      show("live-servers", d.servers, L.s);
      if (typeof d.bans === "number" && d.bans > 0) show("live-bans", d.bans, L.b, d.since ? (he ? " (מ-" : " (since ") + d.since + ")" : "");
    }).catch(function () {});
})();
