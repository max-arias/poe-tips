# PoE Tips Website Implementation Plan

A static, dark-themed website for Path of Exile 1 & 2 tips using Astro, with fuzzy search, abbreviation expansion, and league-based obsolescence tracking.

---

## Phase 1: Foundation ✅
- [x] Set up Astro Content Collections schema (`src/content/config.ts`)
- [x] Create abbreviations dictionary (`src/data/abbreviations.json`)
- [x] Set up global styles with dark theme (`src/styles/global.css`)
- [x] Update base layout with meta tags and fonts (`src/layouts/Layout.astro`)

## Phase 2: Core Components ✅
- [x] Create GameToggle component (PoE1/PoE2/Both with localStorage)
- [x] Create SearchBar component with Fuse.js fuzzy search
- [x] Create TipCard component with outdated indicator
- [x] Create VideoEmbed component for YouTube support
- [x] Create TagFilter component for category/tag filtering

## Phase 3: Pages & Content ✅
- [x] Build single-page layout with TOC (`src/pages/index.astro`)
- [x] Render all tips inline with full MDX content
- [x] Add 4 sample tips as MDX content

## Phase 4: Polish & Deploy ✅
- [x] Verify build works
- [x] Test all search/filter functionality
- [x] Verify Cloudflare Workers static build
- [x] Create walkthrough documentation

---

## Technical Decisions

### Content Schema

Tips are stored as MDX files in `src/content/tips/` with this frontmatter:

```yaml
# Required fields
title: string           # Tip title
description: string     # Short preview text
game: poe1 | poe2 | both
category: crafting | farming | atlas | currency | mechanics | league | leveling
tags: string[]          # Searchable tags
patchVersion: string    # e.g., "3.27" or "0.1.1"
publishedAt: date

# Optional fields
mayBeOutdated: boolean  # Shows warning banner if true (default: false)
updatedAt: date?
videoUrl: string?       # YouTube embed URL
source:                 # Array of attributions for external content
  - name: string
    url: string
difficulty: beginner | intermediate | advanced
timeSensitivity: league-start | anytime  # When is this tip most useful?
relatedTips: string[]   # Slugs of related tips
prerequisites: string[] # Required unlocks (e.g., "Einhar unlocked", "Aisling bench")
```

### Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `crafting` | Creating/modifying items | Recombinators, fossils, essences |
| `farming` | Targeted grinding strategies | Div card farming, boss farming |
| `atlas` | Atlas tree & mapping | Scarab strategies, map juice setups |
| `currency` | Making/saving money | Bulk trading, vendor recipes, scarab swaps |
| `mechanics` | How game systems work | Damage calculation, ailments |
| `league` | League-specific content | New mechanics each league |
| `leveling` | Getting to maps faster | Skill progressions, act tips |

### Abbreviations Dictionary

The search system expands common abbreviations:

| Abbr | Full Term | Category |
|------|-----------|----------|
| rf | righteous fire | skill |
| coc | cast on critical strike | support |
| dot | damage over time | mechanic |
| ci | chaos inoculation | keystone |
| ll | low life | mechanic |
| es | energy shield | defense |
| div | divine orb | currency |
| ex | exalted orb | currency |
| pob | path of building | tool |
| ssf | solo self-found | mode |
| hc | hardcore | mode |
| cwdt | cast when damage taken | support |
| mom | mind over matter | keystone |
| ... | ~70+ more entries | various |

### Color Palette (Dark Theme)

```css
--bg-primary: #0d0d0d;      /* Main background */
--bg-secondary: #1a1a1a;    /* Card backgrounds */
--bg-tertiary: #262626;     /* Hover states */
--text-primary: #e5e5e5;    /* Main text */
--text-secondary: #a3a3a3;  /* Muted text */
--accent: #f59e0b;          /* Amber/gold - PoE currency feel */
--accent-hover: #d97706;
--warning: #ef4444;         /* Red for outdated indicators */
--border: #404040;
```

---

## Project Structure

```
src/
├── components/
│   ├── GameToggle.astro      # PoE 1/2 selector
│   ├── SearchBar.astro       # Fuzzy search with abbreviations
│   ├── TipCard.astro         # Individual tip display
│   ├── VideoEmbed.astro      # YouTube embed
│   └── TagFilter.astro       # Category/tag pills
├── content/
│   ├── config.ts             # Content collection schema
│   └── tips/
│       └── *.mdx             # Tip content files
├── data/
│   └── abbreviations.json    # Search expansion dictionary
├── layouts/
│   └── Layout.astro          # Base HTML layout
├── pages/
│   └── index.astro           # Single-page with TOC + all tips
└── styles/
    └── global.css            # Design system
```

---

## UI Mockups

### Tip Card

```
┌──────────────────────────────────────────────────────────┐
│ ⚠️ This tip may be outdated (Patch 3.25)                 │  ← Only if mayBeOutdated
├──────────────────────────────────────────────────────────┤
│ 🏷️ Crafting                                              │
│                                                          │
│ How to Craft +1 Spectre Chests                           │
│ Step-by-step recombinator guide for 1000 ES twilight...  │
│                                                          │
│ 🎬 Video  •  📌 3.27  •  #spectre #es #recombinator      │
│ Source: Reddit u/ExampleUser                             │
└──────────────────────────────────────────────────────────┘
```

### Game Toggle

```
┌─────────────────────────────────┐
│  [PoE 1]  [PoE 2]  [Both ✓]    │
└─────────────────────────────────┘
```

---

## Verification Checklist

- [ ] `bun run build` completes without errors
- [ ] Game toggle persists selection after page refresh
- [ ] Search "rf" shows tips containing "righteous fire"
- [ ] Abbreviation hint appears when typing known abbreviations
- [ ] Outdated banner displays for tips with `mayBeOutdated: true`
- [ ] YouTube videos embed and play correctly
- [ ] Tags are clickable and filter tips correctly
- [ ] Mobile layout is responsive and usable
- [ ] Static output in `dist/` deploys to Cloudflare Workers

---

## Open Questions

> **PoE 2 Content Strategy**: Should we design for both games equally from day one, or focus on PoE 1 structure first since PoE 2 is newer?

> **Categories**: Are the proposed categories sufficient? Should we add/remove any?
