import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ICreateWordForm } from "../components/create-word-form";
import { v4 as uuidv4 } from "uuid";
import { ICreateSentenceForm } from "../components/create-sentence-form";

export interface Sentence {
  id: string;
  sentence: string;
  createdAt: string;
}

export type WordType = "Noun" | "Verb" | "Adjective" | "Phrase" | "Adverb";

export const wordTypes: WordType[] = [
  "Noun",
  "Verb",
  "Adjective",
  "Phrase",
  "Adverb",
];

export interface Word {
  id: string;
  word: string;
  type: WordType;
  slug: string;
  description: string;
  createdAt: string;
  lastRecalledAt?: string;
  nextRecallAt?: string;
  sentences: Sentence[];
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
    getSentencesBySlug: (state) => (slug: string | undefined) => {
      if (!slug) return undefined;

      const word = state.vocabulary.find((word) => word.slug === slug);
      if (!word) return undefined;

      return word.sentences;
    },
  },
  reducers: {
    addWord: (state, action: PayloadAction<ICreateWordForm>) => {
      const newWord: Word = {
        id: uuidv4(),
        word: action.payload.word,
        type: action.payload.type,
        slug: action.payload.word.toLowerCase().replace(/\s/g, "-"),
        description: action.payload.description,
        createdAt: new Date().toISOString(),
        lastRecalledAt: undefined,
        nextRecallAt: undefined,
        sentences: [],
      };

      state.vocabulary.push(newWord);
    },
    addSentence: (state, action: PayloadAction<ICreateSentenceForm>) => {
      if (!action.payload.wordId) return;

      const wordIndex = state.vocabulary.findIndex(
        (word) => word.id === action.payload.wordId
      );

      const newSentence: Sentence = {
        id: uuidv4(),
        sentence: action.payload.sentence,
        createdAt: new Date().toISOString(),
      };

      state.vocabulary[wordIndex].sentences.push(newSentence);
    },
    editWord: (state, action: PayloadAction<Word>) => {
      const wordIndex = state.vocabulary.findIndex(
        (word) => word.id === action.payload.id
      );

      state.vocabulary[wordIndex] = action.payload;
    },
    editSentence: (
      state,
      action: PayloadAction<{ wordId: string | undefined; sentence: Sentence }>
    ) => {
      if (!action.payload.wordId) return;

      const wordIdx = state.vocabulary.findIndex(
        (word) => word.id === action.payload.wordId
      );

      const sentenceIdx = state.vocabulary[wordIdx].sentences.findIndex(
        (sentence) => sentence.id === action.payload.sentence.id
      );

      if (wordIdx !== -1 && sentenceIdx !== -1) {
        state.vocabulary[wordIdx].sentences[sentenceIdx] =
          action.payload.sentence;
      }
    },
    deleteWord: (state, action: PayloadAction<string>) => {
      state.vocabulary = state.vocabulary.filter(
        (word) => word.id !== action.payload
      );
    },
    deleteSentence: (
      state,
      action: PayloadAction<{ wordId: string; sentenceId: string }>
    ) => {
      const wordIndex = state.vocabulary.findIndex(
        (word) => word.id === action.payload.wordId
      );

      if (wordIndex !== -1) {
        state.vocabulary[wordIndex].sentences = state.vocabulary[
          wordIndex
        ].sentences.filter(
          (sentence) => sentence.id !== action.payload.sentenceId
        );
      }
    },
  },
});

export const { getVocabulary, getWordById, getWordBySlug, getSentencesBySlug } =
  wordsSlice.selectors;

export const {
  addWord,
  addSentence,
  editWord,
  editSentence,
  deleteWord,
  deleteSentence,
} = wordsSlice.actions;

export default wordsSlice.reducer;
