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

## MT-002 · Apply Firestore security rules (UPDATED - fixes parent signup and student linking)

**Status:** 🔴 Action required (replace the old rules with these)
**Estimated time:** 5 minutes
**Cost:** Free

### Why

The previous rules were missing the `parents/` collection entirely (which broke parent signup) and blocked parents from looking up students by study code (which broke linking). These updated rules fix both issues.

### Steps

1. Go to Firebase Console then Firestore Database then Rules tab
2. **Delete everything** there
3. Paste these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Students
    // NOTE: authenticated users can read students (needed for study code linking).
    // TODO Phase 2: tighten with Cloud Functions.
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == studentId;
      allow delete: if request.auth != null && request.auth.uid == studentId;
      allow update: if request.auth != null;
    }

    // Parents can read and write their own profile
    match /parents/{parentId} {
      allow read, write: if request.auth != null && request.auth.uid == parentId;
    }

    // Curriculum content (readable by anyone signed in)
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

4. Click **Publish**

---

## MT-004 · Enable sign-in methods in Firebase Auth

**Status:** 🔴 Not started (blocks ALL signups and logins)
**Estimated time:** 3 minutes
**Cost:** Free

### Why

New Firebase projects ship with ZERO sign-in methods enabled. Until you turn them on, every signup and login fails. This is the most common reason for "Something went wrong" errors.

### Steps

1. Go to https://console.firebase.google.com
2. Open your project (soma or soma-ug)
3. In the left sidebar, click **Authentication**
4. Click the **Sign-in method** tab at the top
5. Click **Email/Password**
6. Toggle the **Enable** switch to ON
7. Click **Save**
8. Go back and click **Google**
9. Toggle the **Enable** switch to ON
10. You will be asked for a "project support email". Select your email from the dropdown.
11. Click **Save**

After this, both email/password signups AND Google sign-in will work.

---

## MT-003 · Authorize your domain in Firebase Auth

**Status:** 🔴 Not started (blocks Google login on deployed site)
**Estimated time:** 2 minutes
**Cost:** Free

### Steps

1. Firebase Console then Authentication then Settings then "Authorized domains"
2. Make sure `localhost` is there (it is by default)
3. After we deploy, add your Vercel domain (e.g. `soma-xxxx.vercel.app`) to the list
