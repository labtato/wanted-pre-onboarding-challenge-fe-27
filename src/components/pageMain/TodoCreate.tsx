import { useState } from "react";
import TodoDialog from "./TodoDialog";
import { useMutation } from "@tanstack/react-query";
import { postCreateTodo } from "@/api/todos";

type TodoCreateProps = {
  onTodoCreate?: () => void;
};

const TodoCreate = ({ onTodoCreate }: TodoCreateProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["postCreateTodo"],
    mutationFn: (args: { title: string; content: string }) =>
      postCreateTodo(args),
    // invalidateQueries && page refresh 보다 나은 걸까..?
    onSuccess: () => {
      onTodoCreate?.();
    },
  });

  //
  //
  //
  const handleTriggerClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogAction = (todo: { title: string; content: string }) => {
    mutate(todo);
    setDialogOpen(false);
  };

  return (
    <>
      <div
        onClick={handleTriggerClick}
        className="flex w-full items-center justify-center rounded-md bg-black py-1 font-bold text-white hover:cursor-pointer hover:bg-opacity-70"
      >
        Create TODO
      </div>
      <TodoDialog
        open={dialogOpen}
        title="Create TODO"
        action="생성"
        onClose={handleDialogClose}
        onAction={handleDialogAction}
      />
    </>
  );
};

export default TodoCreate;
