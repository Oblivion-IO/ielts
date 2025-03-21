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

export default function App() {
  return (
    <div className="container py-5 mx-auto min-h-screen flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1>Vocabulary</h1>
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
      <WordsList />
    </div>
  );
}

