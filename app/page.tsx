"use client";

import { useState, useEffect } from "react";
import { Landing } from "@/components/landing";
import { Diagnostic } from "@/components/diagnostic";
import { Trainer } from "@/components/trainer";
import { DecisionDrills } from "@/components/decision-drills";
import { MasteryCheck } from "@/components/mastery-check";
import { EndingsLearning } from "@/components/endings-learning";
import { getProfile, resetProgress } from "@/lib/learning-store";

type Screen = "landing" | "diagnostic" | "trainer" | "decision-drills" | "mastery-check" | "endings";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [hasPreviousProgress, setHasPreviousProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = getProfile();
    setHasPreviousProgress(profile.diagnosticComplete);
    setIsLoading(false);
  }, []);

  const handleStartFresh = () => {
    resetProgress();
    setHasPreviousProgress(false);
    setScreen("diagnostic");
  };

  const handleContinue = () => {
    setScreen("trainer");
  };

  const handleDiagnosticComplete = () => {
    setScreen("trainer");
    setHasPreviousProgress(true);
  };

  const handleMasteryComplete = () => {
    setScreen("trainer");
  };

  const handleLearnEndings = () => {
    setScreen("endings");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  switch (screen) {
    case "landing":
      return (
        <Landing
          onStart={handleStartFresh}
          hasPreviousProgress={hasPreviousProgress}
          onContinue={handleContinue}
          onLearnEndings={handleLearnEndings}
        />
      );
    case "endings":
      return (
        <EndingsLearning
          onBack={() => setScreen("landing")}
          onTrainer={() => setScreen("trainer")}
        />
      );
    case "diagnostic":
      return <Diagnostic onComplete={handleDiagnosticComplete} />;
    case "trainer":
      return (
        <Trainer
          onDecisionDrills={() => setScreen("decision-drills")}
          onMasteryCheck={() => setScreen("mastery-check")}
          onHome={() => setScreen("landing")}
          onLearnEndings={handleLearnEndings}
        />
      );
    case "decision-drills":
      return <DecisionDrills onBack={() => setScreen("trainer")} />;
    case "mastery-check":
      return (
        <MasteryCheck
          onBack={() => setScreen("trainer")}
          onComplete={handleMasteryComplete}
        />
      );
    default:
      return null;
  }
}
