"use client";

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  BookOpen,
  Lightbulb,
} from "lucide-react";

type VerbType = "ar" | "er" | "ir";
type TenseType = "preterito" | "imperfecto";
type Person =
  | "yo"
  | "tu"
  | "el"
  | "nosotros"
  | "vosotros"
  | "ellos";

interface Ending {
  person: Person;
  personLabel: string;
  ending: string;
}

interface VerbEndings {
  verbType: VerbType;
  tense: TenseType;
  endings: Ending[];
}

// All verb endings data
const verbEndingsData: VerbEndings[] = [
  // AR - Preterito
  {
    verbType: "ar",
    tense: "preterito",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-é" },
      { person: "tu", personLabel: "tú", ending: "-aste" },
      { person: "el", personLabel: "él/ella/usted", ending: "-ó" },
      { person: "nosotros", personLabel: "nosotros", ending: "-amos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-asteis" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-aron" },
    ],
  },
  // AR - Imperfecto
  {
    verbType: "ar",
    tense: "imperfecto",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-aba" },
      { person: "tu", personLabel: "tú", ending: "-abas" },
      { person: "el", personLabel: "él/ella/usted", ending: "-aba" },
      { person: "nosotros", personLabel: "nosotros", ending: "-ábamos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-abais" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-aban" },
    ],
  },
  // ER - Preterito
  {
    verbType: "er",
    tense: "preterito",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-í" },
      { person: "tu", personLabel: "tú", ending: "-iste" },
      { person: "el", personLabel: "él/ella/usted", ending: "-ió" },
      { person: "nosotros", personLabel: "nosotros", ending: "-imos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-isteis" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-ieron" },
    ],
  },
  // ER - Imperfecto
  {
    verbType: "er",
    tense: "imperfecto",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-ía" },
      { person: "tu", personLabel: "tú", ending: "-ías" },
      { person: "el", personLabel: "él/ella/usted", ending: "-ía" },
      { person: "nosotros", personLabel: "nosotros", ending: "-íamos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-íais" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-ían" },
    ],
  },
  // IR - Preterito
  {
    verbType: "ir",
    tense: "preterito",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-í" },
      { person: "tu", personLabel: "tú", ending: "-iste" },
      { person: "el", personLabel: "él/ella/usted", ending: "-ió" },
      { person: "nosotros", personLabel: "nosotros", ending: "-imos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-isteis" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-ieron" },
    ],
  },
  // IR - Imperfecto
  {
    verbType: "ir",
    tense: "imperfecto",
    endings: [
      { person: "yo", personLabel: "yo", ending: "-ía" },
      { person: "tu", personLabel: "tú", ending: "-ías" },
      { person: "el", personLabel: "él/ella/usted", ending: "-ía" },
      { person: "nosotros", personLabel: "nosotros", ending: "-íamos" },
      { person: "vosotros", personLabel: "vosotros", ending: "-íais" },
      { person: "ellos", personLabel: "ellos/ellas/ustedes", ending: "-ían" },
    ],
  },
];

