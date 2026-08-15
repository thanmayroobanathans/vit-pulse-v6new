/* VIT PULSE V3
   Browser-first classifier.
   Jung-inspired axes are interpretive; Big Five-inspired dimensions provide
   quantitative features. Archetypes are fictional and fixed.
   Anonymous aggregation is disabled until an operator supplies an endpoint.
*/

const QUESTIONS=[
["Two free hours on campus. Where do you go?",["Somewhere I have never been","A place with my people","A quiet place to think","Finish something"],["O","E","I","C"],"CAMPUS"],
["SJT / Amazon feels:",["Crowded and energetic","Social and convenient","Chaotic but useful","I avoid crowds"],["E","E","O","I"],"SJT / AMAZON"],
["A friend changes tonight's plan last minute.",["Excellent. Improvise.","Who is coming?","Why change it?","Give me details."],["N","E","C","C"],"SOCIAL"],
["A difficult optional problem appears.",["I have to solve it.","Maybe with friends.","Later.","I get curious immediately."],["T","E","C","N"],"ACADEMIC"],
["Which campus atmosphere attracts you?",["Busy and alive","Quiet and focused","Unpredictable","Organized"],["E","I","N","C"],"VIBE"],
["Your group project is falling apart.",["Take command.","Calm everyone.","Fix my part quietly.","Try a different approach."],["E","F","C","N"],"GROUP"],
["You discover an unknown campus place.",["Explore immediately.","Send it to friends.","Observe first.","Map it mentally."],["N","E","I","T"],"EXPLORATION"],
["Unexpected ₹1,000.",["Save it.","Use it for an experience.","Buy something interesting.","Spend it with friends."],["C","N","N","E"],"CHOICE"],
["Best compliment?",["You're brilliant.","You're dependable.","You're interesting.","People feel comfortable with you."],["T","C","N","F"],"SOCIAL"],
["Exam is seven days away.",["Plan the week.","Wait for pressure.","Study with others.","Attack the hardest topic."],["C","C","E","N"],"ACADEMIC"],
["Someone strongly disagrees with you.",["Debate.","Ask why.","Let it go.","Find evidence."],["T","F","F","T"],"SOCIAL"],
["More attractive?",["Stable routine.","New challenge.","Crowded night.","Hard intellectual problem."],["C","N","E","T"],"VIBE"],
["Nobody is watching. Default?",["My own system.","Explore interests.","Contact someone.","Relax."],["C","N","E","F"],"PRIVATE"],
["Lead strangers.",["Organize.","Ask everyone.","Plan quietly.","Make it an adventure."],["C","F","T","E"],"GROUP"],
["Which failure bothers you most?",["Wasted potential.","Letting someone down.","Unable to adapt.","Not understanding why."],["C","F","N","T"],"REFLECTION"],
["Pick a night.",["Long conversation.","Solo project until 2 AM.","Spontaneous trip.","Early sleep + tomorrow plan."],["F","T","N","C"],"NIGHT"],
["Closest statement?",["I need novelty.","I need structure.","I need people.","I need ideas."],["N","C","E","N"],"IDENTITY"],
["One machine button.",["UNKNOWN","CLASSIFIED","ARCHIVE","OVERRIDE"],["N","C","I","E"],"MACHINE"],
["A rule seems inefficient.",["Follow it.","Question it.","Find a workaround.","Ask why it exists."],["C","T","N","F"],"RULES"],
["Someone new joins your group.",["Talk first.","Observe.","Ask about their interests.","Give them a task."],["E","I","F","C"],"SOCIAL"],
["You get a free weekend.",["Plan it.","Travel somewhere random.","Stay home and think.","Call everyone."],["C","N","I","E"],"WEEKEND"],
["A debate becomes emotional.",["Focus on facts.","Protect the relationship.","Leave it.","Find the underlying idea."],["T","F","I","N"],"CONFLICT"],
["Your room is messy.",["Fix it now.","Ignore it.","Create a system.","It is creatively organized."],["C","N","C","O"],"ORDER"],
["A professor gives an ambiguous task.",["Ask for criteria.","Experiment.","Research it.","Make my own interpretation."],["C","N","N","T"],"ACADEMIC"],
["A friend needs advice.",["Give a logical plan.","Listen first.","Tell them what I'd do.","Ask what they really want."],["T","F","T","F"],"EMPATHY"],
["A new club appears.",["Join immediately.","Investigate first.","Ask friends.","Probably not."],["N","T","E","I"],"CAMPUS"],
["You have to choose quickly.",["Gut feeling.","List pros/cons.","Ask someone.","Take the unusual option."],["N","T","F","N"],"DECISION"],
["What makes a place memorable?",["People.","Architecture.","Unexpected events.","Quiet atmosphere."],["E","N","N","I"],"PLACE"],
["Your ideal teammate:",["Reliable.","Creative.","Social.","Analytical."],["C","N","E","T"],"TEAM"],
["You notice a pattern nobody else noticed.",["Mention it.","Test it.","Keep observing.","Build a theory."],["E","T","I","N"],"PATTERNS"],
["How do you react to routine?",["It helps.","It suffocates.","I modify it.","I forget it exists."],["C","N","N","I"],"ROUTINE"],
["Your ideal campus day:",["Productive.","Exploratory.","Social.","Quiet and intellectual."],["C","N","E","I"],"CAMPUS"],
["A strange idea appears.",["Reject it.","Explore it.","Explain it.","Tell someone."],["C","N","T","E"],"IDEAS"],
["Someone challenges your identity.",["Defend it.","Question myself.","Laugh.","Ask what they mean."],["T","I","E","F"],"IDENTITY"],
["Choose a fictional role.",["Commander.","Scholar.","Explorer.","Mediator."],["E","T","N","F"],"ROLE"],
["The machine gives you an unexplained result.",["Trust the system.","Demand evidence.","Investigate.","Make a joke."],["C","T","N","E"],"MACHINE"]
];


