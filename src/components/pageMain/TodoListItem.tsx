import { formatDate } from "@/lib/date";
import { postDeleteTodo, PostDeleteTodoReq, TODO } from "../../api/todos";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface TodoListItemProps {
  todo: TODO;
  onItemClick: () => void;
}

const TodoListItem = ({ todo, onItemClick }: TodoListItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hover, setHover] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["postDeleteTodo"],
    mutationFn: (args: PostDeleteTodoReq) => postDeleteTodo(args),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getTodos"],
        })
        .then(() => {
          navigate("/");
        });
    },
  });

  //
  //
  //
  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleDeleteClick = (id: string) => {
    mutate({ id });
  };

  //
  //
  //
  return (
    <Card
      onClick={onItemClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="mb-3 last-of-type:mb-0"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{todo.title}</div>
          {hover && (
            <div
              onClick={() => {
                handleDeleteClick(todo.id);
              }}
              className="font-bold text-red-800 hover:cursor-pointer hover:underline"
            >
              삭제
            </div>
          )}
        </div>
      </CardHeader>
      <CardFooter>
        <div className="text-xs text-zinc-500">{`${formatDate(new Date(todo.createdAt))}`}</div>
      </CardFooter>
    </Card>
  );
};

export default TodoListItem;
