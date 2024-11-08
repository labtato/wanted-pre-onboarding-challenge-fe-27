### @redux/createStore

1. **`createStore`**
   - [ ] reducer를 받아, store 객체를 리턴한다: `(reducer: Reducer) => Store`
     - [ ] reducer: `(state: State, action: Action) => State`
   - [ ] **내부 프로퍼티 state 를 갖는다: `let state: State`**
   - [ ] 내부 프로퍼티 listeners 를 갖는다: `let listeners: Map`
   - [ ] **getState 함수를 정의한다: `() => State`**
   - [ ] **dispatch 함수를 정의한다: `(action: Action) => void`**
     - [ ] 주어진 action 과 기존 state 를 입력해 reducer 를 실행시킨다.
     - [ ] reducer 실행 결과로 state 를 업데이트한다.
     - [ ] listener 들을 실행시킨다. (publish)
   - [ ] **subscribe 함수를 정의한다: `(listener: Listener) => void`**
     - [ ] 주어진 listener 를 listeners 객체에 추가한다.
     - [ ] 해당 listener 를 객체로부터 삭제하는 함수를 리턴한다.
   - [ ] **실행 시, state 를 reducer 의 default case 로 초기화한다.**
   - [ ] Store 객체를 생성 및 리턴한다.
2. **`store`**
   - [ ] state 메서드를 갖는다.
   - [ ] dispatch 메서드를 갖는다.
   - [ ] subscribe 메서드를 갖는다.
