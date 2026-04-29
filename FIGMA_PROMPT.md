# Figma Design Prompt — Aevum Travel Booking Platform

Use this prompt in Figma AI (or give to a designer) to recreate the exact UI of the **Aevum** travel booking web app.

---

## 🎨 Design System & Global Tokens

### Typography
- **Font Family:** `Outfit` (Google Fonts), fallback: `system-ui, sans-serif`
- **Weights used:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Color Palette

| Token | Hex / Value | Usage |
|---|---|---|
| Brand Primary | `#818cf8` (Indigo 400) | Links, accents, active states |
| Brand Secondary | `#f472b6` (Pink 400) | Button gradients end |
| Brand Accent | `#22d3ee` (Cyan 400) | Highlights |
| BG Deep | `#020617` (Slate 950) | Page background |
| BG Card | `#0f172a` (Slate 900) | Card/panel background |
| Slate 800 | `#1e293b` | Input backgrounds |
| Slate 700 | `#334155` | Input borders |
| Slate 400 | `#94a3b8` | Muted text, placeholders |
| Slate 300 | `#cbd5e1` | Secondary body text |
| Slate 100 | `#f1f5f9` | Primary text on dark |
| White | `#ffffff` | Headings, icons on dark |
| Indigo 600 | `#4f46e5` | Logo badge, CTA buttons |
| Indigo 500 | `#6366f1` | Tab active, pill nav active |
| Purple 500 | `#a855f7` | Hotel page gradient |
| Pink 500 | `#ec4899` | BudgetSearch button gradient end |
| Emerald 400 | `#34d399` | "Best Deal Found" badge, savings badge |
| Yellow 400 | `#facc15` | Star icons |
| Red 500/10 | `rgba(239,68,68,0.1)` | Error state background |

### Glassmorphism / Surfaces
- **Glass Panel:** `backdrop-blur: 24px`, `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`, `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`
- **Dark Glass:** `background: rgba(15,23,42,0.6)`, `backdrop-blur: 32px`, `border: 1px solid rgba(255,255,255,0.1)`

### Border Radius
- Cards/containers: `24px` (rounded-3xl) or `40px` (rounded-[2.5rem])
- Inputs: `16px` (rounded-2xl)
- Buttons (pill): `9999px` (rounded-full)
- Buttons (standard): `12px` (rounded-xl)
- Tags/badges: `9999px` (rounded-full) or `8px` (rounded-lg)

### Shadows & Glows
- Purple glow on search button: `box-shadow: 0 0 20px rgba(147,51,234,0.4)`
- Indigo glow on budget button: `box-shadow: 0 4px 20px rgba(168,85,247,0.4)`
- Card hover border: `border-color: rgba(99,102,241,0.3)`

---

## 📐 Layout Structure (All Pages)

### Navbar (Fixed, Full Width)
**Default state (on transparent pages = Home, Budget):**
- Background: fully transparent
- Height: `80px`, padding: `20px 24px`

**Scrolled state / opaque pages (Hotels, Flights):**
- Background: `rgba(255,255,255,0.7)`, backdrop-blur: 20px
- Border bottom: `1px solid rgba(255,255,255,0.5)`
- Box shadow: subtle `sm`
- Height: `64px`

**Logo (left):**
- Icon badge: `40px × 40px`, border-radius `12px`
  - Transparent state: `background: rgba(255,255,255,0.1)`, white `Sparkles ✦` icon, `border: 1px solid rgba(255,255,255,0.2)`
  - Opaque state: `background: #4f46e5`, white `Sparkles ✦` icon
- Brand name: `"Aevum"`, `20px`, `font-weight: 700`
  - Transparent: `color: white`
  - Opaque: `color: #0f172a`

