import { useAppDispatch, useAppSelector } from "@/app/store";
import { formatDate } from "@/common/lib/utils";
import { deleteWord, getVocabulary } from "../slices/wordsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import EditWordForm from "./edit-word-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { useState } from "react";

export default function WordsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vocabulary = useAppSelector(getVocabulary);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const handleEditClick = (wordId: string) => {
    setSelectedWordId(wordId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedWordId(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vocabulary.map((word) => (
            <TableRow key={word.id}>
              <TableCell>{word.word}</TableCell>
              <TableCell>{word.description}</TableCell>
              <TableCell>{formatDate(word.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate(`/words/${word.slug}`)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditClick(word.id)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          dispatch(deleteWord(word.id));
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit word</DialogTitle>
          </DialogHeader>
          {selectedWordId && (
            <EditWordForm id={selectedWordId} closeDialog={setIsDialogOpen} />
          )}
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={handleDialogClose}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
