import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig);
const auth=getAuth(app), db=getFirestore(app), provider=new GoogleAuthProvider();
window.VP_FIREBASE={auth,db,provider,signInWithRedirect,onAuthStateChanged,doc,setDoc,serverTimestamp};
document.addEventListener("DOMContentLoaded",()=>{
 const b=document.getElementById("googleLogin"),s=document.getElementById("authStatus");
 if(!b)return;
 b.onclick=()=>signInWithRedirect(auth,provider);
 onAuthStateChanged(auth,user=>{if(user){window.VP_USER=user;s.textContent=`SIGNED IN · ${user.displayName||"Google account"}`;b.textContent="GOOGLE ACCOUNT CONNECTED";}});
});
