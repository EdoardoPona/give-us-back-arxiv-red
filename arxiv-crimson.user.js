// ==UserScript==
// @name         arXiv Classic
// @namespace    give-us-back-arxiv-red
// @version      2.0
// @description  Revert arXiv's 2026-06-26 chrome redesign: classic crimson header (#B31B1B), cool greys, classic font.
// @author       you
// @match        *://arxiv.org/*
// @match        *://*.arxiv.org/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  const css = `
    /* 1. Header: dark ink -> classic crimson */
    .ds-site-header,
    .ds-site-header.is-collapsible .ds-site-header-nav,
    .ds-skip-link { background: #B31B1B !important; }

    .ds-site-header-nav a,
    .ds-site-header-nav button,
    .ds-site-header-nav a:visited,
    .ds-site-header-login { color: #ffffff !important; }
    .ds-site-header-nav .ds-nav-icon { opacity: 0.85 !important; }

    .ds-site-header-nav a:hover,
    .ds-site-header-nav button:hover,
    .ds-site-header-nav-toggle:hover { background: #8F1616 !important; color: #ffffff !important; }

    .ds-site-header-divider { background: #CB4B4B !important; }
    .ds-site-header.is-collapsible .ds-site-header-nav a,
    .ds-site-header.is-collapsible .ds-site-header-nav button { border-color: #CB4B4B !important; }

    /* 2. Warm neutrals -> cool classic greys (chrome-scoped tokens) */
    :root {
      --arxiv-grey:         #616161 !important;
      --arxiv-warm-wash:    #f5f5f5 !important;
      --arxiv-card-grey:    #f0f0f0 !important;
      --arxiv-pill-border:  #e0e0e0 !important;
      --arxiv-border-light: #dddddd !important;
    }

    /* 3. Undo IBM Plex Sans swap (delete to keep Plex) */
    :root {
      --arxiv-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI",
        "Lucida Grande", Helvetica, Arial, sans-serif !important;
    }
  `;

  if (typeof GM_addStyle === "function") {
    GM_addStyle(css);
  } else {
    const style = document.createElement("style");
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }
})();
