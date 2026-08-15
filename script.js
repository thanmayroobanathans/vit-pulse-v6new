import {
  auth,
  db,
  loginWithGoogle,
  handleRedirectLogin,
  watchAuth,
  logout
} from "./firebase-app.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  addDoc,
  deleteDoc
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* ==================================================
   DOM
================================================== */

const loginScreen =
  document.getElementById("login-screen");

const application =
  document.getElementById("application");

const googleButton =
  document.getElementById("googleLogin");

const authStatus =
  document.getElementById("authStatus");

const authPanel =
  document.getElementById("authPanel");

const userName =
  document.getElementById("userName");

const beginButton =
  document.getElementById("begin");


/* ==================================================
   SCREEN CONTROL
================================================== */

function showLoginScreen() {

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  if (application) {
    application.style.display = "none";
  }
}


function hideLoginScreen() {

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  if (application) {
    application.style.display = "block";
  }
}


/* ==================================================
   ERROR MESSAGE
================================================== */

function firebaseError(error) {

  console.error(error);

  if (!authStatus) return;

  switch (error.code) {

    case "auth/unauthorized-domain":

      authStatus.textContent =
        "ERROR: THIS GITHUB PAGES DOMAIN IS NOT AUTHORIZED IN FIREBASE.";

      break;

    case "auth/operation-not-allowed":

      authStatus.textContent =
        "ERROR: GOOGLE SIGN-IN IS NOT ENABLED IN FIREBASE.";

      break;

    case "auth/invalid-api-key":

      authStatus.textContent =
        "ERROR: INVALID FIREBASE API KEY.";

      break;

    case "auth/network-request-failed":

      authStatus.textContent =
        "ERROR: NETWORK REQUEST FAILED.";

      break;

    case "auth/popup-blocked":

      authStatus.textContent =
        "POPUP BLOCKED — REDIRECT LOGIN WILL BE USED.";

      break;

    default:

      authStatus.textContent =
        "GOOGLE SIGN-IN FAILED: " +
        (error.message || error.code || "UNKNOWN ERROR");
  }
}


/* ==================================================
   GOOGLE LOGIN BUTTON
================================================== */

if (googleButton) {

  googleButton.addEventListener(
    "click",
    async () => {

      googleButton.disabled = true;

      googleButton.textContent =
        "CONNECTING TO GOOGLE...";

      if (authStatus) {

        authStatus.textContent =
          "CONTACTING GOOGLE...";
      }

      try {

        await loginWithGoogle();

      } catch (error) {

        firebaseError(error);

        googleButton.disabled = false;

        googleButton.textContent =
          "CONTINUE WITH GOOGLE";
      }

    }
  );
}


/* ==================================================
   AUTH STATE
================================================== */

watchAuth(async (user) => {

  if (user) {

    console.log(
      "AUTHENTICATED USER:",
      user.uid,
      user.email
    );

    hideLoginScreen();

    if (authPanel) {

      authPanel.textContent =
        "AUTHENTICATED SESSION // " +
        (user.displayName || user.email);
    }

    /*
      Automatically use Google display name
      if the user has not entered one yet.
    */

    if (
      userName &&
      !userName.value.trim()
    ) {

      userName.value =
        user.displayName || "";
    }

    return;
  }

  showLoginScreen();

});


/* ==================================================
   HANDLE REDIRECT LOGIN
================================================== */

(async function () {

  try {

    await handleRedirectLogin();

  } catch (error) {

    firebaseError(error);

  }

})();


/* ==================================================
   QUIZ DATA
================================================== */

