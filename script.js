const QUESTIONS=[
  [
    "You've got two completely free hours on campus. No class. No deadline. Nobody expecting you. What happens next?",
    [
      "I go somewhere I've never been.",
      "I call/find my people.",
      "I disappear somewhere quiet.",
      "I use the time to finish something."
    ],
    ["O","E","I","C"],
    "CAMPUS"
  ],

  [
    "You're walking past SJT / Amazon. It's crowded, loud and full of people. Your first reaction?",
    [
      "This is alive. I like it.",
      "Perfect place to meet someone.",
      "Chaotic, but useful.",
      "I'm going somewhere quieter."
    ],
    ["E","E","O","I"],
    "SJT / AMAZON"
  ],

  [
    "It's 7 PM. You already have plans. Then your friend texts: \"Change of plan. Trust me.\"",
    [
      "Absolutely. Let's improvise.",
      "Who's coming?",
      "Why are we changing it?",
      "Give me the details first."
    ],
    ["N","E","C","C"],
    "SOCIAL"
  ],

  [
    "You're doing something difficult when an optional problem appears. Nobody expects you to solve it.",
    [
      "Now I have to solve it.",
      "I'll try it with someone.",
      "Maybe later.",
      "Wait... how does this actually work?"
    ],
    ["T","E","C","N"],
    "ACADEMIC"
  ],

  [
    "Imagine tomorrow is a completely free day. Which version sounds most attractive?",
    [
      "A busy campus full of things happening.",
      "A quiet place where I can focus.",
      "Something unpredictable.",
      "A day with a clear structure."
    ],
    ["E","I","N","C"],
    "VIBE"
  ],

  [
    "Your group project is quietly collapsing. Nobody is taking responsibility. What do you do?",
    [
      "Fine. I'll take command.",
      "First, I'll calm everyone down.",
      "I'll quietly make sure my part is done.",
      "Let's throw out the approach and try something else."
    ],
    ["E","F","C","N"],
    "GROUP"
  ],

  [
    "You discover a part of campus you've never seen before. Nobody is around.",
    [
      "I'm exploring it immediately.",
      "I'm sending this to my friends.",
      "I'll look around first.",
      "I'm already building a mental map."
    ],
    ["N","E","I","T"],
    "EXPLORATION"
  ],

  [
    "Someone suddenly gives you ₹1,000 and says: \"Do whatever you want with it.\" What's your instinct?",
    [
      "Save it.",
      "Turn it into an experience.",
      "Buy something I've been curious about.",
      "Spend it with friends."
    ],
    ["C","N","N","E"],
    "CHOICE"
  ],

  [
    "Someone compliments you. Which one actually sticks with you?",
    [
      "\"You're brilliant.\"",
      "\"You're dependable.\"",
      "\"You're interesting.\"",
      "\"People feel comfortable around you.\""
    ],
    ["T","C","N","F"],
    "SOCIAL"
  ],

  [
    "Your exam is exactly seven days away. You open your notes. What's your first instinct?",
    [
      "Make a plan for the whole week.",
      "Wait until the pressure kicks in.",
      "Find someone to study with.",
      "Go straight for the hardest topic."
    ],
    ["C","C","E","N"],
    "ACADEMIC"
  ],

  [
    "Someone strongly disagrees with something you believe. What happens next?",
    [
      "Let's debate it.",
      "I want to know why they think that.",
      "Not worth the argument.",
      "Let's find the evidence."
    ],
    ["T","F","F","T"],
    "SOCIAL"
  ],

  [
    "You have a completely free evening. Which option pulls you in?",
    [
      "Something stable and familiar.",
      "A new challenge.",
      "A crowded night out.",
      "A difficult intellectual problem."
    ],
    ["C","N","E","T"],
    "VIBE"
  ],

  [
    "Nobody is watching. Nobody will judge you. What's your default mode?",
    [
      "I follow my own system.",
      "I explore whatever interests me.",
      "I contact someone.",
      "I just relax."
    ],
    ["C","N","E","F"],
    "PRIVATE"
  ],

  [
    "You're suddenly asked to lead a group of strangers. You have almost no preparation.",
    [
      "I'll organize everyone.",
      "I'll ask what everyone thinks.",
      "I'll quietly work out the situation first.",
      "Let's make this interesting."
    ],
    ["C","F","T","E"],
    "GROUP"
  ],

  [
    "Which failure would bother you for days afterward?",
    [
      "Knowing I wasted my potential.",
      "Knowing I let someone down.",
      "Knowing I couldn't adapt.",
      "Not understanding why I failed."
    ],
    ["C","F","N","T"],
    "REFLECTION"
  ],

  [
    "It's midnight. You have no obligations tomorrow morning. What sounds best?",
    [
      "A long conversation.",
      "Working on my own project until 2 AM.",
      "A completely spontaneous trip.",
      "Sleep early and make tomorrow productive."
    ],
    ["F","T","N","C"],
    "NIGHT"
  ],

  [
    "If you had to remove one thing from your life for a month, what would you miss most?",
    [
      "New experiences.",
      "Structure.",
      "People.",
      "Interesting ideas."
    ],
    ["N","C","E","N"],
    "IDENTITY"
  ],

  [
    "There's a strange button in front of you. It has no explanation. You are told pressing it will definitely do something.",
    [
      "PRESS IT.",
      "DON'T TOUCH IT.",
      "ARCHIVE THE INFORMATION.",
      "OVERRIDE THE SYSTEM."
    ],
    ["N","C","I","E"],
    "MACHINE"
  ],

  [
    "You discover a rule on campus that makes absolutely no sense.",
    [
      "Fine. I'll follow it.",
      "I'm questioning it.",
      "I'll find a workaround.",
      "First I want to know why it exists."
    ],
    ["C","T","N","F"],
    "RULES"
  ],

  [
    "Someone completely new joins your friend group. What do you naturally do?",
    [
      "Start talking to them.",
      "Watch and figure them out first.",
      "Ask about their interests.",
      "Give them something useful to do."
    ],
    ["E","I","F","C"],
    "SOCIAL"
  ],

  [
    "You've suddenly got an entire weekend with no commitments. What sounds best?",
    [
      "Plan it properly.",
      "Go somewhere random.",
      "Stay somewhere quiet and think.",
      "Call everyone and see what happens."
    ],
    ["C","N","I","E"],
    "WEEKEND"
  ],

  [
    "A normal debate suddenly becomes emotional. What's your instinct?",
    [
      "Bring it back to the facts.",
      "Protect the relationship.",
      "Leave the argument.",
      "Figure out what's really underneath it."
    ],
    ["T","F","I","N"],
    "CONFLICT"
  ],

  [
    "You walk into your room and realize it's a complete mess. Nobody will see it.",
    [
      "I'm fixing it now.",
      "I'll ignore it.",
      "I'm creating a system.",
      "It makes sense to me somehow."
    ],
    ["C","N","C","O"],
    "ORDER"
  ],

  [
    "A professor gives you an assignment with almost no instructions. There's no single obvious answer.",
    [
      "Ask for the criteria.",
      "Start experimenting.",
      "Research the topic.",
      "I'll decide what the question should mean."
    ],
    ["C","N","N","T"],
    "ACADEMIC"
  ],

  [
    "A friend comes to you and says, \"I genuinely don't know what to do.\" What's your first move?",
    [
      "Give them a logical plan.",
      "Listen first.",
      "Tell them what I would do.",
      "Ask what they actually want."
    ],
    ["T","F","T","F"],
    "EMPATHY"
  ],

  [
    "A new club appears on campus. You've never heard of it. What happens?",
    [
      "I'm joining.",
      "I'll investigate first.",
      "I'll ask my friends.",
      "Probably not for me."
    ],
    ["N","T","E","I"],
    "CAMPUS"
  ],

  [
    "Someone gives you ten seconds to make an important decision.",
    [
      "Trust my gut.",
      "List the pros and cons.",
      "Ask someone.",
      "Take the unusual option."
    ],
    ["N","T","F","N"],
    "DECISION"
  ],

  [
    "You visit a place once and somehow remember it years later. What probably caused it?",
    [
      "The people.",
      "The architecture.",
      "Something completely unexpected happened.",
      "The atmosphere was peaceful."
    ],
    ["E","N","N","I"],
    "PLACE"
  ],

  [
    "You're choosing someone to work with. Which teammate would you trust most?",
    [
      "The reliable one.",
      "The creative one.",
      "The social one.",
      "The analytical one."
    ],
    ["C","N","E","T"],
    "TEAM"
  ],

  [
    "You notice a pattern nobody else seems to have noticed. What do you do?",
    [
      "Tell someone.",
      "Test whether I'm right.",
      "Keep watching.",
      "Build a theory around it."
    ],
    ["E","T","I","N"],
    "PATTERNS"
  ],

  [
    "You have been doing the same routine for weeks. Eventually...",
    [
      "It starts helping me.",
      "I feel trapped.",
      "I modify it.",
      "I stop noticing it."
    ],
    ["C","N","N","I"],
    "ROUTINE"
  ],

  [
    "If you could design your perfect campus day, what would it feel like?",
    [
      "Productive.",
      "Exploratory.",
      "Social.",
      "Quiet and intellectual."
    ],
    ["C","N","E","I"],
    "CAMPUS"
  ],

  [
    "A genuinely strange idea suddenly appears in your head.",
    [
      "That's probably a bad idea.",
      "Let's explore it.",
      "I want to understand it.",
      "I'm telling someone."
    ],
    ["C","N","T","E"],
    "IDEAS"
  ],

  [
    "Someone challenges the way you see yourself. What's your immediate reaction?",
    [
      "Defend myself.",
      "Maybe they're right. I'll think about it.",
      "Laugh it off.",
      "Ask what makes them think that."
    ],
    ["T","I","E","F"],
    "IDENTITY"
  ],

  [
    "You're dropped into a fictional world and told you have one role. Which do you choose?",
    [
      "Commander.",
      "Scholar.",
      "Explorer.",
      "Mediator."
    ],
    ["E","T","N","F"],
    "ROLE"
  ],

  [
    "The machine suddenly gives you a result you don't understand.",
    [
      "Trust the machine.",
      "Demand evidence.",
      "Investigate it.",
      "Make a joke about it."
    ],
    ["C","T","N","E"],
    "MACHINE"
  ]
];
