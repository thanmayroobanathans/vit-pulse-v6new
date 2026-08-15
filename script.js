import {
  auth, db, googleProvider,
  signInWithPopup, signInWithRedirect, getRedirectResult,
  onAuthStateChanged, signOut, doc, setDoc, serverTimestamp
} from "./firebase-app.js";

const $ = id => document.getElementById(id);

const questions = [
["SOCIAL","You arrive at a crowded campus event. Your first move?",["Find someone you know","Talk to someone new","Observe the room first","Leave if the energy feels wrong"]]],
["DECISION","A difficult choice has no perfect answer. You...",["Pick quickly and adapt","List the pros and cons","Ask someone you trust","Wait for more information"]]],
["ENERGY","After a long day, you recover by...",["Being around people","Going somewhere alone","Doing something physical","Getting lost in music or a screen"]]],
["WORK","A deadline is tomorrow. You...",["Start immediately","Plan the entire sequence","Work intensely at the last minute","Ask others how they are approaching it"]]],
["RISK","A new opportunity looks exciting but uncertain.",["Take it","Research it","Ask someone experienced","Ignore it unless the upside is obvious"]]],
["ARGUMENT","During an argument you tend to...",["Say what you think directly","Try to understand both sides","Go quiet","Make a joke and defuse it"]]],
["CURIOSITY","A topic catches your attention.",["Deep dive immediately","Save it for later","Discuss it with someone","Move on to the next interesting thing"]]],
["CAMPUS","You have a free hour on campus.",["Explore somewhere new","Study","Meet friends","Rest"]]],
["RULES","A rule seems inefficient.",["Challenge it","Work around it","Follow it","Find out why it exists"]]],
["PRESSURE","Under pressure you become...",["More focused","More analytical","More emotional","More impulsive"]]],
["FRIENDS","A good friend is someone who...",["Pushes you forward","Understands you","Makes you laugh","Is dependable"]]],
["MONEY","You receive unexpected money.",["Save it","Invest it","Spend it on an experience","Buy something useful"]]],
["FAILURE","A plan fails.",["Try again immediately","Analyze what went wrong","Ask for feedback","Move to a new plan"]]],
["LEARNING","You learn fastest when...",["Solving problems","Seeing examples","Explaining it","Practicing repeatedly"]]],
["COMPETITION","Someone is clearly better than you at something.",["Compete harder","Study their method","Respect their skill","Find another arena"]]],
["TIME","You have three tasks and one hour.",["Do the hardest first","Rank by importance","Do the fastest first","Choose by instinct"]]],
["AUTHORITY","A senior gives you advice you disagree with.",["Say so","Consider it privately","Follow it for now","Ask questions"]]],
["NOVELTY","A completely unfamiliar situation appears.",["Exciting","Interesting","Stressful","Depends on who is there"]]],
["COMMUNICATION","When texting you usually...",["Reply instantly","Write carefully","Forget and reply later","Send short messages"]]],
["AESTHETIC","Your ideal workspace is...",["Minimal","Organized","Comfortable","Chaotic but functional"]]],
["GOALS","A major goal feels far away.",["Break it into steps","Visualize the result","Start anyway","Find a partner"]]],
["CONFLICT","Two friends are fighting.",["Intervene","Listen to both","Stay out","Make them laugh"]]],
["SLEEP","You have an early morning.",["Sleep early","Set multiple alarms","Stay up until tired","Wake naturally"]]],
["TECH","A new app is confusing.",["Experiment","Read instructions","Watch a tutorial","Ask someone"]]],
["LEADERSHIP","A group has no leader.",["Take charge","Suggest a plan","Wait for consensus","Support whoever emerges"]]],
["BOREDOM","You are bored.",["Start a project","Scroll","Go outside","Call someone"]]],
["TRUTH","A truth might hurt someone.",["Say it honestly","Soften it","Wait for the right moment","Don't say it unless necessary"]]],
["CHANGE","Your routine suddenly changes.",["Adapt","Rebuild the schedule","Feel annoyed","Enjoy the disruption"]]],
["MEMORY","You remember things best by...",["Doing them","Writing them","Talking about them","Seeing them"]]],
["STATUS","Recognition matters to you...",["A lot","Somewhat","Only from people I respect","Not really"]]],
["INDEPENDENCE","You prefer to...",["Do things yourself","Coordinate with others","Delegate","Depends on the task"]]],
["FUTURE","Thinking about the future makes you...",["Excited","Curious","Anxious","Focused on today"]]],
["VALUES","When choosing between two good options you prioritize...",["Freedom","Security","Impact","Enjoyment"]]],
["INSTINCT","Your first instinct is usually...",["Reliable","Needs checking","Strong but emotional","Different every time"]]],
["FINAL","If the machine had one word for you, you'd want it to be...",["CAPABLE","ORIGINAL","UNSTOPPABLE","UNDERSTOOD"]]
];

