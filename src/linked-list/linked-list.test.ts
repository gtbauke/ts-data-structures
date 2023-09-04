/* eslint-disable @typescript-eslint/no-base-to-string */
import { describe, it, expect } from 'vitest'
import { LinkedList, LinkedListNode } from './linked-list'
import { IndexOutOfBounds } from '../errors/index-out-of-bounds'
import { ContainerIsEmpty } from '../errors/container-is-empty'

describe('Linked List', () => {
  describe('constructor', () => {
    it('should create a list with an empty head if valie provided is null', () => {
      const list = new LinkedList()
      expect(list).toHaveProperty('head', null)
    })

    it('should create a list with a head with the provided value', () => {
      const list = new LinkedList(10)
      expect(list).toHaveProperty('head', new LinkedListNode(10))
    })
  })

  describe('append', () => {
    const list = new LinkedList<number>()

    it('should append to the head of the list if the list is empty', () => {
      list.append(10)
      expect(list).toHaveProperty('head', new LinkedListNode(10))
    })

    it('should append to the head.next of the list if the list contains only the head', () => {
      list.append(20)
      expect(list.toString()).toBe('10,20')
    })

    it('should append to the final of the list', () => {
      list
        .append(30)
        .append(40)
        .append(50)

      expect(list.toString()).toBe('10,20,30,40,50')
    })
  })

  describe('prepend', () => {
    const list = new LinkedList<number>()

    it('should prepend to the head of the list if the list is empty', () => {
      list.prepend(10)
      expect(list).toHaveProperty('head', new LinkedListNode(10))
    })

    it('should prepend to a list with values', () => {
      list
        .prepend(20)
        .prepend(30)
        .prepend(40)
        .prepend(50)

      expect(list.toString()).toBe('50,40,30,20,10')
    })
  })

  describe('insertAt', () => {
    it('should insertAt head if head is null and `at` === 0', () => {
      const list = new LinkedList<number>()
      list.insertAt(10, 0)

      expect(list).toHaveProperty('head', new LinkedListNode(10))
    })

    it('should throw an IndexOutOfBounds error if `at` < 0 || `at` >= list length', () => {
      const list = new LinkedList()
      list
        .append(10)
        .append(20)
        .append(30)

      expect(() => list.insertAt(10, -10))
        .toThrowError(IndexOutOfBounds)

      expect(() => list.insertAt(10, 10))
        .toThrowError(IndexOutOfBounds)
    })

    it('should insert the value at the specified index', () => {
      const list = new LinkedList(10)
      list
        .append(20)
        .append(30)
        .append(40)
        .append(50)
        .append(60)

      list.insertAt(70, 3)

      expect(list.toString()).toBe('10,20,30,70,40,50,60')
    })
  })

  describe('at', () => {
    const list = new LinkedList('this is a string')

    it('should throw an error if head is null', () => {
      expect(() => list.at(2))
        .toThrowError(IndexOutOfBounds)
    })

    it('should throw an error if index is out of bounds', () => {
      list
        .append('abc')
        .append('bcd')
        .append('cde')
        .append('def')

      expect(() => list.at(10))
        .toThrowError(IndexOutOfBounds)

      expect(() => list.at(-10))
        .toThrowError(IndexOutOfBounds)
    })

    it('should return the correct value [positive index]', () => {
      expect(list.at(2)).toBe('bcd')
    })

    it('should return the correct value [negative index]', () => {
      expect(list.at(-1)).toBe('def')
      expect(list.at(-2)).toBe('cde')
    })
  })

  describe('delete', () => {
    const list = new LinkedList<number>()

    it('should throw an error if the list is empty', () => {
      expect(() => { list.delete(2) })
        .toThrowError(ContainerIsEmpty)
    })

    it('should delete the head if only the head exists', () => {
      list.append(10)
      list.delete(10)

      expect(list).toHaveProperty('head', null)
    })

    it('should delete the head and make head.next the current head', () => {
      list.append(10)
      list.append(20)
      list.delete(10)

      expect(list).toHaveProperty('head', new LinkedListNode(20))
    })

    it('should delete a node in the middle of the list', () => {
      const list = new LinkedList<number>()
        .append(10)
        .append(20)
        .append(30)
        .append(40)
        .append(50)
        .append(60)
        .append(70)
        .append(80)
        .append(90)
        .append(100)

      list.delete(50)

      expect(list.toString()).toBe('10,20,30,40,60,70,80,90,100')
    })

    it('should delete the tail', () => {
      const list = new LinkedList()
        .append(10)
        .append(20)

      list.delete(20)

      expect(list).toHaveProperty('head', new LinkedListNode(10))
    })
  })
})
