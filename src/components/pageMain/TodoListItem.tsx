import { formatDate } from "@/lib/date";
import { TODO } from "../../api/todos";

interface TodoListItemProps {
  todo: TODO;
  onItemClick: () => void;
}

const TodoListItem = ({ todo, onItemClick }: TodoListItemProps) => {
  return (
    <div className="border-b p-4 text-sm" onClick={onItemClick}>
      <div className="mb-1 font-bold">{todo.title}</div>
      <div className="text-xs text-zinc-500">{`${formatDate(new Date(todo.createdAt))}`}</div>
    </div>
  );
};

export default TodoListItem;
