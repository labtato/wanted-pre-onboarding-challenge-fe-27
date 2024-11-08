/**
 * reducer 는 모든 경우에 state를 리턴 (action 이 유효하지 않은 경우에도 state 리턴을 보장)
 */
export type Reducer<S = unknown, A extends Action = Action> = (
  state: S | undefined,
  action: A,
) => S;

/* 액션 구분을 위한 type 속성을 require */
export type Action = { type: string; [key: string]: unknown };

/* subscribe 시 등록할 listener 및 등록 해제 함수의 형태 정의 */
export type Listener = () => void;
export type Unsubscribe = () => void;

/* Store 는 state 및 action 의 형태를 generic 으로 정의 */
export interface Store<S, A extends Action = Action> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: Listener): Unsubscribe;
}

/* createStore */
export interface CreateStore {
  <S, A extends Action>(reducer: Reducer<S, A>): Store<S>;
}
