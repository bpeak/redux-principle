const applyMiddleware = require('./applyMiddleware');

const initialState = {
  isLoggedIn: false,
  name: null,
  age: null,
};

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

const loggerMiddleware = ({ getState, dispatch }) => next => action => {
  // 현재 스토어 상태값 기록
  console.log('[ 현재상태 ] : ', getState());
  // 액션 기록
  console.log('[ 액션 ] : ', action);

  // 액션을 다음 미들웨어, 혹은 리듀서로 넘김
  next(action);
  // const result = next(action);

  // 액션 처리 후의 스토어 상태 기록
  console.log('[ 다음상태 ]', getState());
  console.log('\n'); // 기록 구분을 위한 비어있는 줄 프린트

  // return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        name: action.name,
        age: action.age,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        name: null,
      };
    default:
      return {
        ...state,
      };
  }
};

const login = ({ name, age }) => ({
  type: LOGIN,
  name,
  age,
});

const logout = () => ({
  type: LOGOUT,
});

const createStore = (reducer, enhancer) => {
  if (enhancer) {
    console.log('[ CREATE ENHANCED STORE ]');
    return enhancer(createStore)(reducer);
  }
  let currentState; // preloaded?
  const currentReducer = reducer;
  const currentListeners = [];

  const getState = () => currentState;
  const dispatch = action => {
    currentState = currentReducer(currentState, action);
    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];
      listener();
    }
  };

  const subscribe = listener => {
    currentListeners.push(listener);
    return function unSubscribe() {};
  };

  // initialState 로드
  dispatch({ type: 'INIT' });

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware)); //, loggerMiddleware2));

console.log(store.getState());

store.subscribe(() => {
  console.log('[ DISPATCHED ]');
  console.log(store.getState());
});

setTimeout(() => {
  store.dispatch(login({ name: 'kihyun', age: 27 }));
}, 2000);

setTimeout(() => {
  store.dispatch(logout());
}, 4000);
