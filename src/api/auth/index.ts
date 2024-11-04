import { instance } from "../instance";

export type PostUsersLoginReq = {
  email: string;
  password: string;
};

/**
 * POST /users/login
 */
export const postUsersLogin = (req: PostUsersLoginReq) => {
  return instance.post("users/login", req);
};

export type PostUsersCreateReq = {
  email: string;
  password: string;
};

/**
 * POST /users/create
 */
export const postUsersCreate = (req: PostUsersCreateReq) => {
  return instance.post("users/create", req);
};
