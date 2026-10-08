# MJ TECH GLOBAL — WEBSITE TRANSFORMATION REPORT

**Project:** Official Website Overhaul & Startup Transformation  
**Domain:** [https://www.mjtechglobal.in](https://www.mjtechglobal.in)  
**Company:** MJ Tech Global  
**Founder & CEO:** Mohit Singh  
**Technical Head:** Mr. Rohit  
**Registration:** MSME Certified (Udyam URN: `udyam-up-13-0023373`), India  
**Date:** March 2026  

---

## 1. Executive Summary

The official website of **MJ Tech Global** has been comprehensively upgraded from a generic low-budget IT service template into an elegant, high-performance, product-driven SaaS and technology startup web application.

The new website directly reflects MJ Tech Global's actual business positioning: developing practical mobile applications, creator automation utilities, and modern productivity software. The three primary verified software applications—**Nexa Reply: Instagram Auto DM**, **Resume Pro – CV Builder**, and **Prompt Copy: AI Image & Video**—are now prominently showcased as the centerpiece of the company's brand experience.

All preexisting operational business functionality (including certificate verification, internship applications, Firebase authentication, and admin dashboards) has been 100% preserved and styled to match the new design system.

---

## 2. Summary of Redesigned & New Page Routes

| Route | Status | Description & Transformation |
| :--- | :--- | :--- |
| `/` | **Redesigned** | Flagship homepage featuring Apple/Stripe-inspired aesthetic, product preview stage with interactive mockups, company introduction, capability highlights, verified tech stack, dark AI innovation spotlight, and founder message. |
| `/products` | **New** | Dedicated software showcase directory featuring Nexa Reply, Resume Pro, and Prompt Copy with feature breakdowns, specs, and Google Play download buttons. |
| `/products/nexa-reply` | **New** | SaaS-grade flagship landing page for Nexa Reply featuring problem/solution analysis, keyword workflow diagram, Meta compliance disclosure, and future AI roadmap. |
| `/products/resume-pro` | **New** | Career productivity landing page for Resume Pro highlighting ATS-friendly typography, 1-minute vector PDF export, and device-local data privacy. |
| `/products/prompt-copy` | **New** | Creative AI landing page for Prompt Copy showcasing prompt categories across Midjourney/Sora/Runway, one-click copy workflow, and transparent technical scope. |
| `/about` | **Redesigned** | Corporate profile presenting verified company history, Founder & CEO Mohit Singh, Government MSME registration details, mission, vision, and core engineering principles. |
| `/services` | **Redesigned** | Modernized technology services page detailing real capabilities in Flutter mobile engineering, Next.js web development, business automation, and pragmatic AI integration. |
| `/technology` | **New** | Comprehensive technology stack breakdown explaining how Flutter, Next.js, Node.js, and Firebase directly power our live applications. |
| `/ai-innovation` | **New** | Premium dark-themed AI innovation page outlining our practical AI philosophy, responsible AI principles, and Claude API exploration roadmap without unverified partnership claims. |
| `/startup-overview` | **New** | Executive company dossier for technology partners, investors, and startup accelerator programs (e.g. Anthropic/Google/AWS programs) with public verification links. |
| `/portfolio` | **Cleaned & Updated** | Realigned to showcase the verified core software products, removing unrelated mini-games and unsubstantiated claims. |
| `/contact` | **Redesigned** | Re-engineered contact portal featuring centralized emails (founder, support, business), WhatsApp link, office hours, and a validated interactive message form. |
| `/blog` | **Redesigned** | Editorial engineering blog with real categories (Automation, Productivity, AI Innovation) and zero broken `#` links. |
| `/blog/[slug]` | **New** | Dynamic individual article route with complete long-form engineering content, typography, and OpenGraph metadata. |
| `/verify` | **Preserved & Restyled** | Firestore-connected certificate verification engine with live record lookup, badges, and modal viewing intact under the new design system. |
| `/internship` | **Preserved & Restyled** | Multi-domain student application portal submitting directly to the `/api/apply` backend and Firestore collection. |
| `/careers` | **Preserved & Restyled** | Clean remote job listings with direct email application links to the founder's office. |
| `/privacy-policy` | **Updated** | Comprehensive data safety, Google Play alignment, and user data deletion instructions. |
| `/terms` | **Updated** | Standardized terms of service emphasizing acceptable automation usage and IP protection. |
| `/refund-policy` | **Updated** | Clear consumer terms aligned with Google Play billing policies. |

---

## 3. Design System & Aesthetics

The design system incorporates the requested color palette and fluid typography:

- **Primary Blue:** `#2563EB` (Primary CTA, key accents, focus rings)
- **Secondary Purple:** `#7C3AED` (Creative AI accents, gradients)
- **Dark Navy:** `#0B1220` (Dark sections, AI innovation background, footer)
- **Deep Surface:** `#111827` (Card backgrounds in dark sections)
- **Light Background:** `#F8FAFC` (Clean, crisp default page canvas)
- **White:** `#FFFFFF` (Elevated card surfaces)
- **Primary Text:** `#0F172A` (High contrast, readable typography)
- **Secondary Text:** `#475569` (Supporting body copy)
- **Border:** `#E2E8F0` (Subtle 1px boundaries)
- **Success:** `#16A34A` (Verification badges, status indicators)

### Typography
- Google Fonts: **Inter** (clean body text and UI controls) and **Plus Jakarta Sans** (authoritative modern headings).
- Fluid responsive type scales with strict contrast meeting WCAG AA accessibility standards.

### Animations & Micro-Interactions
- Restrained Framer Motion entrances (`fadeInUp`, staggered reveals).
- Subtle 3D floating effect for hero product mockup cards.
- Full support for `prefers-reduced-motion` in CSS to guarantee accessibility on low-powered devices.

---

## 4. Product Verification & Selection Results

In accordance with marketing and startup readiness guidelines, the public presentation was strictly focused on the three core software products:

1. **Nexa Reply: Instagram Auto DM**
   - **Play Store Link:** `https://play.google.com/store/apps/details?id=com.antigravity.automationdm.automationdm`
   - **Role:** Flagship Business Automation.
   - **Claims Audit:** Stripped of unverified claims like "100% account safety guarantee" or "official Meta partnership." Accurately presented as a user-authorized automation client.
2. **Resume Pro – CV Builder**
   - **Play Store Link:** `https://play.google.com/store/apps/details?id=com.mjtech.resumebuilder`
   - **Role:** Professional Career Productivity.
   - **Claims Audit:** Clarified that current export engine uses standardized ATS-tested templates, with generative AI features clearly designated on the future roadmap.
3. **Prompt Copy: AI Image & Video**
   - **Play Store Link:** `https://play.google.com/store/apps/details?id=com.mjtech.prompt`
   - **Role:** Creative AI Productivity.
   - **Claims Audit:** Positioned accurately as a prompt engineering taxonomy and copy tool, without falsely implying on-device image rendering or existing Claude integrations.

### Portfolio Cleanup
- Removed unrelated mini-games and reward applications (CashOrbit, Balloon Pathshala, Path IQ, Radhe Radhe, etc.) from the primary product marketing experience.
- Removed the unsubstantiated "E-Commerce Enterprise App with 1M+ active users" entry and placeholder images.

---

## 5. Email Configuration & Multi-Cloud Infrastructure Status

All emails across the website are now managed centrally in `src/lib/siteConfig.js`:

1. **Founder Email:** `founder@mjtechglobal.in`  
   *Configured on:* Contact page, About page, Startup Overview, Footer, Careers application mailto.
2. **Official Business Email:** `contact@mjtechglobal.in`  
   *Configured on:* Contact page, Business correspondence, Footer, Startup Dossier, and general inquiries.
3. **Application & Play Store Support:** `mjtechbharat@gmail.com`  
   *Configured on:* Contact page, Product support footers, Privacy policy, Terms, and Footer.

### Cloud & Edge Infrastructure:
- **Firebase & Cloud Firestore:** Document storage, user authentication, and Firebase Admin SDK handlers.
- **Amazon Web Services (AWS):** Cloud compute infrastructure, S3 storage buckets for asset pipelines.
- **Cloudflare:** Global edge CDN caching, DNS management, SSL/TLS termination, and DDoS mitigation.

---

## 6. Technical SEO & Performance Enhancements

- **Canonical Domain:** Configured as `https://www.mjtechglobal.in` across all pages.
- **metadataBase:** Configured in `src/app/layout.js`, eliminating OpenGraph URL resolution warnings.
- **JSON-LD Structured Data:** Added Schema.org `Organization` metadata with founder and official channels.
- **XML Sitemap:** Dynamic sitemap at `/sitemap.xml` covering all static routes and individual blog articles.
- **Robots.txt:** Configured with clean rules, disallowing private administrative paths (`/api/`, `/admin`, `/admingo`).
- **Semantic HTML:** Strict single `<h1>` hierarchy, `<main>`, `<article>`, `<nav>`, `<header>`, and `<footer>` tags.
- **Fixed SVG namespace typo:** Corrected broken `www.ニュ.w3.org` namespace on the floating WhatsApp icon to standard `http://www.w3.org/2000/svg`.

---

## 7. Security & Business Logic Preservation

- Firebase Client and Firebase Admin SDK configurations remain intact in `src/lib/firebase.js` and `src/lib/firebaseAdmin.js`.
- The `/verify` Firestore query logic for certificate numbers remains 100% authentic and untouched.
- The `/api/apply` backend route continues to write student applications to Firestore securely.
- Authentication state listeners, Google Auth popup, login/signup flows, and user dashboard certificate generation remain fully functional.
