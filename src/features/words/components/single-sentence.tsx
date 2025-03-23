import { Button } from "@/common/components/ui/button";
import { deleteSentence, getWordBySlug, Sentence } from "../slices/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { Trash } from "lucide-react";

interface Props {
  sentence: Sentence;
}

export default function SingleSentence({ sentence }: Props) {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const word = useAppSelector(getWordBySlug)(slug);

  if (!word) {
    return <div>Word not found</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <p className="pb-1 border-b">{sentence.sentence}</p>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          dispatch(deleteSentence({ wordId: word.id, sentenceId: sentence.id }))
        }
      >
        <Trash size={16} />
      </Button>
    </div>
  );
}
