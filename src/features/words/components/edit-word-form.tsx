import { SubmitHandler, useForm } from "react-hook-form";
import { editWord, getWordById, Word } from "../slices/wordsSlice";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store";

interface Props {
  id: string;
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditWordForm({ id, closeDialog }: Props) {
  const dispatch = useAppDispatch();
  const word = useAppSelector(getWordById)(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Word>({
    defaultValues: word,
  });

  const onSubmit: SubmitHandler<Word> = (data) => {
    dispatch(editWord(data));

    closeDialog(false);
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
        <Label htmlFor="word">Word</Label>
        <Input
          id="word"
          type="text"
          placeholder="New word"
          {...register("word", { required: "Word is required" })}
        />
        {errors.word && <span>{errors.word.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Word description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
