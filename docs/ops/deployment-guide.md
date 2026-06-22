# Deployment Guide

> How to get Soma from this workspace to a live URL on Vercel.

## One-time setup (do this once)

### Step 1: Get the files onto your computer

Download the workspace from Arena. You'll get a folder with all the source files (~316K, very small).

### Step 2: Create a local folder

1. Create a new folder on your computer, for example: `Documents/soma`
2. Extract (unzip) the downloaded workspace files into that folder
3. Make sure the folder structure looks right: you should see `package.json`, `src/`, `START_HERE.md`, etc. at the top level

### Step 3: Push to GitHub using GitHub Desktop

1. Open GitHub Desktop
2. Go to **File > Add Local Repository...**
3. Click **Choose...** and select your `soma` folder
4. GitHub Desktop will say "This directory does not appear to be a Git repository"
5. Click the **"create a repository here"** link
6. Set:
   - Name: `soma`
   - Description: `Interactive learning platform for Uganda's lower secondary curriculum`
   - Keep "Initialize this repository with a .gitignore" UNCHECKED (we already have one)
7. Click **Create Repository**
8. GitHub Desktop will now show all files as "Changes"
9. In the summary box, type: `Initial commit`
10. Click **Commit to main**
11. Click **Publish repository** (this pushes it to GitHub)
    - You can keep it private or public. Either works for Vercel.

### Step 4: Connect Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New > Project**
3. Find your `soma` repo in the list and click **Import**
4. Vercel will auto-detect it as a Next.js project (Framework Preset should say "Next.js")
5. **Do NOT click Deploy yet.** First we need to add environment variables (Step 5).

### Step 5: Add environment variables to Vercel

Before deploying, add the same keys from your `.env.local` to Vercel:

1. On the Vercel import page, expand the **Environment Variables** section
2. Add each variable from your `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY` = (your value)
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = (your value)
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = (your value)
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = (your value)
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = (your value)
   - `NEXT_PUBLIC_FIREBASE_APP_ID` = (your value)
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` = (your value)
   - `GROQ_API_KEY` = (your value)
3. Click **Deploy**
4. Wait 60 to 90 seconds for the build to complete
5. Vercel will give you a live URL like `soma-xxxxx.vercel.app`

### Step 6: Authorize your domain in Firebase

1. Go to Firebase Console > Authentication > Settings > Authorized domains
2. Click **Add domain**
3. Paste your Vercel URL (e.g., `soma-xxxxx.vercel.app`)
4. Click **Add**

### Step 7: Verify it works

1. Open your live Vercel URL in a browser
2. The landing page should load
3. Click "Start free trial" - the signup page should load
4. Create a test account (student)
5. You should land on the student dashboard

If any of these fail, check:
- Did you add all env vars to Vercel? (Step 5)
- Did you apply Firestore rules? (MANUAL_TASKS.md MT-002)
- Did you authorize the domain? (Step 6)

## Daily workflow (after setup)

Once everything is connected:

1. The agent makes changes and you download/pull them into your local folder
2. In GitHub Desktop, you see the changes, write a commit message, and commit
3. Click **Push origin** to push to GitHub
4. Vercel auto-deploys (60 to 90 seconds)
5. Your live site updates automatically

**Never re-download and overwrite the whole folder.** Only replace changed files. Your `.env.local` and `node_modules` stay safe because they are gitignored.

## Running locally

To test on your own machine before pushing:

```bash
npm install
npm run dev
```

Or just double-click `launch.bat` (Windows) or run `bash launch.sh` (Mac/Linux).