const archetypes = [
["THE ARCHITECT","HB-A01","You naturally turn ambiguity into structure. You notice systems, patterns and leverage points.",["INTJ","ENTJ"],72],
["THE OPERATOR","HB-O02","You prefer action, momentum and practical results. You learn by doing and adapting.",["ESTP","ENTJ"],69],
["THE EXPLORER","HB-E03","Novelty pulls you forward. You collect experiences, ideas and possibilities.",["ENTP","ENFP"],68],
["THE ANALYST","HB-N04","You investigate before committing and enjoy understanding how things actually work.",["INTP","ISTJ"],71],
["THE CATALYST","HB-C05","You energize people and turn stalled situations into movement.",["ENFP","ENFJ"],67],
["THE STRATEGIST","HB-S06","You think several moves ahead and enjoy competitive problems.",["INTJ","ENTJ"],74],
["THE CONNECTOR","HB-K07","You build momentum through people, conversations and shared experiences.",["ENFJ","ESFJ"],66],
["THE SOLOIST","HB-S08","You are comfortable following your own route and protecting your autonomy.",["ISTP","INTP"],70]
];

let user = null;
let current = 0;
let answers = [];
let result = null;
let factIndex = 0;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id)?.classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function authMessage(text, error=false) {
  const el = $("authStatus");
  if (el) { el.textContent = text; el.classList.toggle("error", error); }
}

function setLoggedIn(u) {
  user = u;
  $("login-screen").style.display = "none";
  $("application").style.display = "block";
  $("authPanel").textContent = `AUTHENTICATED // ${u.displayName || u.email || u.uid}`;
}

