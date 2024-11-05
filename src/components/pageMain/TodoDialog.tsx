import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "../ui/dialog";

interface TodoDialogProps {
  title: string;
  open: boolean;
  action?: string;
  onAction: (args: { title: string; content: string }) => void;
  close?: string;
  onClose: () => void;
  defaultValues?: { title?: string; content?: string };
}

const TodoDialog = ({
  title: dialogTitle,
  open,
  action,
  onAction,
  close,
  onClose,
  defaultValues,
}: TodoDialogProps) => {
  const { title: defaultTitle = "", content: defaultContent = "" } =
    defaultValues ?? {};

  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleActionClick = () => {
    onAction({ title, content });
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogOverlay onClick={handleCloseClick} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <input value={title} onChange={handleTitleChange} />
        <input value={content} onChange={handleContentChange} />
        <DialogFooter>
          <DialogClose onClick={handleActionClick}>
            {action ?? "확인"}
          </DialogClose>
          <DialogClose onClick={handleCloseClick}>
            {close ?? "닫기"}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
