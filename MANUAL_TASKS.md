# Manual Tasks

> Things only a human can do. Each has an ID (MT-NNN), status, and step-by-step instructions. When you complete one, mark it done and tell the agent.

---

## MT-002 · Apply Firestore security rules (COMPLETE VERSION)

**Status:** 🔴 Action required (replace ALL rules with this complete version)
**Estimated time:** 5 minutes
**Cost:** Free

### Why

Firebase needs rules to allow reads and writes. This complete version covers every collection the app uses, including the `lessonProgress` and `practiceStats` subcollections that the lesson player and practice engine write to.

### Steps

1. Go to Firebase Console, then Firestore Database, then the **Rules** tab
2. **Delete everything** in the editor (select all, delete)
3. **Paste the complete rules below** (all of it, from the first line to the last)
4. Click **Publish**

### THE COMPLETE RULES (copy everything below this line)

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Students
    // Readable by any authenticated user (needed for parent linking via study code).
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == studentId;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == studentId;

      // Subcollection: lesson progress
      match /lessonProgress/{lessonId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == studentId;
      }

      // Subcollection: practice stats
      match /practiceStats/{statId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == studentId;
      }
    }

    // Parents can read and write their own profile
    match /parents/{parentId} {
      allow read, write: if request.auth != null && request.auth.uid == parentId;
    }

    // Curriculum content (readable by anyone signed in, not writable)
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

### Important

- Copy from `rules_version = '2';` all the way to the final closing `}`
- Do NOT mix this with old rules. Delete the old ones first.
- The `lessonProgress` and `practiceStats` subcollections are **nested inside** the `students/{studentId}` match block. This is what was causing the "Unexpected match" error before, because they were being pasted as separate blocks.

---

## MT-004 · Enable sign-in methods in Firebase Auth

**Status:** Check if done
**Estimated time:** 3 minutes
**Cost:** Free

### Steps

1. Firebase Console, then Authentication, then Sign-in method tab
2. Enable **Email/Password**
3. Enable **Google** (set a support email)

---

## MT-003 · Authorize your domain in Firebase Auth

**Status:** Check if done
**Estimated time:** 2 minutes
**Cost:** Free

### Steps

1. Firebase Console, then Authentication, then Settings, then Authorized domains
2. Add `soma-ug.vercel.app` (and `localhost` should already be there)
