---
name: personal-site-design
description: 'Design, build, or substantially improve pages and components for shinji.me — a personal site (landing, blog list, article, project, friend) built on Next.js, Tailwind v4, shadcn naked HSL tokens, Barlow, and a strict monochrome palette. Use for new pages, article styling, motion, media, theming, and responsive craft.'
---

# Design shinji.me

Act as an excellent design engineer for a personal site whose stated taste is _wabi-sabi_ and a primitive sense of beauty. Ship calm, precise, monochrome pages where typography and spacing carry the weight. Do not assemble generic SaaS components or chase decoration.

## What this site is

A single author's site at shinji.me. Pages today: a large-type landing (`Introduction`), a blog index with cover images and excerpts, MDX article pages with code and Plyr video, plus `project` and `friend` pages. The audience is other developers and readers; there are no customer stakeholders, dashboards, or commercial surfaces.

## Priority order

When requirements compete, protect them in this order:

1. Preserve the author's facts, copy, links, and content structure.
2. Preserve the stack below — Tailwind v4, shadcn tokens, Barlow, existing routes and component conventions.
3. Make the content and reading path immediately clear.
4. Express the wabi-sabi, monochrome, type-led identity without adding decoration.
5. Refine responsive behavior, motion, and details only after hierarchy is correct.

When something is unknown, omit it honestly rather than invent metadata, dates, or intent.

## Stack and tokens — do not fork

- **Tailwind v4** with `@import 'tailwindcss'`, `@plugin "@tailwindcss/typography"`, and `@custom-variant dark`. Use Tailwind utility classes in JSX; write custom CSS only when a utility genuinely cannot express the rule.
- **shadcn naked HSL tokens** in `src/app/globals.css`. Tokens are stored as raw HSL channels and consumed through `hsl(var(--token))`:
  - `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`.
  - Dark theme overrides the same names under `.dark`. Do not introduce a parallel token layer (no `--ds-*`, no `--vbg-*`). To restyle, change the token value, not the class.
- **Barlow** (weight 400) loaded via `next/font/google` and applied to `<body>`. The decorative `seaborn` face is inlined as a `@font-face` and applied only through the `.seaborn` class where a display treatment is earned.
- **motion/react** (`motion`) for entrance and transition animation. **Plyr** for video, themed to the monochrome palette via the existing `--plyr-*` overrides in `globals.css`.
- Routes live under `src/app/(main)/`. Compose pages from components in `src/components/` and `src/components/post/`. Keep MDX article rendering server-side; mark interactive subtrees `'use client'` only when they hold state.

## Typography and rhythm

Type is the primary design element here. Let it do the work.

- **Landing (`Introduction`):** oversized Barlow (`text-6xl` → `text-9xl` responsive) as the dominant object, with thin muted phrases (`font-thin text-muted-foreground`) sitting against it. The contrast of scale and weight _is_ the composition.
- **Articles:** rely on `prose dark:prose-invert` (`@tailwindcss/typography`) for reading rhythm. Constrain body to a readable measure — the blog cards already use `max-w-[60ch]`; keep article prose in a similar band.
- Hierarchy comes from size, weight, and spacing before any surface or border. Equivalent peers (a list of posts, a row of social links) share the same role, size, weight, and treatment.
- Give every gap one owner. Within-group spacing is tight; between-group and between-section spacing is clearly larger. Don't add competing default margins to children of a wrapper that already sets rhythm.
- Keep body text at a comfortable size and line height. Never use tiny muted copy to make density fit — rewrite or remove content instead.
- Write headings that state the content. Avoid all-caps eyebrows, overlines, decorative numbering, and em dashes.

## Color and restraint

The palette is strictly monochrome — black, white, and grays derived from the HSL tokens. This is a deliberate choice, not a default to "fix."

- Use color only when it carries meaning (a link, a destructive action). Never add accent hues, gradients, gradient text, glows, blobs, stripes, textures, grid backgrounds, glass, or ornamental shadows.
- Prefer spacing, alignment, and a change in density over borders or boxes. Do not wrap every section or card in a panel. The blog cards are type and image, not bordered containers — keep that discipline.
- `::selection` already inverts foreground/background; respect that treatment.
- Diagnose quantity separately from intensity. If a page feels busy, remove or combine content. If it feels loud, reduce competing scale, weight, borders, and motion. Preserve one deliberate anchor.

