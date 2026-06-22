# Manual Tasks

> Things only a human can do. Each has an ID (MT-NNN), status, and step-by-step instructions. When you complete one, mark it done and tell the agent.

---

## MT-001 · Create `.env.local` with real keys

**Status:** 🔴 Not started (blocks the whole app from working)
**Estimated time:** 15 minutes
**Cost:** Free (all free tiers)

### Why

The app needs real API keys to function. Without these, login fails, AI marking fails, and data won't save. This is the single most important setup task.

### Steps

1. In the project root (next to `.env.example`), create a file called exactly `.env.local`

2. Copy the entire contents of `.env.example` into it

3. Fill in your **Firebase** keys:
   - Go to https://console.firebase.google.com
   - Open your Firebase project (or create one called "soma")
   - Click the gear icon next to "Project Overview" then "Project settings"
   - Scroll to "Your apps" and find the web app config
   - Copy each value into the matching `NEXT_PUBLIC_FIREBASE_*` variable

4. Fill in your **Groq** key:
   - Go to https://console.groq.com/keys
   - Sign in (Google or GitHub, free, no credit card)
   - Click "Create API Key"
   - Copy it into `GROQ_API_KEY`

5. **Skip Resend for now** (leave the placeholder). Weekly email reports can wait.

6. Pick any two random strings for `ADMIN_SECRET` and `CRON_SECRET` (just mash your keyboard, make them long)

7. Save the file

### Security reminder

- `.env.local` is gitignored. It will never be committed. Good.
- If you ever accidentally paste a key in chat, tell the agent immediately so we can revoke it.
- You will also need to add these same keys to Vercel later (different location, same values). We'll do that when we deploy.

---

## MT-002 · Apply Firestore security rules (after Firebase project is set up)

**Status:** 🔴 Not started (blocks data reads/writes)
**Estimated time:** 5 minutes
**Cost:** Free

### Why

Firebase refuses to read or write data until you publish security rules. Without this, every data operation throws "Missing or insufficient permissions."

### Steps

1. Go to Firebase Console then Firestore Database
2. If you haven't created a database yet, click "Create database" and choose "Start in production mode"
3. Go to the "Rules" tab
4. We will provide the rules file. For now, paste this starter set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Students can read/write their own profile
    match /students/{studentId} {
      allow read, write: if request.auth != null && request.auth.uid == studentId;
    }
    // Public curriculum content (readable by anyone signed in)
    match /subjects/{document=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /topics/{document=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /lessons/{document=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

5. Click "Publish"

### Note

These are starter rules. We will tighten them as the app grows.

---

## MT-003 · Authorize your domain in Firebase Auth

**Status:** 🔴 Not started (blocks Google login on deployed site)
**Estimated time:** 2 minutes
**Cost:** Free

### Steps

1. Firebase Console then Authentication then Settings then "Authorized domains"
2. Make sure `localhost` is there (it is by default)
3. After we deploy, add your Vercel domain (e.g. `soma-xxxx.vercel.app`) to the list
