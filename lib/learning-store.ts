import type { TenseType, Sentence } from "./sentences";

export interface LearningProfile {
  diagnosticComplete: boolean;
  diagnosticScore: number;
  weakAreas: string[];
  prefersTense: TenseType | null;
  totalAnswered: number;
  correctAnswers: number;
  mistakeQueue: number[]; // sentence IDs
  completedSentences: number[];
  masteryCheckUnlocked: boolean;
  masteryPassed: boolean;
  masteryScore: number;
  lastPracticed: string | null;
}

const DEFAULT_PROFILE: LearningProfile = {
  diagnosticComplete: false,
  diagnosticScore: 0,
  weakAreas: [],
  prefersTense: null,
  totalAnswered: 0,
  correctAnswers: 0,
  mistakeQueue: [],
  completedSentences: [],
  masteryCheckUnlocked: false,
  masteryPassed: false,
  masteryScore: 0,
  lastPracticed: null,
};

const STORAGE_KEY = "pasado-learning-profile";

export function getProfile(): LearningProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_PROFILE;
  
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Partial<LearningProfile>): LearningProfile {
  const current = getProfile();
  const updated = { ...current, ...profile, lastPracticed: new Date().toISOString() };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  
  return updated;
}

export function completeDiagnostic(
  score: number,
  total: number,
  errors: { preterito: number; imperfecto: number }
): LearningProfile {
  const weakAreas: string[] = [];
  const percentage = (score / total) * 100;
  
  if (errors.preterito > errors.imperfecto) {
    weakAreas.push("Preterito recognition");
  } else if (errors.imperfecto > errors.preterito) {
    weakAreas.push("Imperfecto recognition");
  }
  
  if (percentage < 50) {
    weakAreas.push("Basic tense distinction");
  }
  
  return saveProfile({
    diagnosticComplete: true,
    diagnosticScore: percentage,
    weakAreas,
    prefersTense: errors.preterito > errors.imperfecto ? "imperfecto" : "preterito",
  });
}

export function recordAnswer(
  sentenceId: number,
  correct: boolean,
  sentence: Sentence
): LearningProfile {
  const profile = getProfile();
  
  const newProfile: Partial<LearningProfile> = {
    totalAnswered: profile.totalAnswered + 1,
    correctAnswers: profile.correctAnswers + (correct ? 1 : 0),
  };
  
  if (correct) {
    // Remove from mistake queue if present
    newProfile.mistakeQueue = profile.mistakeQueue.filter(id => id !== sentenceId);
    // Add to completed if not already there
    if (!profile.completedSentences.includes(sentenceId)) {
      newProfile.completedSentences = [...profile.completedSentences, sentenceId];
    }
  } else {
    // Add to mistake queue if not already there
    if (!profile.mistakeQueue.includes(sentenceId)) {
      newProfile.mistakeQueue = [...profile.mistakeQueue, sentenceId];
    }
  }
  
  // Check if mastery check should be unlocked
  const totalCorrect = newProfile.correctAnswers ?? profile.correctAnswers;
  const totalAnswered = newProfile.totalAnswered ?? profile.totalAnswered;
  
  if (totalAnswered >= 20 && (totalCorrect / totalAnswered) >= 0.75) {
    newProfile.masteryCheckUnlocked = true;
  }
  
  return saveProfile(newProfile);
}

export function completeMasteryCheck(score: number, total: number): LearningProfile {
  const percentage = (score / total) * 100;
  
  return saveProfile({
    masteryScore: percentage,
    masteryPassed: percentage >= 90,
  });
}

export function resetProgress(): LearningProfile {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROFILE;
}

export function getAccuracyPercentage(profile: LearningProfile): number {
  if (profile.totalAnswered === 0) return 0;
  return Math.round((profile.correctAnswers / profile.totalAnswered) * 100);
}