async function login() {
  const button = $("googleLogin");
  button.disabled = true;
  button.textContent = "CONNECTING TO GOOGLE...";
  authMessage("OPENING GOOGLE AUTHENTICATION...");

  try {
    const result = await signInWithPopup(auth, googleProvider);
    setLoggedIn(result.user);
    authMessage("AUTHENTICATION SUCCESSFUL");
  } catch (e) {
    console.error(e);
    if (e.code === "auth/popup-blocked" || e.code === "auth/cancelled-popup-request") {
      authMessage("POPUP BLOCKED — SWITCHING TO REDIRECT...");
      try {
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (redirectError) {
        console.error(redirectError);
        authMessage("GOOGLE SIGN-IN FAILED: " + redirectError.code, true);
      }
    } else if (e.code === "auth/popup-closed-by-user") {
      authMessage("SIGN-IN CANCELLED.");
    } else if (e.code === "auth/unauthorized-domain") {
      authMessage("FIREBASE ERROR: ADD THIS GITHUB PAGES DOMAIN TO AUTHORIZED DOMAINS.", true);
    } else {
      authMessage(`GOOGLE SIGN-IN FAILED: ${e.code || e.message}`, true);
    }
  } finally {
    button.disabled = false;
    button.textContent = "CONTINUE WITH GOOGLE";
  }
}

function renderQuestion() {
  const q = questions[current];
  $("progress").textContent = `INPUT ${String(current+1).padStart(2,"0")} / ${questions.length}`;
  $("state").textContent = `STATE q${current}`;
  $("tape").style.width = `${(current/questions.length)*100}%`;
  $("domain").textContent = q[0];
  $("question").textContent = q[1];
  $("streak").textContent = `CHAIN ${current}`;
  const options = $("options");
  options.innerHTML = "";
  q[2].forEach((text, index) => {
    const b = document.createElement("button");
    b.className = "option";
    b.type = "button";
    b.textContent = `${String.fromCharCode(65+index)} // ${text}`;
    b.addEventListener("click", () => answer(index));
    options.appendChild(b);
  });
  $("machineNote").textContent = current === 0 ? "MACHINE READY // FIRST INPUT" : "INPUT ACCEPTED // NEXT VARIABLE LOADED";
}

function answer(index) {
  answers[current] = index;
  current++;
  if (current >= questions.length) finishQuiz();
  else renderQuestion();
}

function scoreResult() {
  const counts = [0,0,0,0];
  answers.forEach(a => counts[a]++);
  const normalized = counts.map(v => Math.round(v / questions.length * 100));
  const idx = (answers.reduce((a,b)=>a+b,0) + answers.filter((x,i)=>x===i%4).length) % archetypes.length;
  const ranked = archetypes.map((a,i) => ({
    a, score: Math.max(58, Math.min(96, a[4] + ((idx*7+i*3+counts[i%4])%13)-6))
  })).sort((x,y)=>y.score-x.score);
  return { primary: ranked[0], ranked, axes: normalized, counts };
}

function statHTML(label, value) {
  return `<div class="stat"><div class="stat-label"><span>${label}</span><span>${value}%</span></div><div class="stat-bar"><i style="width:${value}%"></i></div></div>`;
}

function finishQuiz() {
  result = scoreResult();
  $("resultName").textContent = $("userName").value.trim() || user?.displayName || "ANONYMOUS SUBJECT";
  $("archetype").textContent = result.primary.a[0];
  $("archetypeCode").textContent = result.primary.a[1];
  $("matchScore").textContent = result.primary.score;
  $("description").textContent = result.primary.a[2];

  $("jungStats").innerHTML =
    statHTML("EXTRAVERSION", result.axes[0]) +
    statHTML("INTUITION", result.axes[1]) +
    statHTML("THINKING", result.axes[2]) +
    statHTML("JUDGING", result.axes[3]);

  $("bigFive").innerHTML =
    statHTML("OPENNESS", Math.min(99, result.axes[1]+8)) +
    statHTML("CONSCIENTIOUSNESS", Math.min(99, result.axes[3]+5)) +
    statHTML("EXTRAVERSION", result.axes[0]) +
    statHTML("AGREEABLENESS", 55 + (result.axes[2] % 35)) +
    statHTML("ENERGY", 50 + (result.axes[0] % 45));

  $("ranking").innerHTML = result.ranked.slice(0,5).map((r,i)=>
    `<div class="rank"><span>#${i+1}</span><b>${r.a[0]}</b><span>${r.score}%</span></div>`
  ).join("");

  $("campusStats").innerHTML =
    statHTML("EXPLORATION", 45 + result.axes[1]/2) +
    statHTML("SOCIAL SIGNAL", 40 + result.axes[0]/2) +
    statHTML("COMPETITIVE DRIVE", 45 + result.axes[2]/2);

  factIndex = 0;
  renderFact();
  showScreen("result");
  saveParticipant(false);
}

const facts = [
  "The machine cannot actually read your mind. It only sees the choices you made.",
  "Your classification is fictional and designed for campus entertainment.",
  "Changing one answer can change the machine's ranking.",
  "The strongest signal is not necessarily the most important part of your personality.",
  "The dossier is a snapshot of this run, not a permanent label."
];

function renderFact() {
  $("fact").textContent = facts[factIndex % facts.length];
}

async function saveParticipant(consent=true) {
  if (!user || !result) return;
  try {
    await setDoc(doc(db, "participants", user.uid), {
      uid: user.uid,
      displayName: $("resultName").textContent,
      email: user.email || null,
      archetype: result.primary.a[0],
      archetypeCode: result.primary.a[1],
      matchScore: result.primary.score,
      answers: answers,
      consent,
      updatedAt: serverTimestamp()
    }, {merge:true});
  } catch (e) {
    console.warn("Firestore save failed:", e);
  }
}

function shareResult() {
  if (!result) return;
  const payload = btoa(unescape(encodeURIComponent(JSON.stringify({
    n: $("resultName").textContent,
    a: result.primary.a[0],
    c: result.primary.a[1],
    s: result.primary.score
  }))));
  const url = `${location.origin}${location.pathname}#result=${payload}`;
  $("shareBox").style.display = "flex";
  $("shareLink").value = url;
  $("shareStatus").textContent = "RESULT LINK GENERATED.";
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText($("shareLink").value);
    $("shareStatus").textContent = "COPIED.";
  } catch {
    $("shareLink").select();
    document.execCommand("copy");
    $("shareStatus").textContent = "COPIED.";
  }
}

