"use client";

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  getTrainingSentences,
  trainingSentences,
  type Sentence,
} from "@/lib/sentences";
import {
  recordAnswer,
  getProfile,
  getAccuracyPercentage,
  type LearningProfile,
} from "@/lib/learning-store";
import { ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy, Zap, GraduationCap } from "lucide-react";

interface TrainerProps {
  onDecisionDrills: () => void;
  onMasteryCheck: () => void;
  onHome: () => void;
  onLearnEndings?: () => void;
}

export function Trainer({ onDecisionDrills, onMasteryCheck, onHome, onLearnEndings }: TrainerProps) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadSentences = useCallback(() => {
    const currentProfile = getProfile();
    setProfile(currentProfile);

    // Prioritize mistakes, then new sentences
    let sentencesToUse: Sentence[] = [];

    if (currentProfile.mistakeQueue.length > 0) {
      // Get some mistakes
      const mistakeSentences = currentProfile.mistakeQueue
        .slice(0, 3)
        .map((id) => trainingSentences.find((s) => s.id === id))
        .filter(Boolean) as Sentence[];
      sentencesToUse = [...mistakeSentences];
    }

    // Fill with new sentences
    const newSentences = getTrainingSentences(10 - sentencesToUse.length);
    sentencesToUse = [...sentencesToUse, ...newSentences];

    setSentences(sentencesToUse);
    setCurrentIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
  }, []);

  useEffect(() => {
    loadSentences();
  }, [loadSentences]);

  useEffect(() => {
    if (!showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showFeedback, currentIndex]);

  const currentSentence = sentences[currentIndex];

  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove accents for comparison
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userAnswer.trim() || !currentSentence) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentSentence.correctAnswer);
    const correct = normalized === correctNormalized;

    setIsCorrect(correct);
    setShowFeedback(true);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);

    const updated = recordAnswer(currentSentence.id, correct, currentSentence);
    setProfile(updated);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= sentences.length) {
      // Load more sentences
      loadSentences();
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

  if (sentences.length === 0 || !currentSentence) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading trainer...</p>
      </div>
    );
  }

  const accuracy = profile ? getAccuracyPercentage(profile) : 0;
  const sessionAccuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onHome}
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Pasado
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Session: {sessionCorrect}/{sessionTotal}
              </span>
              <span className="text-sm text-muted-foreground">
                Overall: {accuracy}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-6 py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{profile?.totalAnswered || 0}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{profile?.mistakeQueue.length || 0}</p>
                <p className="text-xs text-muted-foreground">To Review</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {onLearnEndings && (
            <Button variant="outline" onClick={onLearnEndings} className="flex-1 gap-2 bg-transparent">
              <GraduationCap className="h-4 w-4" />
              Learn Endings
            </Button>
          )}
          <Button variant="outline" onClick={onDecisionDrills} className="flex-1 bg-transparent">
            Decision Drills
          </Button>
          <Button
            variant={profile?.masteryCheckUnlocked ? "default" : "outline"}
            onClick={onMasteryCheck}
            disabled={!profile?.masteryCheckUnlocked}
            className="flex-1 gap-2"
          >
            <Trophy className="h-4 w-4" />
            Mastery Check
            {!profile?.masteryCheckUnlocked && (
              <span className="text-xs opacity-70">(20+ questions)</span>
            )}
          </Button>
        </div>

        {/* Exercise card */}
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            {/* Sentence */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Translate the verb</p>
              <p className="text-xl font-medium text-foreground leading-relaxed">
                {currentSentence.english}
              </p>
            </div>

            {/* Verb prompt */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-lg">
                <span className="font-mono text-muted-foreground">
                  {currentSentence.verbInfinitive}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <form onSubmit={handleSubmit} className="flex-1">
                  <Input
                    ref={inputRef}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type conjugation..."
                    className="font-mono text-lg h-12"
                    disabled={showFeedback}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                </form>
              </div>

              {/* Hint */}
              {!showFeedback && (
                <p className="text-xs text-muted-foreground">
                  Tip: Accents are optional (e.g., &quot;hablo&quot; or &quot;habló&quot; both work)
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
                          {currentSentence.correctAnswer}
                        </span>{" "}
                        (not{" "}
                        <span className="font-mono">
                          {currentSentence.incorrectAnswer}
                        </span>
                        )
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {currentSentence.explanation}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      Rule: {currentSentence.rule}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end">
              {!showFeedback ? (
                <Button
                  onClick={() => handleSubmit()}
                  disabled={!userAnswer.trim()}
                  size="lg"
                >
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNext} size="lg" className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Progress indicator */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Session progress</span>
            <span>{currentIndex + 1} of {sentences.length}</span>
          </div>
          <Progress value={((currentIndex + 1) / sentences.length) * 100} className="h-1" />
        </div>
      </main>
    </div>
  );
}
