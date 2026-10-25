"use strict";
// Application ID של הבוט (Developer Portal ← General Information)
const CLIENT_ID = "1557899239814733864";
// הרשאות: 8 = Administrator. להרשאות מצומצמות אפשר לחשב ב-OAuth2 ← URL Generator
const PERMISSIONS = "8";
const INVITE = "https://discord.com/oauth2/authorize?client_id=" + CLIENT_ID + "&permissions=" + PERMISSIONS + "&scope=bot%20applications.commands";
const PATREON_URL = "https://www.patreon.com/16938508/join";
const SUPPORT_INVITE = "https://discord.gg/YjHkkwr5dD";
const PANEL_URL = "https://shield-guard-client.vercel.app";   // פאנל הלקוחות

const I18N = {
  he: {
    title: "Security Bot - בוט אבטחה לדיסקורד", desc: "בוט אבטחה מלא לדיסקורד: אנטי-ניוק, אנטי-ריידים, שער כניסה, הסגר, אוטומוד, אימות, וולקם ומודרציה.",
    nFeat: "יכולות", nPrev: "הצצה לפאנל",nCmd: "פקודות", nPrem: "פרימיום", nStart: "איך מתחילים", nPanel: "פאנל ניהול", nAdd: "הוסף לשרת",
    badge: "🔒 הגנה מלאה לשרת הדיסקורד שלך", h1a: "הגנה שלא נשברת", h1b: "גם מול ניוק וריידים",
    heroP: "אנטי-ניוק עם שחזור אוטומטי, שער כניסה, הסגר, אוטומוד מתקדם, אימות, וולקם מעוצב ומודרציה עם תיקים. הכל בפקודות סלאש ובעברית.",
    ctaAdd: "➕ הוסף את הבוט לשרת שלך", ctaPrem: "💎 קבל פרימיום", ctaCmd: "📖 כל הפקודות", st1: "מערכות הגנה", st2: "פקודות סלאש", st3: "הגנה אוטומטית",
    fTitle: "מה הבוט עושה", fSub: "כל מה ששרת צריך כדי להישאר בטוח, במקום אחד.",
    f1t: "אנטי-ניוק", f1p: "מזהה מחיקות ויצירות המוניות, חוסם את התוקף ומשחזר חדרים ורולים אוטומטית. כולל חסימת בוטים לא מורשים ומחיקת טמפלייטים.",
    f2t: "אנטי-ריידים", f2p: "מזהה הצפת כניסות, מעלה זמנית את רמת האימות ויכול לנעול את השרת עד שהסכנה חולפת.",
    f3t: "שער כניסה", f3p: "ניקוד חשבונות חשודים לפי גיל, שם ותמונת פרופיל. מי שבלי תמונה נכנס אוטומטית להסגר.",
    f4t: "הסגר במקום באן", f4p: "מסיר רולים, מגביל לחדר ערעורים, ומחזיר הכל בלחיצה כשהצוות משחרר.",
    f5t: "אוטומוד מתקדם", f5p: "מילים אסורות בעברית, ספאם, CAPS, אימוג'ים, הודעות כפולות, קישורי הזמנה ותיוגים המוניים, עם פטור לפי חדר או רול.",
    f6t: "אימות", f6p: "פאנל אימות בכפתור או בקאפצ'ה עם רקע ותיאור לבחירתך, והגנה מחשבונות חדשים.",
    f7t: "וולקם מעוצב", f7p: "כרטיס תמונה עם רקע, צבעים, מסגרת, כפתורי קישור, הודעה פרטית ורול אוטומטי. הכל מפאנל אחד בעברית.",
    f8t: "מודרציה ותיקים", f8p: "באן, קיק, טיימאאוט ואזהרות עם בדיקות היררכיה, והיסטוריה מלאה לכל משתמש.",
    f9t: "לוגים וסריקת אבטחה", f9p: "לוגים לכל אירוע חשוב, ו-/scan שנותן ציון אבטחה והמלצות לשיפור.",
    prTitle: "הצצה לפאנל", prSub: "ככה נראה הפאנל מבפנים, לפני שמתחילים.", pr1: "סקירה כללית", pr2: "אוטומוד", pr3: "טיקטים", prBtn: "🖥️ פתיחת הפאנל", prDemo: "👀 צפייה בדמו",
    cTitle: "פקודות", cSub: "הכל בפקודות סלאש. הקלד / בדיסקורד כדי לראות את הכל.",
    c1: "🛡️ הגנה", c2: "🚪 כניסה והסגר", c3: "🧹 אוטומוד", c4: "🔨 מודרציה ותיקים", c5: "💎 פרימיום: טיקטים", c6: "⚙️ הגדרות",
    pTitle: "💎 פרימיום", pSub: "מערכת הטיקטים המתקדמת וכל פיצ'רי הפרימיום, במנוי חודשי אחד.", pPlan: "מנוי פרימיום", pPrice: "כ-30 ₪", pMonth: "/ חודש",
    pl1: "מערכת טיקטים: פאנל, נושאים, רולי צוות וטרנסקריפט שנשמר בחדר הלוגים", pl2: "חסימות עם תפוגה וסגירה אוטומטית של טיקטים לא פעילים", pl3: "מחולל משאב לוגים לשרת FiveM, ישירות מהפאנל באתר", pl4: "כל פיצ'ר פרימיום שייוסף בעתיד",
    pJoin: "💎 הצטרפו ב-Patreon", pNote: "התשלום והחיוב החודשי מתבצעים ב-Patreon, ואפשר לבטל בכל רגע. האתר הזה לא רואה ולא שומר פרטי תשלום.",
    ps1t: "מצטרפים למנוי", ps1p: "לוחצים על הכפתור, בוחרים את המנוי ומשלמים ב-Patreon.",
    ps2t: "מחברים את הדיסקורד", ps2p: "ב-Patreon נכנסים להגדרות ← Apps ← Discord ומתחברים עם החשבון של בעל השרת שבו הבוט. כל מי שמוסיף את הבוט לשרת (עם הרשאת אדמין) מקבל גישה לפאנל. הרול של הפרימיום חייב להיות אצל בעל השרת.",
    ps3t: "מצטרפים לשרת התמיכה", ps3p: "צריך להיות חבר בשרת שלנו כדי לקבל את הרול. <a href=\"#\" data-support>הצטרפות לשרת</a>",
    ps4t: "הרול מתקבל אוטומטית", ps4p: "אחרי התשלום מקבלים את רול הפרימיום, הטיקטים נפתחים בשרת שלכם, ובהודעה פרטית מהבוט מגיע כפתור לרישום אימייל: תקבלו סיסמה זמנית למייל וקישור לקביעת סיסמה לפאנל.",
    sTitle: "איך מתחילים", sSub: "ארבעה צעדים והשרת מוגן. אחר כך אפשר לנהל הכול גם מהפאנל באתר.",
    s1t: "מוסיפים את הבוט לשרת", s1p: "לוחצים על \"הוסף לשרת\" ובוחרים את השרת שלך. צריך הרשאת ניהול שרת.",
    s2t: "מעלים את הרול של הבוט לראש", s2p: "בהגדרות השרת ← רולים, גוררים את הרול של הבוט מעל כל שאר הרולים. בלי זה הוא לא יוכל להעניש או לשחזר.",
    s3t: "קובעים חדר לוגים", s3p: "הפקודה <code>/setlog</code> ובחירת חדר צוות. שם יגיעו כל ההתראות.",
    s4t: "בודקים את השרת", s4p: "הפקודה <code>/scan</code> נותנת ציון אבטחה ואומרת מה לתקן.",
    endT: "מוכן להגן על השרת?", endS: "ההתקנה לוקחת פחות מדקה.", endBtn: "➕ הוסף את הבוט עכשיו", foot: "Security Bot • נבנה עם discord.py"
  },
  en: {
    title: "Security Bot - Discord security bot", desc: "A complete Discord security bot: anti-nuke, anti-raid, join gate, quarantine, automod, verification, welcome cards and moderation.",
    nFeat: "Features", nPrev: "Dashboard preview",nCmd: "Commands", nPrem: "Premium", nStart: "Get started", nPanel: "Dashboard", nAdd: "Add to server",
    badge: "🔒 Complete protection for your Discord server", h1a: "Protection that doesn't break", h1b: "even against nukes and raids",
    heroP: "Anti-nuke with automatic restore, join gate, quarantine, advanced automod, verification, beautiful welcome cards and moderation with case files. All with slash commands.",
    ctaAdd: "➕ Add the bot to your server", ctaPrem: "💎 Get Premium", ctaCmd: "📖 All commands", st1: "Protection systems", st2: "Slash commands", st3: "Automatic protection",
    fTitle: "What the bot does", fSub: "Everything a server needs to stay safe, in one place.",
    f1t: "Anti-Nuke", f1p: "Detects mass deletions and creations, blocks the attacker and restores channels and roles automatically. Includes unauthorized-bot blocking and template deletion.",
    f2t: "Anti-Raid", f2p: "Detects join floods, temporarily raises the verification level and can lock the server until the danger passes.",
    f3t: "Join Gate", f3p: "Scores suspicious accounts by age, name and avatar. Accounts without an avatar go straight to quarantine.",
    f4t: "Quarantine instead of ban", f4p: "Strips roles, limits the user to an appeals channel, and restores everything in one click when staff release them.",
    f5t: "Advanced AutoMod", f5p: "Banned words, spam, CAPS, emojis, duplicate messages, invite links and mass mentions, with exemptions per channel or role.",
    f6t: "Verification", f6p: "A button or captcha verification panel with your own background and description, plus protection from brand-new accounts.",
    f7t: "Designed welcome cards", f7p: "An image card with background, colors, border, link buttons, a private message and an auto-role. All from a single panel.",
    f8t: "Moderation & case files", f8p: "Ban, kick, timeout and warnings with hierarchy checks, and a full history for every user.",
    f9t: "Logs & security scan", f9p: "Logs for every important event, and /scan which gives a security score with improvement tips.",
    prTitle: "Take a look at the dashboard", prSub: "Here's what the dashboard looks like inside, before you start.", pr1: "Overview", pr2: "AutoMod", pr3: "Tickets", prBtn: "🖥️ Open the dashboard", prDemo: "👀 View demo",
    cTitle: "Commands", cSub: "Everything is a slash command. Type / in Discord to see them all.",
    c1: "🛡️ Protection", c2: "🚪 Entry & quarantine", c3: "🧹 AutoMod", c4: "🔨 Moderation & cases", c5: "💎 Premium: tickets", c6: "⚙️ Settings",
    pTitle: "💎 Premium", pSub: "The advanced ticket system and every Premium feature, in one monthly subscription.", pPlan: "Premium subscription", pPrice: "≈ ₪30", pMonth: "/ month",
    pl1: "Ticket system: panel, topics, staff roles and transcripts saved to your log channel", pl2: "Expiring blocks and auto-close for inactive tickets", pl3: "A FiveM log-resource generator, right from the web dashboard", pl4: "Every Premium feature added in the future",
    pJoin: "💎 Join on Patreon", pNote: "Payment and monthly billing are handled by Patreon and you can cancel any time. This site never sees or stores payment details.",
    ps1t: "Join the subscription", ps1p: "Press the button, pick the tier and pay on Patreon.",
    ps2t: "Connect your Discord", ps2p: "On Patreon open Settings → Apps → Discord and connect with the account of the owner of the server the bot is in. Anyone who adds the bot to a server (with admin permission) gets panel access. The premium role must be held by the server owner.",
    ps3t: "Join the support server", ps3p: "You must be a member of our server to receive the role. <a href=\"#\" data-support>Join the server</a>",
    ps4t: "The role arrives automatically", ps4p: "After payment you receive the Premium role, tickets unlock in your server, and the bot DMs you a button to register your email: you get a temporary password by email and a link to set your dashboard password.",
    sTitle: "Get started", sSub: "Four steps and your server is protected. Then manage everything from the web dashboard.",
    s1t: "Add the bot to your server", s1p: "Press \"Add to server\" and choose your server. You need the Manage Server permission.",
    s2t: "Move the bot's role to the top", s2p: "In Server Settings → Roles, drag the bot's role above all other roles. Without this it can't punish or restore.",
    s3t: "Set a log channel", s3p: "Use the <code>/setlog</code> command and pick a staff channel. All alerts will arrive there.",
    s4t: "Check your server", s4p: "The <code>/scan</code> command gives a security score and tells you what to fix.",
    endT: "Ready to protect your server?", endS: "Setup takes less than a minute.", endBtn: "➕ Add the bot now", foot: "Security Bot • built with discord.py"
  }
};
const store = {get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }};
let lang = store.get("sg_lang") || ((navigator.language || "he").toLowerCase().startsWith("he") ? "he" : "en");
if (!I18N[lang]) lang = "he";
let theme = store.get("sg_theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
function link(sel, url) { document.querySelectorAll(sel).forEach(a => { a.href = url; a.target = "_blank"; a.rel = "noopener"; }); }
function apply() {
  const d = document.documentElement, T = I18N[lang];
  d.lang = lang; d.dir = lang === "he" ? "rtl" : "ltr"; d.dataset.theme = theme;
  document.title = T.title; document.querySelector('meta[name=description]').content = T.desc;
  document.querySelectorAll("[data-i]").forEach(e => e.textContent = T[e.dataset.i] ?? e.textContent);
  document.querySelectorAll("[data-h]").forEach(e => e.innerHTML = T[e.dataset.h] ?? e.innerHTML);   // טקסטים סטטיים מהקובץ הזה בלבד
  document.getElementById("bl").textContent = lang === "he" ? "EN" : "עב";
  link("[data-invite]", INVITE); link("[data-patreon]", PATREON_URL); link("[data-support]", SUPPORT_INVITE); link("[data-panel]", PANEL_URL);
}
document.getElementById("bl").onclick = () => { lang = lang === "he" ? "en" : "he"; store.set("sg_lang", lang); apply(); };
document.getElementById("bt").onclick = () => { theme = theme === "dark" ? "light" : "dark"; store.set("sg_theme", theme); apply(); };
document.getElementById("y").textContent = new Date().getFullYear();
apply();
