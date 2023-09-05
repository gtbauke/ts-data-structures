import { describe, it, expect } from 'vitest'
import { BinaryTree, BinaryTreeNode } from './binary-tree'

describe('Binary Tree', () => {
  describe('constructor', () => {
    it('should create a tree with null root', () => {
      const tree = new BinaryTree()

      expect(tree).toHaveProperty('root', null)
    })
  })

  describe('insert', () => {
    const tree = new BinaryTree()
    tree.insert(10)

    it('should insert at root if root is empty', () => {
      expect(tree).toHaveProperty('root', new BinaryTreeNode(10))
    })

    it('should insert a value to the left of the root', () => {
      tree.insert(8)

      expect(tree).toHaveProperty('root', new BinaryTreeNode(10, new BinaryTreeNode(8)))
    })

    it('should insert a value to the right of the root', () => {
      tree.insert(14)

      expect(tree).toHaveProperty('root', new BinaryTreeNode(10, new BinaryTreeNode(8), new BinaryTreeNode(14)))
    })

    it('should correctly insert various values', () => {
      const tree = new BinaryTree()
        .insert(10)
        .insert(8)
        .insert(6)
        .insert(4)
        .insert(9)
        .insert(12)
        .insert(15)
        .insert(13)

      expect(tree.toString()).toBe('(10 (8 (6 (4 () ()) ()) (9 () ())) (12 () (15 (13 () ()) ())))')
    })
  })
})
