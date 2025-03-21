import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { addWord } from "../slices/wordsSlice";
import { useAppDispatch } from "@/app/store";

export interface ICreateWordForm {
  word: string;
  description: string;
}

export default function CreateWordForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateWordForm>();
  const onSubmit: SubmitHandler<ICreateWordForm> = (data) => {
    dispatch(addWord(data));
  };

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

      <Button type="submit">Add New Word</Button>
    </form>
  );
}
