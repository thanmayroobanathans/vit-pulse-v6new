import { auth, loginWithGoogle }
from "./firebase-app.js";

import {
  onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


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

  console.log(
    "AUTHENTICATED USER:",
    user
  );

  loginScreen.style.display = "none";

  application.style.display = "block";


  const nameInput =
    document.getElementById("userName");

  if (
    nameInput &&
    !nameInput.value &&
    user.displayName
  ) {

    nameInput.value =
      user.displayName;

  }


  if (authStatus) {

    authStatus.textContent =
      `AUTHENTICATED // ${user.email}`;

  }


  // Tell the rest of VIT PULSE that
  // authentication is complete.

  window.dispatchEvent(
    new CustomEvent(
      "vitpulse:authenticated",
      {
        detail: {
          user
        }
      }
    )
  );

}


googleButton.addEventListener(
  "click",
  async () => {

    googleButton.disabled = true;

    googleButton.textContent =
      "REDIRECTING TO GOOGLE...";

    try {

      await loginWithGoogle();

    } catch (error) {

      console.error(error);

      googleButton.disabled = false;

      googleButton.textContent =
        "SIGN IN WITH GOOGLE";

      authStatus.textContent =
        "LOGIN FAILED — TRY AGAIN";
    }

  }
);


onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      showApplication(user);

    } else {

      showLogin();

    }

  }
);
