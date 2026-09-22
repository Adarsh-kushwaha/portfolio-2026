# 02: Extract section content into typed content modules (prefactor)

**What to build:** Move all portfolio content out of the section components into plain typed data: Levels, Towers (with the Side Quest flag), Bosses, Stats, Arsenal/Tools skills, Beyond pieces, Currently Shelf quotes, and socials. The existing sections read from this data. **There is no visible change.** This makes every later slice easy to build.

**Blocked by:** 01

**Status:** done

- [ ] Every Level (6 roles) has its Towers or Outposts attached. Call Pulse is a Side Quest Tower
- [ ] The SDE I period is corrected so it no longer overlaps the internship (assumed Jul 2023 ⚠️ owner to confirm)
- [ ] Bosses carry before and after values, a Move name, and a link to a Tower; This Site uses the baseline from 01
- [ ] Six Stats with values; all 30 skills classified as Arsenal or Tools with level badges
- [ ] 8–10 *Crime and Punishment* quotes (Garnett translation) and the Spotify track ID for the Currently Shelf
- [ ] The existing home page renders exactly as before; the smoke test still passes
