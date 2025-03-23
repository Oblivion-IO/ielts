import { useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { getSentencesBySlug } from "../slices/wordsSlice";
import SingleSentence from "./single-sentence";

export default function SentencesList() {
  const { slug } = useParams();
  const sentences = useAppSelector(getSentencesBySlug)(slug);

  if (!sentences) {
    return <div>Word not found</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Example Sentences:</h1>
      {sentences.map((sentence) => (
        <SingleSentence sentence={sentence} key={sentence.id} />
      ))}
    </div>
  );
}