/* =========================================================
   36 FIXED FICTIONAL ARCHETYPES
   ========================================================= */

const ARCHETYPES=[
["DER ENTDECKER","VP-01 / EXPLORATOR","Novelty is your natural habitat.",[.94,.42,.72,.58,.82,.88,.74,.79,.68,.55,.91]],
["DER STRATEGE","VP-02 / STRATEGUS","You turn uncertainty into structure.",[.78,.95,.43,.62,.35,.91,.48,.94,.31,.83,.71]],
["DER GELEHRTE","VP-03 / SCHOLARIS","You would like to understand the mechanism.",[.97,.74,.38,.60,.39,.86,.56,.98,.42,.91,.96]],
["DER DIPLOMAT","VP-04 / MEDIATOR","You notice the social temperature before the room does.",[.69,.58,.72,.96,.46,.52,.93,.62,.29,.35,.78]],
["DER ORGANISATOR","VP-05 / ORDINATOR","Order appears to have become a personal hobby.",[.48,.98,.41,.69,.30,.86,.57,.67,.35,.74,.44]],
["DER REBELL","VP-06 / CONTRARIUS","You regard obvious instructions as a starting point.",[.86,.47,.81,.52,.79,.94,.63,.69,.72,.71,.87]],
["DER BEOBACHTER","VP-07 / OBSERVATOR","You collect patterns before making your move.",[.83,.66,.28,.70,.38,.92,.81,.91,.88,.77,.84]],
["DER NACHTDENKER","VP-08 / NOCTURNUS","Normal operating hours are merely a suggestion.",[.91,.62,.45,.66,.71,.87,.58,.94,.79,.72,.91]],
["DER VISIONÄR","VP-09 / FUTURUS","You see the next version before the current one is finished.",[.98,.55,.64,.59,.73,.91,.65,.96,.56,.69,.99]],
["DER KONSTRUKTEUR","VP-10 / FABRICATOR","Ideas become more interesting when they can be built.",[.81,.88,.53,.57,.49,.90,.49,.88,.43,.81,.76]],
["DER VERMITTLER","VP-11 / CONCORDIA","You naturally search for the bridge between people.",[.65,.57,.67,.98,.41,.54,.96,.58,.34,.31,.73]],
["DER IMPROVISATOR","VP-12 / AD-LIBITUM","You perform suspiciously well without a plan.",[.79,.51,.86,.63,.77,.78,.71,.73,.41,.49,.88]],
["DER ANALYST","VP-13 / ANALYTICUS","Your instinct is to decompose the problem.",[.86,.91,.37,.51,.34,.90,.44,.99,.54,.88,.82]],
["DER ABENTEURER","VP-14 / ADVENTURUS","A predictable weekend sounds like an administrative error.",[.81,.39,.91,.54,.91,.89,.66,.68,.36,.43,.89]],
["DER IDEALIST","VP-15 / IDEALIS","You measure decisions against an internal standard.",[.89,.63,.51,.88,.55,.80,.87,.78,.61,.25,.94]],
["DER SKEPTIKER","VP-16 / CRITICUS","Your default response to certainty is: prove it.",[.83,.78,.36,.44,.31,.88,.42,.95,.76,.86,.78]],
["DER KOMMUNIKATOR","VP-17 / ORATOR","Conversation is both tool and playground.",[.66,.54,.93,.76,.58,.62,.92,.65,.21,.29,.71]],
["DER PERFEKTIONIST","VP-18 / PERFECTUS","You noticed the flaw nobody asked about.",[.72,.99,.39,.55,.37,.84,.54,.83,.68,.79,.64]],
["DER NOMADE","VP-19 / VAGABUND","You become restless when the map stops changing.",[.88,.34,.82,.55,.84,.95,.59,.71,.70,.48,.93]],
["DER PRAGMATIKER","VP-20 / PRACTICUS","Useful beats impressive.",[.52,.88,.61,.57,.43,.83,.52,.72,.39,.72,.55]],
["DER TRÄUMER","VP-21 / SOMNIATOR","Reality is acceptable; imagination is better.",[.96,.43,.48,.74,.67,.83,.79,.89,.82,.19,.97]],
["DER UNTERNEHMER","VP-22 / INITIATOR","You see opportunities where other people see paperwork.",[.78,.79,.84,.57,.68,.93,.67,.81,.28,.63,.83]],
["DER MENTOR","VP-23 / MAGISTER","You instinctively turn experience into guidance.",[.67,.72,.54,.93,.38,.65,.98,.73,.74,.30,.79]],
["DER TAKTIKER","VP-24 / TACTICUS","You think three moves ahead, preferably quietly.",[.74,.89,.46,.49,.34,.94,.51,.92,.72,.82,.69]],
["DER PHILOSOPH","VP-25 / PHILOSOPHUS","You have questions about the question.",[.99,.52,.31,.66,.44,.92,.63,.99,.95,.88,.98]],
["DER EXPERIMENTATOR","VP-26 / EXPERIMENTUM","You learn by trying the thing.",[.93,.61,.73,.55,.81,.87,.62,.86,.51,.56,.94]],
["DER EINZELGÄNGER","VP-27 / SOLITARIUS","You are perfectly capable of enjoying your own company.",[.79,.64,.22,.49,.35,.97,.62,.87,.97,.73,.83]],
["DER NETZWERKER","VP-28 / CONNECTOR","You treat the campus like a graph of people.",[.61,.53,.97,.78,.55,.64,.99,.67,.12,.24,.69]],
["DER TRADITIONALIST","VP-29 / TRADITIO","A proven system deserves a fair hearing.",[.42,.91,.47,.72,.22,.68,.59,.61,.38,.72,.35]],
["DER OPTIMIST","VP-30 / OPTIMUS","Your default forecast is suspiciously positive.",[.69,.58,.78,.87,.63,.71,.89,.61,.23,.22,.76]],
["DER KRITIKER","VP-31 / CENSOR","You see the weak assumption in the room.",[.81,.82,.34,.39,.28,.86,.45,.96,.83,.91,.73]],
["DER KURATOR","VP-32 / CURATOR","You collect good things and arrange them into meaning.",[.88,.71,.46,.73,.46,.82,.76,.88,.79,.48,.86]],
["DER PROVOKATEUR","VP-33 / PROVOCATOR","You occasionally improve a discussion by making it worse first.",[.82,.45,.88,.43,.73,.95,.57,.79,.46,.76,.91]],
["DER ARCHITEKT","VP-34 / ARCHITECTUS","You prefer systems that survive their creator.",[.84,.94,.44,.51,.31,.96,.47,.94,.57,.86,.77]],
["DER CHAOSMEISTER","VP-35 / CHAOTICUS","Somehow the disorder keeps producing results.",[.75,.29,.87,.61,.88,.82,.70,.76,.40,.38,.90]],
["DER NAVIGATOR","VP-36 / NAVIGATOR","You adapt the route without losing the destination.",[.77,.78,.71,.69,.66,.90,.73,.82,.45,.59,.84]]
];


