"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Target, RotateCcw, GraduationCap, Layers, Brain, CheckCircle } from "lucide-react";

interface LandingProps {
  onStart: () => void;
  hasPreviousProgress: boolean;
  onContinue: () => void;
  onLearnEndings: () => void;
}

export function Landing({ onStart, hasPreviousProgress, onContinue, onLearnEndings }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-foreground" />
            <span className="text-xl font-semibold text-foreground">Pasado</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Spanish Grammar Mastery
            </p>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl text-balance">
              Master Spanish verb endings and past tense
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Learn the -AR, -ER, -IR conjugation patterns for Preterito and Imperfecto. 
              Then practice choosing the right tense through instant feedback drills.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* Primary CTA - Learn Endings */}
            <Button size="lg" onClick={onLearnEndings} className="gap-2">
              <GraduationCap className="h-5 w-5" />
              Learn Verb Endings
            </Button>
            {hasPreviousProgress ? (
              <>
                <Button size="lg" variant="outline" onClick={onContinue} className="gap-2 bg-transparent">
                  Continue Training
                </Button>
                <Button size="lg" variant="ghost" onClick={onStart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Start Fresh
                </Button>
              </>
            ) : (
              <Button size="lg" variant="outline" onClick={onStart} className="gap-2 bg-transparent">
                <Target className="h-4 w-4" />
                Take Diagnostic
              </Button>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <GraduationCap className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Learn the Endings</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Study and practice -AR, -ER, -IR verb endings for Preterito and Imperfecto with interactive drills.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Layers className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Pattern-Based Learning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Understand why each tense is used through clear rules. Build real intuition, not memorization.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Brain className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Mistake Loop</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your mistakes automatically resurface later. The system adapts to what you need to practice.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">How it works</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-muted-foreground/50">01</span>
              <h3 className="font-medium text-foreground">Learn verb endings</h3>
              <p className="text-sm text-muted-foreground">
                Study the conjugation patterns for -AR, -ER, -IR verbs.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-muted-foreground/50">02</span>
              <h3 className="font-medium text-foreground">Practice conjugations</h3>
              <p className="text-sm text-muted-foreground">
                Drill each ending until they become automatic.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-muted-foreground/50">03</span>
              <h3 className="font-medium text-foreground">Choose the right tense</h3>
              <p className="text-sm text-muted-foreground">
                Learn when to use Preterito vs Imperfecto in context.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-muted-foreground/50">04</span>
              <h3 className="font-medium text-foreground">Pass the mastery check</h3>
              <p className="text-sm text-muted-foreground">
                Prove your understanding with 90% accuracy on 20 sentences.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <p className="text-sm text-muted-foreground text-center">
            Built for learners who want results, not badges.
          </p>
        </div>
      </footer>
    </div>
  );
}