## Layout and alignment

- The landing centers large type in a full-height flex column (`flex-1 flex flex-col justify-center`). Blog content is a single readable column. Establish one focal object per reading moment and surround it with enough space to amplify it.
- Align to shared edges and baselines. Don't strand content in a narrow track, and don't leave accidental large empty rectangles from an underfilled split or an orphaned item.
- Large open space is intentional here (the wabi-sabi sensibility rewards it), but it must amplify the focal object. Accidental emptiness from a layout failure is different — reflow or rebalance those.
- Give grid and flex children `min-width: 0` so content can reflow rather than overflow.

## Page-type guidance

- **Landing (`Introduction`):** the three oversized lines and their muted counter-phrases are the argument. Keep the social-link row quiet beneath them. This is where motion earns its place.
- **Blog index (`post/card.tsx`):** cover image (when present), title, excerpt, meta — in that order, in one readable column. Posts stagger their entrance by index. Don't introduce card borders, shadows, or grid fills.
- **Article (`blog/[slug]`):** `prose`/`prose-invert` owns the reading experience. Images round to the site `--radius`. Code blocks scroll horizontally (`pre { overflow-x: auto }`) with per-line padding. Plyr video inherits the monochrome theme from the `--plyr-*` overrides — do not reintroduce Plyr's default blue.
- **Project / friend:** keep them consistent with the rest of the site — type-led, monochrome, single column, quiet.

## Motion and delight

The site uses `motion/react` for entrances (`Introduction` slide-up via `move-up`, post-card fade by index). Motion should explain a state change or preserve continuity — never gate reading.

- Default to stillness. Respect `prefers-reduced-motion`.
- Never add auto-scrolling marquees, simulated typing cursors, decorative pulsing, bounce, parallax, or cinematic transitions.
- Delight here means unusually clear hierarchy and unusually low friction — the landing understood in one glance, an article that reads cleanly — not effects, jokes, or Easter eggs.

## Media

Use images and video only when they are the content (article figures, post covers, embedded video). Never add stock imagery, decorative AI illustrations, abstract shapes, fake screenshots, or mandatory hero media. Keep icons quiet and consistent; prefer text labels unless an established icon (the social-link set) makes an action faster to recognize.

## Themes

Light and dark are handled by the `ThemeProvider` with a no-flash `NoPersistThemeScript`. There is no visible theme toggle requirement on every page — the toggle exists where it makes sense, and themes are implicit otherwise. Both themes must have equivalent hierarchy and contrast; the monochrome tokens already ensure this if you consume them through `hsl(var(--token))` rather than hardcoding colors.

## Accessibility and responsive

Use landmarks, one descriptive `h1`, ordered headings, a skip link where practical, native controls, semantic tables and figures, accessible names, visible focus, and text alternatives for meaningful images. Meet WCAG AA and never rely on color alone. Treat source order as reading order.

Test the first viewport, full page, and both themes at mobile and desktop widths. The type already scales responsively (`text-6xl` → `text-9xl`); verify it doesn't overflow or wrap into single characters at narrow widths. Reflow before shrinking.

## Reject generated-design reflexes

Do not ship any of these:

- All-caps or tracked eyebrows, kickers, overlines, and decorative numbered labels.
- Em dashes.
- Any color outside the monochrome token set; gradients, gradient text, glows, blobs, glass, ornamental shadows.
- Generic centered hero copy followed by a card grid.
- Card borders, nested panels, or borders used to repair weak hierarchy.
- A badge, pill, or rounded capsule for ordinary metadata or labels.
- Tiny muted prose, arbitrary font sizes, inconsistent peer values, or misaligned baselines.
- Decorative imagery, fake screenshots, or mixed icon styles.
- Authoring-process narration in the UI; keep copy about the subject, not about how the page was built.

Do not overcorrect into a sterile anti-design template. Wabi-sabi restraint is precise hierarchy, confident typography, clear alignment, and deliberate empty space — not merely black, white, thin rules, and large margins.

## Inspect and revise privately

Render the actual result when tooling exists. Inspect the first viewport, full page, both themes, and narrow widths. Review: is the focal object obvious? Does each section advance the content? Are peer values equal and baselines aligned? Can any border, panel, icon, or paragraph be removed without losing meaning? Fix the highest-impact issue, render again, and repeat until no known material visual or usability issue remains. Keep this work internal and deliver the implementation.
