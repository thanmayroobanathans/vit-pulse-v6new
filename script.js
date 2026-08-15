<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <title>Made by heldenmunt — Classification Machine</title>

  <link rel="stylesheet" href="style.css">

  <style>
    /* =========================================================
       TURING-ERA / CODEBREAKING MACHINE UI
       ========================================================= */

    :root {
      --paper: #d8d0b8;
      --paper-dark: #bcb49d;
      --ink: #171914;
      --muted: #59594d;
      --machine: #292b25;
      --machine-dark: #171914;
      --line: #777763;
      --green: #788a67;
      --red: #7b4136;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background:
        radial-gradient(
          circle at center,
          #34362e 0%,
          #1d1f1a 55%,
          #11120f 100%
        );
      color: var(--ink);
      font-family: Georgia, "Times New Roman", serif;
    }

    button,
    input {
      font-family: "Courier New", monospace;
    }

    /* =========================================================
       AUTH WALL
       ========================================================= */

    #login-screen {
      position: fixed;
      inset: 0;
      z-index: 999999;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 24px;

      background:
        repeating-linear-gradient(
          0deg,
          rgba(255,255,255,.015) 0px,
          rgba(255,255,255,.015) 1px,
          transparent 1px,
          transparent 4px
        ),
        radial-gradient(
          circle at center,
          #34362d,
          #161813 70%
        );

      color: var(--paper);
    }

    .login-machine {
      width: min(680px, 100%);

      padding: 44px;

      border: 1px solid #66675a;

      background:
        linear-gradient(
          rgba(255,255,255,.015),
          rgba(0,0,0,.08)
        ),
        #20221c;

      box-shadow:
        0 0 0 8px #11120f,
        0 0 0 9px #55564b,
        0 35px 100px rgba(0,0,0,.75);
    }

    .machine-label {
      margin-bottom: 34px;

      color: #9b9c8b;

      font-family: "Courier New", monospace;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    .machine-title {
      margin-bottom: 30px;

      font-family: "Courier New", monospace;
      font-size: clamp(38px, 8vw, 74px);
      font-weight: 900;
      line-height: .86;
      letter-spacing: -4px;

      text-transform: uppercase;
    }

    .login-machine p {
      max-width: 560px;

      color: #a7a695;

      line-height: 1.8;
      font-size: 15px;
    }

    #googleLogin {
      width: 100%;

      margin-top: 20px;
      padding: 17px;

      border: 1px solid #858675;

      background: var(--paper);
      color: #151611;

      font-family: "Courier New", monospace;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 2px;

      cursor: pointer;

      transition: .15s ease;
    }

    #googleLogin:hover {
      background: #eee8d5;
      transform: translateY(-1px);
    }

    #googleLogin:disabled {
      opacity: .5;
      cursor: wait;
    }

    .login-status {
      margin-top: 17px;

      color: #77786d;

      font-family: "Courier New", monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-align: center;
    }

    #application {
      display: none;
    }

    #application.authenticated {
      display: block;
    }

    /* =========================================================
       APPLICATION SHELL
       ========================================================= */

    #application {
      min-height: 100vh;
    }

    .grain {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;

      opacity: .13;

      background:
        repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 3px,
          rgba(255,255,255,.035) 4px
        );
    }

    main {
      width: min(1050px, calc(100% - 32px));
      margin: auto;
      padding-bottom: 100px;
    }

    /* =========================================================
       HEADER
       ========================================================= */

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 24px 0;

      border-bottom: 1px solid #55574d;

      color: var(--paper);
      font-family: "Courier New", monospace;
      font-size: 11px;
      letter-spacing: 2px;
    }

    header b {
      font-size: 15px;
      letter-spacing: 4px;
    }

    header span {
      color: #77796c;
      margin-left: 10px;
    }

    .online {
      display: flex;
      align-items: center;
      gap: 8px;

      color: #929683;
    }

    .online i {
      width: 7px;
      height: 7px;

      display: inline-block;

      border-radius: 50%;

      background: var(--green);

      box-shadow: 0 0 8px rgba(120,138,103,.7);
    }

    /* =========================================================
       SCREENS
       ========================================================= */

    .screen {
      display: none;
      padding-top: 70px;
    }

    .screen.active {
      display: block;
    }

    /* =========================================================
       HOME
       ========================================================= */

    #home {
      min-height: 760px;

      color: var(--paper);

      position: relative;
    }

    .machine-eye {
      width: 90px;
      height: 90px;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 35px;

      border: 1px solid #65675b;

      color: #9a9c8b;

      font-family: monospace;
      font-size: 42px;

      box-shadow:
        inset 0 0 30px rgba(0,0,0,.35);
    }

    .stamp {
      display: inline-block;

      padding: 8px 13px;

      border: 1px solid #77796b;

      color: #929382;

      font-family: "Courier New", monospace;
      font-size: 10px;
      letter-spacing: 3px;

      text-transform: uppercase;
    }

    #home h1 {
      max-width: 900px;

      margin: 28px 0;

      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(48px, 9vw, 105px);
      line-height: .87;
      letter-spacing: -5px;

      text-transform: uppercase;
    }

    #home h1 em {
      color: #858a78;
      font-style: normal;
    }

    .lead {
      max-width: 690px;

      color: #aaa995;

      font-size: 18px;
      line-height: 1.7;
    }

    .notice {
      max-width: 720px;

      margin: 35px 0;
      padding: 20px;

      border-left: 4px solid var(--green);

      background: rgba(0,0,0,.22);

      color: #aaa995;

      font-family: "Courier New", monospace;
      font-size: 12px;
      line-height: 1.7;
    }

    .notice b {
      color: #d2ccb7;
    }

    .auth-panel {
      margin: 25px 0;

      color: #8d927e;

      font-family: monospace;
      font-size: 11px;
      letter-spacing: 2px;
    }

    .name-box {
      max-width: 520px;

      margin: 28px 0;
    }

    .name-box label {
      display: block;

      margin-bottom: 9px;

      color: #858778;

      font-family: monospace;
      font-size: 10px;
      letter-spacing: 2px;
    }

    .name-box input {
      width: 100%;

      padding: 15px;

      border: 1px solid #66685c;
      outline: none;

      background: #1d1f1a;
      color: var(--paper);

      font-size: 14px;
    }

    .name-box input:focus {
      border-color: #9b9d8a;
    }

    .consent-row {
      display: flex;
      gap: 10px;

      max-width: 720px;

      color: #888a7d;

      font-family: monospace;
      font-size: 10px;
      line-height: 1.6;
    }

    .consent-row input {
      margin-top: 3px;
    }

    .primary,
    .secondary {
      padding: 14px 20px;

      border: 1px solid #77786c;

      font-family: "Courier New", monospace;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;

      cursor: pointer;

      transition: .15s ease;
    }

    .primary {
      margin-top: 25px;

      background: var(--paper);
      color: #161713;
    }

    .primary:hover {
      background: #f0ead6;
    }

    .secondary {
      background: transparent;
      color: var(--paper);
    }

    .secondary:hover {
      background: rgba(255,255,255,.06);
    }

    #home small {
      display: block;

      margin-top: 18px;

      color: #65675c;

      font-family: monospace;
      font-size: 9px;
      letter-spacing: 2px;
    }

    /* =========================================================
       QUIZ
       ========================================================= */

    #quiz {
      color: var(--paper);
    }

    .meta {
      display: flex;
      justify-content: space-between;

      color: #858778;

      font-family: monospace;
      font-size: 10px;
      letter-spacing: 2px;
    }

    .tape {
      height: 7px;

      margin: 12px 0 55px;

      border: 1px solid #515349;

      background: #10110e;
    }

    .tape i {
      display: block;

      width: 0;
      height: 100%;

      background: var(--green);

      transition: width .2s ease;
    }

    .terminal {
      position: relative;

      padding: 32px;

      border: 1px solid #66685c;

      background:
        repeating-linear-gradient(
          0deg,
          rgba(255,255,255,.012) 0px,
          rgba(255,255,255,.012) 1px,
          transparent 1px,
          transparent 5px
        ),
        #20221c;

      box-shadow:
        inset 0 0 50px rgba(0,0,0,.25),
        0 20px 70px rgba(0,0,0,.25);
    }

    .terminal-top {
      display: flex;
      justify-content: space-between;

      padding-bottom: 15px;
      margin-bottom: 35px;

      border-bottom: 1px dashed #5e6055;

      color: #7d8072;

      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1px;
    }

    #domain {
      color: #9b9d8a;

      font-family: monospace;
      font-size: 10px;
      letter-spacing: 3px;
    }

    #question {
      max-width: 850px;

      margin: 22px 0;

      color: #e0d9c4;

      font-size: clamp(28px, 5vw, 55px);
      line-height: 1;
      font-weight: normal;
    }

    .micro-prompt {
      margin-bottom: 28px;

      color: #77796e;

      font-family: monospace;
      font-size: 11px;
    }

    #options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .option {
      min-height: 70px;

      padding: 18px;

      border: 1px solid #5e6056;

      background: #292b25;
      color: #cbc5b2;

      text-align: left;

      font-family: "Courier New", monospace;
      font-size: 12px;

      cursor: pointer;

      transition: .12s ease;
    }

    .option:hover {
      border-color: #a1a38e;

      background: #33352e;

      transform: translateX(2px);
    }

    .question-foot {
      display: flex;
      justify-content: space-between;

      margin-top: 30px;

      color: #696b61;

      font-family: monospace;
      font-size: 9px;
      letter-spacing: 2px;
    }

    .machine-note,
    .micro-reveal {
      margin-top: 16px;

      color: #67695e;

      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1px;
    }

    /* =========================================================
       RESULT
       ========================================================= */

    #result {
      color: var(--paper);
    }

    .hero-result {
      padding: 55px 0;

      border-bottom: 1px solid #55574d;
    }

    .hero-result small,
    .panel > small {
      color: #77796c;

      font-family: monospace;
      font-size: 9px;
      letter-spacing: 3px;
    }

    .subject-name {
      margin: 8px 0 50px;

      color: #a1a391;

      font-family: monospace;
      font-size: 13px;
    }

    #archetype {
      margin: 18px 0 4px;

      color: #e2dbc7;

      font-size: clamp(44px, 8vw, 92px);
      line-height: .9;
      font-weight: normal;
      letter-spacing: -4px;
    }

    #archetypeCode {
      color: #77796d;

      font-family: monospace;
      font-size: 11px;
      letter-spacing: 2px;
    }

    .score {
      margin: 40px 0 20px;

      font-family: monospace;
    }

    #matchScore {
      font-size: clamp(48px, 8vw, 82px);
      color: #9ca58a;
    }

    .score small {
      color: #77796c;
    }

    #description {
      max-width: 680px;

      color: #aaa995;

      font-size: 18px;
      line-height: 1.7;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;

      margin-top: 20px;
    }

    .panel {
      margin-top: 15px;
      padding: 24px;

      border: 1px solid #57594e;

      background: rgba(0,0,0,.16);
    }

    .bar {
      margin-top: 18px;
    }

    .bar-label {
      display: flex;
      justify-content: space-between;

      color: #a7a695;

      font-family: monospace;
      font-size: 10px;
    }

    .bar-track {
      height: 5px;

      margin-top: 7px;

      background: #11120f;
    }

    .bar-fill {
      height: 100%;

      background: var(--green);
    }

    .rank {
      display: grid;
      grid-template-columns: 45px 1fr 70px;

      padding: 13px 0;

      border-bottom: 1px dashed #4e5046;

      color: #a8a796;

      font-family: monospace;
      font-size: 11px;
    }

    .rank b {
      color: #d0c9b6;
      font-weight: normal;
    }

    .fact {
      margin-top: 20px;
      padding: 25px;

      border: 1px solid #5e6054;

      background: #24261f;
    }

    .fact-label {
      color: #969985;

      font-family: monospace;
      font-size: 9px;
      letter-spacing: 3px;
    }

    .fact p {
      color: #b4af9e;

      line-height: 1.7;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      margin-top: 25px;
    }

    .method-note {
      margin-top: 30px;

      color: #686a60;

      font-family: monospace;
      font-size: 10px;
      line-height: 1.6;
    }

    .save-status,
    .share-status {
      margin-top: 15px;

      color: #89917a;

      font-family: monospace;
      font-size: 10px;
    }

    .share-box {
      display: none;

      margin-top: 25px;
    }

    .share-box label {
      display: block;

      margin-bottom: 7px;

      color: #77796c;

      font-family: monospace;
      font-size: 9px;
      letter-spacing: 2px;
    }

    .share-box input {
      width: 100%;

      padding: 13px;

      border: 1px solid #5e6056;

      background: #151612;
      color: #aaa995;
    }

    .privacy {
      margin-top: 40px;
      padding: 22px;

      border: 1px solid #45473e;

      color: #77796d;

      font-family: monospace;
      font-size: 10px;
      line-height: 1.6;
    }

    .privacy b {
      color: #999b8a;
    }

    /* =========================================================
       MOBILE
       ========================================================= */

    @media(max-width:700px) {

      main {
        width: min(100% - 22px, 1050px);
      }

      header span {
        display: none;
      }

      .screen {
        padding-top: 40px;
      }

      #home h1 {
        letter-spacing: -3px;
      }

      .terminal {
        padding: 20px;
      }

      #options {
        grid-template-columns: 1fr;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .login-machine {
        padding: 28px;
      }

      .machine-title {
        letter-spacing: -2px;
      }

      #archetype {
        letter-spacing: -2px;
      }
    }
  </style>
