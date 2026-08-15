import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


// ==================================================
// GOOGLE LOGIN
// ==================================================

export async function loginWithGoogle() {

  try {

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    console.log(
      "Google authentication successful:",
      result.user.displayName
    );

    return result.user;

  } catch (error) {

    console.error("Google login error:", error);

    let message = "Google sign-in failed.";

    if (error.code === "auth/popup-blocked") {
      message =
        "Google sign-in was blocked by your browser. Allow pop-ups and try again.";
    }

    if (error.code === "auth/popup-closed-by-user") {
      message =
        "Google sign-in was cancelled.";
    }

    if (error.code === "auth/unauthorized-domain") {
      message =
        "This website domain is not authorized in Firebase Authentication.";
    }

    if (error.code === "auth/invalid-api-key") {
      message =
        "Firebase configuration contains an invalid API key.";
    }

    alert(message);

    throw error;
  }
}


// ==================================================
// AUTH STATE
// ==================================================

export function requireGoogleLogin(callback) {

  onAuthStateChanged(auth, (user) => {

    if (user) {

      console.log(
        "AUTHENTICATED:",
        user.displayName,
        user.email
      );

      hideLoginScreen();

      callback(user);

    } else {

      showLoginScreen();

    }

  });

}


// ==================================================
// LOGIN SCREEN
// ==================================================

function showLoginScreen() {

  const loginScreen =
    document.getElementById("login-screen");

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  const application =
    document.getElementById("application");

  if (application) {
    application.style.display = "block";
  }

}


// ==================================================
// HIDE LOGIN SCREEN
// ==================================================

function hideLoginScreen() {

  const loginScreen =
    document.getElementById("login-screen");

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  const application =
    document.getElementById("application");

  if (application) {
    application.style.display = "block";
  }

}


// ==================================================
// LOGOUT
// ==================================================

export async function logout() {

  try {

    await signOut(auth);

    showLoginScreen();

  } catch (error) {

    console.error(
      "Logout failed:",
      error
    );

  }

}


// ==================================================
// LOGIN BUTTON
// ==================================================

const googleButton =
  document.getElementById("google-login");

if (googleButton) {

  googleButton.addEventListener(
    "click",
    async () => {

      googleButton.disabled = true;

      googleButton.textContent =
        "CONNECTING TO GOOGLE...";

      try {

        await loginWithGoogle();

      } finally {

        googleButton.disabled = false;

        googleButton.textContent =
          "CONTINUE WITH GOOGLE";

      }

    }
  );

}


// ==================================================
// START AUTH GUARD
// ==================================================

requireGoogleLogin((user) => {

  console.log(
    "VIT PULSE USER:",
    user.uid
  );

});
