"use strict";
// דמו: כל הפעולות מקומיות בלבד (אין קריאות לשרת, ואין הזמנה לבוט).
// הנתונים מוצפנים ב-AES-256-GCM (data.js). המפתח נמצא בצד הלקוח, לכן ההצפנה מונעת קריאה מזדמנת בלבד.
// תוקף של שעה נשמר בדפדפן. זה לא מנגנון אבטחה: מי שמנקה את אחסון הדפדפן יכול להתחיל מחדש.

const DEMO_MS = 60 * 60 * 1000;
const KEY_START = "sg_demo_start";
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = s => document.querySelector(s);

async function decrypt() {
  const { k, iv, ct } = window.DEMO_ENC;
  const key = await crypto.subtle.importKey("raw", b64(k), "AES-GCM", false, ["decrypt"]);
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64(iv), additionalData: new TextEncoder().encode("shield-guard-demo-v2") },
    key, b64(ct));
  return JSON.parse(new TextDecoder().decode(pt));
}

// ───── סכמת המודולים (שמות ושדות תואמים לפאנל האמיתי) ─────
const ACT = [["kick","קיק"],["ban","באן"],["timeout","טיימאאוט 28 יום"]];
const MODULES = [
  { id:"general", icon:"⚙️", name:"כללי", fields:[
    {k:"log_channel", type:"channel", label:"חדר לוגים", hint:"כל ההתראות נשלחות לכאן"},
    {k:"whitelist", type:"ids", label:"וויטליסט (ID בכל שורה)", hint:"פטור מכל ההגנות"}]},
  { id:"antinuke", icon:"🛡️", name:"אנטי-ניוק", fields:[
    {k:"nuke", type:"bool", label:"הגנת ניוק", hint:"מחיקות/יצירות/באנים המוניים עם שחזור"},
    {k:"botguard", type:"bool", label:"חסימת בוטים לא מורשים", hint:"בוט שלא ברשימה נבעט"},
    {k:"templates", type:"bool", label:"מחיקת טמפלייטים"},
    {k:"selfrole", type:"bool", label:"הסרה וטיימאאוט למי שנותן לעצמו רול"},
    {k:"allowed_bots", type:"ids", label:"בוטים מורשים (ID בכל שורה)"}]},
  { id:"antiraid", icon:"🚨", name:"אנטי-ריידים", fields:[
    {k:"enabled", type:"bool", label:"פעיל"},
    {k:"joins", type:"int", label:"כמה כניסות מפעילות מצב ריייד", min:2, max:50},
    {k:"seconds", type:"int", label:"בתוך כמה שניות", min:2, max:120},
    {k:"action", type:"choice", label:"פעולה על הנכנסים", opts:ACT},
    {k:"min_age_days", type:"int", label:"גיל חשבון מינימלי בימים (0 = כבוי)", min:0, max:365},
    {k:"raid_minutes", type:"int", label:"משך מצב ריייד בדקות", min:1, max:60},
    {k:"raise_verification", type:"bool", label:"להעלות זמנית את רמת האימות"},
    {k:"lockdown", type:"bool", label:"לנעול את כל החדרים בזמן ריייד"}]},
  { id:"automod", icon:"🧹", name:"אוטומוד", fields:[
    {k:"spam", type:"bool", label:"אנטי-ספאם"},{k:"invites", type:"bool", label:"חסימת קישורי הזמנה"},
    {k:"mentions", type:"bool", label:"תיוגים המוניים"},{k:"badwords", type:"bool", label:"מילים אסורות"},
    {k:"caps", type:"bool", label:"צעקות (CAPS)"},{k:"emoji", type:"bool", label:"ספאם אימוג'ים"},
    {k:"duplicates", type:"bool", label:"הודעות כפולות"},{k:"headers", type:"bool", label:"כותרות גדולות (# טקסט)"},
    {k:"spam_count", type:"int", label:"ספאם: כמה הודעות", min:3, max:30},
    {k:"spam_seconds", type:"int", label:"ספאם: בתוך כמה שניות", min:2, max:30},
    {k:"mention_limit", type:"int", label:"מקסימום תיוגים", min:2, max:30},
    {k:"emoji_limit", type:"int", label:"מקסימום אימוג'ים", min:3, max:50},
    {k:"caps_percent", type:"int", label:"אחוז אותיות גדולות", min:40, max:100},
    {k:"duplicate_count", type:"int", label:"כמה הודעות זהות", min:2, max:10},
    {k:"strikes", type:"int", label:"אזהרות עד טיימאאוט", min:1, max:10},
    {k:"timeout_minutes", type:"int", label:"אורך טיימאאוט בדקות", min:1, max:1440},
    {k:"badwords_list", type:"lines", label:"מילים אסורות (מילה בכל שורה)"}]},
  { id:"joingate", icon:"🚪", name:"שער כניסה", fields:[
    {k:"enabled", type:"bool", label:"פעיל"},
    {k:"no_avatar", type:"bool", label:"הסגר מיידי למי שאין לו תמונה"},
    {k:"name_filter", type:"bool", label:"סינון שמות חשודים"},
    {k:"action", type:"choice", label:"פעולה על חשבון חשוד", opts:[["quarantine","הסגר"],["kick","קיק"],["ban","באן"],["log","דיווח בלבד"]]},
    {k:"threshold", type:"int", label:"סף ניקוד (נמוך = מחמיר יותר)", min:10, max:200},
    {k:"min_age_days", type:"int", label:"חשבון חדש = פחות מכמה ימים", min:1, max:365},
    {k:"badnames", type:"lines", label:"מילים אסורות בשמות"},
    {k:"allowed", type:"ids", label:"פטורים משער הכניסה (ID בכל שורה)"}]},
  { id:"logs", icon:"📜", name:"לוגים", fields:[
    {k:"messages", type:"bool", label:"הודעות שנמחקו / נערכו"},
    {k:"members", type:"bool", label:"כניסות, יציאות ושינויי רולים"},
    {k:"server", type:"bool", label:"חדרים, רולים ובאנים"}]},
  { id:"welcome", icon:"👋", name:"וולקם", fields:[
    {k:"enabled", type:"bool", label:"פעיל"},
    {k:"channel_id", type:"channel", label:"חדר הוולקם"},
    {k:"display", type:"choice", label:"מצב תצוגה", opts:[["both","תמונה + טקסט"],["image","תמונה בלבד"],["text","טקסט בלבד"]]},
    {k:"title", type:"text", label:"כותרת", hint:"משתנים: {name} {server} {count}"},
    {k:"description", type:"long", label:"הודעה", hint:"משתנים: {user} {name} {server} {count}"},
    {k:"accent", type:"color", label:"צבע הדגשה"},
    {k:"border", type:"choice", label:"מסגרת", opts:[[0,"ללא"],[4,"דקה"],[8,"בינונית"],[14,"עבה"]]},
    {k:"ping", type:"bool", label:"לתייג את המצטרף"},
    {k:"delete_after", type:"int", label:"מחיקה אוטומטית אחרי שניות (0 = לא)", min:0, max:3600},
    {k:"dm_text", type:"long", label:"הודעה פרטית למצטרף (ריק = כבוי)"},
    {k:"autorole_id", type:"role", label:"רול אוטומטי למצטרפים"},
    {k:"links", type:"lines", label:"כפתורי קישור (שורה: טקסט|https://...)"}]}
];

