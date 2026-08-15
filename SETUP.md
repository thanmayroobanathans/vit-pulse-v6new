# VIT Pulse / Heldenmunt Boys setup

## 1. Firebase config
Open `firebase-config.js` and replace every placeholder with the config from Firebase Console > Project settings > Your apps > Web app.

## 2. Firebase Authentication
Firebase Console > Authentication > Sign-in method > Google > Enable.

Add these authorized domains:
- `thanmayroobanathans.github.io`
- `YOUR_PROJECT_ID.firebaseapp.com`

For GitHub Pages, the app uses Google redirect sign-in instead of a popup.

## 3. Firestore
Create a Firestore database and deploy `firestore.rules`.

## 4. GitHub Pages
Upload all files in this folder. Do not rename `firebase-config.js`.

The browser entry point is `index.html`.
