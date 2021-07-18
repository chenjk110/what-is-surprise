import { BaiduFanyi, BaiduFanyiReqConfig, BaiduFanyiResult, ErrorCode, IBaiduFanyiConfig } from '../sdks/baidu'

describe("BaiduFanyi SDK", () => {

  describe("BaiduFanyiReqConfig", () => {

    const props: (keyof IBaiduFanyiConfig)[] = [
      'q',
      'appid',
      'salt',
      'from',
      'to',
      'sign',
      'key',
    ]

    test('config instance properties', () => {
      const config = new BaiduFanyiReqConfig()
      expect(props.every(key => Reflect.has(config, key))).toBeTruthy()
    })

    test('config constructor assign', () => {
      const options: IBaiduFanyiConfig = {
        from: 'en',
        to: 'zh',
        appid: '0',
        key: '1',
        q: '2',
        salt: '3',
        sign: '4',
      }
      const config = new BaiduFanyiReqConfig(options)
      for (const [key, value] of Object.entries(options)) {
        expect(Reflect.get(config, key)).toEqual(value)
      }
    })

    test('config.release()', () => {
      const config = new BaiduFanyiReqConfig().release()

      expect(Object.isFrozen(config)).toBeTruthy()

      for (const key of props) {
        expect(Reflect.has(config, key)).toBeTruthy()
      }
    })

  })

  describe('BaiduFanyi', () => {
    const KEY = process.env.TEST_ENV_BAIDU_KEY ?? ''
    const APPID = process.env.TEST_ENV_BAIDU_APPID ?? ''
    const SALT = process.env.TEST_ENV_BAIDU_SALT ?? ''

    test('E52003 UNAUTHORIZED USER', (done) => {
      const translator = BaiduFanyi.createTranslator()
      translator.translate().catch((result: BaiduFanyiResult<'auto', 'auto'>) => {
        expect(result).toBeTruthy()
        expect(result.error_code).not.toEqual(ErrorCode.E52000)
        expect(result.error_code).toEqual(ErrorCode.E52003)
        done()
      })
    })

    test('tranlate', (done) => {
      const translator = BaiduFanyi.createTranslator({ key: KEY, appid: APPID, salt: SALT })
      translator.setLangFrom('zh').setLangTo('en').addContent('惊喜')
      translator.translate().then(
        (result) => {
          expect(result.error_code).toEqual(ErrorCode.E52000)
          expect(result.from).toEqual('zh')
          expect(result.to).toEqual('en')
          done()
        },
        (error) => {
          expect(error).toBeTruthy()
          expect(error.error_code).not.toEqual(ErrorCode.E52000)
          done()
        }
      )
    })
  })
})
