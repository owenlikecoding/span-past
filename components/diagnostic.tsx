"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getDiagnosticQuestions, type DiagnosticQuestion, type TenseType } from "@/lib/sentences";
import { completeDiagnostic } from "@/lib/learning-store";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

interface DiagnosticProps {
  onComplete: () => void;
}

export function Diagnostic({ onComplete }: DiagnosticProps) {
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TenseType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState({ preterito: 0, imperfecto: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setQuestions(getDiagnosticQuestions());
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  const handleSelect = (tense: TenseType) => {
    if (showFeedback) return;
    setSelectedAnswer(tense);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctTense;
    
    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setErrors(e => ({
        ...e,
        [currentQuestion.correctTense]: e[currentQuestion.correctTense] + 1,
      }));
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      // Complete diagnostic
      const finalScore = score + (selectedAnswer === currentQuestion?.correctTense ? 1 : 0);
      completeDiagnostic(finalScore, questions.length, errors);
      setIsComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading diagnostic...</p>
      </div>
    );
  }

  if (isComplete) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-lg w-full p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <CheckCircle className="h-8 w-8 text-secondary-foreground" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-foreground">Diagnostic Complete</h2>
              <p className="text-muted-foreground">
                You scored {finalScore} out of {questions.length} ({percentage}%)
              </p>
            </div>

            <div className="w-full bg-secondary rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Your Learning Profile</h3>
              <div className="flex flex-col gap-2 text-sm text-left">
                {errors.preterito > 0 && (
                  <p className="text-muted-foreground">
                    Focus area: Recognizing when to use Preterito
                  </p>
                )}
                {errors.imperfecto > 0 && (
                  <p className="text-muted-foreground">
                    Focus area: Recognizing when to use Imperfecto
                  </p>
                )}
                {percentage >= 75 && (
                  <p className="text-muted-foreground">
                    Strong foundation - ready for intensive practice
                  </p>
                )}
                {percentage < 50 && (
                  <p className="text-muted-foreground">
                    Building blocks needed - focus on understanding the core rules
                  </p>
                )}
              </div>
            </div>

            <Button size="lg" onClick={onComplete} className="w-full gap-2">
              Start Training
              <ArrowRight className="h-4 w-4" />
            </Button>
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
            <span className="text-sm font-medium text-muted-foreground">
              Diagnostic Assessment
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
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Choose the correct tense</p>
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {currentQuestion?.english}
            </p>
          </div>

          <div className="flex flex-col gap-3">
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
                  className={`justify-start h-auto py-4 px-5 text-left ${extraClasses}`}
                  onClick={() => handleSelect(option.tense)}
                  disabled={showFeedback}
                >
                  <div className="flex items-center gap-3">
                    {showFeedback && isCorrectOption && (
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 shrink-0" />
                    )}
                    <span className="font-mono">{option.text}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`rounded-lg p-4 ${isCorrect ? "bg-accent/10 border border-accent/20" : "bg-destructive/10 border border-destructive/20"}`}>
              <p className={`font-medium mb-1 ${isCorrect ? "text-accent" : "text-destructive"}`}>
                {isCorrect ? "Correct!" : "Not quite"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentQuestion?.explanation}
              </p>
            </div>
          )}

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