/* =========================================================
   MACHINE FACTS
   ========================================================= */

const FACTS=[
["MACHINE OBSERVATION","Your answer pattern contains a high curiosity signal. The machine has filed this under: 'potentially troublesome.'"],
["ARCHIVAL NOTE","You selected an answer associated with novelty. Bureaucracy has been notified."],
["CAMPUS INTELLIGENCE","SJT / Amazon was explicitly treated as a campus-vibe variable, not as a universal psychological truth."],
["MATHEMATICAL FOOTNOTE","The classifier compares you against every fixed archetype rather than stopping at the first plausible match."],
["TURING FILE","The interface is inspired by the idea of a machine reading symbols from a tape. The personality model itself is statistical, not a literal Turing machine."],
["JUNG FILE","The Jung-inspired layer uses continuous tendencies rather than claiming that a person fits one permanent box."],
["STATISTICAL NOTICE","A match percentage is a model similarity score, not the probability that the archetype is objectively 'who you are'."],
["CLASSIFIED","The machine refuses to explain why it finds your browser-tab count psychologically significant."],
["AKTENNOTIZ","You have successfully participated in an unnecessarily dramatic questionnaire."],
["CAMPUS REPORT","Your classification is fictional. Your procrastination, if any, remains outside the jurisdiction of this machine."],
["RANDOM MEMORANDUM","Somewhere, a spreadsheet is proud of you."],
["ARCHIVE","The result was generated locally in your browser. No server was needed to calculate the match."],
["NOTICE","The 36 characters are fixed. New users do not create new archetypes; they change the evidence available for future calibration."],
["PROBABILITY OFFICE","Bayesian-style priors can be updated from aggregate opt-in data in future model versions."],
["COVARIANCE DEPARTMENT","Correlated dimensions are treated as correlated. The machine takes this extremely seriously."],
["ERROR 404","Your childhood password was not requested. Please enjoy this rare victory."],
["OFFICIAL-SOUNDING FACT","The more seriously the interface looks, the more suspicious you should be of the joke."],
["FIELD NOTE","If three friends get three different archetypes, congratulations: the system has created an argument."],
["NIGHT SHIFT","The machine has no opinion on whether 2:00 AM is an acceptable time to start studying."],
["FINAL NOTICE","Your classification may be wrong. This is intentional humility, not a software bug."]
];


