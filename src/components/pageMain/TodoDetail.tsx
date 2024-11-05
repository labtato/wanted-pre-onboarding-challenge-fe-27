import { useParams } from "react-router-dom";
import {
  getTodoById,
  GetTodoByIdRes,
  putUpdateTodo,
  PutUpdateTodoReq,
} from "../../api/todos";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import withSuspense from "../hoc/withSuspense";
import { formatDate } from "@/lib/date";
import { useState } from "react";
import TodoDialog from "./TodoDialog";

const TodoDetail = () => {
  const queryClient = useQueryClient();
  const { todoId } = useParams<{ todoId: string }>();
  const [open, setOpen] = useState(false);
  // TODO length 가 적은 상황에서는 find 연산의 비용이 더 적을 수도 있음
  const {
    data: { data },
  } = useSuspenseQuery<GetTodoByIdRes>({
    queryKey: ["getTodoById", todoId],
    queryFn: () => getTodoById({ id: todoId ?? "" }),
  });
  const { mutate } = useMutation({
    mutationKey: ["putUpdateTodo"],
    mutationFn: (args: PutUpdateTodoReq) => putUpdateTodo(args),
    // TODO: how to
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          console.log(query);
          return (
            query.queryKey[0] === "getTodos" ||
            (query.queryKey[0] === "getTodoById" &&
              query.queryKey[1] === todoId)
          );
        },
      });
    },
  });

  //
  //
  //
  const handleEditClick = () => {
    setOpen(true);
  };

  const handleEditAction = (args: { title: string; content: string }) => {
    console.log(args);
    if (!todoId) return;
    mutate({ id: todoId ?? "", ...args });
    setOpen(false);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  //
  //
  //
  if (!data) {
    return <div>Todo not found</div>;
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex-col gap-1">
          <h1 className="text-lg font-bold">{data.title}</h1>
          <div className="py-3">{data.content}</div>
          <div className="text-sm text-zinc-400">
            created at: {formatDate(new Date(data.createdAt))}
          </div>
          <div className="text-sm text-zinc-400">
            last updated at: {formatDate(new Date(data.createdAt))}
          </div>
          <div
            onClick={handleEditClick}
            className="pt-3 text-sm font-bold text-blue-800 underline hover:cursor-pointer hover:text-blue-600"
          >
            edit
          </div>
        </div>
      </div>
      {open && (
        <TodoDialog
          title="Edit TODO"
          action="수정"
          onClose={handleEditClose}
          onAction={handleEditAction}
          defaultValues={{ title: data.title, content: data.content }}
        />
      )}
    </>
  );
};

// Fallback 없는 게 나을지도 (깜빡거림)
const TodoDetailWithSuspense = withSuspense(TodoDetail);

export default TodoDetailWithSuspense;
