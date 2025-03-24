import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { editSentence, getWordBySlug, Sentence } from "../slices/wordsSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { Button } from "@/common/components/ui/button";
import { DialogClose } from "@/common/components/ui/dialog";

interface Props {
  sentence: Sentence;
}

export default function EditSentenceWord({ sentence }: Props) {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const word = useAppSelector(getWordBySlug)(slug);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Sentence>({ defaultValues: sentence });
  const onSubmit: SubmitHandler<Sentence> = (data) => {
    dispatch(editSentence({ wordId: word?.id, sentence: data }));
  };

  if (!word) {
    return <div>Word not found</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="sentence">Sentence</Label>
        <Textarea
          id="sentence"
          placeholder="Sentence"
          {...register("sentence", { required: "Sentece is required" })}
        />
        {errors.sentence && <span>{errors.sentence.message}</span>}
      </div>
      <DialogClose asChild>
        <Button type="submit">Save</Button>
      </DialogClose>
    </form>
  );
}