**Center Navigation Pill:**
- Container pill: `background: rgba(255,255,255,0.1)`, `border: 1px solid rgba(255,255,255,0.1)`, backdrop-blur, padding `6px`, border-radius: `9999px`
- Nav items: `"Home"`, `"Budget & Packages"`, `"Hotels"`, `"Flights"`
- Active item: `background: white`, `color: #4f46e5`, `font-weight: 700`, border-radius `9999px`
- Inactive: `color: rgba(255,255,255,0.8)`, hover `background: rgba(255,255,255,0.1)`
- Opaque state inactive: `color: #64748b`, hover `color: #4f46e5`

**Right Actions:**
- Currency button: `"INR"` text, `14px`, hidden on mobile
- Sign In button: pill shape, left side has a small `24px` avatar circle, text `"Sign In"`
  - Transparent: `background: white`, `color: #4f46e5`
  - Opaque: `background: #0f172a`, `color: white`, hover `background: #4f46e5`

### Footer (White Background)
- Background: `#ffffff`, `border-top: 1px solid #f1f5f9`
- Top decoration: full-width `1px` line with gradient `transparent → rgba(99,102,241,0.2) → transparent`
- Padding: `80px top, 40px bottom`
- **5-column grid** (2 + 1 + 1 + 1):
  - **Col 1–2 (Brand):**
    - Logo repeat (indigo badge + "Aevum" text)
    - Body text: `"Reimagining travel with AI..."`, slate-500, `line-height: 1.65`
    - 3 social icon circles: `40px`, `background: #f8fafc`, gray icon letter, hover `background: #6366f1`, `color: white`
  - **Col 3 (Company):** heading `"Company"`, links: About Us, Careers, Press
  - **Col 4 (Support):** heading `"Support"`, links: Help Center, Safety, Cancellation
  - **Col 5 (Legal):** heading `"Legal"`, links: Terms, Privacy, Sitemap
- **Bottom bar** (separated by border-top):
  - Left: `"© 2026 Aevum. All rights reserved."`, slate-400
  - Right: `"English (IN)"` and `"INR"` text, slate-400 with hover effect

---

## 🏠 Page 1 — Home (`/`)

### Hero Section
- **Height:** `600px`, `width: 100%`
- **Background:** Full-bleed photo (road/travel landscape), overlaid with `background: rgba(17,24,39,0.6)` dark scrim
- **Content** (centered, `padding-top: 80px`):
  - H1: `"Discover the Undiscovered"`, `56–72px`, `font-weight: 700`, `color: white`, `letter-spacing: -0.02em`
    - Word `"Undiscovered"` uses gradient text: `from #bfdbfe to #a5f3fc` (blue-200 → cyan-200)
  - Subtitle: `"Personalized itineraries and unbeatable deals, curated just for you."`, `20px`, `color: #e5e7eb`, `margin-bottom: 48px`

  - **Floating Search Bar** (pill shape, white background, `max-width: 896px`):
    - `background: white`, `border-radius: 9999px`, `padding: 8px`, `box-shadow: 0 25px 50px rgba(0,0,0,0.25)`
    - Flex row with 3 sections + search button:
    - **Destination field** (flex-1):
      - Left: `MapPin` icon (indigo)
      - Label: `"WHERE TO?"`, `10px`, `font-weight: 700`, gray-400, uppercase
      - Input: `"Search destinations"` placeholder, no border
    - Vertical divider `1px bg:gray-100`
    - **Date field** (`25%` width):
      - `Calendar` icon (gray), hover becomes indigo
      - Label: `"DATE"`, Value: `"Add dates"` static text
    - Vertical divider
    - **Guests field** (`25%` width):
      - `Users` icon
      - Label: `"WHO"`, Value: `"Add guests"` static text
    - **Search Button** (circle `64px`):
      - `background: #818cf8`, hover `background: #2563eb`
      - White `Search` icon (Lucide), `24px`

