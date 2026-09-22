# 11: Letterbox + one-line footer

**What to build:** The contact form restyled as a letter ("Dear Adarsh," … "— Yours, [name]"), with subject chips, the socials, and "📍 Pune · 🕐 local time". It uses the same Web3Forms submission and states. On success, a 3D envelope drops into the letterbox and the flag goes up. The footer becomes one line: "Made with ❤️ by Adarsh". The Currently shelf is removed from the contact area.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Clicking a subject chip fills in the subject; invalid input shows validation errors
- [ ] Tests stub `fetch`: success shows the success state, 429 shows the rate-limit state, and other failures show the error state
- [ ] The envelope animation plays only in 3D mode; 2D mode shows the plain success state
- [ ] The footer is one line; the form works without WebGL
