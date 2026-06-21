# Skoon (سكون) - Luxury Arabic Book Reservation Website Design Specification

**Date:** 2026-06-21  
**Project Name:** Skoon (سكون) — Luxury Arabic Book Reservation Portal  
**Document Status:** Approved Design Spec  

---

## 1. Project Goal
Create a single-file, highly elegant, cinematic Arabic book reservation website named **"سكون" (Skoon)**. It serves as a showcase and reservation portal for a curated collection of classical Arabic literature. The interface must utilize a dark glassmorphic design theme with fluid micro-animations, glowing liquid-gold accents, and bespoke CSS/SVG hardcovers.

---

## 2. Design System & Tokens

### 2.1 Colors
* `--bg-base`: `#06030e` (Primary page background, deep midnight violet-black)
* `--bg-surface`: `#0d071a` (Background for glassmorphism panels, cards, and modal inputs)
* `--color-gold`: `#d4af37` (Liquid gold accent for headings, active borders, and buttons)
* `--color-gold-glow`: `rgba(212, 175, 55, 0.45)` (Glow shadows for focus/hover states)
* `--text-light`: `#f3f4f6` (High-contrast primary body text)
* `--text-muted`: `rgba(212, 175, 55, 0.7)` (Secondary descriptive text and labels)
* `--color-success`: `#10b981` (Completed state highlights and checkmark visuals)
* `--color-success-bg`: `rgba(16, 185, 129, 0.1)`
* `--color-danger`: `#ef4444` (Error border colors and text warnings)
* `--color-danger-gradient`: `linear-gradient(135deg, #7c1a2e, #b91c1c)` (Returned state buttons)

### 2.2 Typography
* **Display & Title Typeface:** `Amiri`, serif (Imported via Google Fonts). Features traditional, high-contrast, calligraphic Naskh curves.
* **Body, Label, & Button Typeface:** `Cairo`, sans-serif (Imported via Google Fonts). A crisp, geometric sans-serif that remains clean and legible at small sizes.
* **Language & Layout Direction:** Arabic (`lang="ar"`), Right-to-Left (`dir="rtl"`).
* **Typography Scale:**
  * Main Logo Heading (`h1`): `3.5rem` (`56px`), Line-height: `1.2`, Weight: `700`
  * Card Titles (`h2`): `1.8rem` (`28px`), Line-height: `1.4`, Weight: `600`
  * Body text: `1rem` (`16px`), Line-height: `1.7`, Weight: `400`
  * UI Buttons/Labels: `0.95rem` (`15px`), Line-height: `1.5`, Weight: `500`

---

## 3. Structural Layout

### 3.1 Layout Anatomy
* **Wrapper:** Centered column container with `max-width: 1200px` and side paddings `2rem`.
* **Header:** Centered, containing the shimmer logo, subtitle, and an elegant thin border spacer.
* **Book Grid:** Fully responsive CSS grid layout:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  padding: 3rem 0;
  ```
  This ensures:
  * Desktops (>= 1024px): 3 to 4 cards across.
  * Tablets (768px - 1023px): 2 cards across.
  * Mobile (< 768px): 1 card across with no horizontal overflow.

---

## 4. Components

### 4.1 Header (Visual Signature)
* **Signature Shimmer Logo:** The text `سكون` is rendered inside an SVG or styled using CSS clipping masks with a background gradient. An keyframe animation shimmers a metallic liquid-gold gradient (`#d4af37` to `#fff8d2` to `#d4af37`) from right to left across the characters continuously.
* **Ambient Atmosphere:** A subtle, low-opacity CSS-generated floating particle system moves golden circles slowly upward in the background, set to ignore mouse pointers (`pointer-events: none`).

