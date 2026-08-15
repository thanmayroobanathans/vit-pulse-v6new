import { auth, loginWithGoogle } from "./firebase-app.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const loginScreen =
  document.getElementById("login-screen");

const application =
  document.getElementById("application");

const googleButton =
  document.getElementById("googleLogin");

const authStatus =
  document.getElementById("authStatus");


function showLogin() {

  loginScreen.style.display = "flex";

  application.style.display = "none";
}


function showApplication(user) {

  loginScreen.style.display = "none";

  application.style.display = "block";


  // Automatically use Google account name
  // if the user hasn't entered one yet.

  const nameInput =
    document.getElementById("userName");

  if (
    nameInput &&
    !nameInput.value &&
    user.displayName
  ) {
    nameInput.value = user.displayName;
  }


  // Show authenticated status

  if (authStatus) {

    authStatus.textContent =
      `AUTHENTICATED // ${user.email}`;

  }
}


// ============================================
// GOOGLE BUTTON
// ============================================

googleButton.addEventListener(
  "click",
  async () => {

    googleButton.disabled = true;

    googleButton.textContent =
      "AUTHENTICATING...";

    if (authStatus) {

      authStatus.textContent =
        "CONTACTING GOOGLE...";
    }

    try {

      await loginWithGoogle();

    } catch (error) {

      console.error(
        "Google authentication error:",
        error
      );

      googleButton.disabled = false;

      googleButton.textContent =
        "CONTINUE WITH GOOGLE";

      if (authStatus) {

        authStatus.textContent =
          "AUTHENTICATION FAILED — TRY AGAIN";
      }
    }
  }
);


// ============================================
// AUTHENTICATION STATE
// ============================================

onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      console.log(
        "VIT PULSE authenticated:",
        user.uid
      );

      showApplication(user);

    } else {

      console.log(
        "VIT PULSE: authentication required"
      );

      showLogin();
    }
  }
);
