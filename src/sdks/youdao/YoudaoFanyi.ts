import { Lang } from './constants'
import { IYoudaoFanyiConfig, YoudaoFanyiConfig } from './YoudaoFanyiConfig'
import { BaseFanyi, IBaseFanyi } from '../../utils'
import axios from 'axios'

type WebResult = {
  /** 查询的文本 */
  key: string,
  /** 翻译的文本列表 */
  value: string[]
}

type BasicResult = {
  phonetic: string,
  /** 英式音标 */
  "uk-phonetic": string,
  /** 美式音标 */
  "us-phonetic": string,
  /** 英式发音 */
  "uk-speech": string,
  /** 美式发音 */
  "us-speech": string,
  explains: string[]
}

type YoudaoFanyiResult = {
  errorCode: '0',
  // 查询正确时，一定存在
  query: string,
  // 查询正确时一定存在
  translation: string[],
  // 有道词典-基本词典,查词时才有
  basic?: BasicResult,
  dict: {
    url: string
  },
  webdict: {
    url: string
  },
  /** 翻译语言配置， 如 "EN2zh-CHS" */
  l: string
  //翻译后的发音地址
  tSpeakUrl: string
  //查询文本的发音地址
  speakUrl: string
  // 有道词典-网络释义，该结果不一定存在
  web?: WebResult[],
} | {
  errorCode: '1',
  //小语种翻译，一定存在
  translation: string[],
  dict: {
    url: string
  },
  webdict: {
    url: string
  },
  /** 翻译语言配置， 如 "EN2zh-CHS" */
  l: string
  //翻译后的发音地址
  tSpeakUrl: string
  //查询文本的发音地址
  speakUrl: string
} | {
  errorCode: string,
}

export class YoudaoFanyi extends BaseFanyi<Lang> implements IBaseFanyi<YoudaoFanyiConfig> {
  config = new YoudaoFanyiConfig
  url: string = YoudaoFanyi.DEFAULT_API_URL

  requestMethod: 'get' | 'post' = 'get'

  static DEFAULT_API_URL = 'https://openapi.youdao.com/api' as const

  static createTranslator(options?: Partial<IYoudaoFanyiConfig & { url: string }>) {
    const instance = new YoudaoFanyi
    if (options?.url) {
      instance.url = options.url
      options = { ...options }
      Reflect.deleteProperty(options, 'url')
    }
    Object.assign(instance.config, options)
    return instance
  }

  setRequestMethod(method: 'get' | 'post') {
    this.requestMethod = method
    return this
  }

  translate() {
    const { requestMethod, url } = this

    const params = this.createRequestBody()

    if (requestMethod === 'get') {
      return axios.get(url, {
        withCredentials: true,
        params,
      })
    }

    if (requestMethod === 'post') {
      return axios.post(url, params, {
        withCredentials: true
      })
    }

    return Promise.reject(new Error(`Method '${requestMethod}' is not Supported`))
  }
}