"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getDecisionDrills, type DiagnosticQuestion, type TenseType } from "@/lib/sentences";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Brain } from "lucide-react";

interface DecisionDrillsProps {
  onBack: () => void;
}

export function DecisionDrills({ onBack }: DecisionDrillsProps) {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TenseType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setQuestions(getDecisionDrills(15));
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  const handleSelect = (tense: TenseType) => {
    if (showFeedback) return;
    setSelectedAnswer(tense);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentQuestion?.correctTense;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setQuestions(getDecisionDrills(15));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsComplete(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading drills...</p>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Brain className="h-8 w-8 text-secondary-foreground" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-foreground">Decision Drills Complete</h2>
              <p className="text-muted-foreground">
                You scored {score} out of {questions.length} ({percentage}%)
              </p>
            </div>

            <div className="w-full bg-secondary rounded-lg p-4">
              {percentage >= 90 ? (
                <p className="text-sm text-muted-foreground">
                  Excellent! Your tense intuition is strong. Keep practicing to maintain it.
                </p>
              ) : percentage >= 70 ? (
                <p className="text-sm text-muted-foreground">
                  Good progress! Focus on the patterns in your mistakes to improve further.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Keep practicing! The key is understanding the rules, not memorizing answers.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button size="lg" onClick={handleRestart} className="w-full">
                Try Again
              </Button>
              <Button size="lg" variant="outline" onClick={onBack} className="w-full gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Trainer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion?.correctTense;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-sm font-medium text-foreground">
              Decision Drills
            </span>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="mt-3 h-1" />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="flex flex-col gap-8">
          {/* Info */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Build your intuition:</strong> Decide which tense 
              Spanish uses for each sentence. No conjugation required - just choose the right tense.
            </p>
          </div>

          {/* Sentence */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Which tense does Spanish use here?</p>
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {currentQuestion?.english}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion?.options.map((option) => {
              const isSelected = selectedAnswer === option.tense;
              const isCorrectOption = option.tense === currentQuestion.correctTense;
              
              let variant: "outline" | "default" | "destructive" = "outline";
              let extraClasses = "";
              
              if (showFeedback) {
                if (isCorrectOption) {
                  extraClasses = "border-accent bg-accent/10 text-accent";
                } else if (isSelected && !isCorrectOption) {
                  variant = "destructive";
                  extraClasses = "bg-destructive/10";
                }
              } else if (isSelected) {
                variant = "default";
              }

              return (
                <Button
                  key={option.tense}
                  variant={variant}
                  className={`h-auto py-6 text-lg font-medium ${extraClasses}`}
                  onClick={() => handleSelect(option.tense)}
                  disabled={showFeedback}
                >
                  <div className="flex flex-col items-center gap-1">
                    {showFeedback && isCorrectOption && (
                      <CheckCircle className="h-5 w-5 mb-1" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 mb-1" />
                    )}
                    <span>{option.text}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`rounded-lg p-4 ${isCorrect ? "bg-accent/10 border border-accent/20" : "bg-destructive/10 border border-destructive/20"}`}>
              <p className={`font-medium mb-2 ${isCorrect ? "text-accent" : "text-destructive"}`}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentQuestion?.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end">
            {!showFeedback ? (
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedAnswer}
                size="lg"
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg" className="gap-2">
                {currentIndex + 1 >= questions.length ? "See Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
