import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { addWord, WordType, wordTypes } from "../slices/wordsSlice";
import { useAppDispatch } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { DialogClose } from "@/common/components/ui/dialog";

export interface ICreateWordForm {
  word: string;
  description: string;
  type: WordType;
}

export default function CreateWordForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
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
        <Label htmlFor="type">Type</Label>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Word Types</SelectLabel>
                  {wordTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <span>{errors.type.message}</span>}
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
      <DialogClose asChild>
        <Button type="submit">Add New Word</Button>
      </DialogClose>
    </form>
  );
}
