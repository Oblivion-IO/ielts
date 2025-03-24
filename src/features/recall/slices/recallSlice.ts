import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Word } from "@/features/words/slices/wordsSlice";

export interface RecallState {
  recallWords: Word[];
  currentIndex: number;
  sessionComplete: boolean;
}

const initialState: RecallState = {
  recallWords: [],
  currentIndex: 0,
  sessionComplete: false,
};

const recallSlice = createSlice({
  name: "recall",
  initialState,
  selectors: {
    getRecallWords: (state) => state.recallWords,
    getCurrentIndex: (state) => state.currentIndex,
    getSessionComplete: (state) => state.sessionComplete,
    getCurrentWord: (state) => state.recallWords[state.currentIndex],
  },
  reducers: {
    setRecallWords: (state, action: PayloadAction<Word[]>) => {
      state.recallWords = action.payload;
      state.currentIndex = 0;
      state.sessionComplete = false;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    incrementIndex: (state) => {
      if (state.currentIndex < state.recallWords.length - 1) {
        state.currentIndex += 1;
      } else {
        state.sessionComplete = true;
      }
    },
    resetRecallSession: (state) => {
      state.recallWords = [];
      state.currentIndex = 0;
      state.sessionComplete = false;
    },
  },
});

export const {
  getRecallWords,
  getCurrentIndex,
  getSessionComplete,
  getCurrentWord,
} = recallSlice.selectors;

export const {
  setRecallWords,
  setCurrentIndex,
  incrementIndex,
  resetRecallSession,
} = recallSlice.actions;

export default recallSlice.reducer;
