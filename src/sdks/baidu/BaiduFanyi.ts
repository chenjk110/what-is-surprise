import axios from 'axios'
import { Lang, ErrorCode } from './constants'
import { BaiduFanyiReqConfig, IBaiduFanyiConfig } from './BaiduFanyiConfig'
import { BaseFanyi, IBaseFanyi } from '../../utils'

export type TransResult = { src: string, dst: string }

export type BaiduFanyiResult<F extends Lang, T extends Lang> = {
  /**
   * 源语言 返回用户指定的语言，或者自动检测出的语种（源语言设为 auto 时）
   */
  from: F
  /**
   * 目标语言 返回用户指定的目标语言
   */
  to: T
  /**
   * 翻译结果 返回翻译结果，包括 src 和 dst 字段
   */
  trans_result: TransResult[],
  /**
   * 错误码 仅当出现错误时显示
   */
  error_code?: string
  /**
   * 错误信息 仅当出现错误时显示
   */
  error_msg?: string
  /**
   * 原文tts链接 mp3格式，暂时无法指定发音
   */
  src_tts?: string
  /**
   * 译文tts链接 mp3格式，暂时无法指定发音
   */
  dst_tts?: string
  /**
   * 中英词典资源 返回中文或英文词典资源，包含音标，简明释义等内容
   */
  dict?: string
} & Partial<Record<`trans_result.${F}.src` | `trans_result.${T}.dst`, string>>


/**
 * 百度翻译 SDK
 */
export class BaiduFanyi extends BaseFanyi<Lang> implements IBaseFanyi<BaiduFanyiReqConfig> {

  config = new BaiduFanyiReqConfig

  url: string = BaiduFanyi.DEFAULT_API_URL

  /**
   * 默认的官方 API 地址
   */
  static DEFAULT_API_URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate' as const

  /**
   * 创建翻译实例
   * @param options 配置
   */
  static createTranslator(options?: Partial<IBaiduFanyiConfig> & { /** API 地址  */url?: string }) {
    const sdk = new BaiduFanyi
    if (options?.url) {
      sdk.setApiUrl(options.url)
      options = { ...options }
      Reflect.deleteProperty(options, 'url')
    }
    Object.assign(sdk.config, options)
    return sdk
  }

  async translate<F extends Lang, T extends Lang>() {
    const res = await axios.get<BaiduFanyiResult<F, T>>(this.url, {
      params: this.createRequestBody(),
      withCredentials: true
    })
    if (res.data?.error_code && res.data?.error_code !== ErrorCode.E52000) {
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  }
}
