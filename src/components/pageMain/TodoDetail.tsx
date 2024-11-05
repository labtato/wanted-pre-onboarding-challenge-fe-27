import { useParams } from "react-router-dom";
import { getTodoById, GetTodoByIdRes } from "../../api/todos";
import { useSuspenseQuery } from "@tanstack/react-query";
import withSuspense from "../hoc/withSuspense";

const TodoDetail = () => {
  const { todoId } = useParams<{ todoId: string }>();

  // TODO length 가 적은 상황에서는 find 연산의 비용이 더 적을 수도 있음
  const {
    data: { data },
  } = useSuspenseQuery<GetTodoByIdRes>({
    queryKey: ["getTodoById", todoId],
    queryFn: () => getTodoById({ id: todoId ?? "" }),
  });

  if (!data) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h1>Todo Detail</h1>
      <div>{data.id}</div>
      <div>{data.title}</div>
      <div>{data.content}</div>
    </div>
  );
};

// Fallback 없는 게 나을지도 (깜빡거림)
const TodoDetailWithSuspense = withSuspense(TodoDetail);

export default TodoDetailWithSuspense;