function saveCard() {
  const text = [
    "HELDENMUNT BOYS // THE MACHINE",
    "",
    `SUBJECT: ${$("resultName").textContent}`,
    `CLASSIFICATION: ${result.primary.a[0]}`,
    `CODE: ${result.primary.a[1]}`,
    `MATCH: ${result.primary.score}%`,
    "",
    result.primary.a[2]
  ].join("\n");
  const blob = new Blob([text], {type:"text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "heldenmunt-result.txt";
  a.click();
  URL.revokeObjectURL(a.href);
}

function enableLocation() {
  if (!navigator.geolocation) {
    $("locationStatus").textContent = "GEOLOCATION NOT SUPPORTED.";
    return;
  }
  $("locationStatus").textContent = "REQUESTING LOCATION...";
  navigator.geolocation.getCurrentPosition(async pos => {
    $("locationStatus").textContent = `LOCATION SHARED // ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
    if (user) {
      try {
        await setDoc(doc(db, "participants", user.uid, "location", "current"), {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          updatedAt: serverTimestamp()
        });
      } catch(e) { console.warn(e); }
    }
  }, err => {
    $("locationStatus").textContent = `LOCATION FAILED // ${err.message}`;
  }, {enableHighAccuracy:true, timeout:10000});
}

function disableLocation() {
  $("locationStatus").textContent = "LOCATION SHARING OFF";
}

$("googleLogin").addEventListener("click", login);
$("logout").addEventListener("click", () => signOut(auth));
$("begin").addEventListener("click", () => {
  const name = $("userName").value.trim();
  if (!name) { $("userName").focus(); return; }
  current = 0; answers = [];
  showScreen("quiz");
  renderQuestion();
});
$("again").addEventListener("click", () => {
  current=0; answers=[]; showScreen("quiz"); renderQuestion();
});
$("nextFact").addEventListener("click", () => { factIndex++; renderFact(); });
$("share").addEventListener("click", shareResult);
$("copyLink").addEventListener("click", copyLink);
$("saveImage").addEventListener("click", saveCard);
$("enableLocation").addEventListener("click", enableLocation);
$("disableLocation").addEventListener("click", disableLocation);
$("sendData").addEventListener("click", async () => {
  if (!$("optin").checked) {
    $("sendStatus").textContent = "CHECK THE OPT-IN BOX FIRST.";
    return;
  }
  await saveParticipant(true);
  $("sendStatus").textContent = "ANONYMOUS RESULT SUBMITTED.";
});

onAuthStateChanged(auth, u => {
  if (u) {
    setLoggedIn(u);
    if (!$("userName").value) $("userName").value = u.displayName || "";
  } else {
    $("login-screen").style.display = "flex";
    $("application").style.display = "none";
  }
});

getRedirectResult(auth).then(r => {
  if (r?.user) setLoggedIn(r.user);
}).catch(e => {
  console.error("Redirect auth result:", e);
  if (e.code === "auth/unauthorized-domain") authMessage("UNAUTHORIZED DOMAIN — FIX FIREBASE AUTHORIZED DOMAINS.", true);
});
