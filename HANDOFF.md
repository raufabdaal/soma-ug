# Handoff

> Snapshot for the next session. Overwrite this each time.

## Where we are

Both student and parent experiences have full navigation (bottom nav on mobile, top bar on desktop), settings pages, and a beautiful weekly report card for parents. The lesson player works with 2 Mathematics lessons. The app is live at https://soma-ug.vercel.app.

## What changed this session

- Added parent bottom nav (Dashboard, Reports, Settings).
- Added parent reports page (weekly report card with download/share).
- Added parent settings page (profile, linked students, signout).
- Added student profile/settings page (study code with copy, signout).
- Cleaned student dashboard (moved study code to settings, added quick stats).
- Updated student nav (Profile tab instead of signout button).

## What the founder needs to do

1. Download workspace, replace `src/` + root `.md` files on their machine.
2. Push to GitHub so Vercel deploys.
3. Test on mobile (nav at bottom, reports page, settings).

## Immediate next steps

1. Add more Mathematics lessons (factorisation, linear equations, inequalities).
2. Build diagnostic test (sets baseline grade).
3. Wire lesson completion to Firestore (persist progress so parent sees real data).
4. Add Biology and Chemistry content.
5. Connect parent reports + dashboard to real student data.
