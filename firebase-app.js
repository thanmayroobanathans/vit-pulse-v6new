import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";


/* ==================================================
   FIREBASE
================================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


/* ==================================================
   GOOGLE LOGIN
================================================== */

export async function loginWithGoogle() {

  try {

    /*
      Popup is convenient on desktop.
    */

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    console.log(
      "Google authentication successful:",
      result.user.email
    );

    return result.user;

  } catch (error) {

    console.error(
      "Google authentication error:",
      error
    );

    /*
      If popup is blocked, switch to redirect.
    */

    if (
      error.code === "auth/popup-blocked" ||
      error.code === "auth/popup-closed-by-user" ||
      error.code === "auth/cancelled-popup-request"
    ) {

      console.log(
        "Popup unavailable. Starting redirect login..."
      );

      await signInWithRedirect(
        auth,
        googleProvider
      );

      return null;
    }

    throw error;
  }
}


/* ==================================================
   REDIRECT RESULT
================================================== */

export async function handleRedirectLogin() {

  try {

    const result = await getRedirectResult(auth);

    if (result && result.user) {

      console.log(
        "Redirect Google login successful:",
        result.user.email
      );

      return result.user;
    }

    return null;

  } catch (error) {

    console.error(
      "Redirect authentication error:",
      error
    );

    throw error;
  }
}


/* ==================================================
   AUTH STATE
================================================== */

export function watchAuth(callback) {

  return onAuthStateChanged(
    auth,
    callback
  );
}


/* ==================================================
   LOGOUT
================================================== */

export async function logout() {

  await signOut(auth);

}


/* ==================================================
   EXPORTS
================================================== */

export {
  app,
  auth,
  db,
  googleProvider
};