const questions = [

  {
    domain: "SOCIAL ENERGY",
    question: "A free evening suddenly appears. What happens?",
    options: [
      "I find people immediately.",
      "I message one or two people.",
      "I decide depending on my mood.",
      "I disappear completely."
    ],
    axis: "social"
  },

  {
    domain: "DECISION",
    question: "When something important happens, you usually...",
    options: [
      "Act immediately.",
      "Think briefly, then act.",
      "Ask someone I trust.",
      "Analyse everything first."
    ],
    axis: "decision"
  },

  {
    domain: "RISK",
    question: "Someone suggests a completely spontaneous plan.",
    options: [
      "Absolutely. Let's go.",
      "Probably.",
      "I need details first.",
      "No chance."
    ],
    axis: "risk"
  },

  {
    domain: "AMBITION",
    question: "You see someone doing extremely well.",
    options: [
      "I want to beat them.",
      "I want to learn from them.",
      "I admire them.",
      "I don't really care."
    ],
    axis: "ambition"
  },

  {
    domain: "CONFLICT",
    question: "A friend confronts you unexpectedly.",
    options: [
      "I confront them back.",
      "I try to understand.",
      "I become defensive.",
      "I avoid the situation."
    ],
    axis: "conflict"
  },

  {
    domain: "DISCIPLINE",
    question: "You have an important deadline tomorrow.",
    options: [
      "Finished days ago.",
      "I'll finish tonight.",
      "I'll probably panic later.",
      "I work best at the last second."
    ],
    axis: "discipline"
  },

  {
    domain: "CURIOSITY",
    question: "You encounter something you don't understand.",
    options: [
      "I immediately investigate.",
      "I save it for later.",
      "I ask someone.",
      "I ignore it."
    ],
    axis: "curiosity"
  },

  {
    domain: "LOYALTY",
    question: "A close friend makes a serious mistake.",
    options: [
      "I defend them.",
      "I tell them honestly.",
      "I stay neutral.",
      "I distance myself."
    ],
    axis: "loyalty"
  },

  {
    domain: "CONTROL",
    question: "Your plan suddenly changes.",
    options: [
      "I make a new plan instantly.",
      "I adapt.",
      "I get annoyed.",
      "I hate it."
    ],
    axis: "control"
  },

  {
    domain: "COMPETITION",
    question: "Someone challenges you.",
    options: [
      "Game on.",
      "Depends who it is.",
      "I'll compete if necessary.",
      "I'd rather cooperate."
    ],
    axis: "competition"
  },

  {
    domain: "CREATIVITY",
    question: "You are given a completely blank page.",
    options: [
      "Ideas immediately appear.",
      "I experiment.",
      "I need an example.",
      "I prefer instructions."
    ],
    axis: "creativity"
  },

  {
    domain: "LEADERSHIP",
    question: "A group has no leader.",
    options: [
      "I take charge.",
      "I organise quietly.",
      "Someone else should lead.",
      "I work alone."
    ],
    axis: "leadership"
  },

  {
    domain: "STRESS",
    question: "When pressure rises, you...",
    options: [
      "Become extremely focused.",
      "Keep going normally.",
      "Get restless.",
      "Freeze."
    ],
    axis: "stress"
  },

  {
    domain: "SOCIAL SIGNAL",
    question: "At a large event you usually...",
    options: [
      "Know everyone.",
      "Meet new people.",
      "Stay with familiar people.",
      "Find somewhere quiet."
    ],
    axis: "social"
  },

  {
    domain: "MONEY",
    question: "You unexpectedly receive ₹10,000.",
    options: [
      "Invest it.",
      "Save most of it.",
      "Buy something useful.",
      "Spend it on experiences."
    ],
    axis: "ambition"
  },

  {
    domain: "FAILURE",
    question: "You fail at something important.",
    options: [
      "Try again immediately.",
      "Study what went wrong.",
      "Take a break.",
      "Move on."
    ],
    axis: "discipline"
  },

  {
    domain: "TRUST",
    question: "Someone tells you a secret.",
    options: [
      "It stays with me forever.",
      "Only close friends might know.",
      "I forget about it.",
      "I don't like secrets."
    ],
    axis: "loyalty"
  },

  {
    domain: "PLANNING",
    question: "Your ideal trip is...",
    options: [
      "Fully spontaneous.",
      "Mostly planned.",
      "Detailed itinerary.",
      "I don't care as long as it works."
    ],
    axis: "control"
  },

  {
    domain: "ARGUMENT",
    question: "During an argument you care most about...",
    options: [
      "Winning.",
      "Being understood.",
      "Finding the truth.",
      "Ending the argument."
    ],
    axis: "conflict"
  },

  {
    domain: "LEARNING",
    question: "You learn best when...",
    options: [
      "I experiment myself.",
      "Someone explains it.",
      "I read about it.",
      "I practise repeatedly."
    ],
    axis: "curiosity"
  },

  {
    domain: "RISK",
    question: "Would you try something with a 50% chance of failure?",
    options: [
      "Yes.",
      "Probably.",
      "Only if the reward is high.",
      "No."
    ],
    axis: "risk"
  },

  {
    domain: "AUTHORITY",
    question: "A rule seems pointless.",
    options: [
      "Ignore it.",
      "Question it.",
      "Follow it anyway.",
      "Find a workaround."
    ],
    axis: "control"
  },

  {
    domain: "FRIENDSHIP",
    question: "Your ideal friend group is...",
    options: [
      "Huge.",
      "A few close people.",
      "Different groups.",
      "One best friend."
    ],
    axis: "social"
  },

  {
    domain: "FUTURE",
    question: "Thinking about five years from now feels...",
    options: [
      "Exciting.",
      "Motivating.",
      "Unclear.",
      "Irrelevant."
    ],
    axis: "ambition"
  },

  {
    domain: "IDEAS",
    question: "A strange idea appears in your head.",
    options: [
      "I immediately build it.",
      "I research it.",
      "I tell someone.",
      "I forget it."
    ],
    axis: "creativity"
  },

  {
    domain: "GROUPS",
    question: "During group projects you usually become...",
    options: [
      "The leader.",
      "The specialist.",
      "The organiser.",
      "The quiet contributor."
    ],
    axis: "leadership"
  },

  {
    domain: "PRESSURE",
    question: "The exam is tomorrow and you know little.",
    options: [
      "Full speed.",
      "Prioritise important topics.",
      "Ask friends for help.",
      "Accept defeat."
    ],
    axis: "stress"
  },

  {
    domain: "COMPETITION",
    question: "Your friend gets a higher score.",
    options: [
      "I want the next win.",
      "I congratulate them.",
      "I analyse the difference.",
      "Good for them."
    ],
    axis: "competition"
  },

  {
    domain: "CHANGE",
    question: "You move somewhere completely new.",
    options: [
      "Explore everything.",
      "Build a routine.",
      "Find familiar people.",
      "Stay in my room."
    ],
    axis: "risk"
  },

  {
    domain: "WORK",
    question: "Your perfect working environment is...",
    options: [
      "Fast and chaotic.",
      "Structured.",
      "Quiet.",
      "Social."
    ],
    axis: "discipline"
  },

  {
    domain: "VALUES",
    question: "What matters most when making a difficult decision?",
    options: [
      "Results.",
      "People.",
      "Principles.",
      "Freedom."
    ],
    axis: "decision"
  },

  {
    domain: "EXPERIENCE",
    question: "Would you rather have...",
    options: [
      "More money.",
      "More knowledge.",
      "More experiences.",
      "More free time."
    ],
    axis: "ambition"
  },

  {
    domain: "SOLITUDE",
    question: "Being alone for an entire day feels...",
    options: [
      "Amazing.",
      "Fine.",
      "A little strange.",
      "Terrible."
    ],
    axis: "social"
  },

  {
    domain: "MISTAKES",
    question: "Someone criticises your work.",
    options: [
      "Prove them wrong.",
      "Use the criticism.",
      "Ask for details.",
      "Ignore it."
    ],
    axis: "conflict"
  },

  {
    domain: "CURIOSITY",
    question: "If you had unlimited time, you'd probably...",
    options: [
      "Build something.",
      "Learn something.",
      "Travel.",
      "Relax."
    ],
    axis: "curiosity"
  },

  {
    domain: "IDENTITY",
    question: "Which statement feels closest?",
    options: [
      "I make things happen.",
      "I understand things deeply.",
      "I connect people.",
      "I observe everything."
    ],
    axis: "leadership"
  }

];


