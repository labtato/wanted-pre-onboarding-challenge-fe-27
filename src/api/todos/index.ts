import { instance } from "../instance";

export type TODO = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodosRes = {
  data: TODO[];
};

/**
 * GET /todos
 */
export const getTodos = () => {
  return instance.get("/todos").then((res) => res.data);
};

export type GetTodoByIdRes = {
  data: TODO;
};

export type GetTodoByIdReq = {
  id: string;
};

/**
 * GET /todos
 */
export const getTodoById = (req: GetTodoByIdReq) => {
  return instance.get(`/todos/${req.id}`).then((res) => res.data);
};

export type PostCreateTodoReq = {
  title: string;
  content: string;
};

/**
 * POST /todos
 */
export const postCreateTodo = (req: PostCreateTodoReq) => {
  return instance.post("/todos", req);
};

export type PostDeleteTodoReq = {
  id: string;
};

/**
 * POST /todos
 */
export const postDeleteTodo = (req: PostDeleteTodoReq) => {
  return instance.post(`/todos/${req.id}`, req);
};
