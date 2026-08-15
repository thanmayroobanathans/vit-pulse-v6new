import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

window.VP_USER = null;

window.VP_FIREBASE = {
  auth,
  db,
  provider,
  doc,
  setDoc,
  serverTimestamp
};

const loginButton = document.getElementById("googleLogin");
const authStatus = document.getElementById("authStatus");

function showUser(user) {
  window.VP_USER = user;

  if (user) {
    authStatus.textContent =
      `SIGNED IN AS ${user.displayName || user.email}`;

    loginButton.textContent = "GOOGLE ACCOUNT CONNECTED";
    loginButton.disabled = true;
  } else {
    authStatus.textContent = "Guest mode available.";
  }
}

onAuthStateChanged(auth, showUser);

loginButton.addEventListener("click", async () => {
  loginButton.disabled = true;
  authStatus.textContent = "CONNECTING TO GOOGLE...";

  try {
    const result = await signInWithPopup(auth, provider);

    showUser(result.user);

  } catch (error) {

    console.error("Google sign-in error:", error);

    // If the browser blocks the popup, use redirect.
    if (
      error.code === "auth/popup-blocked" ||
      error.code === "auth/popup-canceled"
    ) {
      await signInWithRedirect(auth, provider);
      return;
    }

    loginButton.disabled = false;

    authStatus.textContent =
      `LOGIN FAILED: ${error.code || error.message}`;
  }
});

getRedirectResult(auth)
  .then(result => {
    if (result && result.user) {
      showUser(result.user);
    }
  })
  .catch(error => {
    console.error("Redirect login error:", error);
    authStatus.textContent =
      `LOGIN FAILED: ${error.code || error.message}`;
    loginButton.disabled = false;
  });
