import { Action, Listener, Reducer, Store } from "./types";

const INIT_TYPE_RESERVED = "STORE__INIT__";

export const createStore = <S, A extends Action>(
  reducer: Reducer<S, A>,
): Store<S, A> => {
  // 최초 state 를 undefined 로 초기화
  let state: S | undefined = undefined;
  // subscribe 를 위한 listeners 배열 선언 (Map 을 배열로 대체)
  let listeners: Listener[] = [];

  // getState 함수 선언
  const getState = () => state as S;

  // dispatch 함수 선언
  const dispatch = (action: A) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());

    return action;
  };

  // subscribe 함수 선언
  const subscribe = (listener: Listener) => {
    listeners.push(listener);

    const unsubscribe = () => {
      listeners = listeners.filter((l) => l !== listener);
    };

    return unsubscribe;
  };

  // dispatch 를 실행시켜 state 초기화
  dispatch({ type: INIT_TYPE_RESERVED } as A);

  const store = {
    getState,
    dispatch,
    subscribe,
  };

  return store;
};
