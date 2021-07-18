import { pick } from '../utils'

describe('utils', () => {
  test('pick', () => {
    const keys = ['a', 'b']
    const obj1 = { 'a': 'A', 'b': 'B', 'c': 'C' } as any
    const obj2 = pick(obj1, ['a', 'b']) as any

    expect(obj2).toBeTruthy()
    expect(Reflect.ownKeys(obj2).length).toEqual(2)
    expect(keys.every(key => Reflect.has(obj2, key))).toBeTruthy()
    expect(keys.every(key => obj2[key] === obj1[key])).toBeTruthy()
  })
})