import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { doc, setDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase-app.js";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

function showLogin() {
  const login = document.getElementById("login-screen");
  const app = document.getElementById("application");
  if (login) login.style.display = "flex";
  if (app) app.style.display = "none";
}

function showApplication(user) {
  const login = document.getElementById("login-screen");
  const app = document.getElementById("application");
  if (login) login.style.display = "none";
  if (app) app.style.display = "block";

  window.VP_USER = user;

  const name = document.getElementById("userName");
  if (name && !name.value && user.displayName) name.value = user.displayName;

  const status = document.getElementById("authStatus");
  if (status) status.textContent = `AUTHENTICATED // ${user.email || ""}`;

  window.dispatchEvent(new CustomEvent("vitpulse:authenticated", { detail: { user } }));
}

async function saveProfile(user) {
  await setDoc(doc(db, "participants", user.uid), {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    provider: "google",
    lastLogin: serverTimestamp()
  }, { merge: true });
}

async function loginWithGoogle() {
  const button = document.getElementById("googleLogin");
  const status = document.getElementById("authStatus");
  if (button) {
    button.disabled = true;
    button.textContent = "REDIRECTING TO GOOGLE...";
  }
  if (status) status.textContent = "OPENING GOOGLE SIGN-IN...";

  try {
    const result = await signInWithPopup(auth, provider);
if (result?.user) {
  await saveProfile(result.user);
  showApplication(result.user);
}
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR", error);
    if (status) status.textContent = `${error.code || "ERROR"}: ${error.message || ""}`;
    if (button) {
      button.disabled = false;
      button.textContent = "CONTINUE WITH GOOGLE";
    }
  }
}


function setup() {
  const button = document.getElementById("googleLogin");
  if (!button) {
    console.error("#googleLogin was not found");
    return;
  }
  button.addEventListener("click", loginWithGoogle);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      window.VP_USER = user;
      try { await saveProfile(user); } catch (e) { console.error("PROFILE SAVE ERROR", e); }
      showApplication(user);
    } else {
      window.VP_USER = null;
      showLogin();
    }
  });


}

window.VP_LOGOUT = () => signOut(auth);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup, { once: true });
} else {
  setup();
}

export { auth, db, loginWithGoogle };
alert("AUTH GATE LOADED");