// Simple regular verbs for practice
const regularVerbs: {
  infinitive: string;
  stem: string;
  type: VerbType;
  english: string;
}[] = [
  // AR verbs
  { infinitive: "hablar", stem: "habl", type: "ar", english: "to speak" },
  { infinitive: "trabajar", stem: "trabaj", type: "ar", english: "to work" },
  { infinitive: "estudiar", stem: "estudi", type: "ar", english: "to study" },
  { infinitive: "caminar", stem: "camin", type: "ar", english: "to walk" },
  { infinitive: "bailar", stem: "bail", type: "ar", english: "to dance" },
  { infinitive: "cantar", stem: "cant", type: "ar", english: "to sing" },
  { infinitive: "cocinar", stem: "cocin", type: "ar", english: "to cook" },
  { infinitive: "comprar", stem: "compr", type: "ar", english: "to buy" },
  { infinitive: "descansar", stem: "descans", type: "ar", english: "to rest" },
  { infinitive: "escuchar", stem: "escuch", type: "ar", english: "to listen" },
  { infinitive: "esperar", stem: "esper", type: "ar", english: "to wait" },
  { infinitive: "lavar", stem: "lav", type: "ar", english: "to wash" },
  { infinitive: "llamar", stem: "llam", type: "ar", english: "to call" },
  { infinitive: "llevar", stem: "llev", type: "ar", english: "to carry" },
  { infinitive: "mirar", stem: "mir", type: "ar", english: "to watch" },
  { infinitive: "nadar", stem: "nad", type: "ar", english: "to swim" },
  { infinitive: "pagar", stem: "pag", type: "ar", english: "to pay" },
  { infinitive: "pasar", stem: "pas", type: "ar", english: "to pass" },
  { infinitive: "preguntar", stem: "pregunt", type: "ar", english: "to ask" },
  { infinitive: "terminar", stem: "termin", type: "ar", english: "to finish" },
  { infinitive: "tomar", stem: "tom", type: "ar", english: "to take" },
  { infinitive: "viajar", stem: "viaj", type: "ar", english: "to travel" },
  // ER verbs
  { infinitive: "comer", stem: "com", type: "er", english: "to eat" },
  { infinitive: "beber", stem: "beb", type: "er", english: "to drink" },
  { infinitive: "correr", stem: "corr", type: "er", english: "to run" },
  { infinitive: "aprender", stem: "aprend", type: "er", english: "to learn" },
  { infinitive: "comprender", stem: "comprend", type: "er", english: "to understand" },
  { infinitive: "creer", stem: "cre", type: "er", english: "to believe" },
  { infinitive: "leer", stem: "le", type: "er", english: "to read" },
  { infinitive: "responder", stem: "respond", type: "er", english: "to respond" },
  { infinitive: "vender", stem: "vend", type: "er", english: "to sell" },
  { infinitive: "romper", stem: "romp", type: "er", english: "to break" },
  { infinitive: "meter", stem: "met", type: "er", english: "to put in" },
  { infinitive: "barrer", stem: "barr", type: "er", english: "to sweep" },
  // IR verbs
  { infinitive: "vivir", stem: "viv", type: "ir", english: "to live" },
  { infinitive: "escribir", stem: "escrib", type: "ir", english: "to write" },
  { infinitive: "abrir", stem: "abr", type: "ir", english: "to open" },
  { infinitive: "subir", stem: "sub", type: "ir", english: "to go up" },
  { infinitive: "recibir", stem: "recib", type: "ir", english: "to receive" },
  { infinitive: "decidir", stem: "decid", type: "ir", english: "to decide" },
  { infinitive: "partir", stem: "part", type: "ir", english: "to leave" },
  { infinitive: "existir", stem: "exist", type: "ir", english: "to exist" },
  { infinitive: "asistir", stem: "asist", type: "ir", english: "to attend" },
  { infinitive: "describir", stem: "describ", type: "ir", english: "to describe" },
  { infinitive: "permitir", stem: "permit", type: "ir", english: "to allow" },
  { infinitive: "sufrir", stem: "sufr", type: "ir", english: "to suffer" },
];

interface EndingsLearningProps {
  onBack: () => void;
  onTrainer: () => void;
}

type Mode = "learn" | "practice";

interface PracticeQuestion {
  verb: (typeof regularVerbs)[0];
  person: Ending;
  tense: TenseType;
  correctAnswer: string;
}