/* =========================================================
   STATE
   ========================================================= */

const state={
  name:"",
  i:0,
  profile:new Array(11).fill(.5),
  answers:[],
  answerTimes:[],
  best:null,
  match:0,
  confidence:0,
  factIndex:0,
  startedAt:null
};

const $=id=>document.getElementById(id);


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function show(id){
  document
    .querySelectorAll(".screen")
    .forEach(x=>x.classList.remove("active"));

  const target=$(id);

  if(target){
    target.classList.add("active");
  }

  scrollTo(0,0);
}


/* =========================================================
   QUESTION RENDERING
   ========================================================= */

function renderQuestion(){

  if($("progressText")){
    $("progressText").textContent=
      `QUESTION ${state.i+1} OF ${QUESTIONS.length}`;
  }

  if($("progressPct")){
    $("progressPct").textContent=
      `${Math.round(state.i/QUESTIONS.length*100)}%`;
  }

  const q=QUESTIONS[state.i];

  $("progress").textContent=
    `INPUT ${String(state.i+1).padStart(2,"0")} / ${QUESTIONS.length}`;

  $("state").textContent=
    `STATE q${state.i}`;

  $("tape").style.width=
    `${(state.i+1)/QUESTIONS.length*100}%`;

  $("domain").textContent=
    q[3]+" // INPUT SYMBOL";

  $("question").textContent=
    q[0];

  $("machineNote").textContent=
    "THE MACHINE RECORDS A SYMBOL. IT DOES NOT RECORD YOUR NAME.";

  $("options").innerHTML="";

  q[1].forEach((text,j)=>{

    const b=document.createElement("button");

    b.className="option";

    b.textContent=
      `${String.fromCharCode(65+j)}  ${text}`;

    b.onclick=()=>{
      answer(j,q[2][j]);
    };

    $("options").appendChild(b);

  });
}


/* =========================================================
   MATCH ENGINE
   ========================================================= */

const DIMENSIONS=[
  "O",
  "C",
  "E",
  "A",
  "N",
  "AUTONOMY",
  "SOCIAL_INTUITION",
  "INTELLECT",
  "INTROVERSION",
  "THINKING",
  "INTUITION"
];

