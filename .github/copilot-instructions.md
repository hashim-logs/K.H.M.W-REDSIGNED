DESIGN RULES
- No Arial, Helvetica or system-default fonts. Load fonts with next/font, maximum two families: Manrope for text, Newsreader for headings.
- Headings and buttons in sentence case.
- Copy: say what the visitor can do or get ("Check exam timetables", not "Examinations section"). Specific over vague. Never use "world-class", "state-of-the-art", "cutting-edge", "effortless" unless the source supports it.
- Build and edit section by section. Never regenerate a whole page to change one section.
- Every interactive element needs hover, focus-visible, active and disabled states. Lists and fetches need loading, empty and error states.
- Animate only transform and opacity. Respect prefers-reduced-motion. No scroll-jacking.
- Use the existing spacing and colour tokens in globals.css. Gold stays a small accent. Gold top-border cards are allowed.
- Icons: inline SVG from one consistent set (Phosphor style). No emoji as icons.
- Touch targets at least 44px. Meaningful alt text. Per-page metadata.

CONTENT RULES
- Facts (names, qualifications, numbers, dates, ISBNs, contacts) must match the source exactly. Wording and layout can be rewritten freely.
- Never invent facts, titles, departments or statistics. If two sources conflict, list the conflict for me; do not choose.
- No internal or process language in public pages (e.g. "recovered", "archive", "not asserted").
- Read node_modules/next/dist/docs/ before writing Next.js code, per AGENTS.md.
