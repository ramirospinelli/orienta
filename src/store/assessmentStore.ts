import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoProfiles } from "@/features/demo/data/demoProfiles";
import {
  AssessmentMode,
  AssessmentResult,
  AssessmentStep,
  LikertValue,
  UserProfile,
} from "@/shared/types/assessment";

type AssessmentStore = {
  mode: AssessmentMode;
  step: AssessmentStep;
  currentQuestionIndex: number;
  consentAccepted: boolean;
  userProfile: UserProfile | null;
  answers: Record<string, LikertValue>;
  result: AssessmentResult | null;
  setMode: (mode: AssessmentMode) => void;
  setStep: (step: AssessmentStep) => void;
  acceptConsent: () => void;
  startAssessment: () => void;
  setUserProfile: (profile: UserProfile) => void;
  answerQuestion: (questionId: string, value: LikertValue) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  completeAssessment: (result: AssessmentResult) => void;
  loadDemoProfile: (profileId: string) => void;
  loadDevAnswers: (answers: Record<string, LikertValue>) => void;
  resetAssessment: () => void;
};

const initialState = {
  mode: "real" as AssessmentMode,
  step: "landing" as AssessmentStep,
  currentQuestionIndex: 0,
  consentAccepted: false,
  userProfile: null,
  answers: {},
  result: null,
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      ...initialState,
      setMode: (mode) => set({ mode }),
      setStep: (step) => set({ step }),
      acceptConsent: () => set({ consentAccepted: true, step: "intake" }),
      startAssessment: () =>
        set({
          mode: "real",
          step: "assessment",
          currentQuestionIndex: 0,
          result: null,
        }),
      setUserProfile: (userProfile) => set({ userProfile }),
      answerQuestion: (questionId, value) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: value,
          },
        })),
      goToNextQuestion: () =>
        set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
      goToPreviousQuestion: () =>
        set((state) => ({ currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) })),
      completeAssessment: (result) =>
        set({
          result,
          step: "results",
        }),
      loadDemoProfile: (profileId) => {
        const profile = demoProfiles.find((item) => item.id === profileId);

        if (!profile) {
          return;
        }

        set({
          mode: "demo",
          consentAccepted: true,
          currentQuestionIndex: 0,
          userProfile: profile.userProfile,
          result: profile.result,
          step: "results",
        });
      },
      loadDevAnswers: (answers) =>
        set({
          mode: "dev",
          consentAccepted: true,
          answers,
          step: "assessment",
          currentQuestionIndex: 0,
        }),
      resetAssessment: () => set(initialState),
    }),
    {
      name: "orienta-assessment-store",
      partialize: (state) => ({
        mode: state.mode,
        step: state.step,
        currentQuestionIndex: state.currentQuestionIndex,
        consentAccepted: state.consentAccepted,
        userProfile: state.userProfile,
        answers: state.answers,
        result: state.result,
      }),
    },
  ),
);
