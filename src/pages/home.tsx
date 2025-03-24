import CreateWordForm from "@/features/words/components/create-word-form";
import WordsList from "@/features/words/components/words-list";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { NavLink } from "react-router-dom";
import { useRecallWords } from "@/features/recall/hooks/useRecallWords";

export default function HomePage() {
  const { recallWords } = useRecallWords();

  return (
    <div className="container py-5 mx-auto min-h-screen flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vocabulary</h1>
        <div className="flex items-center gap-4">
          <NavLink to="/recall">Recall ({recallWords.length})</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add new Word</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create new word</DialogTitle>
              </DialogHeader>
              <CreateWordForm />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <WordsList />
    </div>
  );
}
