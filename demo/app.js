"use strict";
// דמו לקריאה בלבד: הנתונים מוצפנים ב-AES-256-GCM (data.js) ומפוענחים בדפדפן.
// שים לב: המפתח נמצא בצד הלקוח, לכן ההצפנה מונעת קריאה מזדמנת בלבד, לא הגנה אמיתית. הנתונים כאן מזויפים.

const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

async function decrypt() {
  const { k, iv, ct } = window.DEMO_ENC;
  const key = await crypto.subtle.importKey("raw", b64(k), "AES-GCM", false, ["decrypt"]);
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64(iv), additionalData: new TextEncoder().encode("shield-guard-demo") },
    key, b64(ct));
  return JSON.parse(new TextDecoder().decode(pt));
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

function render(d) {
  const rules = d.rules.map(r => `
    <div class="row"><span>${esc(r.name)}</span>
      <span class="sw ${r.on ? "on" : ""}" role="switch" aria-checked="${r.on}" aria-disabled="true" tabindex="-1"></span></div>`).join("");
  const events = d.events.map(e => `
    <div class="row"><span class="t">${esc(e.t)}</span><span style="flex:1">${esc(e.text)}</span><span class="tag">${esc(e.type)}</span></div>`).join("");
  const tickets = d.tickets.map(t => `
    <div class="row"><span>#${esc(t.id)} · ${esc(t.topic)}</span><span class="tag">${esc(t.status)}</span></div>`).join("");

  document.getElementById("app").insertAdjacentHTML("beforeend", `
    <h2 style="margin-top:0">${esc(d.server)}</h2>
    <div class="grid">
      <div class="card"><h3>ציון אבטחה</h3><b class="score">${esc(d.score)}</b></div>
      <div class="card"><h3>חברים</h3><b>${esc(d.stats.members)}</b></div>
      <div class="card"><h3>נחסמו היום</h3><b>${esc(d.stats.blocked_today)}</b></div>
      <div class="card"><h3>הצפות שנעצרו</h3><b>${esc(d.stats.raids_stopped)}</b></div>
    </div>
    <div class="two">
      <div><h2>אירועים אחרונים</h2><div class="card">${events}</div></div>
      <div>
        <h2>אוטומוד</h2><div class="card">${rules}</div>
        <h2>טיקטים</h2><div class="card">${tickets}</div>
      </div>
    </div>
    <div style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap">
      <button data-ro>שמירת שינויים</button><button data-ro>הוספת כלל</button><button data-ro>פעולה על משתמש</button>
    </div>`);

  document.querySelectorAll("[data-ro]").forEach(b =>
    b.addEventListener("click", () => toast("מצב דמו: אי אפשר לבצע שינויים")));
  document.querySelectorAll(".sw").forEach(s =>
    s.addEventListener("click", () => toast("מצב דמו: אי אפשר לבצע שינויים")));
}

decrypt().then(render).catch(() => { document.getElementById("err").hidden = false; });
