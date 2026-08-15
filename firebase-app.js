import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


// --------------------------------------------------
// MANDATORY GOOGLE LOGIN
// --------------------------------------------------

export async function loginWithGoogle() {
  try {
    await signInWithRedirect(
      auth,
      googleProvider
    );
  } catch (error) {
    console.error("Google login failed:", error);

    alert(
      "Google sign-in could not be started. Please try again."
    );
  }
}


// Complete redirect login
getRedirectResult(auth)
  .then((result) => {

    if (result?.user) {
      console.log(
        "Authenticated:",
        result.user.displayName
      );
    }

  })
  .catch((error) => {

    console.error(
      "Google authentication error:",
      error
    );

    alert(
      "Google authentication failed. Please try again."
    );
  });


// --------------------------------------------------
// AUTH GUARD
// --------------------------------------------------

export function requireGoogleLogin(callback) {

  onAuthStateChanged(auth, (user) => {

    if (!user) {

      showLoginScreen();

      return;
    }

    hideLoginScreen();

    callback(user);
  });
}


// --------------------------------------------------
// LOGIN SCREEN
// --------------------------------------------------

function showLoginScreen() {

  document.body.classList.add(
    "authentication-required"
  );

  const loginScreen =
    document.getElementById("login-screen");

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  const application =
    document.getElementById("application");

  if (application) {
    application.style.display = "none";
  }
}


function hideLoginScreen() {

  document.body.classList.remove(
    "authentication-required"
  );

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


export async function logout() {

  await signOut(auth);

  // Immediately return to authentication wall.
  showLoginScreen();
}
