---
name: Bharat AI Traveler
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#424752'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#727784'
  outline-variant: '#c2c6d4'
  surface-tint: '#015cb9'
  primary: '#00458d'
  on-primary: '#ffffff'
  primary-container: '#005cb9'
  on-primary-container: '#c6d8ff'
  inverse-primary: '#aac7ff'
  secondary: '#52606d'
  on-secondary: '#ffffff'
  secondary-container: '#d6e4f4'
  on-secondary-container: '#586673'
  tertiary: '#5d4100'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b5700'
  on-tertiary-container: '#ffd17e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458e'
  secondary-fixed: '#d6e4f4'
  secondary-fixed-dim: '#bac8d7'
  on-secondary-fixed: '#0f1d28'
  on-secondary-fixed-variant: '#3b4855'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#ffba20'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 16px
---

## Brand & Style

The design system is built for a premium AI-driven travel planning experience tailored specifically for the Indian landscape. The brand personality is **dependable, intelligent, and effortless**. It aims to reduce the cognitive load of travel planning by providing a structured, serene interface that balances modern technology with local reliability.

The visual style follows a **Modern Corporate** aesthetic heavily influenced by Material 3 principles. It prioritizes clarity and utility through a rigorous use of whitespace, high-quality typography, and subtle depth. The interface evokes a sense of "digital concierge"—sophisticated and ready to assist, without being overwhelming.

## Colors

The color palette is anchored by **Primary Blue (#005CB9)**, symbolizing trust and the vast horizons of travel. This is complemented by **Surface White (#FFFFFF)** to ensure a clean, breathable canvas.

- **Primary**: Used for key actions, active states, and brand-critical elements.
- **Secondary**: A soft blue tint used for subtle backgrounds, tonal selection states, and secondary buttons.
- **Tertiary**: A warm amber accent used sparingly for "discovery" features, ratings, or highlighting special Indian heritage sites.
- **Neutral**: A range of cool greys (from #F8F9FA to #212121) used for typography, borders, and structural surfaces to maintain a professional hierarchy.

## Typography

The design system utilizes **Inter** across all levels to ensure maximum legibility and a systematic, clean look. 

The hierarchy is structured to guide users through complex itineraries. **Headline-xl** is reserved for landing page heros, while **Headline-lg** and **md** organize trip details. **Body-lg** is used for AI-generated descriptions to ensure a comfortable reading experience. Labels use a tighter weight and specific letter-spacing to differentiate metadata (like flight times or prices) from narrative text.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid grid**. On desktop, content is contained within a 1280px central track to prevent line lengths from becoming unreadable. 

The system uses an 8px base grid. Content is organized into a 12-column system with 24px gutters. 
- **Desktop**: 12 columns, 64px margins.
- **Tablet**: 8 columns, 32px margins.
- **Mobile**: 4 columns, 16px margins.

Vertical rhythm is maintained by using multiples of 8px for component padding and section margins. Card internal padding should be a generous 24px to match the corner radius.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Ambient Shadows**, strictly avoiding harsh black shadows. 

The elevation system uses three levels:
1. **Level 0 (Flat)**: The base application surface in Surface White.
2. **Level 1 (Low)**: Soft containers for secondary information, using a 1px border (#E0E0E0) and no shadow.
3. **Level 2 (Floating)**: Primary cards and the 'Generate Trip' panel. These feature a soft, diffused shadow: `0px 4px 20px rgba(0, 92, 185, 0.08)`. The slight blue tint in the shadow maintains brand cohesion.

## Shapes

The shape language is defined by large, welcoming radii. 
- **Cards & Major Containers**: Use a custom `24px` radius to create a soft, friendly container for travel imagery and data.
- **Standard UI Elements**: (Buttons, Input fields) use the `8px` (`rounded-md`) standard.
- **Interactive Chips**: Use a fully pill-shaped radius for category selection (e.g., "Heritage", "Adventure", "Beach").

## Components

### Buttons
The primary action button, **'Generate Trip'**, is high-contrast: Primary Blue background, White text, 56px height, and bold typography. Secondary buttons use the soft blue accent background with primary blue text.

### Cards
Trip cards are the core component. They feature a 24px corner radius, Level 2 elevation, and a 16:9 image ratio at the top. Content inside cards should have 24px padding.

### Input Fields
Inputs are outlined with a 1px neutral-grey border, transitioning to a 2px Primary Blue border on focus. Labels should be floating or positioned consistently above the field.

### Chips & Filters
Use pill-shaped chips for selecting travel preferences. Active states should use the Secondary Blue background with a Primary Blue border.

### Lists
Itinerary lists should use "Steppers" styling—thin vertical lines connecting circles that represent different stops or times of day, creating a clear visual path of travel.

### Progress Indicators
Since AI generation takes time, use a linear progress bar in Primary Blue with a subtle pulse animation across the top of the container.