let S = null, D = null, cur = "general";

// ───── תוקף של שעה ─────
function startedAt() {
  let v = null; try { v = localStorage.getItem(KEY_START); } catch {}
  if (!v) { v = String(Date.now()); try { localStorage.setItem(KEY_START, v); } catch {} }
  return Number(v);
}
function remaining() { return Math.max(0, DEMO_MS - (Date.now() - startedAt())); }
function tick() {
  const ms = remaining();
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
  $("#timer").textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  if (ms <= 0) { $("#lock").classList.add("show"); clearInterval(timerId); }
}
let timerId;

// ───── רינדור ─────
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 1600); }

function renderNav() {
  $("#nav").innerHTML = MODULES.map(m => `<button data-m="${m.id}" class="${m.id === cur ? "on" : ""}">${m.icon} ${esc(m.name)}</button>`).join("");
  $("#nav").querySelectorAll("button").forEach(b => b.onclick = () => { cur = b.dataset.m; renderNav(); renderMod(); });
}

function fieldHtml(mod, f) {
  const v = S.settings[mod.id][f.k];
  const id = `f_${mod.id}_${f.k}`;
  const hint = f.hint ? `<small>${esc(f.hint)}</small>` : "";
  let ctrl = "";
  switch (f.type) {
    case "bool": ctrl = `<input type="checkbox" id="${id}" ${v ? "checked" : ""}>`; break;
    case "int": ctrl = `<input type="number" id="${id}" value="${esc(v)}" min="${f.min}" max="${f.max}">`; break;
    case "choice": ctrl = `<select id="${id}">${f.opts.map(([val, lab]) => `<option value="${esc(val)}" ${String(val) === String(v) ? "selected" : ""}>${esc(lab)}</option>`).join("")}</select>`; break;
    case "channel": ctrl = `<select id="${id}">${D.channels.map(c => `<option value="${c.id}" ${c.id === v ? "selected" : ""}>#${esc(c.name)}</option>`).join("")}</select>`; break;
    case "role": ctrl = `<select id="${id}"><option value="">— ללא —</option>${D.roles.map(r => `<option value="${r.id}" ${r.id === v ? "selected" : ""}>@${esc(r.name)}</option>`).join("")}</select>`; break;
    case "color": ctrl = `<input type="color" id="${id}" value="${esc(v)}" style="width:70px;height:38px;padding:2px">`; break;
    case "text": ctrl = `<input type="text" id="${id}" value="${esc(v)}" style="width:260px">`; break;
    case "long": ctrl = `<textarea id="${id}">${esc(v)}</textarea>`; break;
    case "ids": case "lines": ctrl = `<textarea id="${id}">${esc((v || []).join("\n"))}</textarea>`; break;
  }
  return `<div class="fld"><div><b>${esc(f.label)}</b>${hint}</div>${ctrl}</div>`;
}