/* ==================================================
   ARCHETYPES
================================================== */

const archetypes = [

  {
    name: "THE ARCHITECT",
    code: "HB-A01",
    description:
      "A strategic builder who prefers systems, structure and long-term control.",
    axes: {
      leadership: 9,
      discipline: 9,
      curiosity: 8,
      control: 9,
      ambition: 8
    }
  },

  {
    name: "THE OPERATOR",
    code: "HB-A02",
    description:
      "You move quickly, make decisions and turn plans into action.",
    axes: {
      leadership: 9,
      ambition: 9,
      competition: 9,
      risk: 8,
      discipline: 8
    }
  },

  {
    name: "THE EXPLORER",
    code: "HB-A03",
    description:
      "Curiosity and experience pull you toward unfamiliar territory.",
    axes: {
      curiosity: 10,
      risk: 9,
      creativity: 9,
      social: 7
    }
  },

  {
    name: "THE DIPLOMAT",
    code: "HB-A04",
    description:
      "You understand people, negotiate tension and keep groups connected.",
    axes: {
      social: 9,
      loyalty: 9,
      conflict: 8,
      leadership: 7
    }
  },

  {
    name: "THE ANALYST",
    code: "HB-A05",
    description:
      "You naturally dissect problems before committing to an answer.",
    axes: {
      curiosity: 10,
      discipline: 8,
      control: 8,
      decision: 9
    }
  },

  {
    name: "THE MAVERICK",
    code: "HB-A06",
    description:
      "You dislike unnecessary constraints and prefer creating your own route.",
    axes: {
      risk: 10,
      creativity: 9,
      independence: 10,
      control: 3
    }
  },

  {
    name: "THE COMMANDER",
    code: "HB-A07",
    description:
      "Competition energises you and responsibility tends to find you.",
    axes: {
      leadership: 10,
      ambition: 10,
      competition: 10,
      discipline: 8
    }
  },

  {
    name: "THE OBSERVER",
    code: "HB-A08",
    description:
      "You notice patterns, details and signals other people overlook.",
    axes: {
      curiosity: 9,
      discipline: 8,
      social: 4,
      control: 8
    }
  },

  {
    name: "THE CONNECTOR",
    code: "HB-A09",
    description:
      "People, conversations and relationships are where your energy compounds.",
    axes: {
      social: 10,
      loyalty: 9,
      leadership: 7,
      creativity: 8
    }
  },

  {
    name: "THE BUILDER",
    code: "HB-A10",
    description:
      "You prefer tangible progress and quietly turning ideas into reality.",
    axes: {
      discipline: 10,
      creativity: 8,
      ambition: 8,
      control: 8
    }
  }
];


/* ==================================================
   QUIZ STATE
================================================== */

let currentQuestion = 0;

let answers = [];

let scores = {};

let streak = 0;

let currentResult = null;


/* ==================================================
   INITIALISE SCORES
================================================== */

function resetScores() {

  scores = {};

  const axes = [
    "social",
    "decision",
    "risk",
    "ambition",
    "conflict",
    "discipline",
    "curiosity",
    "loyalty",
    "control",
    "competition",
    "creativity",
    "leadership",
    "stress",
    "independence"
  ];

  axes.forEach(axis => {
    scores[axis] = 0;
  });
}


/* ==================================================
   SCREEN NAVIGATION
================================================== */

function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.remove("active");

    });

  const target =
    document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ==================================================
   BEGIN
================================================== */

if (beginButton) {

  beginButton.addEventListener(
    "click",
    () => {

      if (!auth.currentUser) {

        alert(
          "Please sign in with Google first."
        );

        showLoginScreen();

        return;
      }

      const name =
        userName?.value.trim();

      if (!name) {

        userName.focus();

        alert(
          "Enter your subject name first."
        );

        return;
      }

      currentQuestion = 0;

      answers = [];

      streak = 0;

      resetScores();

      showScreen("quiz");

      renderQuestion();

    }
  );
}


/* ==================================================
   RENDER QUESTION
================================================== */

