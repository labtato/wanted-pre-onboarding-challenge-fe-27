import { useState } from "react";
import TodoDialog from "./TodoDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateTodo } from "@/api/todos";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const TodoCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["postCreateTodo"],
    mutationFn: (args: { title: string; content: string }) =>
      postCreateTodo(args),
    onSuccess: ({ data: { data } }) => {
      queryClient.invalidateQueries({
        queryKey: ["getTodos"],
      });
      navigate(data.id);
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
      <Button className="w-full font-bold" onClick={handleTriggerClick}>
        Create TODO
      </Button>
      {dialogOpen && (
        <TodoDialog
          title="Create TODO"
          action="생성"
          onClose={handleDialogClose}
          onAction={handleDialogAction}
        />
      )}
    </>
  );
};

export default TodoCreate;
