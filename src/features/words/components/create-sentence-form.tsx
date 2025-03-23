import { useAppDispatch, useAppSelector } from "@/app/store";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addSentence, getWordBySlug } from "../slices/wordsSlice";
import { Button } from "@/common/components/ui/button";

export interface ICreateSentenceForm {
  wordId: string | undefined;
  sentence: string;
}

export default function CreateSentenceForm() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const word = useAppSelector(getWordBySlug)(slug);

  const { register, handleSubmit } = useForm<ICreateSentenceForm>();
  const onSubmit: SubmitHandler<ICreateSentenceForm> = (data) => {
    dispatch(addSentence({ ...data, wordId: word?.id }));
  };

  if (!word) {
    return <div>Word not found</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="sentence">Example sentence with {word.word}</Label>
        <Textarea
          id="sentence"
          placeholder="Sentence"
          {...register("sentence", { required: "Sentence is required" })}
        />
      </div>
      <Button type="submit">Add sentence</Button>
    </form>
  );
}
