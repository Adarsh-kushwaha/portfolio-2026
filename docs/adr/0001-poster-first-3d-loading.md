# Poster first, 3D on idle, 2D fallback

The home page is a 3D portfolio, but its LCP must stay fast on mid-range phones (target Lighthouse 85+ mobile). Its own Arena shows a "Slow LCP" Boss, so a slow site would contradict its own content. We decided the Hero renders as HTML text plus a pre-rendered WebP poster of the Avatar. The three.js bundle and the Avatar GLB load only after first paint, during idle time, and crossfade over the poster. Low-end devices (few CPU cores, `Save-Data`, slow connection) keep the poster, and the whole site runs in 2D mode. Do not "simplify" this into loading 3D up front behind a loader screen.

## Considered Options
- Load 3D immediately behind a loader: simpler, but LCP of 4–6 s on mid-range Android over 4G, and a spinner as the first impression.
- Desktop-only 3D: safest for performance, but it drops the mobile experience the brief asked for.