function renderQuestion() {

  const q =
    questions[currentQuestion];

  if (!q) {

    finishQuiz();

    return;
  }

  const progress =
    document.getElementById("progress");

  const state =
    document.getElementById("state");

  const tape =
    document.getElementById("tape");

  const domain =
    document.getElementById("domain");

  const question =
    document.getElementById("question");

  const options =
    document.getElementById("options");

  const streakElement =
    document.getElementById("streak");

  const machineNote =
    document.getElementById("machineNote");

  if (progress) {

    progress.textContent =
      `INPUT ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;
  }

  if (state) {

    state.textContent =
      `STATE q${currentQuestion}`;
  }

  if (tape) {

    tape.style.width =
      `${(currentQuestion / questions.length) * 100}%`;
  }

  if (domain) {
    domain.textContent =
      q.domain;
  }

  if (question) {
    question.textContent =
      q.question;
  }

  if (streakElement) {

    streakElement.textContent =
      `CHAIN ${streak}`;
  }

  if (machineNote) {

    machineNote.textContent =
      currentQuestion === 0
        ? "MACHINE INITIALIZED."
        : "PATTERN DETECTED // CONTINUE.";
  }

  if (!options) return;

  options.innerHTML = "";

  q.options.forEach(
    (optionText, index) => {

      const button =
        document.createElement("button");

      button.className =
        "option";

      button.type =
        "button";

      button.textContent =
        `${String.fromCharCode(65 + index)} — ${optionText}`;

      button.addEventListener(
        "click",
        () => answerQuestion(index)
      );

      options.appendChild(button);

    }
  );
}


/* ==================================================
   ANSWER
================================================== */

function answerQuestion(index) {

  const q =
    questions[currentQuestion];

  answers.push({
    question: currentQuestion,
    answer: index,
    axis: q.axis
  });

  /*
    First option generally indicates
    stronger/high-energy behaviour.
  */

  const strength =
    4 - index;

  if (
    typeof scores[q.axis] !== "number"
  ) {

    scores[q.axis] = 0;
  }

  scores[q.axis] += strength;

  /*
    Option A receives an additional
    independence signal.
  */

  if (index === 0) {

    scores.independence += 2;

    streak++;

  } else {

    streak = 0;
  }

  currentQuestion++;

  renderQuestion();
}


/* ==================================================
   CALCULATE ARCHETYPE
================================================== */

function calculateArchetype() {

  let best =
    null;

  let bestScore =
    ["Your group project is falling apart.",
    ["Take command.","Calm everyone.","Fix my part quietly.","Try a different approach."],
    ["E","F","C","N"],"GROUP"],

  ["You discover an unknown campus place.",
    ["Explore immediately.","Send it to friends.","Observe first.","Map it mentally."],
    ["N","E","I","T"],"EXPLORATION"],

  ["Unexpected ₹1,000.",
    ["Save it.","Use it for an experience.","Buy something interesting.","Spend it with friends."],
    ["C","N","N","E"],"CHOICE"],

  ["Best compliment?",
    ["You're brilliant.","You're dependable.","You're interesting.","People feel comfortable with you."],
    ["T","C","N","F"],"SOCIAL"],

  ["Exam is seven days away.",
    ["Plan the week.","Wait for pressure.","Study with others.","Attack the hardest topic."],
    ["C","C","E","N"],"ACADEMIC"],

  ["Someone strongly disagrees with you.",
    ["Debate.","Ask why.","Let it go.","Find evidence."],
    ["T","F","F","T"],"SOCIAL"],

  ["More attractive?",
    ["Stable routine.","New challenge.","Crowded night.","Hard intellectual problem."],
    ["C","N","E","T"],"VIBE"],

  ["Nobody is watching. Default?",
    ["My own system.","Explore interests.","Contact someone.","Relax."],
    ["C","N","E","F"],"PRIVATE"],

  ["Lead strangers.",
    ["Organize.","Ask everyone.","Plan quietly.","Make it an adventure."],
    ["C","F","T","E"],"GROUP"],

  ["Which failure bothers you most?",
    ["Wasted potential.","Letting someone down.","Unable to adapt.","Not understanding why."],
    ["C","F","N","T"],"REFLECTION"],

  ["Pick a night.",
    ["Long conversation.","Solo project until 2 AM.","Spontaneous trip.","Early sleep + tomorrow plan."],
    ["F","T","N","C"],"NIGHT"],

  ["Closest statement?",
    ["I need novelty.","I need structure.","I need people.","I need ideas."],
    ["N","C","E","N"],"IDENTITY"],

  ["One machine button.",
    ["UNKNOWN","CLASSIFIED","ARCHIVE","OVERRIDE"],
    ["N","C","I","E"],"MACHINE"],

  ["A rule seems inefficient.",
    ["Follow it.","Question it.","Find a workaround.","Ask why it exists."],
    ["C","T","N","F"],"RULES"],

  ["Someone new joins your group.",
    ["Talk first.","Observe.","Ask about their interests.","Give them a task."],
    ["E","I","F","C"],"SOCIAL"],

  ["You get a free weekend.",
    ["Plan it.","Travel somewhere random.","Stay home and think.","Call everyone."],
    ["C","N","I","E"],"WEEKEND"],

  ["A debate becomes emotional.",
    ["Focus on facts.","Protect the relationship.","Leave it.","Find the underlying idea."],
    ["T","F","I","N"],"CONFLICT"],

  ["Your room is messy.",
    ["Fix it now.","Ignore it.","Create a system.","It is creatively organized."],
    ["C","N","C","O"],"ORDER"],

  ["A professor gives an ambiguous task.",
    ["Ask for criteria.","Experiment.","Research it.","Make my own interpretation."],
    ["C","N","N","T"],"ACADEMIC"],

  ["A friend needs advice.",
    ["Give a logical plan.","Listen first.","Tell them what I'd do.","Ask what they really want."],
    ["T","F","T","F"],"EMPATHY"],

  ["A new club appears.",
    ["Join immediately.","Investigate first.","Ask friends.","Probably not."],
    ["N","T","E","I"],"CAMPUS"],

  ["You have to choose quickly.",
    ["Gut feeling.","List pros/cons.","Ask someone.","Take the unusual option."],
    ["N","T","F","N"],"DECISION"],

  ["What makes a place memorable?",
    ["People.","Architecture.","Unexpected events.","Quiet atmosphere."],
    ["E","N","N","I"],"PLACE"],

  ["Your ideal teammate:",
    ["Reliable.","Creative.","Social.","Analytical."],
    ["C","N","E","T"],"TEAM"],

  ["You notice a pattern nobody else noticed.",
    ["Mention it.","Test it.","Keep observing.","Build a theory."],
    ["E","T","I","N"],"PATTERNS"],

  ["How do you react to routine?",
    ["It helps.","It suffocates.","I modify it.","I forget it exists."],
    ["C","N","N","I"],"ROUTINE"],

  ["Your ideal campus day:",
    ["Productive.","Exploratory.","Social.","Quiet and intellectual."],
    ["C","N","E","I"],"CAMPUS"],

  ["A strange idea appears.",
    ["Reject it.","Explore it.","Explain it.","Tell someone."],
    ["C","N","T","E"],"IDEAS"],

  ["Someone challenges your identity.",
    ["Defend it.","Question myself.","Laugh.","Ask what they mean."],
    ["T","I","E","F"],"IDENTITY"],

  ["Choose a fictional role.",
    ["Commander.","Scholar.","Explorer.","Mediator."],
    ["E","T","N","F"],"ROLE"],

  ["The machine gives you an unexplained result.",
    ["Trust the system.","Demand evidence.","Investigate.","Make a joke."],
    ["C","T","N","E"],"MACHINE"]
];


/* ============================================================
   36 FIXED ARCHETYPES
   ============================================================ */

const ARCHETYPES = [
["DER ENTDECKER","VP-01 / EXPLORATOR","Novelty is your natural habitat.",
[.94,.42,.72,.58,.82,.88,.74,.79,.68,.55,.91]],

["DER STRATEGE","VP-02 / STRATEGUS","You turn uncertainty into structure.",
[.78,.95,.43,.62,.35,.91,.48,.94,.31,.83,.71]],

["DER GELEHRTE","VP-03 / SCHOLARIS","You would like to understand the mechanism.",
[.97,.74,.38,.60,.39,.86,.56,.98,.42,.91,.96]],

["DER DIPLOMAT","VP-04 / MEDIATOR","You notice the social temperature before the room does.",
[.69,.58,.72,.96,.46,.52,.93,.62,.29,.35,.78]],

["DER ORGANISATOR","VP-05 / ORDINATOR","Order appears to have become a personal hobby.",
[.48,.98,.41,.69,.30,.86,.57,.67,.35,.74,.44]],

["DER REBELL","VP-06 / CONTRARIUS","You regard obvious instructions as a starting point.",
[.86,.47,.81,.52,.79,.94,.63,.69,.72,.71,.87]],

["DER BEOBACHTER","VP-07 / OBSERVATOR","You collect patterns before making your move.",
[.83,.66,.28,.70,.38,.92,.81,.91,.88,.77,.84]],

["DER NACHTDENKER","VP-08 / NOCTURNUS","Normal operating hours are merely a suggestion.",
[.91,.62,.45,.66,.71,.87,.58,.94,.79,.72,.91]],

["DER VISIONÄR","VP-09 / FUTURUS","You see the next version before the current one is finished.",
[.98,.55,.64,.59,.73,.91,.65,.96,.56,.69,.99]],

["DER KONSTRUKTEUR","VP-10 / FABRICATOR","Ideas become more interesting when they can be built.",
[.81,.88,.53,.57,.49,.90,.49,.88,.43,.81,.76]],

["DER VERMITTLER","VP-11 / CONCORDIA","You naturally search for the bridge between people.",
[.65,.57,.67,.98,.41,.54,.96,.58,.34,.31,.73]],

["DER IMPROVISATOR","VP-12 / AD-LIBITUM","You perform suspiciously well without a plan.",
[.79,.51,.86,.63,.77,.78,.71,.73,.41,.49,.88]],

["DER ANALYST","VP-13 / ANALYTICUS","Your instinct is to decompose the problem.",
[.86,.91,.37,.51,.34,.90,.44,.99,.54,.88,.82]],

["DER ABENTEURER","VP-14 / ADVENTURUS","A predictable weekend sounds like an administrative error.",
[.81,.39,.91,.54,.91,.89,.66,.68,.36,.43,.89]],

["DER IDEALIST","VP-15 / IDEALIS","You measure decisions against an internal standard.",
[.89,.63,.51,.88,.55,.80,.87,.78,.61,.25,.94]],

["DER SKEPTIKER","VP-16 / CRITICUS","Your default response to certainty is: prove it.",
[.83,.78,.36,.44,.31,.88,.42,.95,.76,.86,.78]],

["DER KOMMUNIKATOR","VP-17 / ORATOR","Conversation is both tool and playground.",
[.66,.54,.93,.76,.58,.62,.92,.65,.21,.29,.71]],

["DER PERFEKTIONIST","VP-18 / PERFECTUS","You noticed the flaw nobody asked about.",
[.72,.99,.39,.55,.37,.84,.54,.83,.68,.79,.64]],

["DER NOMADE","VP-19 / VAGABUND","You become restless when the map stops changing.",
[.88,.34,.82,.55,.84,.95,.59,.71,.70,.48,.93]],

["DER PRAGMATIKER","VP-20 / PRACTICUS","Useful beats impressive.",
[.52,.88,.61,.57,.43,.83,.52,.72,.39,.72,.55]],

["DER TRÄUMER","VP-21 / SOMNIATOR","Reality is acceptable; imagination is better.",
[.96,.43,.48,.74,.67,.83,.79,.89,.82,.19,.97]],

["DER UNTERNEHMER","VP-22 / INITIATOR","You see opportunities where other people see paperwork.",
[.78,.79,.84,.57,.68,.93,.67,.81,.28,.63,.83]],

["DER MENTOR","VP-23 / MAGISTER","You instinctively turn experience into guidance.",
[.67,.72,.54,.93,.38,.65,.98,.73,.74,.30,.79]],

["DER TAKTIKER","VP-24 / TACTICUS","You think three moves ahead, preferably quietly.",
[.74,.89,.46,.49,.34,.94,.51,.92,.72,.82,.69]],

["DER PHILOSOPH","VP-25 / PHILOSOPHUS","You have questions about the question.",
[.99,.52,.31,.66,.44,.92,.63,.99,.95,.88,.98]],

["DER EXPERIMENTATOR","VP-26 / EXPERIMENTUM","You learn by trying the thing.",
[.93,.61,.73,.55,.81,.87,.62,.86,.51,.56,.94]],

["DER EINZELGÄNGER","VP-27 / SOLITARIUS","You are perfectly capable of enjoying your own company.",
[.79,.64,.22,.49,.35,.97,.62,.87,.97,.73,.83]],

["DER NETZWERKER","VP-28 / CONNECTOR","You treat the campus like a graph of people.",
[.61,.53,.97,.78,.55,.64,.99,.67,.12,.24,.69]],

["DER TRADITIONALIST","VP-29 / TRADITIO","A proven system deserves a fair hearing.",
[.42,.91,.47,.72,.22,.68,.59,.61,.38,.72,.35]],

["DER OPTIMIST","VP-30 / OPTIMUS","Your default forecast is suspiciously positive.",
[.69,.58,.78,.87,.63,.71,.89,.61,.23,.22,.76]],

["DER KRITIKER","VP-31 / CENSOR","You see the weak assumption in the room.",
[.81,.82,.34,.39,.28,.86,.45,.96,.83,.91,.73]],

["DER KURATOR","VP-32 / CURATOR","You collect good things and arrange them into meaning.",
[.88,.71,.46,.73,.46,.82,.76,.88,.79,.48,.86]],

["DER PROVOKATEUR","VP-33 / PROVOCATOR","You occasionally improve a discussion by making it worse first.",
[.82,.45,.88,.43,.73,.95,.57,.79,.46,.76,.91]],

["DER ARCHITEKT","VP-34 / ARCHITECTUS","You prefer systems that survive their creator.",
[.84,.94,.44,.51,.31,.96,.47,.94,.57,.86,.77]],

["DER CHAOSMEISTER","VP-35 / CHAOTICUS","Somehow the disorder keeps producing results.",
[.75,.29,.87,.61,.88,.82,.70,.76,.40,.38,.90]],

["DER NAVIGATOR","VP-36 / NAVIGATOR","You adapt the route without losing the destination.",
[.77,.78,.71,.69,.66,.90,.73,.82,.45,.59,.84]]
];


/* ============================================================
   MACHINE DATA
   ============================================================ */

const KEY_VECTOR = {
  O:[1,0,0,0,0,.35,.15,.70,0,0,1],
  C:[0,1,0,0,0,.25,0,.45,0,0,0],
  E:[0,0,1,.20,0,0,.75,.10,-1,0,.10],
  A:[0,0,0,1,-.10,0,.90,0,0,-.45,.15],
  N:[.35,0,.10,-.10,1,.15,.15,.30,0,.05,.55],
  I:[0,0,-1,0,0,.55,.35,.45,1,0,.20],
  T:[0,0,0,-.35,0,.25,-.20,.90,0,1,.30],
  F:[0,0,0,.45,0,-.05,.75,.05,0,-1,.20],
  S:[-.25,.15,0,0,-.10,0,.15,.20,0,0,-1]
};

const DIM_VARIANCE =
  [.22,.19,.23,.20,.21,.24,.20,.18,.23,.22,.20];

const RESPONSE_STRENGTH = .075;


/* ============================================================
   FACTS
   ============================================================ */

const FACTS = [
  ["MACHINE OBSERVATION",
   "Your answer pattern contains a high curiosity signal. The machine has filed this under: potentially troublesome."],

  ["ARCHIVAL NOTE",
   "You selected an answer associated with novelty. Bureaucracy has been notified."],

  ["CAMPUS INTELLIGENCE",
   "SJT / Amazon was treated as a campus-vibe variable, not as universal psychological truth."],

  ["MATHEMATICAL FOOTNOTE",
   "The classifier compares you against every fixed archetype rather than stopping at the first plausible match."],

  ["TURING FILE",
   "The interface uses tape, symbols and state-machine ideas as a visual metaphor. The personality model itself is statistical."],

  ["JUNG FILE",
   "The Jung-inspired layer represents continuous tendencies rather than putting a person into one permanent box."],

  ["STATISTICAL NOTICE",
   "A match percentage is a model similarity score, not a probability that the archetype is objectively who you are."],

  ["CLASSIFIED",
   "The machine refuses to explain why it finds your browser-tab count psychologically significant."],

  ["AKTENNOTIZ",
   "You have successfully participated in an unnecessarily dramatic questionnaire."],

  ["CAMPUS REPORT",
   "Your classification is fictional. Your procrastination, if any, remains outside the jurisdiction of this machine."],

  ["RANDOM MEMORANDUM",
   "Somewhere, a spreadsheet is proud of you."],

  ["ARCHIVE",
   "The result was generated locally in your browser."],

  ["NOTICE",
   "The 36 characters are fixed. Your answers determine which one fits best."],

  ["ERROR 404",
   "Your childhood password was not requested. Please enjoy this rare victory."],

  ["OFFICIAL-SOUNDING FACT",
   "The more seriously the interface looks, the more suspicious you should be of the joke."],

  ["FIELD NOTE",
   "If three friends get three different archetypes, congratulations: the system has created an argument."],

  ["NIGHT SHIFT",
   "The machine has no opinion on whether 2:00 AM is an acceptable time to start studying."],

  ["FINAL NOTICE",
   "Your classification may be wrong. This is intentional humility, not a software bug."]
];


/* ============================================================
   STATE
   ============================================================ */

const state = {
  name: "",
  i: 0,
  profile: new Array(11).fill(.5),
  answers: [],
  answerTimes: [],
  best: null,
  ranking: [],
  match: 0,
  confidence: 0,
  factIndex: 0,
  startedAt: null
};


/* ============================================================
   SHORT DOM HELPER
   ============================================================ */

function $(id) {
  return document.getElementById(id);
}


/* ============================================================
   SCREEN SWITCHING
   ============================================================ */

function show(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = $(id);

  if (target) {
    target.classList.add("active");
    window.scrollTo(0,0);
  }
}


/* ============================================================
   START
   ============================================================ */

function beginMachine() {

  const nameInput = $("userName");

  state.name =
    nameInput && nameInput.value.trim()
      ? nameInput.value.trim()
      : "UNKNOWN SUBJECT";

  state.i = 0;
  state.answers = [];
  state.answerTimes = [];
  state.profile = new Array(11).fill(.5);
  state.startedAt = Date.now();

  localStorage.removeItem("vp_progress");

  if ($("resultName")) {
    $("resultName").textContent = state.name;
  }

  if ($("streak")) {
    $("streak").textContent = "CHAIN 0";
  }

  show("quiz");

  renderQuestion();
}


/* ============================================================
   QUESTION RENDERER
   ============================================================ */

function renderQuestion() {

  if (state.i >= QUESTIONS.length) {
    classify();
    return;
  }

  const q = QUESTIONS[state.i];

  if ($("progress")) {
    $("progress").textContent =
      `INPUT ${String(state.i + 1).padStart(2,"0")} / ${QUESTIONS.length}`;
  }

  if ($("progressText")) {
    $("progressText").textContent =
      `QUESTION ${state.i + 1} OF ${QUESTIONS.length}`;
  }

  if ($("progressPct")) {
    $("progressPct").textContent =
      `${Math.round(state.i / QUESTIONS.length * 100)}%`;
  }

  if ($("state")) {
    $("state").textContent = `STATE q${state.i}`;
  }

  if ($("domain")) {
    $("domain").textContent =
      `${q[3]} // INPUT SYMBOL`;
  }

  if ($("question")) {
    $("question").textContent = q[0];
  }

  if ($("machineNote")) {
    $("machineNote").textContent =
      "THE MACHINE RECORDS A SYMBOL. IT DOES NOT RECORD YOUR NAME.";
  }

  if ($("tape")) {
    $("tape").style.width =
      `${((state.i + 1) / QUESTIONS.length) * 100}%`;
  }

  const options = $("options");

  if (!options) return;

  options.innerHTML = "";

  q[1].forEach((text,index) => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";

    button.textContent =
      `${String.fromCharCode(65 + index)}  ${text}`;

    button.addEventListener("click", () => {
      answer(index,q[2][index]);
    });

    options.appendChild(button);
  });
}