function renderMod() {
  const mod = MODULES.find(m => m.id === cur);
  $("#mod").innerHTML = `<h1>${mod.icon} ${esc(mod.name)}</h1>` + mod.fields.map(f => fieldHtml(mod, f)).join("") +
    `<div class="btns"><button class="act" id="save">שמירה (בדמו)</button><button class="act" id="rst">איפוס המודול</button></div>`;
  $("#save").onclick = () => saveMod(mod);
  $("#rst").onclick = () => { S.settings[mod.id] = structuredClone(D.settings[mod.id]); renderMod(); toast("המודול אופס (דמו)"); };
}

function readField(mod, f) {
  const el = document.getElementById(`f_${mod.id}_${f.k}`);
  if (!el) return undefined;
  switch (f.type) {
    case "bool": return el.checked;
    case "int": { let n = Number(el.value); if (Number.isNaN(n)) n = f.min; return Math.min(f.max, Math.max(f.min, n)); }
    case "choice": { const o = f.opts.find(([val]) => String(val) === el.value); return o ? o[0] : el.value; }
    case "ids": case "lines": return el.value.split("\n").map(x => x.trim()).filter(Boolean);
    default: return el.value;
  }
}

function saveMod(mod) {
  const before = structuredClone(S.settings[mod.id]);
  for (const f of mod.fields) S.settings[mod.id][f.k] = readField(mod, f);
  const changed = mod.fields.filter(f => JSON.stringify(before[f.k]) !== JSON.stringify(S.settings[mod.id][f.k])).map(f => f.label);
  if (changed.length) {
    S.events.unshift({ t: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }), type: mod.id, text: `עודכן ${mod.name} (דמו): ${changed.join(", ")}` });
    renderEvents();
  }
  toast("נשמר בדמו בלבד · לא משפיע על בוט אמיתי");
}

function renderServer() {
  $("#server").innerHTML = `<h1>${esc(D.server)}</h1>
    <div class="muted">ערוצים ורולים לדוגמה · ${D.channels.length} חדרים · ${D.roles.length} רולים</div>`;
}
function renderEvents() {
  $("#evl").innerHTML = S.events.slice(0, 12).map(e => `<div class="ev"><span class="t">${esc(e.t)}</span><span style="flex:1">${esc(e.text)}</span></div>`).join("");
}

// ───── אתחול ─────
function init(data) {
  D = data;
  S = { settings: structuredClone(D.settings), events: structuredClone(D.events) };
  $("#reset").onclick = () => { S = { settings: structuredClone(D.settings), events: structuredClone(D.events) }; renderAll(); toast("הדמו אופס"); };
  renderAll();
  timerId = setInterval(tick, 1000); tick();
}
function renderAll() { renderNav(); renderServer(); renderMod(); renderEvents(); }

if (remaining() <= 0) { $("#lock").classList.add("show"); $("#timer").textContent = "00:00"; }
else {
  decrypt().then(init).catch(() => { $("#mod").innerHTML = `<p class="muted">לא ניתן לטעון את הדמו.</p>`; });
  tick();
}
