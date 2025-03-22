import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { getWordBySlug } from "../slices/wordsSlice";

export default function SingleWord() {
  const { slug } = useParams();

  const word = useAppSelector(getWordBySlug)(slug);

  if (!word) {
    return <div>Word not found</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="border-b pb-1">{word.word}</h2>
      <div className="flex flex-col gap-1">
        <small className="text-xs">Description</small>
        <p>{word.description}</p>
      </div>
    </div>
  );
}