/* ============================================================
   RECORD ANSWER
   ============================================================ */

function answer(optionIndex,key) {

  const now = Date.now();

  state.answerTimes.push(now);
  state.answers.push(optionIndex);

  const vector = vecForResponse(key,optionIndex);

  state.profile = state.profile.map((value,index) => {

    const evidence =
      vector[index] * RESPONSE_STRENGTH;

    return Math.max(
      .03,
      Math.min(.97,value + evidence)
    );
  });

  state.i++;

  localStorage.setItem(
    "vp_progress",
    JSON.stringify({
      i: state.i,
      answers: state.answers,
      name: state.name
    })
  );

  if ($("streak")) {
    $("streak").textContent =
      `CHAIN ${state.i}`;
  }

  if (state.i < QUESTIONS.length) {
    renderQuestion();
  } else {
    classify();
  }
}


/* ============================================================
   RESPONSE VECTOR
   ============================================================ */

function vecForResponse(key,position) {

  const base =
    KEY_VECTOR[key] || KEY_VECTOR.O;

  const multiplier =
    [1,.96,1.04,.98][position] || 1;

  return base.map(value => value * multiplier);
}


/* ============================================================
   NORMALIZE PROFILE
   ============================================================ */

function normalizeProfile() {

  return state.profile.map(value => {

    const x = (value - .5) * 2;

    const logistic =
      1 / (1 + Math.exp(-1.55 * x));

    return Math.max(
      .03,
      Math.min(.97,logistic)
    );
  });
}


