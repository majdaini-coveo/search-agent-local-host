// ==UserScript==
// @name         ABB: Open Local Coveo UI (iframe)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://*.abb.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  const LOCAL_URL = "http://localhost:3000";

  const BTN_ID = "tm-local-coveo-btn";
  const OVERLAY_ID = "tm-local-coveo-overlay";
  const DRAWER_ID = "tm-local-coveo-drawer";

  if (document.getElementById(BTN_ID)) return;

  const btn = document.createElement("button");
  btn.id = BTN_ID;
  btn.innerText = "Open Search Agent";
  btn.style.cssText =
    "position:fixed;right:20px;top:80px;z-index:2147483647;padding:8px 12px;background:#FF000F;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:sans-serif;box-shadow:0 2px 5px rgba(0,0,0,0.2);";
  document.body.appendChild(btn);

  function closeUI() {
    document.getElementById(OVERLAY_ID)?.remove();
    document.getElementById(DRAWER_ID)?.remove();
    document.removeEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closeUI();
  }

  function openUI() {
    // Backdrop
    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,0.35);";
    overlay.addEventListener("click", closeUI);

    // Drawer
    const drawer = document.createElement("div");
    drawer.id = DRAWER_ID;
    drawer.style.cssText =
      "position:fixed;top:0;right:0;height:100vh;width:min(620px, 92vw);" +
      "z-index:2147483647;background:#fff;box-shadow:-12px 0 40px rgba(0,0,0,0.35);" +
      "display:flex;flex-direction:column;overflow:hidden;border-top-left-radius:12px;border-bottom-left-radius:12px;";

    // Header
    const header = document.createElement("div");
    header.style.cssText =
      "height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:#111;color:#fff;font-family:sans-serif;";

    const title = document.createElement("div");
    title.textContent = "Search Agent (Local)";
    title.style.cssText = "font-weight:600;";

    const close = document.createElement("button");
    close.textContent = "✕";
    close.style.cssText =
      "background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer;padding:6px 10px;";
    close.onclick = closeUI;

    header.appendChild(title);
    header.appendChild(close);

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.src = LOCAL_URL;
    iframe.title = "Local Coveo UI";
    iframe.style.cssText = "width:100%;height:calc(100vh - 48px);border:0;display:block;";

    drawer.appendChild(header);
    drawer.appendChild(iframe);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.addEventListener("keydown", onKeyDown);
  }

  btn.onclick = () => {
    const existing = document.getElementById(DRAWER_ID);
    if (existing) closeUI();
    else openUI();
  };
})();
