function getDog(name = 0) {
  function Dog(name) {
    this.name = name;
  }

  const dog1 = new Dog(name);

  Dog.prototype.toString = function dogToString() {
    return `${this.name}`;
  };
  return dog1;
}

console.log(getDog("Boo").toString());

/*
const _sum3 = (x, y, z) => x + y + z;

const _sum4 = (a, b, c, d, e) => a + b + c + d + e;

function curry(fn) {
  const N = fn.length;
  function innerFn(n, args) {
    return function actualInnerFn(a) {
      if(n <= 1) {
        return fn(...args, a);
      }
     return innerFn(n - 1, [...args, a]);
    }
  }
  return innerFn(N, [])
}

//const sum3 = curry(_sum3);
const sum4 = curry(_sum4);

//console.log(sum3(1)(3)(2)); // 6
console.log(sum4(1)(3)(2)(4)(5)); // 10


/* 


const add = (a = 0) => {
  let sum = a;
  const func = (b = 0) => {
    sum += b;
    return func;
  };

  func.toString = () => sum // Переопределяем метод toString
  func.valueOf = () => sum // Перезаписываем valueOf

  return func;
};


const s3 = add(3);

console.log(s3(5))
console.log(s3(6))

//console.log(add())
console.log(add(1)(1)(1)(7));
console.log(add(1)(2)(3));
console.log(add(0)(0)(0)(1)()()()(1)); // вызов с пустыми скобками, то же что и вызов с нулем

// Фокусы с valueOf
console.log(add(1)(1) + add(5)(3));
console.log(add(1) + add() + add(9)); */
