import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


// Make Firebase available to script.js

window.VP_FIREBASE = {
  app,
  auth,
  db,
  doc,
  setDoc,
  serverTimestamp
};


// =====================================================
// ELEMENTS
// =====================================================

const loginScreen =
  document.getElementById("login-screen");

const application =
  document.getElementById("application");

const googleButton =
  document.getElementById("googleLogin");

const authStatus =
  document.getElementById("authStatus");


// =====================================================
// SHOW LOGIN
// =====================================================

function showLogin() {

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  if (application) {
    application.style.display = "none";
  }
}


// =====================================================
// SHOW APPLICATION
// =====================================================

function showApplication(user) {

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  if (application) {
    application.style.display = "block";
  }

  const nameInput =
    document.getElementById("userName");

  if (
    nameInput &&
    !nameInput.value &&
    user.displayName
  ) {
    nameInput.value = user.displayName;
  }

  if (authStatus) {

    authStatus.textContent =
      `AUTHENTICATED // ${user.email || ""}`;

  }

  // Tell script.js authentication is ready.

  window.dispatchEvent(
    new CustomEvent(
      "vitpulse:authenticated",
      {
        detail: {
          user: user
        }
      }
    )
  );
}


// =====================================================
// SAVE GOOGLE PROFILE
// =====================================================

async function saveGoogleProfile(user) {

  if (!user) return;

  try {

    await setDoc(
      doc(db, "participants", user.uid),
      {
        uid: user.uid,

        name:
          user.displayName || "",

        email:
          user.email || "",

        photoURL:
          user.photoURL || "",

        provider:
          "google",

        lastLogin:
          serverTimestamp()
      },
      {
        merge: true
      }
    );

    console.log(
      "Firestore profile saved."
    );

  } catch (error) {

    console.error(
      "Firestore profile error:",
      error
    );

  }
}


// =====================================================
// GOOGLE LOGIN
// =====================================================

async function loginWithGoogle() {

  try {

    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    const user =
      result.user;

    console.log(
      "Google login successful:",
      user.displayName,
      user.email
    );

    await saveGoogleProfile(user);

    return user;

  } catch (error) {

    console.error(
      "Google login error:",
      error
    );

    let message =
      "GOOGLE SIGN-IN FAILED.";

    switch (error.code) {

      case "auth/popup-blocked":

        message =
          "POP-UP BLOCKED. ALLOW POP-UPS AND TRY AGAIN.";

        break;

      case "auth/popup-closed-by-user":

        message =
          "SIGN-IN CANCELLED.";

        break;

      case "auth/unauthorized-domain":

        message =
          "THIS WEBSITE DOMAIN IS NOT AUTHORIZED IN FIREBASE.";

        break;

      case "auth/invalid-api-key":

        message =
          "INVALID FIREBASE API KEY.";

        break;

      case "auth/network-request-failed":

        message =
          "NETWORK ERROR. CHECK YOUR CONNECTION.";

        break;

      case "auth/operation-not-allowed":

        message =
          "GOOGLE SIGN-IN IS NOT ENABLED IN FIREBASE.";

        break;
    }

    if (authStatus) {
      authStatus.textContent =
        message;
    }

    alert(message);

    throw error;
  }
}


// =====================================================
// LOGIN BUTTON
// =====================================================

function setupLoginButton() {

  const button =
    document.getElementById("googleLogin");

  if (!button) {

    console.error(
      "ERROR: #googleLogin was not found."
    );

    return;
  }

  button.addEventListener(
    "click",
    async () => {

      button.disabled = true;

      button.textContent =
        "CONNECTING TO GOOGLE...";

      try {

        await loginWithGoogle();

      } catch (error) {

        console.error(error);

      } finally {

        button.disabled = false;

        button.textContent =
          "CONTINUE WITH GOOGLE";

      }

    }
  );
}


// =====================================================
// AUTH STATE
// =====================================================

onAuthStateChanged(
  auth,
  async (user) => {

    if (user) {

      console.log(
        "AUTHENTICATED:",
        user.displayName,
        user.email
      );

      // Make user available globally.

      window.VP_USER = user;

      // Save/update Google profile.

      await saveGoogleProfile(user);

      // Open application.

      showApplication(user);

    } else {

      window.VP_USER = null;

      showLogin();

    }

  }
);


// =====================================================
// LOGOUT
// =====================================================

window.VP_LOGOUT =
  async function () {

    try {

      await signOut(auth);

      window.VP_USER = null;

      showLogin();

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    }

  };


// =====================================================
// INITIALIZE
// =====================================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    setupLoginButton
  );

} else {

  setupLoginButton();

}


// =====================================================
// EXPORT
// =====================================================

export {
  auth,
  db,
  loginWithGoogle
};
