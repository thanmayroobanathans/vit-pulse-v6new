import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";


// ============================================
// FIREBASE INITIALIZATION
// ============================================

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);


// ============================================
// GOOGLE PROVIDER
// ============================================

const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


// ============================================
// GOOGLE LOGIN
// ============================================

export async function loginWithGoogle() {

  await signInWithRedirect(
    auth,
    googleProvider
  );

}


// ============================================
// LOGOUT
// ============================================

export async function logout() {

  await signOut(auth);

}
