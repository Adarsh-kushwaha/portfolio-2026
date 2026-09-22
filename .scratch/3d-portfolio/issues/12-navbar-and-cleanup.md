# 12: Navbar anchors + theme scope + cleanup

**What to build:** The Navbar links to About, Arena, Campaign, Beyond and Letterbox (`#about`, `#arena`, `#campaign`, `#beyond`, `#letterbox`) plus the Blog route. The theme toggle changes only the HTML; 3D scenes keep fixed dark lighting. The Testimonials placeholder and any leftover old section code are deleted.

**Blocked by:** 05, 07, 09, 10, 11

**Status:** ready-for-agent

- [ ] A test checks every Navbar anchor matches a section on the page, and that Blog points to the Blog route
- [ ] Toggling the theme changes the HTML surfaces and leaves the 3D lighting untouched
- [ ] Testimonials and the unused old sections are gone; lint and build pass
- [ ] The Blog page is visually unchanged
