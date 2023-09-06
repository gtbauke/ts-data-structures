export class BinaryTreeNode<T> {
  public value: T

  public left: BinaryTreeNode<T> | null
  public right: BinaryTreeNode<T> | null

  public constructor (value: T, left: BinaryTreeNode<T> | null = null, right: BinaryTreeNode<T> | null = null) {
    this.value = value
    this.left = left
    this.right = right
  }

  public insert (value: T): void {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BinaryTreeNode(value)
        return
      }

      this.left.insert(value)
      return
    }

    if (this.right === null) {
      this.right = new BinaryTreeNode(value)
      return
    }

    this.right.insert(value)
  }

  public toString (): string {
    const leftString = this.left?.toString() ?? '()'
    const rightString = this.right?.toString() ?? '()'

    return `(${String(this.value)} ${leftString} ${rightString})`
  }
}

export class BinaryTree<T> {
  private root: BinaryTreeNode<T> | null

  public constructor () {
    this.root = null
  }

  public insert (value: T): this {
    if (this.root === null) {
      this.root = new BinaryTreeNode(value)
      return this
    }

    this.root.insert(value)
    return this
  }

  public inOrderTraversal (onNode: (node: BinaryTreeNode<T>) => void): T[] {
    const values: T[] = []

    if (this.root === null) {
      return values
    }

    const stack: Array<BinaryTreeNode<T>> = []
    let current: BinaryTreeNode<T> | null = this.root

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current)
        current = current.left
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      current = stack.pop()!

      onNode(current)

      values.push(current.value)

      current = current.right
    }

    return values
  }

  public toString (): string {
    return this.root === null
      ? '()'
      : this.root.toString()
  }
}
