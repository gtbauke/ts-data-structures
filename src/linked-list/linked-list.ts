import { ContainerDoesNotContain } from '../errors/container-does-not-contain'
import { ContainerIsEmpty } from '../errors/container-is-empty'
import { IndexOutOfBounds } from '../errors/index-out-of-bounds'

export class LinkedListNode<T> {
  public value: T
  public next: LinkedListNode<T> | null

  public constructor (value: T) {
    this.value = value
    this.next = null
  }

  public static withNext<A>(value: A, next: LinkedListNode<A>): LinkedListNode<A> {
    const node = new LinkedListNode(value)
    node.next = next

    return node
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null

  public length = 0

  public constructor (value: T | null = null) {
    this.head = value === null
      ? null
      : new LinkedListNode(value)

    if (this.head !== null) {
      this.length++
    }
  }

  public static from<A>(values: ArrayLike<A>): LinkedList<A> {
    const array = Array.from(values)
    const list = new LinkedList<A>()

    for (const elem of array) {
      list.append(elem)
    }

    return list
  }

  public append (value: T): this {
    if (this.head === null) {
      this.head = new LinkedListNode(value)
      this.length++

      return this
    }

    let pointer = this.head
    while (pointer.next !== null) {
      pointer = pointer.next
    }

    pointer.next = new LinkedListNode(value)
    this.length++

    return this
  }

  public prepend (value: T): this {
    if (this.head === null) {
      this.head = new LinkedListNode(value)
      this.length++

      return this
    }

    const newTail = this.head
    this.head = LinkedListNode.withNext(value, newTail)
    this.length++

    return this
  }

  public insertAt (value: T, at: number): this {
    if (this.head === null && at === 0) {
      this.head = new LinkedListNode(value)
      this.length++

      return this
    }

    if (at < 0 || at >= this.length || this.head === null) {
      throw new IndexOutOfBounds(at, this.length)
    }

    let pointer = this.head
    let before = this.head
    let counter = 0

    while (counter !== at) {
      counter++

      if (pointer?.next === null) {
        throw new IndexOutOfBounds(at, this.length)
      }

      before = pointer
      pointer = pointer.next
    }

    const newNode = LinkedListNode.withNext(value, pointer)
    before.next = newNode
    this.length++

    return this
  }

  public at (value: number): T {
    const index = value < 0
      ? this.length - Math.abs(value)
      : value

    if (this.head === null || index < 0) {
      throw new IndexOutOfBounds(index, this.length)
    }

    let pointer = this.head
    let counter = 0

    while (counter !== index) {
      counter++

      if (pointer?.next === null) {
        throw new IndexOutOfBounds(index, this.length)
      }

      pointer = pointer.next
    }

    return pointer.value
  }

  public delete (value: T): this {
    if (this.head === null) {
      throw new ContainerIsEmpty()
    }

    let pointer = this.head
    let before: LinkedListNode<T> | null = null

    while (pointer.value !== value) {
      if (pointer.next === null) {
        throw new ContainerDoesNotContain(value)
      }

      before = pointer
      pointer = pointer.next
    }

    if (before === null) {
      const newNode = pointer.next
      this.head = newNode
      this.length--

      return this
    }

    before.next = pointer.next
    this.length--

    return this
  }

  public removeAt (at: number): this {
    if (this.head === null) {
      throw new ContainerIsEmpty()
    }

    if (at < 0 || at >= this.length) {
      throw new IndexOutOfBounds(at, this.length)
    }

    let counter = 0
    let pointer = this.head
    let before: LinkedListNode<T> | null = null

    while (counter !== at) {
      if (pointer.next === null) {
        throw new IndexOutOfBounds(at, this.length)
      }

      before = pointer
      counter++
      pointer = pointer.next
    }

    if (before === null) {
      const newNode = pointer.next
      this.head = newNode
      this.length--

      return this
    }

    before.next = pointer.next
    this.length--

    return this
  }

  public toArray (): T[] {
    const values: T[] = []

    let pointer = this.head
    while (pointer !== null) {
      values.push(pointer.value)
      pointer = pointer.next
    }

    return values
  }

  public toString (): string {
    const values: T[] = []

    let pointer = this.head
    while (pointer !== null) {
      values.push(pointer.value)
      pointer = pointer.next
    }

    return values.toString()
  }
}
