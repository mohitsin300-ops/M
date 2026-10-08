# MJ TECH GLOBAL — PRODUCTION DEPLOYMENT CHECKLIST

**Target Environment:** Production (Vercel / Node.js Host)  
**Canonical Domain:** `https://www.mjtechglobal.in`  
**Framework:** Next.js 15 (App Router)  

---

## 1. Pre-Deployment Configuration Checklist

### Environment Variables (`.env.local` or Cloud Provider Settings)
Ensure the following keys are present in your production hosting dashboard:

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase web client API key.
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase auth domain.
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID (`FIREBASE_PROJECT_ID`).
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket.
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Messaging sender ID.
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase web application ID.
- [ ] `FIREBASE_CLIENT_EMAIL`: Service account email for Firebase Admin SDK (`/api/apply`).
- [ ] `FIREBASE_PRIVATE_KEY`: Service account private key for Firebase Admin SDK.

---

## 2. Build Verification Steps

Execute the following commands locally before pushing to production:

```bash
# 1. Install dependencies cleanly
npm install

# 2. Run the production build
npm run build

# 3. Test the built bundle locally
npm run start
```

### Build Health Check Criteria:
- [x] Zero JavaScript syntax or compilation errors.
- [x] All 20+ routes statically generated without unhandled runtime exceptions.
- [x] `sitemap.xml` and `robots.txt` dynamically accessible at root.
- [x] Responsive layout verified at mobile (375px), tablet (768px), and desktop (1200px+).

---

## 3. Post-Deployment Verification Checklist

Once the production deployment is live:

1. **Canonical HTTPS & Redirects:**
   - [ ] Verify `http://mjtechglobal.in` redirects to `https://www.mjtechglobal.in`.
   - [ ] Verify `https://mjtechglobal.in` redirects to `https://www.mjtechglobal.in`.

2. **Core Routes Accessibility:**
   - [ ] Visit `/` (Homepage) — ensure hero mockups and cards render smoothly.
   - [ ] Visit `/products` — test links to `/products/nexa-reply`, `/products/resume-pro`, `/products/prompt-copy`.
   - [ ] Click "Google Play" buttons — verify they open the official Google Play store links.
   - [ ] Visit `/about`, `/services`, `/technology`, `/ai-innovation`, `/startup-overview`.
   - [ ] Visit `/blog` and click on an article — verify `/blog/[slug]` loads properly.

3. **Functionality Testing:**
   - [ ] Test Certificate Verification at `/verify` with a known test certificate ID.
   - [ ] Test Internship Application submission at `/internship` and check Firestore record creation.
   - [ ] Test User Authentication at `/auth` (email signup/login, Google Sign-in).
   - [ ] Test Contact Form at `/contact`.

4. **SEO & Crawling Verification:**
   - [ ] Check `https://www.mjtechglobal.in/robots.txt` in a browser.
   - [ ] Check `https://www.mjtechglobal.in/sitemap.xml` in Google Search Console.
   - [ ] Inspect OpenGraph preview tags using the Facebook Sharing Debugger or Twitter Card Validator.