/* ============================================================
   DISTANCE
   ============================================================ */

function mahalanobis(a,b) {

  let total = 0;

  for (let i=0;i<a.length;i++) {

    const z =
      (a[i] - b[i]) /
      DIM_VARIANCE[i];

    total += z * z;
  }

  return Math.sqrt(total / a.length);
}


/* ============================================================
   COSINE
   ============================================================ */

function cosine(a,b) {

  let dot = 0;
  let aa = 0;
  let bb = 0;

  for (let i=0;i<a.length;i++) {

    const x = a[i] - .5;
    const y = b[i] - .5;

    dot += x * y;
    aa += x * x;
    bb += y * y;
  }

  if (!aa || !bb) return 0;

  return dot /
    (Math.sqrt(aa) * Math.sqrt(bb));
}


/* ============================================================
   PEARSON
   ============================================================ */

function pearson(a,b) {

  const am =
    a.reduce((s,v)=>s+v,0) / a.length;

  const bm =
    b.reduce((s,v)=>s+v,0) / b.length;

  let numerator = 0;
  let da = 0;
  let db = 0;

  for (let i=0;i<a.length;i++) {

    const x = a[i] - am;
    const y = b[i] - bm;

    numerator += x*y;
    da += x*x;
    db += y*y;
  }

  if (!da || !db) return 0;

  return numerator /
    Math.sqrt(da * db);
}