### Feature Cards Row (overlapping hero, pulls up with negative margin `-80px`)
- 3 equal cards in a row
- Card style: `background: rgba(255,255,255,0.9)`, backdrop-blur, `border-radius: 24px`, `box-shadow: 0 20px 40px rgba(0,0,0,0.1)`, `border: 1px solid rgba(255,255,255,0.2)`, padding `32px`
- Content per card:
  1. Icon `💎` (40px emoji), title `"Best Price Guarantee"`, desc `"We match any competitor's price."`
  2. Icon `🛡️`, title `"24/7 Expert Support"`, desc `"Real humans, ready to help anytime."`
  3. Icon `✨`, title `"Curated Experiences"`, desc `"Hand-picked activities for every city."`
- Card hover: lift with shadow increase

### Trending Section
- Section header row:
  - Left: H2 `"Trending Now"` (gradient text: `from #0f172a to #818cf8`), subtitle `"Popular destinations this week"`
  - Right: `"See all →"` button, indigo, font-semibold
- **4-column card grid** (gap `32px`):
  - Each card: `border-radius: 24px`, white bg, subtle border, hover shadow lift
  - **Image area** (`256px` height): Full-bleed photo with zoom on hover
    - Rating badge (top-right): white/90 pill, yellow star + number
  - **Card body** (`padding: 24px`):
    - City name: `20px`, `font-weight: 700`, gray-900
    - Country: `14px`, gray-400
    - `"from"` label + price (right-aligned): price in `brand-primary`, `font-weight: 700`, `18px`
  - Cities: Jaipur, Bali, Dubai, Kerala

---

## 🏨 Page 2 — Hotels (`/hotels`)

### Page Background
- Full page gradient: `background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)` (slate-900 → slate-800 → indigo-900)
- **Ambient blobs** (fixed, no pointer events):
  - Top-left: `600px × 600px` circle, `background: rgba(168,85,247,0.1)`, `blur: 150px`, pulsing animation
  - Bottom-right: `500px × 500px` circle, `background: rgba(59,130,246,0.1)`, `blur: 120px`, pulsing (delayed 1s)

### Header (centered, `margin-bottom: 40px`)
- H1: `"Compare Hotel Prices"`, `40–48px`, gradient text `from white via #e9d5ff to #e0e7ff` (white → purple-200 → indigo-200)
- Subtitle: `"Scraping "` + `<b>Booking.com, Agoda, and Trivago</b>` + `" to get you the lowest rates instantly."`, slate-300, `18px`

### Search Panel
- Container: `border-radius: 24px`, glass panel style (`background: rgba(255,255,255,0.05)`, `backdrop-blur: 24px`, `border: 1px solid rgba(255,255,255,0.1)`, deep shadow), `padding: 24px`, `margin-bottom: 48px`
- **4-column grid** of inputs + button:

  **Input fields (3 fields):**
  - Label: `10px`, `font-weight: 700`, slate-400, uppercase, tracking-widest
  - Input container: `position: relative`, icon at `left: 16px, top: 14px` — `20px`, slate-500 → purple-400 on focus
  - Input: `background: rgba(30,41,59,0.5)`, `border: 1px solid #334155`, `color: white`, `border-radius: 12px`, `padding: 12px 16px 12px 48px`
  - Focus: `ring: 2px rgba(168,85,247,0.5)`, `border-color: #a855f7`

  1. **Destination** — `MapPin` icon, placeholder `"City, Region or Hotel"`
  2. **Check In** — `Calendar` icon, date picker
  3. **Check Out** — `Calendar` icon, date picker

  **Search Button (4th column, aligned to bottom):**
  - Full width, `border-radius: 12px`, `padding: 14px`
  - Gradient: `from #9333ea to #4f46e5` (purple-600 → indigo-600)
  - Hover: shift lighter gradient
  - Glow: `box-shadow: 0 0 20px rgba(147,51,234,0.4)`, hover `0 0 30px rgba(147,51,234,0.6)`
  - Content: `Search 🔍` icon + `"Search Hotels"` text, `18px`, `font-weight: 700`

