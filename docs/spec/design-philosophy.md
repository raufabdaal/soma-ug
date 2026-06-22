# Soma Design Philosophy (V1)

> This document defines the visual language of Soma. It is the source of truth for all design decisions. If something in the app disagrees with this document, this document wins unless a `DEC-NNN` entry in `DECISIONS.md` supersedes it.

## The core principle

Functionality first. Design complementary. The design exists to make learning clearer, faster, and more engaging. If a design choice causes confusion, change it (and log it).

## Foundation

- **Background**: warm cream `#FBF8F3`. Never pure white. This is the canvas for everything.
- **Deeper panels**: `#F4EEE3`. Used for guarantee bands, app frames, and card backgrounds where contrast is needed.
- **Primary text**: deep charcoal `#2B2926`. Never pure black. Easier on the eyes, reads as "book" not "screen."
- **Secondary text**: `#57534B`.
- **Tertiary / labels**: `#8C857A`.
- **Borders**: `#E6DFD2` (warm light hairline).

## Subject identity colors

Each subject owns one earthy tone. Color is used as identity, not decoration.

| Subject | Color | Hex | Usage |
|---|---|---|---|
| Mathematics | Terracotta | `#C06A4B` | Primary brand accent, Math identity, primary buttons |
| Biology | Sage green | `#7E8E63` | Biology identity, "on track" / success states |
| Chemistry | Dusty blue | `#6E8AA6` | Chemistry identity |

## Typography

- **Headlines**: Fraunces (variable serif). Premium, editorial, warm. Loaded via `next/font`.
- **Body**: Inter. Clean, highly legible, generously spaced.
- **Hierarchy**: high contrast in text sizes. Big serif headlines, smaller sans body.

## Key UI patterns

### Marker highlights
Wrap key terms in a soft yellow (`#F2E0A0`) felt-tip swipe. Never use harsh bounding boxes for emphasis.

### Buttons
Solid, real buttons with weight. Primary = terracotta with a soft shadow. Ghost = transparent with a hairline border. Rounded full (pill shape).

### Cards
White background, 1px hairline border, soft shadow, 16px radius. Generous internal padding (26px).

### Inputs
Clean, un-bordered, underline style. The bottom border is charcoal, turns terracotta on focus.

### Ambient blobs
Soft, blurred color circles used as background atmosphere. Low opacity (14-32%). Never as solid color blocks for content.

## What this design is NOT

- Not glassmorphism (no backdrop-blur panels with semi-transparent white).
- Not indigo/violet (the default AI-generated look).
- Not a PDF reader (lessons should feel interactive, not like reading a document).
- Not decorated with stock African imagery, flags, or kente patterns.

## Banned from user-facing copy

- Em dashes (the long dashes). They read as AI-generated. Use regular hyphens or restructure.
- "delve", "tapestry", "navigate the landscape of", "in today's fast-paced world".
