import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ICreateWordForm } from "../components/create-word-form";
import { v4 as uuidv4 } from "uuid";

export interface Word {
  id: string;
  word: string;
  description: string;
  createdAt: string;
}

export interface WordsState {
  vocabulary: Word[];
}

const initialState: WordsState = {
  vocabulary: [],
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  selectors: {
    getVocabulary: (state) => state.vocabulary,
  },
  reducers: {
    addWord: (state, action: PayloadAction<ICreateWordForm>) => {
      const newWord: Word = {
        id: uuidv4(),
        word: action.payload.word,
        description: action.payload.description,
        createdAt: new Date().toISOString(),
      };

      state.vocabulary.push(newWord);
    },
  },
});

export const { getVocabulary } = wordsSlice.selectors;
export const { addWord } = wordsSlice.actions;
export default wordsSlice.reducer;