### Results Grid (3 columns, gap `24px`)
Each hotel card:
- `border-radius: 16px`, `overflow: hidden`, `background: rgba(15,23,42,0.4)`, `border: 1px solid rgba(255,255,255,0.1)`
- Hover: `border-color: rgba(168,85,247,0.3)`, `background: rgba(30,41,59,0.6)`
- Flex column, full height

**Image area** (`224px` height):
- Full-bleed hotel photo, zoom on hover (700ms transition)
- Top-right badge: `background: rgba(0,0,0,0.6)`, backdrop-blur, pill shape — yellow ★ + rating number, `12px font-bold`
- Bottom-left badge: `background: #10b981` (emerald-500), `color: white`, `"Best Deal Found"`, `12px`, `font-weight: 700`, pill

**Card body** (`padding: 24px`, flex column flex-1):
- Hotel name: `20px`, `font-weight: 700`, white, single line clamp
- Location row: `MapPin` icon (purple-400, `16px`) + location text, slate-400, `14px`
- Amenity tags (flex-wrap): each tag `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 8px`, `padding: 4px 8px`, slate-300, `12px`. Max 3 shown + `"+N more"` pill.

**Card footer** (bordered top `rgba(255,255,255,0.1)`, `padding-top: 16px`):
- Left: source label (`"found on Booking.com"`, slate-400, `12px`) + price (`"₹X,XXX"`, `24px`, white, `font-weight: 700`)
- Right: `"View →"` button — `background: white`, `color: #0f172a`, `padding: 8px 24px`, `border-radius: 8px`, `font-weight: 700`, `14px`, hover `background: #f5f3ff`

---

## 💸 Page 3 — Budget Search (`/budget`)

### Page Background
- `background: #020617` (slate-950)
- **3 ambient blobs:**
  1. Top, 25% from left: `500px × 500px`, `background: rgba(99,102,241,0.3)`, `blur: 128px`, `mix-blend-mode: screen`, pulsing
  2. Bottom, 25% from right: `500px × 500px`, `background: rgba(217,70,239,0.2)`, `blur: 128px`, mix-blend-screen, pulsing (delayed 1s)
  3. Center: `800px × 800px`, `background: rgba(30,27,75,0.4)`, `blur: 120px`

### Header (centered, `margin-bottom: 40px`)
- H1: `"Smart Budget Trip Planner"`, `40–48px`, gradient text `from white via #c7d2fe to #bfdbfe` (white → indigo-200 → blue-200)
- Subtitle: AI-powered search across `<b>Booking.com, Skyscanner, and Google Flights</b>`, slate-300, `18px`

### Search Panel (the main card)
- `border-radius: 40px` (rounded-[2.5rem])
- `background: rgba(15,23,42,0.6)`, `backdrop-blur: 32px`
- `border: 1px solid rgba(255,255,255,0.1)`
- `box-shadow: 0 25px 50px rgba(99,102,241,0.1)`
- Padding: `40–48px` on desktop
- `overflow: hidden`
- Top edge decoration: `1px` full-width line with gradient `transparent → rgba(255,255,255,0.3) → transparent`
- Bottom edge decoration: `1px` full-width line with gradient `transparent → rgba(255,255,255,0.05) → transparent`

**Tab Switcher** (top of panel):
- Container: `background: rgba(2,6,23,0.5)`, `padding: 6px`, `border-radius: 16px`, `border: 1px solid rgba(255,255,255,0.05)`, backdrop-blur, width: fit-content
- Two tab buttons: `"Budget Search"` and `"Holiday Packages"`
- Active tab: `background: #6366f1`, `color: white`, `border-radius: 12px`, `box-shadow: 0 0 20px rgba(99,102,241,0.3)`, `ring: 1px rgba(255,255,255,0.2)`, padding `10px 24px`
- Inactive: slate-400, hover white + `rgba(255,255,255,0.05)` bg, same padding

**Form Grid** (4 columns, then 2-column second row):

