const compose = require('./compose');

const applyMiddleware = (...middlewares) => createStore => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);
  let dispatch = store.dispatch;
  let chain = [];

  const middlewareAPI = {
    getState: store.getState,
    dispatch: action => dispatch(action),
  };

  chain = middlewares.map(middleware => middleware(middlewareAPI));

  /*
    chain
    (next) => (action) => {
      
    }
  */

  dispatch = compose(...chain)(store.dispatch);

  return {
    ...store,
    dispatch,
  };
};

module.exports = applyMiddleware;
