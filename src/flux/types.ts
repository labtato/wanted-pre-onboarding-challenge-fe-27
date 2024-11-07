/* eslint-disable */
export type Listener = () => void;

export type Unsubscribe = () => void;

export type State = any;

export type Action = { type: string };

/**
 * Reducer MUST return the state of type S (default case), for populating the state initialization
 */
export type Reducer<
  S = any,
  A extends Action = Action & { [key: string]: unknown },
> = (state: S | undefined, action: A) => S;

export interface Store {
  getState(): State;
  dispatch(action: Action): Action;
  subscribe(listener: () => void): Unsubscribe;
}

export interface CreateStore {
  (reducer: (state: State, action: Action) => State): Store;
}
