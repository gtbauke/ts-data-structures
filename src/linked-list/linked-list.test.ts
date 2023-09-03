import { describe, expect, it } from 'vitest'
import { array, nat, property, assert } from 'fast-check'
import { IndexOutOfBounds, LinkedList } from './linked-list'

describe('Linked List', () => {
  describe('constructor', () => {
    it('should create a empty list if no value is passed', () => {
      const list = new LinkedList()
      expect(list).toHaveProperty('head', null)
    })

    it('should create a list with a head node if a value is passed', () => {
      const list = new LinkedList(1)
      expect(list).toHaveProperty('head', expect.objectContaining({ value: 1, next: null }))
    })
  })

  describe('from', () => {
    it('should create a linked list from an array like container', () => {
      const container = array(nat())

      assert(property(container, arr => {
        const list = LinkedList.from(arr)
        const listStr = list.toString()

        expect(listStr).toBe(list.toString())
      }))
    })
  })

  describe('append', () => {
    it('should insert at head if no head exists', () => {
      const list = new LinkedList()
      list.append(1)

      expect(list).toHaveProperty('head', expect.objectContaining({ value: 1, next: null }))
    })

    it('should insert next element if head exists', () => {
      const list = new LinkedList(1)
      list.append(2)

      expect(list).toHaveProperty('head', expect.objectContaining({
        value: 1,
        next: expect.objectContaining({ value: 2, next: null })
      }))
    })

    it('should insert after the last element that is not null', () => {
      const list = new LinkedList(1)
      list.append(2)
      list.append(3)

      expect(list).toHaveProperty('head', expect.objectContaining({
        value: 1,
        next: expect.objectContaining({
          value: 2,
          next: expect.objectContaining({
            value: 3,
            next: null
          })
        })
      }))
    })
  })

  describe('prepend', () => {
    it('should insert element at head if head is null', () => {
      const list = new LinkedList()
      list.prepend(1)

      expect(list).toHaveProperty('head', expect.objectContaining({ value: 1, next: null }))
    })

    it('should insert element before head if head is present', () => {
      const list = new LinkedList(1)
      list.prepend(2)

      expect(list).toHaveProperty('head', expect.objectContaining({
        value: 2,
        next: expect.objectContaining({ value: 1, next: null })
      }))
    })

    it('should insert before all elements', () => {
      const list = new LinkedList(1)
      list.append(2)
      list.prepend(3)

      expect(list).toHaveProperty('head', expect.objectContaining({
        value: 3,
        next: expect.objectContaining({
          value: 1,
          next: expect.objectContaining({
            value: 2,
            next: null
          })
        })
      }))
    })
  })

  describe('insert', () => {
    it('should throw an error if the list is not long enough', () => {
      const list = new LinkedList()
      expect(() => list.insert(2, 2))
        .toThrowError(IndexOutOfBounds)
    })

    it('should throw an error if the provided position is less than zero', () => {
      const list = new LinkedList(1)
      expect(() => list.insert(2, -10))
        .toThrowError(IndexOutOfBounds)
    })

    it('should insert node at correct position', () => {
      const list = new LinkedList(1)
      list
        .append(2)
        .append(3)
        .append(4)
        .append(5)

      list.insert(10, 3)

      expect(list.toString()).toBe('1, 2, 3, 10, 4, 5')
    })
  })

  describe('find', () => {
    it('should return null if the list is empty', () => {
      const list = new LinkedList()
      expect(list.find(e => e === 4)).toBe(null)
    })

    it('should return the value if it exists', () => {
      const container = array(nat(), { minLength: 10 })

      assert(property(container, arr => {
        const list = LinkedList.from(arr)
        const value = list.find(e => e === arr[6])

        expect(value).toBe(arr.find(e => e === arr[6]))
      }))
    })
  })

  describe('toArray', () => {
    it('should convert a list to an array', () => {
      const container = array(nat())
      assert(property(container, arr => {
        const list = LinkedList.from(arr)
        const listArr = list.toArray()

        expect(listArr).toEqual(arr)
      }))
    })
  })
})
