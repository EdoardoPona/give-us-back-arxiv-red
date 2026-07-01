# give-us-back-arxiv-red

On **2026-06-26** arXiv shipped a redesigned site "chrome": a dark-brown
header (`#1C1A17`, replacing the traditional **Cornell red** `#B31B1B`), a
warm-grey footer, and a font swap to IBM Plex Sans. This repo puts the classic
look back — locally, in your own browser.

### What the update actually changed (and what it didn't)

Comparing arXiv from just before the change (2026-06-02, via the Wayback
Machine) against today shows the update **added a single new stylesheet** —
`arxiv-header-footer.css` (the new `.ds-*` "design system") — and left the
body/content stylesheet (`arXiv.css`, still `?v=20260318`) **byte-for-byte
unchanged**. So:

- **Changed:** the header, the footer, the announcement band, the chrome font.
- **Untouched:** article listings, abstracts, everything below the header.

That means reverting "everything the update changed" is fully contained in that
one file, which is what [`arxiv-crimson.css`](./arxiv-crimson.css) targets. It
does three things: (1) recolours the header to crimson, (2) remaps the redesign's
*warm* grey tokens to cool classic greys (footer + borders), and (3) undoes the
IBM Plex Sans swap.

One subtlety: the header background is the token `--arxiv-ink`, but arXiv reuses
that same token for footer/announcement **text** — so we can't just flip it
(that would turn text red). We recolour the header via its own selectors and
leave `--arxiv-ink` alone.

**Not reverted:** the blue "open access" announcement band is left in place — it
is informational (and blue, not brown). Delete section 3 of the CSS if you'd
rather keep IBM Plex Sans.

## Option A — Stylus / Stylebot (lightest, no coding)

The least effort. Install a user-styles extension, paste, done.

- **Chrome / Edge / Brave / Firefox:** [Stylus](https://add0n.com/stylus.html)
  (open source) or [Stylebot](https://stylebot.dev/).
- New style → paste the contents of [`arxiv-crimson.css`](./arxiv-crimson.css) →
  set "Applies to → URLs on the domain" = `arxiv.org` → Save.

Nothing to package or reload; it just works and survives browser restarts.

## Option B — Unpacked Chrome/Edge extension

Self-contained, no third-party extension needed. Files are in
[`extension/`](./extension/).

1. Go to `chrome://extensions` (or `edge://extensions`).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select the `extension/` folder.

Done — visit https://arxiv.org. To update the colour, edit
`extension/crimson.css` and hit the reload ↻ on the extension card.

## Option C — Userscript (Tampermonkey, or Safari)

Use [`arxiv-crimson.user.js`](./arxiv-crimson.user.js).

- **Chrome/Firefox:** with [Tampermonkey](https://www.tampermonkey.net/)
  installed, open the `.user.js` file — it offers to install.
- **Safari (macOS/iOS):** install the free open-source
  [**Userscripts**](https://apps.apple.com/app/userscripts/id1463298887) app
  extension, then add `arxiv-crimson.user.js` (it handles user styles too — you
  can equally drop in `arxiv-crimson.css`).

## Safari without any extension

Option B can be turned into a native Safari extension with Apple's converter
(requires Xcode):

```sh
xcrun safari-web-extension-converter extension/
```

That generates an Xcode project you can build and enable in Safari → Settings →
Extensions.

## The colours

| element                        | new (2026 redesign) | restored (classic) |
| ------------------------------ | ------------------- | ------------------ |
| header / nav background        | `#1C1A17`           | `#B31B1B`          |
| nav hover                      | `#302C28`           | `#8F1616`          |
| dividers / mobile nav borders  | `#4A433D`           | `#CB4B4B`          |
| nav link text                  | `#B0ABA6`           | `#FFFFFF`          |
| logo                           | solid-X grey mark   | classic white one-colour logo |
| footer background (warm wash)  | `#F9F7F7`           | `#F5F5F5`          |
| card grey                      | `#F0EEEC`           | `#F0F0F0`          |
| pill / funder border           | `#E4E0DB`           | `#E0E0E0`          |
| light border                   | `#DDD8D2`           | `#DDDDDD`          |
| separator / muted grey         | `#6B6459`           | `#616161`          |
| chrome font                    | IBM Plex Sans       | system sans stack  |
