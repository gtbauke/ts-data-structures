export class IndexOutOfBounds extends Error {
  public constructor (index: number, containerLength: number) {
    super(`Index ${index} is out of linked list bounds. The list has length ${containerLength}`)
  }
}