*Row 1 — 4 columns:*
- Labels: `11px`, `font-weight: 700`, `color: rgba(165,180,252,0.8)` (indigo-300/80), uppercase, letter-spacing widest
- Inputs: `background: rgba(2,6,23,0.5)`, `border: 1px solid rgba(255,255,255,0.05)`, `border-radius: 16px`, `padding: 14px 16px 14px 48px`, focus `background: rgba(15,23,42,0.8)`, focus border `rgba(99,102,241,0.5)`, inner shadow, lift `-4px` on focus (translateY)
- Icons: slate-500 → indigo-400 on focus, `20px`, positioned at `left:16px, top:14px`
- Fields:
  1. **From** — `Plane ✈` icon, placeholder `"City"`
  2. **To** — `MapPin 📍` icon, placeholder `"Destination"`
  3. **Total Budget (₹)** — `Wallet 💰` icon, placeholder `"Ex: 20000"`, number type
  4. **Travelers** — `Users 👥` icon, number type, min 1

*Row 2 — 2 column spans:*
5. **Flight Date** (spans 2 cols) — `Calendar` icon, date picker
6. **Hotel Check-in / Check-out** (spans 2 cols) — 2 side-by-side date pickers inside the field group (no icons on individual pickers), border-radius 16px each

**CTA Button** (right-aligned, full-width on mobile):
- Gradient: `from #6366f1 via #a855f7 to #ec4899` (indigo → purple → pink)
- `border-radius: 16px`, `padding: 16px 40px`, `font-size: 18px`, `font-weight: 700`
- Glow: `box-shadow: 0 4px 20px rgba(168,85,247,0.4)`
- Hover: lighter gradient + stronger glow
- Inner shine overlay: white 20% fill that slides up on hover (translateY from 100% → 0)
- Content: `Search 🔍` icon + `"Find Best Combinations"` text

### Loading State (centered, animated)
- Large ring spinner (`96px × 96px`):
  - Outer ring: `border: 4px solid #1e293b`
  - Spinning ring: `border: 4px solid #6366f1`, `border-top: transparent`, spinning animation
  - Center icon: `Sparkles ✦` (indigo-400), pulsing
- Status text: `20px`, white, medium weight — cycles through messages:
  1. "Connecting to Flight Aggregators (Skyscanner, Google Flights)..."
  2. "Scanning Hotel Networks (Booking.com, Agoda, Trivago)..."
  3. "Analyzing 1,240+ combinations for best value..."
  4. "Finalizing budget-friendly packages..."
- Sub-text: `"Searching multiple data sources real-time..."`, slate-400, `14px`
- Progress bar (`max-width: 448px`, height `8px`): `background: #1e293b`, inner fill `background: linear-gradient(to right, #6366f1, #3b82f6)`, animated width 0→100%

