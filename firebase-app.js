import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
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


const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


export async function loginWithGoogle() {

  await signInWithRedirect(
    auth,
    googleProvider
  );
}


// Process the Google redirect

getRedirectResult(auth)
  .then((result) => {

    if (result?.user) {

      console.log(
        "GOOGLE LOGIN SUCCESS:",
        result.user.email
      );

    }

  })
  .catch((error) => {

    console.error(
      "GOOGLE REDIRECT ERROR:",
      error
    );

    const status =
      document.getElementById("authStatus");

    if (status) {

      status.textContent =
        "GOOGLE LOGIN ERROR: " +
        error.code;
    }
  });


export async function logout() {

  await signOut(auth);

}
