const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // console.log(funcs);
  return funcs.reduce((accu, curr) => (...args) => accu(curr(...args)));
};

module.exports = compose;

const composedFunc = compose(
  a => {
    console.log('a함수');
    return a + 1;
  },
  b => {
    console.log('b함수');
    return b * 10;
  },
  c => {
    console.log('c함수');
    return c + 1000;
  },
);

console.log(composedFunc(1));

// 4번실행 ( 초기값 있음 )
// [1, 2, 3, 4].reduce((a, b) => {
//   console.log(a, b);
//   return a + b;
// }, 11);

// 3번실행 ( 첫 인자가 초기값 )
// [1, 2, 3, 4].reduce((a, b) => {
//   console.log(a, b);
//   return a + b;
// });
