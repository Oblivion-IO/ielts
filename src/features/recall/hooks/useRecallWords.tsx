import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecallWords,
  getCurrentIndex,
  getSessionComplete,
  getCurrentWord,
  setRecallWords,
  setCurrentIndex,
  incrementIndex,
  resetRecallSession,
} from "../slices/recallSlice";
import {
  getVocabulary,
  editWord,
  Word,
} from "@/features/words/slices/wordsSlice";

export const RECALL_INTERVALS = {
  EASY: 7 * 24 * 60 * 60 * 1000, // 7 days
  MEDIUM: 1 * 24 * 60 * 60 * 1000, // 1 day
  HARD: 30 * 60 * 1000, // 30 minutes
};

export type RecallDifficulty = "EASY" | "MEDIUM" | "HARD";

export function useRecallWords() {
  const dispatch = useDispatch();
  const vocabulary = useSelector(getVocabulary);
  const recallWords = useSelector(getRecallWords);
  const currentIndex = useSelector(getCurrentIndex);
  const sessionComplete = useSelector(getSessionComplete);
  const currentWord = useSelector(getCurrentWord);

  useEffect(() => {
    if (recallWords.length === 0 && vocabulary.length > 0) {
      const now = new Date();
      const wordsToRecall = vocabulary.filter((word) => {
        if (!word.nextRecallAt) return true;
        return new Date(word.nextRecallAt) <= now;
      });

      dispatch(setRecallWords(wordsToRecall));
    }
  }, [vocabulary, recallWords.length, dispatch]);

  const handleRecall = (difficulty: RecallDifficulty) => {
    if (!currentWord) return;

    const now = new Date();
    const nextRecallTime = new Date(
      now.getTime() + RECALL_INTERVALS[difficulty]
    );

    const updatedWord: Word = {
      ...currentWord,
      lastRecalledAt: now.toISOString(),
      nextRecallAt: nextRecallTime.toISOString(),
    };

    dispatch(editWord(updatedWord));
    dispatch(incrementIndex());
  };

  const goToWord = (index: number) => {
    if (index >= 0 && index < recallWords.length) {
      dispatch(setCurrentIndex(index));
    }
  };

  const resetSession = () => {
    dispatch(resetRecallSession());
  };

  return {
    recallWords,
    currentWord,
    currentIndex,
    sessionComplete,
    totalWords: recallWords.length,
    handleRecall,
    goToWord,
    resetSession,
    hasWords: recallWords.length > 0,
  };
}
