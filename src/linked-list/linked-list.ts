type LinkedListNode<T> = {
  value: T;
  next: LinkedListNode<T> | null;
};

export class IndexOutOfBounds extends Error {
  public constructor(index: number, length: number) {
    super(`Index ${index} is out of bounds. Container has length ${length}`);
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null;

  public length = 0;

  public constructor(value: T | null = null) {
    this.head = value ? { value, next: null } : null;
  }

  public append(value: T): this {
    if (!this.head) {
      this.head = { value, next: null };
      this.length++;

      return this;
    }

    const node = { value, next: null };
    let pointer = this.head;

    while (pointer.next) {
      pointer = pointer.next;
    }

    pointer.next = node;
    this.length++;

    return this;
  }

  public prepend(value: T): this {
    if (!this.head) {
      this.head = { value, next: null };
      this.length++;

      return this;
    }

    const tail = this.head;
    this.head = { value, next: tail };
    this.length++;

    return this;
  }

  public insert(value: T, at: number): this {
    if (at >= this.length) {
      throw new IndexOutOfBounds(at, this.length);
    }

    let before: LinkedListNode<T> | null = null;
    let pointer = this.head;
    let counter = 0;

    while (counter != at) {
      counter++;
      before = pointer;
      pointer = pointer!.next;
    }

    const tail = pointer;
    const node = { value, next: tail };
    pointer = node;
    before!.next = pointer;

    return this;
  }

  public toString(): string {
    const str: T[] = [];

    let pointer = this.head;
    while (pointer) {
      str.push(pointer.value);
      pointer = pointer.next;
    }

    return str.join(", ");
  }
}
