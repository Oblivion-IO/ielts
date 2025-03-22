import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ICreateWordForm } from "../components/create-word-form";
import { v4 as uuidv4 } from "uuid";

export interface Word {
  id: string;
  word: string;
  slug: string;
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
    getWordById: (state) => (id: string) => {
      return state.vocabulary.find((word) => word.id === id);
    },
    getWordBySlug: (state) => (slug: string | undefined) => {
      if (!slug) return undefined;

      return state.vocabulary.find((word) => word.slug === slug);
    },
  },
  reducers: {
    addWord: (state, action: PayloadAction<ICreateWordForm>) => {
      const newWord: Word = {
        id: uuidv4(),
        word: action.payload.word,
        slug: action.payload.word.toLowerCase().replace(/\s/g, "-"),
        description: action.payload.description,
        createdAt: new Date().toISOString(),
      };

      state.vocabulary.push(newWord);
    },
    editWord: (state, action: PayloadAction<Word>) => {
      const wordIndex = state.vocabulary.findIndex(
        (word) => word.id === action.payload.id
      );

      state.vocabulary[wordIndex] = action.payload;
    },
    deleteWord: (state, action: PayloadAction<string>) => {
      state.vocabulary = state.vocabulary.filter(
        (word) => word.id !== action.payload
      );
    },
  },
});

export const { getVocabulary, getWordById, getWordBySlug } =
  wordsSlice.selectors;
export const { addWord, editWord, deleteWord } = wordsSlice.actions;
export default wordsSlice.reducer;
