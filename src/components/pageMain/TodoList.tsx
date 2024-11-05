import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getTodos, GetTodosRes } from "../../api/todos";
import { useEffect } from "react";
import TodoCreate from "./TodoCreate";
import TodoListItem from "./TodoListItem";
import EmptyTodo from "./EmptyTodo";

const Todolist = () => {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const {
    data: { data },
  } = useSuspenseQuery<GetTodosRes>({
    queryKey: ["getTodos"],
    queryFn: () => getTodos(),
  });

  //
  //
  //
  const handleTodoClick = (id: string) => {
    navigate(`${id}`);
  };

  //
  //
  //
  useEffect(() => {
    if (data.length && !todoId) {
      navigate(`${data[0].id}`);
    }
  }, [data, navigate, todoId]);

  //
  return (
    <div className="flex h-full gap-4">
      <div className="flex h-full w-1/3 flex-col gap-2">
        <div className="flex flex-col items-center justify-center">
          <TodoCreate />
        </div>
        <div className="overflow-auto">
          {data.length > 0 &&
            data.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onItemClick={() => {
                  handleTodoClick(todo.id);
                }}
              />
            ))}
        </div>
      </div>
      <div className="h-full w-2/3">
        {data.length > 0 ? <Outlet /> : <EmptyTodo />}
      </div>
    </div>
  );
};

export default Todolist;
