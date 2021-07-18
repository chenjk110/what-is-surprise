import { assignOptions } from '../utils'

describe('utils', () => {

  test('assignOptions', () => {
    const o: any = { config: {}, url: '' }
    assignOptions(o, { a: true, b: true, url: 'url' } as any)
    expect(o.url).toEqual('url')
    expect(o.config).toBeTruthy()
    expect(o.config.a).toBeTruthy()
    expect(o.config.b).toBeTruthy()
    expect(o.config.url).toBeFalsy()
  })

})