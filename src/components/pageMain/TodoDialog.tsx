import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface TodoDialogProps {
  title: string;
  action?: string;
  onAction: (args: { title: string; content: string }) => void;
  close?: string;
  onClose: () => void;
  defaultValues?: { title?: string; content?: string };
}

const TodoDialog = ({
  title: dialogTitle,
  action,
  onAction,
  close,
  onClose,
  defaultValues,
}: TodoDialogProps) => {
  const { title: defaultTitle = "", content: defaultContent = "" } = useMemo(
    () => defaultValues ?? {},
    [defaultValues],
  );

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

  // TODO: open = false 일때 아예 언마운트 되도록 수정 필요
  return (
    <Dialog defaultOpen>
      <DialogOverlay onClick={handleCloseClick} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div>
          <div>제목</div>
          <input
            className="w-full rounded-md border border-zinc-300"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <div>내용</div>
          <input
            className="w-full rounded-md border border-zinc-300"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleActionClick}>{action ?? "확인"}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleCloseClick}>{close ?? "닫기"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
