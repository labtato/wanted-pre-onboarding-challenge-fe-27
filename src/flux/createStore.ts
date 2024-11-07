import { Action, CreateStore, Listener, Reducer } from "./types";

// TODO: can we write test for the store?

/**
 * @description flux store 생성 함수
 * @param reducer state와 action을 받아 state를 반환하는 함수
 * @returns Store 객체
 */
export const createStore: CreateStore = <S, A extends Action>(
  reducer: Reducer<S, A>,
) => {
  // 1. 함수 실행 시, 최초 state 를 undefined 로 초기화한다.
  let state: S | undefined = undefined;
  // subscribe 를 위한 listeners 배열을 선언한다. (Map 을 배열로 대체)
  let listeners: Listener[] = [];

  // getState 함수를 선언한다: () => state
  const getState = () => state;

  // dispatch 함수를 선언한다 (Action) => void
  const dispatch = (action: A) => {
    // 내부에서 reducer 에 state 와 action 을 넣어 실행 후 할당한다.
    state = reducer(state, action);
    // listeners 배열을 순회하며 각 listener 를 실행시킨다. (아마도 useSelector 의 기반?)
    listeners.forEach((l) => l());

    return action;
  };

  // subscribe 함수를 선언한다: (listener: () => void) => Unsubscribe
  const subscribe = (listener: Listener) => {
    // subscribe 함수 실행 시, listeners 배열에 listener 를 push 한다.
    listeners.push(listener);
    // unsubscribe 함수를 반환한다.
    const unsubscribe = () => {
      listeners = listeners.filter((l) => l !== listener);
    };
    return unsubscribe;
  };

  // createStore 실행 시, dispatch 를 실행시켜 리듀서의 default state 로 state 를 초기화한다
  dispatch({ type: "STORE__INIT__" } as A);

  const store = {
    getState,
    dispatch,
    subscribe,
  };

  return store;
};
