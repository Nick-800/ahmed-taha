Act as an expert frontend developer and UI/UX designer. Create a premium, luxury Arabic book reservation website using a single HTML file with internal CSS and minimal vanilla JavaScript. The design must be modern, highly elegant, and cinematic.

Strictly follow the specifications below:

### 1. General Info, Language & Layout
- **Website Name:** "سكون" (Skoon)
- **Subtitle:** "مكتبة لحجز الكتب"
- **Language:** Full Arabic interface (`lang="ar"`)
- **Direction:** RTL layout (`dir="rtl"`)
- **Typography:** Import and use an elegant, luxury-tier Arabic web font from Google Fonts (e.g., 'Cairo' or 'Tajawal') with proper weight scaling.

### 2. Visual Identity & Design Style (Luxury Cinematic UI)
- **Background:** A deep, premium soft gradient background using dark blue, royal purple, and midnight tones (e.g., `#0a0f1d` to `#1a0b2e`).
- **Floating Particles:** Add subtle, soft glowing floating particles in the background using CSS animations to enhance the luxury ambient atmosphere.
- **Glassmorphism:** Apply a high-end glassmorphism effect to cards and elements (`background: rgba(255,255,255,0.03)`, a sharp subtle border `rgba(255,255,255,0.08)`, and a strong backdrop blur `backdrop-filter: blur(15px)`).
- **Shadows & Highlights:** Use layered, smooth, cinematic box-shadows and soft glowing neon highlights around active interactive elements.
- **Spacing:** Clean, spacious layout with premium mathematical symmetry and generous padding.

### 3. Page Layout
- **Header:** A stunning centered header displaying the brand name "سكون" with a subtle gold text-glow or premium gradient finish, followed by the elegant subtitle.
- **Main Container:** A structured, centered responsive CSS Grid layout (avoid basic flex-rows for the main structure) that beautifully displays 3 to 4 book cards across the screen depending on viewport width.

### 4. Premium Book Cards
- **Structure:** Rounded corners (soft, luxury-tier border-radius like `24px`), glassmorphism background, and deep inner spacing.
- **Media Container:** A dedicated space for a high-quality book cover image. Implement a smooth inner zoom effect (`transform: scale(1.08)`) when hovering over the card while keeping the card container clipped (`overflow: hidden`).
- **Content:** Title in bold elegant Arabic, followed by a sophisticated short description text with lowered opacity for premium hierarchy.
- **Action Button:** A beautifully styled default button labeled "احجز الآن" featuring a subtle continuous glow effect.

### 5. Interactive Modal (The Reservation Form)
- **Trigger:** Clicking "احجز الآن" must open a premium popup modal.
- **Visuals:** The modal must overlay the entire screen, utilizing an ultra-premium backdrop blur (`backdrop-filter: blur(20px)`) to completely isolate the user experience. The modal box itself should animate dynamically into view using a smooth fade-in and scale-up transition (`0.4s cubic-bezier`).
- **Form Fields:** Inside the modal, include an elegant, minimal form containing:
  - الاسم الكامل (Text input)
  - رقم الهاتف (Tel input)
  - اسم الكتاب (Text input, styled elegantly, and automatically pre-filled based on the clicked book card)
  - زر "تأكيد الحجز" (A primary call-to-action confirmation button)

### 6. Dynamic State System (JavaScript Logic)
Keep the JavaScript clean, beginner-friendly, organized, and minimal. It should only handle modal toggling, auto-filling the book title, and managing the card state transitions:
- **Booking Confirmation:** When the user clicks "تأكيد الحجز" inside the modal:
  1. Close the modal seamlessly.
  2. Transition that specific book's card button from "احجز الآن" to "استرجاع الكتاب".
  3. Morph the button color from its default theme into a premium, luxury red gradient.
  4. Display a beautiful status badge text right below or inside the card: "تم الحجز بنجاح ✨" with a smooth fade-in entry animation.
- **Return System:** Clicking the updated red "استرجاع الكتاب" button must completely reset that specific card back to its original state (revert button text, restore original color scheme, and remove the success status text completely).

### 7. Animations & Micro-interactions
- **Card Hover:** Smooth upward lift effect (`transform: translateY(-10px)`) paired with a widening soft shadow/glow effect.
- **Button Hover:** Interactive glow intensification and elegant scale micro-adjustments.
- **Transitions:** All state changes, hover interactions, and animations must be flawlessly smooth, using fine-tuned transition timings between `0.3s` and `0.5s`.

### Code Output Constraint:
Deliver the entire project as a single, clean, fully functional, and beginner-friendly HTML file with internal CSS (`<style>`) and internal vanilla JavaScript (`<script>`). Do not use any external frameworks, libraries, or external icon sets; keep it lightweight, readable, and ready to paste and preview instantly.