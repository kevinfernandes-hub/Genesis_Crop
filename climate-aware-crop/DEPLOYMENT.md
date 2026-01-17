# Firebase Deployment Guide

## Prerequisites

✅ Firebase CLI installed (v15.3.1)
✅ Firebase project: `cropedge-a7d83`
✅ firebase.json configured
✅ .firebaserc configured

---

## Deployment Steps

### Step 1: Build the Next.js App

Before deploying, you MUST build the production bundle:

```bash
npm run build
```

This creates the `.next` folder with your optimized code.

### Step 2: Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

Or for full deployment (includes functions, database, etc.):

```bash
firebase deploy
```

### Step 3: Verify Deployment

After deployment completes, you'll get a URL like:
```
https://cropedge-a7d83.web.app
```

---

## Full Deployment Command

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting

# Or all services
firebase deploy
```

---

## Troubleshooting

### Error: "Not authenticated"
```bash
firebase login
# Follow the browser login process
```

### Error: "No hosting configured"
- ✅ Already fixed - firebase.json is configured

### Error: "Build folder not found"
```bash
# Make sure you ran:
npm run build
```

---

## Current Status

✅ firebase.json created
✅ .firebaserc created  
✅ Project recognized (cropedge-a7d83)
✅ Ready for deployment

**Next Step:** Run `npm run build` then `firebase deploy --only hosting`

---

## Environment Variables on Firebase

Your `.env.local` variables are used locally. For production on Firebase Hosting:

1. Go to Firebase Console → Settings → Environment variables
2. Add any server-side variables (if using Cloud Functions)
3. Client-side vars (NEXT_PUBLIC_*) are baked into the build

---

## Live Site URLs

- **Hosting:** https://cropedge-a7d83.web.app
- **Console:** https://console.firebase.google.com/project/cropedge-a7d83
- **Local:** http://localhost:8000