/* ============================================================
   COMPATIBILITY
   ============================================================ */

function rawCompatibility(a,b) {

  const distance =
    mahalanobis(a,b);

  const cosineScore =
    (cosine(a,b) + 1) / 2;

  const pearsonScore =
    (pearson(a,b) + 1) / 2;

  return (
    .56 * Math.exp(-distance / 2.25) +
    .27 * cosineScore +
    .17 * pearsonScore
  );
}


/* ============================================================
   SOFTMAX
   ============================================================ */

function softmax(scores,temperature=.075) {

  const maximum =
    Math.max(...scores);

  const exponentials =
    scores.map(score =>
      Math.exp(
        (score - maximum) /
        temperature
      )
    );

  const total =
    exponentials.reduce(
      (a,b)=>a+b,
      0
    );

  return exponentials.map(
    value => value / total
  );
}


/* ============================================================
   CLASSIFY
   ============================================================ */

function classify() {

  state.profile =
    normalizeProfile();

  const scored =
    ARCHETYPES
      .map((archetype,index) => ({
        index,
        a: archetype,
        raw: rawCompatibility(
          state.profile,
          archetype[3]
        )
      }))
      .sort(
        (a,b) => b.raw - a.raw
      );

  const probabilities =
    softmax(
      scored.map(x => x.raw)
    );

  scored.forEach(
    (item,index) => {
      item.p = probabilities[index];
    }
  );

  state.ranking = scored;
  state.best = scored[0];

  const mean =
    scored.reduce(
      (sum,item)=>sum + item.raw,
      0
    ) / scored.length;

  const spread =
    Math.sqrt(
      scored.reduce(
        (sum,item)=>
          sum + Math.pow(item.raw - mean,2),
        0
      ) / scored.length
    ) || .001;

  const relative =
    Math.max(
      0,
      Math.min(
        1,
        .5 +
        .20 *
        (state.best.raw - mean) /
        spread
      )
    );

  state.match = relative;

  const margin =
    scored[0].p - scored[1].p;

  state.confidence =
    Math.min(
      1,
      .45 + margin * 2.2
    );

  renderResult();

  saveLocalResult();

  submitResearchData();

  show("result");
}