export function EndingsLearning({ onBack, onTrainer }: EndingsLearningProps) {
  const [mode, setMode] = useState<Mode>("learn");
  const [selectedVerbType, setSelectedVerbType] = useState<VerbType>("ar");
  const [selectedTense, setSelectedTense] = useState<TenseType>("preterito");

  // Practice mode state
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [practiceVerbType, setPracticeVerbType] = useState<VerbType | "all">("ar");
  const [practiceTense, setPracticeTense] = useState<TenseType | "all">("preterito");
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestions = useCallback(() => {
    const newQuestions: PracticeQuestion[] = [];

    // Filter verbs by type
    const verbsToUse =
      practiceVerbType === "all"
        ? regularVerbs
        : regularVerbs.filter((v) => v.type === practiceVerbType);

    // Filter tenses
    const tensesToUse: TenseType[] =
      practiceTense === "all" ? ["preterito", "imperfecto"] : [practiceTense];

    // Generate 10 random questions
    for (let i = 0; i < 10; i++) {
      const verb = verbsToUse[Math.floor(Math.random() * verbsToUse.length)];
      const tense = tensesToUse[Math.floor(Math.random() * tensesToUse.length)];
      const endings = verbEndingsData.find(
        (e) => e.verbType === verb.type && e.tense === tense
      )!.endings;
      const person = endings[Math.floor(Math.random() * endings.length)];

      // Calculate correct answer
      const endingClean = person.ending.replace("-", "");
      const correctAnswer = verb.stem + endingClean;

      newQuestions.push({
        verb,
        person,
        tense,
        correctAnswer,
      });
    }

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setShowFeedback(false);
    setUserAnswer("");
  }, [practiceVerbType, practiceTense]);

  useEffect(() => {
    if (mode === "practice") {
      generateQuestions();
    }
  }, [mode, generateQuestions]);

  useEffect(() => {
    if (mode === "practice" && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, showFeedback, currentIndex]);

  const currentEndings = verbEndingsData.find(
    (e) => e.verbType === selectedVerbType && e.tense === selectedTense
  )!;

  const exampleVerb = regularVerbs.find((v) => v.type === selectedVerbType)!;

  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userAnswer.trim() || !questions[currentIndex]) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(questions[currentIndex].correctAnswer);
    const correct = normalized === correctNormalized;

    setIsCorrect(correct);
    setShowFeedback(true);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      generateQuestions();
    } else {
      setCurrentIndex((i) => i + 1);
    }
    setUserAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showFeedback) {
      handleNext();
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Pasado
            </button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onTrainer}>
                Full Trainer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Learn Verb Endings
          </h1>
          <p className="text-muted-foreground">
            Master the conjugation patterns for -AR, -ER, and -IR verbs in
            Preterito and Imperfecto
          </p>
        </div>

        {/* Mode switcher */}
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as Mode)}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learn" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Study Endings
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Practice
            </TabsTrigger>
          </TabsList>

          {/* Learn mode */}
          <TabsContent value="learn" className="mt-6">
            {/* Verb type selector */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-2">
                <span className="text-sm font-medium text-muted-foreground w-20">
                  Verb type:
                </span>
                <div className="flex gap-2">
                  {(["ar", "er", "ir"] as VerbType[]).map((type) => (
                    <Button
                      key={type}
                      variant={selectedVerbType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVerbType(type)}
                      className={selectedVerbType !== type ? "bg-transparent" : ""}
                    >
                      -{type.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-medium text-muted-foreground w-20">
                  Tense:
                </span>
                <div className="flex gap-2">
                  {(["preterito", "imperfecto"] as TenseType[]).map((tense) => (
                    <Button
                      key={tense}
                      variant={selectedTense === tense ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTense(tense)}
                      className={selectedTense !== tense ? "bg-transparent" : ""}
                    >
                      {tense === "preterito" ? "Pretérito" : "Imperfecto"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Endings table */}
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    -{selectedVerbType.toUpperCase()} verbs -{" "}
                    {selectedTense === "preterito" ? "Pretérito" : "Imperfecto"}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Example: {exampleVerb.infinitive} ({exampleVerb.english})
                  </span>
                </div>

                <div className="grid gap-3">
                  {currentEndings.endings.map((ending) => {
                    const endingClean = ending.ending.replace("-", "");
                    const conjugated = exampleVerb.stem + endingClean;

                    return (
                      <div
                        key={ending.person}
                        className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground w-32">
                            {ending.personLabel}
                          </span>
                          <span className="font-mono text-lg font-semibold text-foreground">
                            {ending.ending}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {exampleVerb.stem}
                          </span>
                          <span className="font-mono text-lg font-semibold text-accent">
                            {conjugated}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pattern tip */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    {selectedTense === "preterito" ? (
                      selectedVerbType === "ar" ? (
                        <>
                          <strong>Tip:</strong> In Pretérito, -AR verbs have
                          unique endings with accents on yo (-é) and él/ella
                          (-ó). The &quot;nosotros&quot; form is the same as present
                          tense!
                        </>
                      ) : (
                        <>
                          <strong>Tip:</strong> -ER and -IR verbs share the
                          same Pretérito endings. Notice the accent on yo
                          (-í) and él/ella (-ió).
                        </>
                      )
                    ) : selectedVerbType === "ar" ? (
                      <>
                        <strong>Tip:</strong> In Imperfecto, -AR verbs use
                        &quot;-aba-&quot; as the key sound. Only &quot;nosotros&quot; has an
                        accent (-ábamos).
                      </>
                    ) : (
                      <>
                        <strong>Tip:</strong> -ER and -IR verbs share the same
                        Imperfecto endings using &quot;-ía-&quot;. All forms except
                        ellos have accents!
                      </>
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick reference */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h4 className="font-medium text-foreground mb-3">
                  Key Patterns - Pretérito
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <span className="font-mono text-foreground">-AR:</span>{" "}
                    -é, -aste, -ó, -amos, -asteis, -aron
                  </li>
                  <li>
                    <span className="font-mono text-foreground">-ER/-IR:</span>{" "}
                    -í, -iste, -ió, -imos, -isteis, -ieron
                  </li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium text-foreground mb-3">
                  Key Patterns - Imperfecto
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <span className="font-mono text-foreground">-AR:</span>{" "}
                    -aba, -abas, -aba, -ábamos, -abais, -aban
                  </li>
                  <li>
                    <span className="font-mono text-foreground">-ER/-IR:</span>{" "}
                    -ía, -ías, -ía, -íamos, -íais, -ían
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Practice mode */}
          <TabsContent value="practice" className="mt-6">
            {/* Practice filters */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Verb type:
                  </span>
                  <div className="flex gap-1">
                    {(["ar", "er", "ir", "all"] as (VerbType | "all")[]).map(
                      (type) => (
                        <Button
                          key={type}
                          variant={practiceVerbType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setPracticeVerbType(type);
                          }}
                          className={practiceVerbType !== type ? "bg-transparent" : ""}
                        >
                          {type === "all" ? "All" : `-${type.toUpperCase()}`}
                        </Button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tense:
                  </span>
                  <div className="flex gap-1">
                    {(["preterito", "imperfecto", "all"] as (TenseType | "all")[]).map(
                      (tense) => (
                        <Button
                          key={tense}
                          variant={practiceTense === tense ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setPracticeTense(tense);
                          }}
                          className={practiceTense !== tense ? "bg-transparent" : ""}
                        >
                          {tense === "all"
                            ? "Both"
                            : tense === "preterito"
                              ? "Pretérito"
                              : "Imperfecto"}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
              {/* Regenerate button */}
              <Button
                variant="outline"
                size="sm"
                onClick={generateQuestions}
                className="w-fit bg-transparent"
              >
                New Set of Questions
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-muted-foreground">
                Score: {sessionCorrect}/{sessionTotal}
                {sessionTotal > 0 && (
                  <span className="ml-2">
                    ({Math.round((sessionCorrect / sessionTotal) * 100)}%)
                  </span>
                )}
              </span>
            </div>

            {/* Practice card */}
            {currentQuestion && (
              <Card className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  {/* Question */}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                      Conjugate the verb in{" "}
                      <span className="font-medium text-foreground">
                        {currentQuestion.tense === "preterito"
                          ? "Pretérito"
                          : "Imperfecto"}
                      </span>
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <p className="text-xl font-medium text-foreground">
                        {currentQuestion.verb.infinitive}
                      </p>
                      <span className="text-muted-foreground">
                        ({currentQuestion.verb.english})
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground mt-2">
                      for{" "}
                      <span className="font-semibold text-foreground">
                        {currentQuestion.person.personLabel}
                      </span>
                    </p>
                  </div>

                  {/* Input */}
                  <div className="flex flex-col gap-3">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                      <Input
                        ref={inputRef}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type conjugation..."
                        className="font-mono text-lg h-12 flex-1"
                        disabled={showFeedback}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                      />
                      {!showFeedback && (
                        <Button
                          type="submit"
                          disabled={!userAnswer.trim()}
                          size="lg"
                        >
                          Check
                        </Button>
                      )}
                    </form>
                    {!showFeedback && (
                      <p className="text-xs text-muted-foreground">
                        Tip: Accents optional
                      </p>
                    )}
                  </div>

                  {/* Feedback */}
                  {showFeedback && (
                    <div
                      className={`rounded-lg p-4 ${
                        isCorrect
                          ? "bg-accent/10 border border-accent/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        )}
                        <div className="flex flex-col gap-2">
                          <p
                            className={`font-medium ${
                              isCorrect ? "text-accent" : "text-destructive"
                            }`}
                          >
                            {isCorrect ? "Correct!" : "Not quite"}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-foreground">
                              The correct answer is{" "}
                              <span className="font-mono font-semibold">
                                {currentQuestion.correctAnswer}
                              </span>
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            <span className="font-mono">
                              {currentQuestion.verb.stem}
                            </span>{" "}
                            +{" "}
                            <span className="font-mono font-semibold">
                              {currentQuestion.person.ending}
                            </span>{" "}
                            ={" "}
                            <span className="font-mono font-semibold text-foreground">
                              {currentQuestion.correctAnswer}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next button */}
                  {showFeedback && (
                    <div className="flex justify-end">
                      <Button onClick={handleNext} size="lg" className="gap-2">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>
                  {currentIndex + 1} of {questions.length}
                </span>
              </div>
              <Progress
                value={((currentIndex + 1) / questions.length) * 100}
                className="h-1"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
