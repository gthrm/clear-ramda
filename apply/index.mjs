import R from 'ramda'

/**
 * Описание из доки:
 * Применяет функцию fn к каждому аргументу из списка аргументов.
 * Это полезно для создания функции фиксированной арности из вариативной функции.
 * fn должна быть связанной (bind) функцией, если контекст важен.
 */

// Что такое арность?

// Количество аргументов функции. От слов унарный, бинарный, тернарный (unary, binary, ternary)
// и так далее. Это необычное слово, потому что состоит из двух суффиксов: "-ary" и "-ity.".
// Сложение, к примеру, принимает два аргумента, поэтому это бинарная функция, или функция,
// у которой арность равна двум.
// Иногда используют термин "диадный" (dyadic), если предпочитают греческие корни вместо латинских.
// Функция, которая принимает произвольное количество аргументов называется, соответственно, вариативной (variadic).

// Подробнее можно почитать тут https://habr.com/ru/post/310172/

// Из описания может показаться, что после вызова должен вернуться массив, у которого к каждому аргументу будет применена функция, но нет
// функция вызовется один раз, а в качестве её аргументов будут переданы элементы массива. Именно поэтому в описании
// сказано "полезно для создания функции фиксированной арности"

// сама функция apply - binary, она принимает два аргумента,
// где первый аргумент - это функция, а второй - массив аргументов для данной функции
// функция возвращает результат вызова функции fn с аграмантами args.

const array = [1, 4, 6, 3, 5, 8, 4]

const fn = (value) => {
  console.log(`fn value: ${value}`)
  const result = value * 10
  console.log(`fn result: ${result}`)
  return result
}

console.log(R.apply(fn, array))

const fn2 = (value1, value2, ...agrs) => {
  console.log(`fn2 value1: ${value1}, value2: ${value2}`)
  const result = value1 * value2
  console.log(`fn2 other agrs: ${agrs}`)
  console.log(`fn2 result: ${result}`)
  return result
}

console.log(R.apply(fn2, array))

// выполните node apply/index.mjs, чтобы посмотреть результат вызова