### Results: Combinations (single column, gap `24px`)
Each combo card:
- `border-radius: 16px`, `overflow: hidden`, `border: 1px solid rgba(255,255,255,0.1)`
- Hover `border-color: rgba(99,102,241,0.3)`
- **Side-by-side layout** (horizontal):
  - **Left 1/3 — Hotel Image:**
    - Full hotel photo, zoom on hover (700ms)
    - Top-left badge: `rgba(0,0,0,0.6)` + blur, `Building2` icon + source name, pill, `12px`
    - Top-right badge (if savings > 0): `bg: #10b981`, `"Save ₹X,XXX"`, pill
  - **Right 2/3 — Content:**
    - Background: `background: linear-gradient(135deg, rgba(15,23,42,0.5), rgba(30,41,59,0.5))`
    - Padding: `24px`
    - **Top row:**
      - Left: Hotel name (`20px`, bold, white) + rating row (yellow ★ + number) + location (`MapPin` icon)
      - Right (text-align right): Total price (`32px`, bold, white, tight tracking) + `"Total for X travelers"` label (emerald-400, `12px`)
    - **Breakdown grid** (2 cols):
      - Flight card (`background: rgba(30,41,59,0.5)`, `border-radius: 12px`, `border: 1px solid rgba(255,255,255,0.05)`, `padding: 16px`):
        - Header: `Plane ✈` icon + airline name (indigo-300, bold, `12px`, uppercase) | source label (slate-400)
        - Route: departure time — dot line — arrival time (white, `14px`)
        - Footer: duration + stops (slate-400, `12px`)
      - Cost breakdown card (same size/style):
        - Header: `Wallet 💰` icon + `"COST BREAKDOWN"` (amber-300, bold, `12px`, uppercase)
        - Rows: `"Flights (xN)"` → `"₹X,XXX"` / `"Hotel Stay"` → `"₹X,XXX"`
    - **Action bar** (border-top rgba(255,255,255,0.05), `padding-top: 16px`):
      - Left: AI reason chip — `Sparkles ✦` icon (indigo-400) + `"AI Selection: [reason]"`, `background: rgba(99,102,241,0.1)`, `border: 1px solid rgba(99,102,241,0.2)`, pill, `12px`, indigo-300
      - Right: `"Book This Combo →"` button — `background: white`, `color: #0f172a`, `border-radius: 8px`, `padding: 8px 24px`, `font-weight: 700`

### Stats Header (above results)
- Row: H2 `"Top X Deals Found"` (bold, white, `24px`) with `Sparkles` icon (yellow-500, `24px`)
- Right pills:
  - `"X within budget"` — `background: rgba(16,185,129,0.1)`, `border: 1px solid rgba(16,185,129,0.3)`, emerald-300, `14px`
  - `"X options analyzed"` — `background: rgba(59,130,246,0.1)`, `border: 1px solid rgba(59,130,246,0.3)`, blue-300, `14px`

---

## ⚠️ Error State (shared across pages)
- Container: `background: rgba(239,68,68,0.1)`, `border: 1px solid rgba(239,68,68,0.5)`, `border-radius: 12px`, `padding: 16px`, `margin-bottom: 32px`
- Content: `AlertCircle` icon (red, `20px`, flex-shrink-0) + error message text (red-200)
- Fade-in animation on appear

---

## 🎬 Animations
| Name | Definition |
|---|---|
| `fadeIn` | `opacity: 0 → 1`, duration `0.8s`, ease-out |
| `slideUp` | `opacity: 0, translateY(20px) → opacity: 1, translateY(0)`, duration `0.6s`, ease-out |
| `float` | `translateY(0 → -10px → 0)`, duration `6s`, infinite, ease-in-out |
| `pulse-slow` | standard pulse, duration `4s`, cubic-bezier `(0.4, 0, 0.6, 1)`, infinite |
| Spinner | `rotate 360deg`, `1s linear`, infinite |
| Icon hover | `rotate(12deg)` on logo sparkle, `transition: transform 0.3s` |
| Card image zoom | `scale(1.1)` on `.group:hover img`, `transition: transform 700ms` |
| Input lift | `translateY(-4px)` on `.group:focus-within > div`, `transition: transform 300ms` |
| Button shine | `div.absolute` slides from `translateY(100%) → translateY(0)` on hover |

---

## 📱 Responsive Breakpoints
- **Mobile (< 768px):** Single column everywhere, pill nav hidden (hamburger implied), search bar stacks vertically
- **Tablet (768px–1024px):** 2-column forms, 2-column card grids
- **Desktop (>1024px):** 4-column form row, 3-column hotel grid, center nav visible

---

## 🖼️ Image Usage Notes
- Hotel images: Unsplash landscape photos (hotels/resorts)
- Trending city photos: Jaipur (palace), Bali (terraces), Dubai (skyline), Kerala (backwaters)
- Hero: Road/travel adventure photo, `opacity: 60%` over dark overlay
- All images use `object-fit: cover` with `overflow: hidden` containers
