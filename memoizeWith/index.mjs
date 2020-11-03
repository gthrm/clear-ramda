import { memoizeWith } from 'ramda'

/**
 * Описание из доки:
 * Создает новую функцию, которая при вызове кэширует результат вызова fn для заданного набора аргументов и возвращает результат.
 * Последующие вызовы мемоизированной fn с тем же набором аргументов не приведут к дополнительному вызову fn; вместо этого будет возвращен кешированный результат для этого набора аргументов.
 */

/**
  * Функция для мемоизации
  * @param {number} value - число (приметив)
  */
export const fn = (value) => {
  const result = value * 2
  console.log(`💪 вычисляем результат fn(${value}) => `, result)
  return result
}

/**
  * Пример memoFn() выведет следующее:
  * 📺 --- memoFn()
  * 💪 вычисляем результат fn(4) =>  8
  * вызываем memoFn(4):  8
  * 💪 вычисляем результат fn(5) =>  10
  * вызываем memoFn(5):  10
  * вызываем memoFn(4):  8
  * ---
  */
export const memoFn = memoizeWith((value) => value, fn)

console.log('📺 --- memoFn()')
console.log('вызываем memoFn(4) => ', memoFn(4))
console.log('вызываем memoFn(5) => ', memoFn(5))
console.log('вызываем memoFn(4) => ', memoFn(4))
console.log('---')
console.log(' ')

// *****
// Примечание:
// Интересно то, что в доке не сказано, что первый аргумент в memoizeWith должен быть функцией, которая возвращает значение для сравнения
// Например (key) => key или R.identity
// *****

/**
 * Функция для мемоизации
 * @param {Object} obj - объект (не приметив)
 */
export const fn2 = (obj) => {
  const resultObj = Object.assign({}, obj)
  resultObj.key *= 2
  console.log(`💪 вычисляем результат fn2(${JSON.stringify(obj)}) => `, resultObj)
  return resultObj
}

// *****
// Примечание:
// Если в аргумент мемоизированной функции передать объект, то сравнение (key) => key или R.identity не сработает,
// так как key приведется к строке и мы получим [object Object].
// А так как от любого Object.toString() мы получим [object Object], то и значение мемоизированной функции не будет изменено.
// Она кэширует первое полученное значение и будет возвращает его на последующие вызовы с различными объектами в качестве аргумента
// *****

/**
 * Пример memoFn2 выведет следующее:
 * 📺 --- memoFn2()
 * 💪 вычисляем результат fn2({"key":6}) =>  { key: 12 }
 * вызываем fn2({ key: 6 }) =>  { key: 12 }
 * вызываем fn2({ key: 5 }) =>  { key: 12 } - НЕ СРАБОТАЛО
 * вызываем fn2({ key: 6 }) =>  { key: 12 }
 * ---
 */
export const memoFn2 = memoizeWith((value) => value, fn2)

console.log('📺 --- memoFn2()')
console.log('вызываем fn2({ key: 6 }) => ', memoFn2({ key: 6 }))
console.log('вызываем fn2({ key: 5 }) => ', memoFn2({ key: 5 }))
console.log('вызываем fn2({ key: 6 }) => ', memoFn2({ key: 6 }))
console.log('---')
console.log(' ')

// *****
// Примечание:
// Если первым аргументом для memoizeWith передать что-то вроде (obj) => obj.key, чтобы функция возвращала приметив,
// то может показаться, что всё работает, но если в объекте изменится что-то кроме значения key,
// функция не перевычистится и будет возвращать старый результат
// НАПРИМЕР: ниже
// *****

/**
 * Пример memoFn2D1 выведет следующее:
 * 📺 --- memoFn2D1()
 * 💪 вычисляем результат fn2({"key":6}) =>  { key: 12 }
 * вызываем memoFn2D1({ key: 6 }) =>  { key: 12 }
 * 💪 вычисляем результат fn2({"key":5}) =>  { key: 10 }
 * вызываем memoFn2D1({ key: 5 }) =>  { key: 10 }
 * вызываем memoFn2D1({ key: 6 }) =>  { key: 12 }
 * вызываем memoFn2D1({ key: 6, key2: 5 }) =>  { key: 12 }  - НЕ СРАБОТАЛО
 * ---
 */
export const memoFn2D1 = memoizeWith((obj) => obj.key, fn2)

console.log('📺 --- memoFn2D1()')
console.log('вызываем memoFn2D1({ key: 6 }) => ', memoFn2D1({ key: 6 }))
console.log('вызываем memoFn2D1({ key: 5 }) => ', memoFn2D1({ key: 5 }))
console.log('вызываем memoFn2D1({ key: 6 }) => ', memoFn2D1({ key: 6 }))
console.log('вызываем memoFn2D1({ key: 6, key2: 5 }) => ', memoFn2D1({ key: 6, key2: 5 }))
console.log('---')
console.log(' ')

// *****
// Примечание:
// memoFn2D1({ key: 6, key2: 5 }) вернула { key: 12 }, так как функция memoFn2D1 мемоизирована только в зависимости от ключа key
// Чтобы мемоизировать функцию полностью в зависимости объекта, можно привести объект в строку с помощью JSON.stringify или R.toString
// *****

/**
 * Пример memoFn2D2 сработает правильно:
 * 📺 --- memoFn2D2()
 * 💪 вычисляем результат fn2({"key":6}) =>  { key: 12 }
 * вызываем memoFn2D2({ key: 6 }) =>  { key: 12 }
 * 💪 вычисляем результат fn2({"key":5}) =>  { key: 10 }
 * вызываем memoFn2D2({ key: 5 }) =>  { key: 10 }
 * вызываем memoFn2D2({ key: 6 }) =>  { key: 12 }
 * 💪 вычисляем результат fn2({"key":6,"key2":5}) =>  { key: 12, key2: 5 }
 * вызываем memoFn2D1({ key: 6, key2: 5 }) =>  { key: 12, key2: 5 }
 * ---
 */
export const memoFn2D2 = memoizeWith((obj) => JSON.stringify(obj), fn2)

console.log('📺 --- memoFn2D2()')
console.log('вызываем memoFn2D2({ key: 6 }) => ', memoFn2D2({ key: 6 }))
console.log('вызываем memoFn2D2({ key: 5 }) => ', memoFn2D2({ key: 5 }))
console.log('вызываем memoFn2D2({ key: 6 }) => ', memoFn2D2({ key: 6 }))
console.log('вызываем memoFn2D1({ key: 6, key2: 5 }) => ', memoFn2D2({ key: 6, key2: 5 }))
console.log('---')
console.log(' ')