</head>

<body>

<!-- =========================================================
     AUTHENTICATION WALL
     ========================================================= -->

<div id="login-screen">

  <div class="login-machine">

    <div class="machine-label">
      CLASSIFICATION MACHINE / ACCESS CONTROL
    </div>

    <div class="machine-title">
      IDENTIFICATION<br>
      REQUIRED
    </div>

    <p>
      The machine requires an authenticated identity
      before the sequence can begin.
    </p>

    <button id="googleLogin">
      CONTINUE WITH GOOGLE
    </button>

    <div
      class="login-status"
      id="authStatus"
    >
      GOOGLE AUTHENTICATION REQUIRED
    </div>

  </div>

</div>


<!-- =========================================================
     APPLICATION
     ========================================================= -->

<div id="application">

  <div class="grain"></div>

  <main>

    <!-- HEADER -->

    <header>

      <div>
        <b>CLASSIFICATION MACHINE</b>
        <span>// PERSONNEL FILE</span>
      </div>

      <div class="online">
        <i></i>
        MACHINE ONLINE
      </div>

    </header>


    <!-- =====================================================
         HOME
         ===================================================== -->

    <section
      id="home"
      class="screen active"
    >

      <div class="machine-eye">
        ◉
      </div>

      <div class="stamp">
        FILE 0036 / PRIVATE EXPERIMENT
      </div>

      <h1>
        THE MACHINE<br>
        <em>HAS A THEORY</em><br>
        ABOUT YOU.
      </h1>

      <p class="lead">
        A computational personality experiment
        built around pattern recognition,
        symbolic inputs and a fixed library
        of fictional character profiles.
      </p>

      <div class="notice">

        <b>NOTICE TO SUBJECT</b>

        <br><br>

        This apparatus is entertainment/research
        software and is not a clinical diagnosis.

        <br><br>

        Classification occurs locally in the browser.
        Research participation is optional.

        <br><br>

        AUTHENTICATION REQUIRED.

      </div>


      <!-- USER -->

      <div
        class="auth-panel"
        id="authPanel"
      >
        AUTHENTICATED SUBJECT
      </div>


      <!-- NAME -->

      <div class="name-box">

        <label for="userName">
          SUBJECT NAME
        </label>

        <input
          id="userName"
          maxlength="40"
          autocomplete="name"
          placeholder="Enter your name"
        >

      </div>


      <!-- CONSENT -->

      <label class="consent-row">

        <input
          type="checkbox"
          id="dataConsent"
        >

        <span>
          I agree to send my answers and personality
          profile for research and model improvement.
        </span>

      </label>


      <button
        class="primary"
        id="begin"
      >
        BEGIN SEQUENCE →
      </button>


      <small>
        36 ARCHETYPES · 36 INPUTS · LOCAL CLASSIFICATION
      </small>

    </section>


    <!-- =====================================================
         QUIZ
         ===================================================== -->

    <section
      id="quiz"
      class="screen"
    >

      <div class="meta">

        <span id="progress">
          INPUT 01 / 36
        </span>

        <span id="state">
          STATE q0
        </span>

      </div>


      <div class="tape">
        <i id="tape"></i>
      </div>


      <div class="terminal">

        <div class="terminal-top">

          <span>
            SYMBOLIC PROCESS //
            READ → WRITE → MOVE
          </span>

          <span id="streak">
            CHAIN 0
          </span>

        </div>


        <label id="domain">
          INPUT DOMAIN
        </label>


        <h2 id="question"></h2>


        <div
          class="micro-prompt"
          id="microPrompt"
        >
          Select the response closest to your
          first instinct.
        </div>


        <div id="options"></div>


        <div class="question-foot">

          <span id="answerHint">
            NO WRONG ANSWER
          </span>

          <span id="responseTime">
            ~10 SEC
          </span>

        </div>

      </div>


      <div
        class="machine-note"
        id="machineNote"
      >
        THE MACHINE RECORDS A SYMBOL.
      </div>


      <div
        class="micro-reveal"
        id="microReveal"
      ></div>

    </section>


    <!-- =====================================================
         RESULT
         ===================================================== -->

    <section
      id="result"
      class="screen"
    >

      <div class="stamp">
        CLASSIFICATION COMPLETE
      </div>


      <div class="hero-result">

        <small>
          SUBJECT
        </small>

        <div
          class="subject-name"
          id="resultName"
        ></div>


        <small>
          PRIMARY CLASSIFICATION
        </small>

        <h1 id="archetype"></h1>

        <code id="archetypeCode"></code>


        <div class="score">

          <span id="matchScore">
            0
          </span>

          <small>
            % COMPATIBILITY
          </small>

        </div>


        <p id="description"></p>

      </div>


      <!-- PERSONALITY -->

      <div class="grid">

        <div class="panel">

          <small>
            JUNG-INSPIRED AXES
          </small>

          <div id="jungStats"></div>

        </div>


        <div class="panel">

          <small>
            PERSONALITY PROFILE
          </small>

          <div id="bigFive"></div>

        </div>

      </div>


      <!-- RANKING -->

      <div class="panel">

        <small>
          ARCHETYPE MATCH RANKING
        </small>

        <div id="ranking"></div>

      </div>


      <!-- CAMPUS -->

      <div class="panel">

        <small>
          CAMPUS SIGNALS
        </small>

        <div id="campusStats"></div>

      </div>


      <!-- FACT -->

      <div class="fact">

        <div
          class="fact-label"
          id="factLabel"
        >
          MACHINE OBSERVATION
        </div>

        <p id="fact"></p>

        <button
          class="secondary"
          id="nextFact"
        >
          ANOTHER RECORD →
        </button>

      </div>


      <!-- ACTIONS -->

      <div class="actions">

        <button
          class="primary"
          id="share"
        >
          SHARE RESULT
        </button>

        <button
          class="secondary"
          id="shareData"
        >
          SEND RESULT TO A FRIEND
        </button>

        <button
          class="secondary"
          id="saveImage"
        >
          SAVE RESULT CARD
        </button>

        <button
          class="secondary"
          id="again"
        >
          RUN AGAIN
        </button>

      </div>


      <div class="method-note">

        COMPATIBILITY SCORE = relative similarity
        across the fixed archetype library.
        It is not a clinical diagnosis or an
        absolute probability.

      </div>


      <div
        id="saveStatus"
        class="save-status"
      ></div>


      <!-- SHARE -->

      <div
        class="share-box"
        id="shareBox"
      >

        <label>
          RESULT LINK
        </label>

        <input
          id="shareLink"
          readonly
        >

        <button
          class="secondary"
          id="copyLink"
        >
          COPY LINK
        </button>

      </div>


      <p
        class="share-status"
        id="shareStatus"
      ></p>


      <!-- ANONYMOUS RESEARCH -->

      <div class="privacy">

        <b>
          OPTIONAL ANONYMOUS AGGREGATION
        </b>

        <p>
          Help calibrate future versions by sending
          only an anonymous response fingerprint
          and classification result.
          No name, email, phone number or raw
          free text is sent through this option.
        </p>


        <label>

          <input
            type="checkbox"
            id="optin"
          >

          I voluntarily opt in to anonymous
          aggregated research.

        </label>


        <button
          class="secondary"
          id="sendData"
        >
          SEND ANONYMOUS RESULT
        </button>


        <small id="sendStatus"></small>

      </div>


      <!-- ===================================================
           CREDIT
           =================================================== -->

      <div
        style="
          margin-top:80px;
          padding-top:25px;
          border-top:1px solid #46483f;
          color:#66685e;
          font-family:'Courier New',monospace;
          font-size:9px;
          letter-spacing:3px;
          text-align:center;
        "
      >
        MADE BY HELDENMUNT
      </div>

    </section>

  </main>

</div>


<!-- =========================================================
     FIREBASE
     ========================================================= -->

<script
  type="module"
  src="firebase-app.js"
></script>

<script
  type="module"
  src="auth-gate.js"
></script>

<script
  src="script.js"
  defer
></script>

</body>
</html>
