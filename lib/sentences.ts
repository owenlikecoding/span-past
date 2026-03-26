export type TenseType = "preterito" | "imperfecto";

export interface Sentence {
  id: number;
  english: string;
  verb: string;
  verbInfinitive: string;
  correctAnswer: string;
  incorrectAnswer: string;
  correctTense: TenseType;
  explanation: string;
  rule: string;
}

export interface DiagnosticQuestion {
  id: number;
  english: string;
  options: { text: string; tense: TenseType }[];
  correctTense: TenseType;
  explanation: string;
}

// Diagnostic questions to assess understanding
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 1,
    english: "Yesterday I ate breakfast at 8am.",
    options: [
      { text: "desayune", tense: "preterito" },
      { text: "desayunaba", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Specific completed action at a specific time = Preterito",
  },
  {
    id: 2,
    english: "When I was young, I played soccer every day.",
    options: [
      { text: "jugue", tense: "preterito" },
      { text: "jugaba", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Habitual action in the past = Imperfecto",
  },
  {
    id: 3,
    english: "She was reading when the phone rang.",
    options: [
      { text: "leia / sono", tense: "imperfecto" },
      { text: "leyo / sonaba", tense: "preterito" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Ongoing action interrupted by another = Imperfecto for the ongoing, Preterito for the interruption",
  },
  {
    id: 4,
    english: "I lived in Madrid for three years.",
    options: [
      { text: "vivi", tense: "preterito" },
      { text: "vivia", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Completed time period with defined boundaries = Preterito",
  },
  {
    id: 5,
    english: "The weather was beautiful that summer.",
    options: [
      { text: "fue", tense: "preterito" },
      { text: "era", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Describing conditions/states in the past = Imperfecto",
  },
  {
    id: 6,
    english: "He suddenly realized the truth.",
    options: [
      { text: "se dio cuenta", tense: "preterito" },
      { text: "se daba cuenta", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Sudden realization/change = Preterito",
  },
  {
    id: 7,
    english: "They used to visit their grandparents every summer.",
    options: [
      { text: "visitaron", tense: "preterito" },
      { text: "visitaban", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "'Used to' indicates habitual past action = Imperfecto",
  },
  {
    id: 8,
    english: "I finished the book last night.",
    options: [
      { text: "termine", tense: "preterito" },
      { text: "terminaba", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Completed action at specific time = Preterito",
  },
];

// Core training sentences with verb conjugation
export const trainingSentences: Sentence[] = [
  // IR - to go
  {
    id: 1,
    english: "Yesterday I went to the store.",
    verb: "ir",
    verbInfinitive: "ir",
    correctAnswer: "fui",
    incorrectAnswer: "iba",
    correctTense: "preterito",
    explanation:
      "This is a completed action at a specific time (yesterday). Use preterito.",
    rule: "Specific completed actions use Preterito",
  },
  {
    id: 2,
    english: "When I was a child, I went to school by bus.",
    verb: "ir",
    verbInfinitive: "ir",
    correctAnswer: "iba",
    incorrectAnswer: "fui",
    correctTense: "imperfecto",
    explanation:
      "This describes a habitual action in the past. Use imperfecto.",
    rule: "Habitual past actions use Imperfecto",
  },
  // SER - to be
  {
    id: 3,
    english: "The party was fun.",
    verb: "ser",
    verbInfinitive: "ser",
    correctAnswer: "fue",
    incorrectAnswer: "era",
    correctTense: "preterito",
    explanation:
      "Describing a completed event as a whole. Use preterito.",
    rule: "Completed events described as a whole use Preterito",
  },
  {
    id: 4,
    english: "My grandmother was very kind.",
    verb: "ser",
    verbInfinitive: "ser",
    correctAnswer: "era",
    incorrectAnswer: "fue",
    correctTense: "imperfecto",
    explanation:
      "Describing an inherent characteristic in the past. Use imperfecto.",
    rule: "Describing characteristics uses Imperfecto",
  },
  // ESTAR - to be
  {
    id: 5,
    english: "I was tired after the workout.",
    verb: "estar",
    verbInfinitive: "estar",
    correctAnswer: "estuve",
    incorrectAnswer: "estaba",
    correctTense: "preterito",
    explanation:
      "A state that began at a specific moment. Use preterito.",
    rule: "States with clear beginning use Preterito",
  },
  {
    id: 6,
    english: "The children were happy while playing.",
    verb: "estar",
    verbInfinitive: "estar",
    correctAnswer: "estaban",
    incorrectAnswer: "estuvieron",
    correctTense: "imperfecto",
    explanation:
      "Ongoing state during another action. Use imperfecto.",
    rule: "Ongoing states use Imperfecto",
  },
  // TENER - to have
  {
    id: 7,
    english: "She had a meeting at 3pm.",
    verb: "tener",
    verbInfinitive: "tener",
    correctAnswer: "tuvo",
    incorrectAnswer: "tenia",
    correctTense: "preterito",
    explanation:
      "Specific event at a specific time. Use preterito.",
    rule: "Scheduled events at specific times use Preterito",
  },
  {
    id: 8,
    english: "I always had breakfast at 7am.",
    verb: "tener",
    verbInfinitive: "tener",
    correctAnswer: "tenia",
    incorrectAnswer: "tuve",
    correctTense: "imperfecto",
    explanation:
      "Describes a habitual routine. Use imperfecto.",
    rule: "Habitual routines use Imperfecto",
  },
  // HACER - to do/make
  {
    id: 9,
    english: "What did you do last weekend?",
    verb: "hacer",
    verbInfinitive: "hacer",
    correctAnswer: "hiciste",
    incorrectAnswer: "hacias",
    correctTense: "preterito",
    explanation:
      "Asking about completed actions. Use preterito.",
    rule: "Questions about completed actions use Preterito",
  },
  {
    id: 10,
    english: "It was cold every morning.",
    verb: "hacer",
    verbInfinitive: "hacer",
    correctAnswer: "hacia",
    incorrectAnswer: "hizo",
    correctTense: "imperfecto",
    explanation:
      "Describing weather as a repeated condition. Use imperfecto.",
    rule: "Weather conditions (repeated) use Imperfecto",
  },
  // DECIR - to say/tell
  {
    id: 11,
    english: "He told me the news.",
    verb: "decir",
    verbInfinitive: "decir",
    correctAnswer: "dijo",
    incorrectAnswer: "decia",
    correctTense: "preterito",
    explanation:
      "A single completed act of communication. Use preterito.",
    rule: "Single acts of communication use Preterito",
  },
  {
    id: 12,
    english: "My mother always said 'be careful'.",
    verb: "decir",
    verbInfinitive: "decir",
    correctAnswer: "decia",
    incorrectAnswer: "dijo",
    correctTense: "imperfecto",
    explanation:
      "Something said repeatedly/habitually. Use imperfecto.",
    rule: "Repeated sayings use Imperfecto",
  },
  // VER - to see/watch
  {
    id: 13,
    english: "I saw that movie last night.",
    verb: "ver",
    verbInfinitive: "ver",
    correctAnswer: "vi",
    incorrectAnswer: "veia",
    correctTense: "preterito",
    explanation:
      "Completed action at a specific time. Use preterito.",
    rule: "Completed viewing at specific time uses Preterito",
  },
  {
    id: 14,
    english: "From my window, I could see the mountains.",
    verb: "ver",
    verbInfinitive: "ver",
    correctAnswer: "veia",
    incorrectAnswer: "vi",
    correctTense: "imperfecto",
    explanation:
      "Describing what was visible (ongoing state). Use imperfecto.",
    rule: "Describing ongoing states/views uses Imperfecto",
  },
  // PODER - to be able
  {
    id: 15,
    english: "Finally, I was able to solve the problem.",
    verb: "poder",
    verbInfinitive: "poder",
    correctAnswer: "pude",
    incorrectAnswer: "podia",
    correctTense: "preterito",
    explanation:
      "Successful completion of ability (managed to). Use preterito.",
    rule: "'Managed to' or success uses Preterito",
  },
  {
    id: 16,
    english: "When I was young, I could run very fast.",
    verb: "poder",
    verbInfinitive: "poder",
    correctAnswer: "podia",
    incorrectAnswer: "pude",
    correctTense: "imperfecto",
    explanation:
      "General ability in the past. Use imperfecto.",
    rule: "General past abilities use Imperfecto",
  },
  // QUERER - to want
  {
    id: 17,
    english: "He tried to call her (but failed).",
    verb: "querer",
    verbInfinitive: "querer",
    correctAnswer: "quiso",
    incorrectAnswer: "queria",
    correctTense: "preterito",
    explanation:
      "Attempted action (tried to). Use preterito.",
    rule: "'Tried to' (attempted) uses Preterito",
  },
  {
    id: 18,
    english: "I wanted to be a doctor when I grew up.",
    verb: "querer",
    verbInfinitive: "querer",
    correctAnswer: "queria",
    incorrectAnswer: "quise",
    correctTense: "imperfecto",
    explanation:
      "Ongoing desire/wish in the past. Use imperfecto.",
    rule: "Ongoing desires use Imperfecto",
  },
  // SABER - to know
  {
    id: 19,
    english: "I found out the truth yesterday.",
    verb: "saber",
    verbInfinitive: "saber",
    correctAnswer: "supe",
    incorrectAnswer: "sabia",
    correctTense: "preterito",
    explanation:
      "Beginning of knowledge (found out). Use preterito.",
    rule: "'Found out' (start of knowledge) uses Preterito",
  },
  {
    id: 20,
    english: "She knew the answer all along.",
    verb: "saber",
    verbInfinitive: "saber",
    correctAnswer: "sabia",
    incorrectAnswer: "supo",
    correctTense: "imperfecto",
    explanation:
      "Existing state of knowledge. Use imperfecto.",
    rule: "Existing knowledge uses Imperfecto",
  },
  // COMER - to eat (regular)
  {
    id: 21,
    english: "I ate dinner at 8pm.",
    verb: "comer",
    verbInfinitive: "comer",
    correctAnswer: "comi",
    incorrectAnswer: "comia",
    correctTense: "preterito",
    explanation:
      "Completed action at specific time. Use preterito.",
    rule: "Completed actions at specific times use Preterito",
  },
  {
    id: 22,
    english: "Every Sunday we ate together as a family.",
    verb: "comer",
    verbInfinitive: "comer",
    correctAnswer: "comiamos",
    incorrectAnswer: "comimos",
    correctTense: "imperfecto",
    explanation:
      "Habitual action. Use imperfecto.",
    rule: "Habitual actions use Imperfecto",
  },
  // HABLAR - to speak (regular)
  {
    id: 23,
    english: "I spoke with him for an hour.",
    verb: "hablar",
    verbInfinitive: "hablar",
    correctAnswer: "hable",
    incorrectAnswer: "hablaba",
    correctTense: "preterito",
    explanation:
      "Completed action with defined duration. Use preterito.",
    rule: "Actions with defined duration use Preterito",
  },
  {
    id: 24,
    english: "He spoke Spanish fluently.",
    verb: "hablar",
    verbInfinitive: "hablar",
    correctAnswer: "hablaba",
    incorrectAnswer: "hablo",
    correctTense: "imperfecto",
    explanation:
      "Describing an ability/characteristic. Use imperfecto.",
    rule: "Describing abilities uses Imperfecto",
  },
  // VIVIR - to live (regular)
  {
    id: 25,
    english: "I lived in Mexico for 5 years.",
    verb: "vivir",
    verbInfinitive: "vivir",
    correctAnswer: "vivi",
    incorrectAnswer: "vivia",
    correctTense: "preterito",
    explanation:
      "Completed period with boundaries. Use preterito.",
    rule: "Completed periods use Preterito",
  },
  {
    id: 26,
    english: "When I was young, I lived near the beach.",
    verb: "vivir",
    verbInfinitive: "vivir",
    correctAnswer: "vivia",
    incorrectAnswer: "vivi",
    correctTense: "imperfecto",
    explanation:
      "Setting the scene, describing circumstances. Use imperfecto.",
    rule: "Setting scenes uses Imperfecto",
  },
  // CONOCER - to know/meet
  {
    id: 27,
    english: "I met her at the party.",
    verb: "conocer",
    verbInfinitive: "conocer",
    correctAnswer: "conoci",
    incorrectAnswer: "conocia",
    correctTense: "preterito",
    explanation:
      "First meeting (beginning of knowing). Use preterito.",
    rule: "'Met' (first encounter) uses Preterito",
  },
  {
    id: 28,
    english: "I knew the city well.",
    verb: "conocer",
    verbInfinitive: "conocer",
    correctAnswer: "conocia",
    incorrectAnswer: "conoci",
    correctTense: "imperfecto",
    explanation:
      "State of familiarity. Use imperfecto.",
    rule: "Familiarity/knowledge states use Imperfecto",
  },
  // LLEGAR - to arrive
  {
    id: 29,
    english: "The train arrived at noon.",
    verb: "llegar",
    verbInfinitive: "llegar",
    correctAnswer: "llego",
    incorrectAnswer: "llegaba",
    correctTense: "preterito",
    explanation:
      "Single completed arrival. Use preterito.",
    rule: "Single arrivals use Preterito",
  },
  {
    id: 30,
    english: "The bus always arrived late.",
    verb: "llegar",
    verbInfinitive: "llegar",
    correctAnswer: "llegaba",
    incorrectAnswer: "llego",
    correctTense: "imperfecto",
    explanation:
      "Habitual occurrence. Use imperfecto.",
    rule: "Habitual occurrences use Imperfecto",
  },
  // PENSAR - to think
  {
    id: 31,
    english: "I thought it was a good idea.",
    verb: "pensar",
    verbInfinitive: "pensar",
    correctAnswer: "pensaba",
    incorrectAnswer: "pense",
    correctTense: "imperfecto",
    explanation:
      "Mental state at the time. Use imperfecto.",
    rule: "Mental states use Imperfecto",
  },
  {
    id: 32,
    english: "Suddenly I thought of the solution.",
    verb: "pensar",
    verbInfinitive: "pensar",
    correctAnswer: "pense",
    incorrectAnswer: "pensaba",
    correctTense: "preterito",
    explanation:
      "Sudden thought/realization. Use preterito.",
    rule: "Sudden realizations use Preterito",
  },
  // EMPEZAR - to begin
  {
    id: 33,
    english: "The movie started at 7pm.",
    verb: "empezar",
    verbInfinitive: "empezar",
    correctAnswer: "empezo",
    incorrectAnswer: "empezaba",
    correctTense: "preterito",
    explanation:
      "Specific start time. Use preterito.",
    rule: "Specific start times use Preterito",
  },
  {
    id: 34,
    english: "It was starting to rain.",
    verb: "empezar",
    verbInfinitive: "empezar",
    correctAnswer: "empezaba",
    incorrectAnswer: "empezo",
    correctTense: "imperfecto",
    explanation:
      "Progressive/ongoing action. Use imperfecto.",
    rule: "Ongoing progressive actions use Imperfecto",
  },
  // TRABAJAR - to work
  {
    id: 35,
    english: "I worked there for two years.",
    verb: "trabajar",
    verbInfinitive: "trabajar",
    correctAnswer: "trabaje",
    incorrectAnswer: "trabajaba",
    correctTense: "preterito",
    explanation:
      "Completed period of employment. Use preterito.",
    rule: "Completed employment periods use Preterito",
  },
  {
    id: 36,
    english: "She worked while studying.",
    verb: "trabajar",
    verbInfinitive: "trabajar",
    correctAnswer: "trabajaba",
    incorrectAnswer: "trabajo",
    correctTense: "imperfecto",
    explanation:
      "Ongoing action during another. Use imperfecto.",
    rule: "Simultaneous ongoing actions use Imperfecto",
  },
  // DORMIR - to sleep
  {
    id: 37,
    english: "I slept 10 hours last night.",
    verb: "dormir",
    verbInfinitive: "dormir",
    correctAnswer: "dormi",
    incorrectAnswer: "dormia",
    correctTense: "preterito",
    explanation:
      "Completed action with specific duration. Use preterito.",
    rule: "Actions with specific durations use Preterito",
  },
  {
    id: 38,
    english: "The baby was sleeping peacefully.",
    verb: "dormir",
    verbInfinitive: "dormir",
    correctAnswer: "dormia",
    incorrectAnswer: "durmio",
    correctTense: "imperfecto",
    explanation:
      "Ongoing action (was sleeping). Use imperfecto.",
    rule: "'Was + -ing' constructions use Imperfecto",
  },
  // ESCRIBIR - to write
  {
    id: 39,
    english: "She wrote a letter yesterday.",
    verb: "escribir",
    verbInfinitive: "escribir",
    correctAnswer: "escribio",
    incorrectAnswer: "escribia",
    correctTense: "preterito",
    explanation:
      "Completed action. Use preterito.",
    rule: "Completed actions use Preterito",
  },
  {
    id: 40,
    english: "He was writing when I entered.",
    verb: "escribir",
    verbInfinitive: "escribir",
    correctAnswer: "escribia",
    incorrectAnswer: "escribio",
    correctTense: "imperfecto",
    explanation:
      "Action in progress when interrupted. Use imperfecto.",
    rule: "Actions interrupted by another use Imperfecto",
  },
  // LEER - to read
  {
    id: 41,
    english: "I read that book in one day.",
    verb: "leer",
    verbInfinitive: "leer",
    correctAnswer: "lei",
    incorrectAnswer: "leia",
    correctTense: "preterito",
    explanation:
      "Completed reading. Use preterito.",
    rule: "Completed reading uses Preterito",
  },
  {
    id: 42,
    english: "She was reading on the balcony.",
    verb: "leer",
    verbInfinitive: "leer",
    correctAnswer: "leia",
    incorrectAnswer: "leyo",
    correctTense: "imperfecto",
    explanation:
      "Ongoing activity. Use imperfecto.",
    rule: "Ongoing activities use Imperfecto",
  },
  // SALIR - to leave/go out
  {
    id: 43,
    english: "They left the house at 6am.",
    verb: "salir",
    verbInfinitive: "salir",
    correctAnswer: "salieron",
    incorrectAnswer: "salian",
    correctTense: "preterito",
    explanation:
      "Single completed departure. Use preterito.",
    rule: "Single departures use Preterito",
  },
  {
    id: 44,
    english: "We used to go out every Friday.",
    verb: "salir",
    verbInfinitive: "salir",
    correctAnswer: "saliamos",
    incorrectAnswer: "salimos",
    correctTense: "imperfecto",
    explanation:
      "Habitual action. Use imperfecto.",
    rule: "'Used to' indicates Imperfecto",
  },
  // VENIR - to come
  {
    id: 45,
    english: "He came to visit us last month.",
    verb: "venir",
    verbInfinitive: "venir",
    correctAnswer: "vino",
    incorrectAnswer: "venia",
    correctTense: "preterito",
    explanation:
      "Single completed visit. Use preterito.",
    rule: "Single visits use Preterito",
  },
  {
    id: 46,
    english: "My aunt came to see us every Christmas.",
    verb: "venir",
    verbInfinitive: "venir",
    correctAnswer: "venia",
    incorrectAnswer: "vino",
    correctTense: "imperfecto",
    explanation:
      "Repeated/habitual visits. Use imperfecto.",
    rule: "Repeated visits use Imperfecto",
  },
  // DAR - to give
  {
    id: 47,
    english: "She gave me a gift for my birthday.",
    verb: "dar",
    verbInfinitive: "dar",
    correctAnswer: "dio",
    incorrectAnswer: "daba",
    correctTense: "preterito",
    explanation:
      "Single act of giving. Use preterito.",
    rule: "Single actions use Preterito",
  },
  {
    id: 48,
    english: "My grandfather gave me money every week.",
    verb: "dar",
    verbInfinitive: "dar",
    correctAnswer: "daba",
    incorrectAnswer: "dio",
    correctTense: "imperfecto",
    explanation:
      "Repeated/habitual giving. Use imperfecto.",
    rule: "Repeated actions use Imperfecto",
  },
  // PONER - to put
  {
    id: 49,
    english: "I put the book on the table.",
    verb: "poner",
    verbInfinitive: "poner",
    correctAnswer: "puse",
    incorrectAnswer: "ponia",
    correctTense: "preterito",
    explanation:
      "Single completed action. Use preterito.",
    rule: "Single completed actions use Preterito",
  },
  {
    id: 50,
    english: "She always put flowers on the table.",
    verb: "poner",
    verbInfinitive: "poner",
    correctAnswer: "ponia",
    incorrectAnswer: "puso",
    correctTense: "imperfecto",
    explanation:
      "Habitual action. Use imperfecto.",
    rule: "'Always' with past actions usually means Imperfecto",
  },
];

// Decision drill questions (just choosing tense, no conjugation)
export const decisionDrills: DiagnosticQuestion[] = [
  {
    id: 1,
    english: "The sun was shining when I woke up.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "For 'the sun was shining' - describing the background/setting when another action occurred. Imperfecto sets the scene.",
  },
  {
    id: 2,
    english: "I suddenly remembered I had an appointment.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Sudden realization = Preterito. The word 'suddenly' signals a completed moment of remembering.",
  },
  {
    id: 3,
    english: "She was beautiful.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Describing a characteristic/state = Imperfecto. We're describing what she was like, not an event.",
  },
  {
    id: 4,
    english: "The concert lasted three hours.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Completed event with defined duration = Preterito. The concert is over, we're stating a fact about its length.",
  },
  {
    id: 5,
    english: "Every summer, we traveled to the coast.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "'Every summer' = habitual action = Imperfecto. This happened repeatedly, not just once.",
  },
  {
    id: 6,
    english: "At that moment, I knew everything would be fine.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "'At that moment' = specific point when knowledge began = Preterito. This is the start of knowing.",
  },
  {
    id: 7,
    english: "The streets were empty and it was getting dark.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Setting the scene with descriptions = Imperfecto. We're painting a picture of the conditions.",
  },
  {
    id: 8,
    english: "He broke his leg skiing.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Single completed event = Preterito. Breaking a leg is a one-time occurrence.",
  },
  {
    id: 9,
    english: "I used to believe in ghosts.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "'Used to' = past habit/state = Imperfecto. This describes an ongoing belief in the past.",
  },
  {
    id: 10,
    english: "The phone rang three times before I answered.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Counting specific completed actions = Preterito. Three distinct rings, then an answer.",
  },
  {
    id: 11,
    english: "While he was talking, I was thinking about something else.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Two simultaneous ongoing actions = Imperfecto. Both were happening at the same time.",
  },
  {
    id: 12,
    english: "I met my wife at a coffee shop.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "First meeting = Preterito. 'Met' indicates the beginning of knowing someone.",
  },
  {
    id: 13,
    english: "It was 3 o'clock in the afternoon.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Telling time in the past = Imperfecto. We're describing what time it was, setting context.",
  },
  {
    id: 14,
    english: "The earthquake destroyed many buildings.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "preterito",
    explanation:
      "Completed event with result = Preterito. The destruction happened and is complete.",
  },
  {
    id: 15,
    english: "As a child, I wanted to be an astronaut.",
    options: [
      { text: "Preterito", tense: "preterito" },
      { text: "Imperfecto", tense: "imperfecto" },
    ],
    correctTense: "imperfecto",
    explanation:
      "Ongoing desire over time = Imperfecto. This was a continuous wish during childhood.",
  },
];

// Helper function to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random sentences for training
export function getTrainingSentences(count: number = 10): Sentence[] {
  return shuffleArray(trainingSentences).slice(0, count);
}

// Get diagnostic questions
export function getDiagnosticQuestions(): DiagnosticQuestion[] {
  return shuffleArray(diagnosticQuestions);
}

// Get decision drills
export function getDecisionDrills(count: number = 10): DiagnosticQuestion[] {
  return shuffleArray(decisionDrills).slice(0, count);
}

// Get mastery check sentences (20 mixed)
export function getMasteryCheckSentences(): Sentence[] {
  return shuffleArray(trainingSentences).slice(0, 20);
}
