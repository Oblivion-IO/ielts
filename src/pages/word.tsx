import SingleWord from "@/features/words/components/single-word";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import CreateSentenceForm from "@/features/words/components/create-sentence-form";
import SentencesList from "@/features/words/components/sentences-list";
import GoBack from "@/common/components/core/goback";

export default function WordPage() {
  return (
    <div className="container mx-auto my-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <GoBack />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add sentence</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <CreateSentenceForm />
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
      <SingleWord />
      <SentencesList />
    </div>
  );
}
