import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  auth,
  db
} from "./firebase-app.js";


const loginScreen = document.getElementById("login-screen");
const application = document.getElementById("application");
const googleButton = document.getElementById("googleLogin");
const authStatus = document.getElementById("authStatus");


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});


function showLogin() {

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  if (application) {
    application.style.display = "none";
  }
}


function showApplication(user) {

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  if (application) {
    application.style.display = "block";
  }

  window.VP_USER = user;

  const nameInput = document.getElementById("userName");

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

  window.dispatchEvent(
    new CustomEvent("vitpulse:authenticated", {
      detail: { user }
    })
  );
}


async function loginWithGoogle() {

  if (googleButton) {
    googleButton.disabled = true;
    googleButton.textContent = "CONNECTING...";
  }

  try {

    const result =
      await signInWithPopup(auth, provider);

    const user = result.user;

    console.log(
      "Google login successful:",
      user.displayName,
      user.email
    );


    await setDoc(
      doc(db, "participants", user.uid),
      {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        provider: "google",
        lastLogin: serverTimestamp()
      },
      {
        merge: true
      }
    );


    showApplication(user);

  } catch (error) {

    console.error("GOOGLE LOGIN ERROR:", error);

    let message = "Google sign-in failed.";

    if (error.code === "auth/unauthorized-domain") {

      message =
        "This GitHub Pages domain is not authorized in Firebase.";

    } else if (error.code === "auth/popup-blocked") {

      message =
        "The Google popup was blocked by the browser.";

    } else if (error.code === "auth/popup-closed-by-user") {

      message =
        "Google sign-in was cancelled.";

    } else if (error.code === "auth/invalid-api-key") {

      message =
        "Your Firebase API key is incorrect.";

    } else if (error.code === "auth/operation-not-allowed") {

      message =
        "Google authentication is not enabled in Firebase.";

    } else if (error.code === "auth/network-request-failed") {

      message =
        "Network error. Check your connection.";

    }

    if (authStatus) {
      authStatus.textContent = message;
    }

    alert(message);

  } finally {

    if (googleButton) {
      googleButton.disabled = false;
      googleButton.textContent =
        "CONTINUE WITH GOOGLE";
    }
  }
}


if (googleButton) {

  googleButton.addEventListener(
    "click",
    loginWithGoogle
  );

} else {

  console.error(
    "ERROR: #googleLogin button was not found."
  );
}


onAuthStateChanged(
  auth,
  async (user) => {

    if (user) {

      console.log(
        "AUTHENTICATED:",
        user.email
      );

      window.VP_USER = user;

      showApplication(user);

      try {

        await setDoc(
          doc(db, "participants", user.uid),
          {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            photoURL: user.photoURL || "",
            provider: "google",
            lastLogin: serverTimestamp()
          },
          {
            merge: true
          }
        );

      } catch (error) {

        console.error(
          "Firestore profile update failed:",
          error
        );
      }

    } else {

      window.VP_USER = null;

      showLogin();
    }
  }
);
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
