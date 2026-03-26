"use client";

import React from "react"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getMasteryCheckSentences, type Sentence } from "@/lib/sentences";
import { completeMasteryCheck } from "@/lib/learning-store";
import { ArrowLeft, ArrowRight, Trophy, Star, RotateCcw } from "lucide-react";

interface MasteryCheckProps {
  onBack: () => void;
  onComplete: () => void;
}

export function MasteryCheck({ onBack, onComplete }: MasteryCheckProps) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSentences(getMasteryCheckSentences());
  }, []);

  useEffect(() => {
    if (started && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [started, showFeedback, currentIndex]);

  const currentSentence = sentences[currentIndex];
  const progress = sentences.length > 0 ? ((currentIndex) / sentences.length) * 100 : 0;

  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userAnswer.trim() || !currentSentence) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentSentence.correctAnswer);
    const correct = normalized === correctNormalized;

    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= sentences.length) {
      // Complete mastery check
      const finalScore = score + (isCorrect ? 0 : 0); // Score already updated
      completeMasteryCheck(finalScore, sentences.length);
      setIsComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
      setUserAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showFeedback) {
      handleNext();
    }
  };

  const handleRestart = () => {
    setSentences(getMasteryCheckSentences());
    setCurrentIndex(0);
    setUserAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
    setScore(0);
    setIsComplete(false);
  };

  if (sentences.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading mastery check...</p>
      </div>
    );
  }

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Trophy className="h-8 w-8 text-secondary-foreground" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-foreground">Mastery Check</h2>
              <p className="text-muted-foreground">
                Prove your understanding with 20 mixed sentences.
              </p>
            </div>

            <div className="w-full bg-secondary rounded-lg p-4 text-left">
              <h3 className="font-medium text-foreground mb-2">Requirements to pass:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- Answer 20 sentences</li>
                <li>- Achieve 90% accuracy (18/20)</li>
                <li>- No hints available</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button size="lg" onClick={() => setStarted(true)} className="w-full">
                Begin Mastery Check
              </Button>
              <Button size="lg" variant="outline" onClick={onBack} className="w-full gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Not yet, keep practicing
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Results screen
  if (isComplete) {
    const percentage = Math.round((score / sentences.length) * 100);
    const passed = percentage >= 90;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-accent/20" : "bg-secondary"}`}>
              {passed ? (
                <Star className="h-10 w-10 text-accent" />
              ) : (
                <RotateCcw className="h-10 w-10 text-secondary-foreground" />
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                {passed ? "Mastery Achieved!" : "Not Quite Yet"}
              </h2>
              <p className="text-muted-foreground">
                You scored {score} out of {sentences.length} ({percentage}%)
              </p>
            </div>

            <div className={`w-full rounded-lg p-4 ${passed ? "bg-accent/10 border border-accent/20" : "bg-secondary"}`}>
              {passed ? (
                <div className="flex flex-col gap-2">
                  <p className="text-foreground font-medium">
                    You now think in Spanish past tense.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ve demonstrated a solid understanding of when to use Preterito vs Imperfecto. 
                    Keep practicing to maintain your skills!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-foreground font-medium">
                    You need 90% to pass (18/20)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Keep practicing with the trainer and decision drills. 
                    Focus on the patterns and rules. You&apos;re getting closer!
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              {passed ? (
                <Button size="lg" onClick={onComplete} className="w-full gap-2">
                  <Trophy className="h-4 w-4" />
                  Celebrate & Continue
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={handleRestart} className="w-full">
                    Try Again
                  </Button>
                  <Button size="lg" variant="outline" onClick={onBack} className="w-full gap-2 bg-transparent">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Training
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Main test UI
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                Mastery Check
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Score: {score}/{currentIndex + (showFeedback ? 1 : 0)}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {sentences.length}
              </span>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-1" />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            {/* Sentence */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Translate the verb</p>
              <p className="text-xl font-medium text-foreground leading-relaxed">
                {currentSentence?.english}
              </p>
            </div>

            {/* Verb prompt */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-lg">
                <span className="font-mono text-muted-foreground">
                  {currentSentence?.verbInfinitive}
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
            </div>

            {/* Feedback - minimal for mastery check */}
            {showFeedback && (
              <div
                className={`rounded-lg p-4 ${
                  isCorrect
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-destructive/10 border border-destructive/20"
                }`}
              >
                <p
                  className={`font-medium ${
                    isCorrect ? "text-accent" : "text-destructive"
                  }`}
                >
                  {isCorrect ? "Correct!" : `Incorrect - the answer was "${currentSentence?.correctAnswer}"`}
                </p>
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
                  Submit
                </Button>
              ) : (
                <Button onClick={handleNext} size="lg" className="gap-2">
                  {currentIndex + 1 >= sentences.length ? "See Results" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Progress stats */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-muted-foreground">
            Need 18/20 correct to pass
          </p>
        </div>
      </main>
    </div>
  );
}
