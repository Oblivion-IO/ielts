import { Button } from "@/common/components/ui/button";
import { deleteSentence, getWordBySlug, Sentence } from "../slices/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import EditSentenceWord from "./edit-sentence-word";

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
      <div className="flex items-center gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Pencil size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create new word</DialogTitle>
            </DialogHeader>
            <EditSentenceWord sentence={sentence} />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            dispatch(
              deleteSentence({ wordId: word.id, sentenceId: sentence.id })
            )
          }
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
}
