export function zip<T, U> (a: T[], b: U[]): Array<[T, U]> {
  const length = Math.min(a.length, b.length)
  const arr: Array<[T, U]> = []

  for (let i = 0; i < length; i++) {
    arr.push([a[i], b[i]])
  }

  return arr
}
