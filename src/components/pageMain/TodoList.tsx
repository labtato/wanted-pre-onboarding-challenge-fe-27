import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getTodos, GetTodosRes } from "../../api/todos";
import { useEffect } from "react";

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
  //
  //
  if (!data.length) {
    return <div>No todos</div>;
  }

  //
  return (
    <div className="flex gap-4">
      <div className="h-full flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center">
          <h1>Todo List</h1>
        </div>
        <div className="overflow-auto">
          {data.map((todo) => (
            <div
              onClick={() => {
                handleTodoClick(todo.id);
              }}
              key={todo.id}
              className="p-4 border-b"
            >
              <div>{todo.title}</div>
              <div>{todo.content}</div>
              <div>{todo.id}</div>
              <div>{todo.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Todolist;