const KEY_VECTOR={

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

const DIM_VARIANCE=[
  .22,.19,.23,.20,.21,.24,.20,.18,.23,.22,.20
];

const PRIOR_MEAN=
  new Array(11).fill(.5);

const RESPONSE_STRENGTH=.075;


/* =========================================================
   RESPONSE VECTOR
   ========================================================= */

function vecForResponse(key,optionIndex){

  const base=
    KEY_VECTOR[key] || KEY_VECTOR.O;

  const position=
    [1.00,.96,1.04,.98][optionIndex] || 1;

  return base.map(v=>v*position);
}


/* =========================================================
   NORMALIZE
   ========================================================= */

function normalizeProfile(){

  return state.profile.map(v=>{

    const x=(v-.5)*2;

    return Math.max(
      .03,
      Math.min(
        .97,
        1/(1+Math.exp(-1.55*x))
      )
    );

  });
}


/* =========================================================
   ANSWER
   ========================================================= */

function answer(j,key){

  state.answerTimes.push(Date.now());

  localStorage.setItem(
    "vp_progress",
    JSON.stringify({
      i:state.i+1,
      answers:state.answers.concat(j),
      name:state.name
    })
  );

  state.answers.push(j);

  const rv=
    vecForResponse(key,j);

  state.profile=
    state.profile.map((v,k)=>{

      const evidence=
        rv[k]*RESPONSE_STRENGTH;

      return Math.max(
        .03,
        Math.min(
          .97,
          v+evidence
        )
      );

    });

  state.i++;

  if(state.i<QUESTIONS.length){

    renderQuestion();

  }else{

    classify();

  }
}


/* =========================================================
   DISTANCE FUNCTIONS
   ========================================================= */

function standardized(a,b){

  return a.map(
    (v,k)=>
      (v-b[k])/DIM_VARIANCE[k]
  );

}

function mahalanobis(a,b){

  const z=
    standardized(a,b);

  return Math.sqrt(
    z.reduce(
      (s,v)=>s+v*v,
      0
    )/a.length
  );

}

function cosine(a,b){

  let dot=0;
  let aa=0;
  let bb=0;

  for(let k=0;k<a.length;k++){

    const x=a[k]-.5;
    const y=b[k]-.5;

    dot+=x*y;
    aa+=x*x;
    bb+=y*y;

  }

  return aa&&bb
    ?dot/(Math.sqrt(aa)*Math.sqrt(bb))
    :0;

}

function pearson(a,b){

  const am=
    a.reduce((s,v)=>s+v,0)/a.length;

  const bm=
    b.reduce((s,v)=>s+v,0)/b.length;

  let num=0;
  let da=0;
  let db=0;

  for(let k=0;k<a.length;k++){

    const x=a[k]-am;
    const y=b[k]-bm;

    num+=x*y;
    da+=x*x;
    db+=y*y;

  }

  return da&&db
    ?num/Math.sqrt(da*db)
    :0;

}


/* =========================================================
   COMPATIBILITY
   ========================================================= */

function rawCompatibility(a,b){

  const d=
    mahalanobis(a,b);

  const c=
    (cosine(a,b)+1)/2;

  const r=
    (pearson(a,b)+1)/2;

  return(
    .56*Math.exp(-d/2.25)+
    .27*c+
    .17*r
  );

}


/* =========================================================
   SOFTMAX
   ========================================================= */

function softmax(scores,temperature=.075){

  const m=
    Math.max(...scores);

  const ex=
    scores.map(
      s=>Math.exp(
        (s-m)/temperature
      )
    );

  const z=
    ex.reduce(
      (a,b)=>a+b,
      0
    );

  return ex.map(
    v=>v/z
  );

}


/* =========================================================
   FIRESTORE RESEARCH SAVE
   =========================================================
   
   FIXED SECTION:
   - Requires consent
   - Requires Firebase
   - Requires authenticated Google user
   - Writes to participants/{uid}
   - Uses merge:true
   - Logs the actual Firebase error
   ========================================================= */

async function submitResearchData(){

  const consent=
    $("dataConsent")?.checked;

  if(!consent){

    if($("saveStatus")){
      $("saveStatus").textContent=
        "RESEARCH CONSENT NOT GIVEN.";
    }

    return;
  }


  const fb=
    window.VP_FIREBASE;

  const user=
    window.VP_USER;


  /* Firebase module not ready */

  if(!fb){

    console.error(
      "VIT PULSE: Firebase is not available."
    );

    if($("saveStatus")){
      $("saveStatus").textContent=
        "FIREBASE NOT READY.";
    }

    return;
  }


  /* Google authentication user missing */

  if(!user){

    console.error(
      "VIT PULSE: No authenticated Firebase user."
    );

    if($("saveStatus")){
      $("saveStatus").textContent=
        "AUTHENTICATION USER NOT FOUND.";
    }

    return;
  }


  try{

    console.log(
      "VIT PULSE: Saving participant:",
      user.uid
    );


    const participantRef=
      fb.doc(
        fb.db,
        "participants",
        user.uid
      );


    await fb.setDoc(
      participantRef,
      {

        uid:user.uid,

        name:
          state.name ||
          "Anonymous Subject",

        answers:
          state.answers,

        features:
          state.profile,

        archetype:
          state.best?.a?.[0] ||
          null,

        archetypeCode:
          state.best?.a?.[1] ||
          null,

        compatibility:
          Number(
            $("matchScore")?.textContent || 0
          ),

        confidence:
          state.confidence,

        modelVersion:
          "v5",

        questionCount:
          QUESTIONS.length,

        completedAt:
          fb.serverTimestamp()

      },
      {
        merge:true
      }
    );


    console.log(
      "VIT PULSE: Firestore save successful:",
      user.uid
    );


    if($("saveStatus")){

      $("saveStatus").textContent=
        "PROFILE SAVED FOR RESEARCH.";

    }


  }catch(error){

    console.error(
      "VIT PULSE: Firestore save failed:",
      error
    );


    if($("saveStatus")){

      $("saveStatus").textContent=
        "RESULT CREATED. RESEARCH SAVE FAILED.";

    }

  }

}


/* =========================================================
   CLASSIFICATION
   ========================================================= */

function classify(){

  state.profile=
    normalizeProfile();


  const scored=
    ARCHETYPES
      .map((a,idx)=>({

        idx,
        a,

        raw:
          rawCompatibility(
            state.profile,
            a[3]
          )

      }))
      .sort(
        (x,y)=>y.raw-x.raw
      );


  const posterior=
    softmax(
      scored.map(
        x=>x.raw
      )
    );


  scored.forEach(
    (x,i)=>{
      x.p=
        posterior[i];
    }
  );


  state.best=
    scored[0];


  const mean=
    scored.reduce(
      (s,x)=>s+x.raw,
      0
    )/scored.length;


  const spread=
    Math.sqrt(
      scored.reduce(
        (s,x)=>
          s+(x.raw-mean)**2,
        0
      )/scored.length
    )||.001;


  const relative=
    Math.max(
      0,
      Math.min(
        1,
        .5+
        .20*
        (state.best.raw-mean)/
        spread
      )
    );


  state.match=
    relative;


  const top2=
    scored.slice(0,2);


  const margin=
    Math.max(
      0,
      top2[0].p-top2[1].p
    );


  state.confidence=
    Math.min(
      1,
      .45+margin*2.2
    );


  const a=
    state.best.a;


  $("archetype").textContent=
    a[0];

  $("archetypeCode").textContent=
    a[1];

  $("description").textContent=
    a[2];

  $("matchScore").textContent=
    (state.match*100).toFixed(1);


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


  $("ranking").innerHTML=
    scored
      .slice(0,7)
      .map(
        (x,n)=>
          `<div class="rank">
            <span>${String(n+1).padStart(2,"0")}</span>
            <b>${x.a[0]}</b>
            <span>${(x.p*100).toFixed(1)}%</span>
          </div>`
      )
      .join("");


  const campus=[

    [
      "SJT / AMAZON",
      Math.round(
        state.profile[2]*65+
        state.profile[0]*35
      )+"%"
    ],

    [
      "SOCIAL ENERGY",
      Math.round(
        state.profile[2]*100
      )+"%"
    ],

    [
      "NOVELTY SEEKING",
      Math.round(
        state.profile[4]*70+
        state.profile[0]*30
      )+"%"
    ],

    [
      "STRUCTURE",
      Math.round(
        state.profile[1]*100
      )+"%"
    ],

    [
      "INTELLECTUAL CURIOSITY",
      Math.round(
        state.profile[7]*100
      )+"%"
    ]

  ];


  $("campusStats").innerHTML=
    campus
      .map(
        x=>
          `<div class="campus">
            <span>${x[0]}</span>
            <b>${x[1]}</b>
          </div>`
      )
      .join("");


  if($("machineNote")){

    $("machineNote").textContent=
      `TOP-MATCH MARGIN ${(margin*100).toFixed(1)}% // RELATIVE CONFIDENCE ${(state.confidence*100).toFixed(1)}%`;

  }


  state.factIndex=
    Math.floor(
      Math.random()*FACTS.length
    );


  renderFact();

  show("result");


  /*
     IMPORTANT:
     Save only AFTER the result has been calculated
     and the authenticated user is available.
  */

  await submitResearchData();


  localStorage.removeItem(
    "vp_progress"
  );

}


/* =========================================================
   RESULT BARS
   ========================================================= */

function renderBars(id,data){

  const el=$(id);

  if(!el)return;

  el.innerHTML=
    data
      .map(
        x=>
          `<div class="barrow">
            <span>${x[0]}</span>
            <div class="bar">
              <i style="width:${Math.round(x[1]*100)}%"></i>
            </div>
            <span>${Math.round(x[1]*100)}</span>
          </div>`
      )
      .join("");

}


/* =========================================================
   FACTS
   ========================================================= */

function renderFact(){

  const f=
    FACTS[
      state.factIndex%FACTS.length
    ];

  $("factLabel").textContent=
    f[0];

  $("fact").textContent=
    f[1];

}


/* =========================================================
   BEGIN
   ========================================================= */

$("begin").onclick=()=>{

  state.name=
    $("userName").value.trim() ||
    "Anonymous Subject";

  $("resultName").textContent=
    state.name;

  state.i=0;

  state.profile=
    new Array(11).fill(.5);

  state.answers=[];

  state.answerTimes=[];

  state.best=null;

  state.match=0;

  state.confidence=0;

  state.startedAt=
    Date.now();

  show("quiz");

  renderQuestion();

};


/* =========================================================
   AGAIN
   ========================================================= */

$("again").onclick=()=>{
  $("begin").click();
};


/* =========================================================
   NEXT FACT
   ========================================================= */

$("nextFact").onclick=()=>{

  state.factIndex=
    (
      state.factIndex+
      1+
      Math.floor(Math.random()*3)
    )%FACTS.length;

  renderFact();

};


/* =========================================================
   SHARE
   ========================================================= */

function resultPayload(){

  return{

    name:state.name,

    archetype:
      $("archetype").textContent,

    score:
      $("matchScore").textContent,

    code:
      $("archetypeCode").textContent,

    confidence:
      state.confidence
        ?Math.round(
          state.confidence*100
        )
        :null,

    version:"v4"

  };

}


function makeShareUrl(){

  const p=
    resultPayload();

  const data=
    btoa(
      unescape(
        encodeURIComponent(
          JSON.stringify(p)
        )
      )
    );

  return(
    location.href.split("#")[0]+
    "#result="+
    data
  );

}


$("share").onclick=
  async()=>{

    const t=
      `${state.name} was classified as ${$("archetype").textContent} — ${$("matchScore").textContent}% match. The machine has spoken.`;

    const u=
      makeShareUrl();

    try{

      if(navigator.share){

        await navigator.share({
          title:"VIT PULSE — Classification",
          text:t,
          url:u
        });

      }else{

        await navigator.clipboard.writeText(
          t+" "+u
        );

        $("shareStatus").textContent=
          "RESULT LINK COPIED.";

      }

    }catch(e){

      $("shareStatus").textContent=
        "SHARE CANCELLED.";

    }

  };


$("shareData").onclick=
  async()=>{

    const u=
      makeShareUrl();

    $("shareBox").classList.add("active");

    $("shareLink").value=
      u;

    try{

      await navigator.clipboard.writeText(u);

      $("shareStatus").textContent=
        "RESULT LINK COPIED — SEND IT TO A FRIEND.";

    }catch(e){}

  };


$("copyLink").onclick=
  async()=>{

    await navigator.clipboard.writeText(
      $("shareLink").value
    );

    $("shareStatus").textContent=
      "LINK COPIED.";

  };


/* =========================================================
   SAVE IMAGE
   ========================================================= */

$("saveImage").onclick=
  async()=>{

    try{

      const canvas=
        document.createElement("canvas");

      const ctx=
        canvas.getContext("2d");

      canvas.width=1200;

      canvas.height=760;

      ctx.fillStyle="#080908";

      ctx.fillRect(
        0,
        0,
        1200,
        760
      );

      ctx.fillStyle="#ebe5d5";

      ctx.font=
        "bold 46px Arial";

      ctx.fillText(
        "VIT PULSE",
        70,
        90
      );

      ctx.fillStyle="#c94236";

      ctx.font=
        "bold 78px Arial";

      ctx.fillText(
        $("archetype").textContent,
        70,
        230
      );

      ctx.fillStyle="#ebe5d5";

      ctx.font=
        "28px monospace";

      ctx.fillText(
        state.name,
        70,
        300
      );

      ctx.font=
        "bold 80px Arial";

      ctx.fillText(
        $("matchScore").textContent+"%",
        70,
        430
      );

      ctx.font=
        "22px monospace";

      ctx.fillText(
        "PSYCHOLOGICAL CLASSIFICATION // V4",
        70,
        510
      );

      ctx.fillText(
        "JUNG-INSPIRED · STATISTICAL · FICTIONAL",
        70,
        550
      );

      const a=
        document.createElement("a");

      a.download=
        "vit-pulse-result.png";

      a.href=
        canvas.toDataURL("image/png");

      a.click();

      $("shareStatus").textContent=
        "RESULT CARD CREATED.";

    }catch(e){

      console.error(e);

      $("shareStatus").textContent=
        "IMAGE EXPORT FAILED.";

    }

  };


/* =========================================================
   ANONYMOUS AGGREGATION
   ========================================================= */

$("sendData").onclick=
  async()=>{

    if(!$("optin").checked){

      $("sendStatus").textContent=
        "OPT-IN REQUIRED. NOTHING WAS SENT.";

      return;

    }


    const AGGREGATION_ENDPOINT="";


    const payload={

      version:"v3",

      archetype:
        state.best?.a?.[0]||null,

      score:
        Math.round(
          state.match*1000
        )/1000,

      answersHash:
        await hash(
          JSON.stringify(
            state.answers
          )
        ),

      createdAt:
        new Date().toISOString()

    };


    if(!AGGREGATION_ENDPOINT){

      $("sendStatus").textContent=
        "LOCAL DEMO: aggregation endpoint is not configured, so nothing was sent.";

      return;

    }


    try{

      await fetch(
        AGGREGATION_ENDPOINT,
        {
          method:"POST",
          headers:{
            "Content-Type":
              "application/json"
          },
          body:
            JSON.stringify(payload),
          keepalive:true
        }
      );

      $("sendStatus").textContent=
        "ANONYMOUS AGGREGATE SUBMITTED.";

    }catch(e){

      $("sendStatus").textContent=
        "SUBMISSION FAILED. NOTHING ELSE WAS RETRIED.";

    }

  };


/* =========================================================
   HASH
   ========================================================= */

async function hash(s){

  const b=
    new TextEncoder().encode(s);

  const h=
    await crypto.subtle.digest(
      "SHA-256",
      b
    );

  return[
    ...new Uint8Array(h)
  ]
    .map(
      x=>x.toString(16).padStart(2,"0")
    )
    .join("");

}


/* =========================================================
   SHARED RESULT
   ========================================================= */

function loadShared(){

  const m=
    location.hash.match(
      /^#result=(.+)$/
    );

  if(!m)return;


  try{

    const p=
      JSON.parse(
        decodeURIComponent(
          escape(
            atob(m[1])
          )
        )
      );


    state.name=
      p.name ||
      "Shared Subject";


    $("resultName").textContent=
      state.name;


    $("archetype").textContent=
      p.archetype ||
      "UNKNOWN";


    $("archetypeCode").textContent=
      p.code ||
      "SHARED";


    $("matchScore").textContent=
      p.score ||
      "—";


    $("description").textContent=
      "This result was shared with you. Run the machine yourself to receive a complete personal dossier.";


    $("jungStats").innerHTML="";

    $("bigFive").innerHTML="";

    $("ranking").innerHTML=
      `<div class="rank">
        <span>01</span>
        <b>${p.archetype}</b>
        <span>${p.score}%</span>
      </div>`;


    $("campusStats").innerHTML="";


    state.factIndex=
      Math.floor(
        Math.random()*FACTS.length
      );


    renderFact();

    show("result");


  }catch(e){

    console.error(
      "Shared result error:",
      e
    );

  }

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  ()=>{

    const n=
      localStorage.getItem(
        "vp_name"
      );

    if(
      n &&
      $("userName")
    ){

      $("userName").value=n;

    }

  }
);


/* =========================================================
   LOAD SHARED RESULT
   ========================================================= */

loadShared();