/* ============================================================
   RESULT
   ============================================================ */

function renderResult() {

  const archetype =
    state.best.a;

  if ($("resultName")) {
    $("resultName").textContent =
      state.name;
  }

  if ($("archetype")) {
    $("archetype").textContent =
      archetype[0];
  }

  if ($("archetypeCode")) {
    $("archetypeCode").textContent =
      archetype[1];
  }

  if ($("description")) {
    $("description").textContent =
      archetype[2];
  }

  if ($("matchScore")) {
    $("matchScore").textContent =
      (state.match * 100).toFixed(1);
  }

  renderBars(
    "jungStats",
    [
      ["INTROVERSION",1-state.profile[2]],
      ["EXTRAVERSION",state.profile[2]],
      ["THINKING",state.profile[9]],
      ["FEELING",1-state.profile[9]],
      ["SENSATION",1-state.profile[10]],
      ["INTUITION",state.profile[10]]
    ]
  );

  renderBars(
    "bigFive",
    [
      ["OPENNESS",state.profile[0]],
      ["CONSCIENTIOUSNESS",state.profile[1]],
      ["EXTRAVERSION",state.profile[2]],
      ["AGREEABLENESS",state.profile[3]],
      ["NEUROTICISM",state.profile[4]]
    ]
  );

  renderRanking();

  renderCampus();

  showFact();
}


/* ============================================================
   BARS
   ============================================================ */

function renderBars(id,data) {

  const container = $(id);

  if (!container) return;

  container.innerHTML = "";

  data.forEach(([label,value]) => {

    const row =
      document.createElement("div");

    row.className = "stat";

    const title =
      document.createElement("div");

    title.className = "stat-label";

    title.innerHTML =
      `<span>${label}</span>
       <span>${Math.round(value * 100)}%</span>`;

    const bar =
      document.createElement("div");

    bar.className = "stat-bar";

    const fill =
      document.createElement("i");

    fill.style.width =
      `${Math.round(value * 100)}%`;

    bar.appendChild(fill);

    row.appendChild(title);
    row.appendChild(bar);

    container.appendChild(row);
  });
}


/* ============================================================
   RANKING
   ============================================================ */

function renderRanking() {

  const container =
    $("ranking");

  if (!container) return;

  container.innerHTML = "";

  state.ranking
    .slice(0,7)
    .forEach((item,index) => {

      const row =
        document.createElement("div");

      row.className = "rank";

      const number =
        document.createElement("span");

      number.textContent =
        String(index + 1)
          .padStart(2,"0");

      const name =
        document.createElement("b");

      name.textContent =
        item.a[0];

      const percentage =
        document.createElement("span");

      percentage.textContent =
        `${(item.p * 100).toFixed(1)}%`;

      row.appendChild(number);
      row.appendChild(name);
      row.appendChild(percentage);

      container.appendChild(row);
    });
}


/* ============================================================
   CAMPUS SIGNALS
   ============================================================ */

function renderCampus() {

  const container =
    $("campusStats");

  if (!container) return;

  const categories = {
    CAMPUS: 0,
    SOCIAL: 0,
    ACADEMIC: 0,
    EXPLORATION: 0,
    GROUP: 0
  };

  QUESTIONS.forEach((question,index) => {

    const domain = question[3];

    if (domain in categories) {

      categories[domain] +=
        state.answers[index] + 1;
    }
  });

  const values =
    Object.entries(categories);

  const max =
    Math.max(
      ...values.map(x=>x[1]),
      1
    );

  renderBars(
    "campusStats",
    values.map(
      ([name,value]) =>
        [name,value/max]
    )
  );
}


/* ============================================================
   FACTS
   ============================================================ */

function showFact() {

  const fact =
    FACTS[state.factIndex % FACTS.length];

  if ($("factLabel")) {
    $("factLabel").textContent =
      fact[0];
  }

  if ($("fact")) {
    $("fact").textContent =
      fact[1];
  }
}


/* ============================================================
  