### 4.2 Book Cards
* **Dimensions:** Comfortably padded container (`24px`).
* **Interactive Hover Lift:** Smoothly lifts the card upward (`transform: translateY(-10px)`) and expands the shadow glow with a timing of `0.35s cubic-bezier(0.25, 1, 0.5, 1)`.
* **Book Cover Wrapper:** `overflow: hidden` with `border-radius: 16px` and aspect-ratio `2/3`. On card hover, the child hardcover graphic zooms smoothly (`transform: scale(1.06)`).
* **Bespoke CSS/SVG Hardcovers:**
  Each book features a unique vectors-only hardcover cover designed directly in SVG/CSS:
  1. *طوق الحمامة* (Emerald Theme): Deep emerald green base, gold islamic star geometry, book title in golden Amiri.
  2. *حي بن يقظان* (Midnight Theme): Midnight navy base, gold crescent moon/desert horizon geometry, title in Amiri.
  3. *المقدمة* (Terracotta Theme): Sandy terracotta base, vintage architectural line art, title in Amiri.
  4. *النبي* (Cosmic Theme): Rich royal purple base, radiating solar/cosmic gold lines, title in Amiri.
* **Reservation Button:** Uses a gold-bordered glass styling. Hovering triggers an active golden box-shadow glow.

### 4.3 Interactive Reservation Modal
* **Scrim Overlay:** Fills the screen with `position: fixed; inset: 0`. Uses a backdrop blur (`backdrop-filter: blur(20px)`) and `rgba(6, 3, 14, 0.85)` background.
* **Modal Box:** Centered with `max-width: 450px`, width `90%`, and padded with `32px`. Built with a thick glassmorphic background and border.
* **Transition:** Dynamic entry scaling from `scale(0.95)` to `scale(1)` combined with a fade-in using `cubic-bezier(0.34, 1.56, 0.64, 1)` over `0.4s`.
* **Form Inputs:** 
  * Full Name (الاسم الكامل): Required text field, styled inline label, input height `48px`.
  * Phone Number (رقم الهاتف): Required phone field, styled inline label, input height `48px`.
  * Book Title (اسم الكتاب): Read-only pre-filled field. Has a distinct background matching its read-only status.
* **Validation & Error Handling (JS):**
  * When "تأكيد الحجز" is clicked, JS checks that Name is at least 3 characters and Phone contains only numbers/special characters and is at least 8 digits.
  * If invalid, the incorrect field flashes a red border (`--color-danger`), triggers a CSS horizontal shake animation, and displays a localized helper warning.
* **Success State Animation:**
  * Once validated, the form disappears and morphs into a success viewport inside the modal.
  * Renders a fluid SVG checkmark drawing itself via `stroke-dashoffset` in success-green.
  * Modal smoothly fades out after 1200ms.

---

## 5. State Management & Transitions

### 5.1 Card Booking Cycle
1. **Unreserved (Default State):**
   * Button text: "احجز الآن" (gold theme).
   * Status label: Hidden.
2. **Reserved (Success State):**
   * Button text: "استرجاع الكتاب" (red gradient).
   * Status label: Shows "تم الحجز بنجاح ✨" with a smooth fade-in and scale-in animation below the title.
3. **Reset (Return State):**
   * Clicking "استرجاع الكتاب" immediately reverts the card state back to state 1.

---

## 6. Accessibility & Usability (WCAG 2.1 AA)
* **Contrast Ratios:** All text, including the muted descriptors (`--text-muted`), will maintain a minimum contrast ratio of `4.5:1` against the dark surfaces.
* **Keyboard Navigation:** 
  * All buttons and inputs feature a clear `:focus-visible` outline ring (`2px solid var(--color-gold)` with a `4px` offset).
  * Modal focus trap: When the modal is open, focusing stays trapped inside the modal form. Focus returns to the trigger button when closed.
* **Touch Targets:** Interactive targets (buttons, input fields) have a minimum height of `48px` with comfortable tap margins.
* **Modal Escape Routes:** Modal can be closed by clicking the backdrop overlay or pressing the `Esc` key.

---

## 7. Verification & Testing Plan
* **Functional Tests:**
  1. Trigger modal, verify pre-filled book name matches the clicked card.
  2. Input invalid fields, verify shake animation and error warnings.
  3. Input valid fields, verify success checkmark renders and modal closes.
  4. Verify button changes to red "استرجاع الكتاب" and the success badge appears.
  5. Verify clicking "استرجاع الكتاب" resets the card.
* **A11y Tests:**
  1. Tab through page, verify visible focus ring is active on all controls.
  2. Open modal, hit `Esc` to verify it closes correctly.
* **Responsiveness Tests:**
  1. Verify layout columns change from 4/3 to 2 to 1 as width scales down to 375px.
