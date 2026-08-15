# VIT PULSE V5 — GitHub Pages + Firebase

1. Create a Firebase project.
2. Enable Authentication → Google.
3. Create a Firestore database.
4. Copy `firebase-config.example.js` to `firebase-config.js` and fill in your Web App config.
5. Add your GitHub Pages domain to Firebase Authentication authorized domains.
6. Deploy `firestore.rules`.
7. Push the files to GitHub and enable GitHub Pages.

The frontend stays static on GitHub Pages. Firebase provides Google authentication and Firestore.
Research data is submitted only after explicit consent and only for a signed-in user.
