import { useAppSelector } from "@/app/store";
import { formatDate } from "@/common/lib/utils";
import { getVocabulary } from "../slices/wordsSlice";

export default function WordsList() {
  const vocabulary = useAppSelector(getVocabulary);

  return (
    <div className="flex flex-col gap-5">
      {vocabulary.map((word) => (
        <div key={word.id} className="border p-4 rounded-md">
          <h1>{word.word}</h1>
          <p>{word.description}</p>
          <small>{formatDate(word.createdAt)}</small>
        </div>
      ))}
    </div>
  );
}
