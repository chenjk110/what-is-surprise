import axios from 'axios'
import { Lang, ErrorCode } from './constants'
import { BaiduFanyiReqConfig, IBaiduFanyiConfig } from './BaiduFanyiConfig'

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
  trans_result: BaiduFanyiResult<F, T>[],
  /**
   * 错误码 仅当出现错误时显示
   */
  error_code?: string
} & Partial<{
  /**
   * 原文tts链接 mp3格式，暂时无法指定发音
   */
  src_tts: string
  /**
   * 译文tts链接 mp3格式，暂时无法指定发音
   */
  dst_tts: string
  /**
   * 中英词典资源 返回中文或英文词典资源，包含音标，简明释义等内容
   */
  dict: string
}> & Record<`trans_result.${F}.src` | `trans_result.${T}dst`, string>


/**
 * 百度翻译 SDK
 */
export class BaiduFanyi {
  private config: BaiduFanyiReqConfig = new BaiduFanyiReqConfig
  private url: string = BaiduFanyi.DEFAULT_API_URL

  /**
   * 已经添加的内容
   */
  public contents: Set<string> = new Set()

  /**
   * 默认的官方 API 地址
   */
  static DEFAULT_API_URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate' as const

  /**
   * 创建翻译实例
   * @param config 配置
   */
  static createTranslator(config?: Partial<IBaiduFanyiConfig>) {
    const sdk = new BaiduFanyi
    Object.assign(sdk.config, config)
    return sdk
  }

  private createRequestBody() {
    this.config.updateQuery(this.generateContent())
    this.config.updateSign()
    return this.config.release()
  }

  private generateContent() {
    let content = ''
    for (let part of this.contents.values()) {
      content += part + '\n'
    }
    return content
  }

  /**
   * 获得配置，可以从 API 实例进行更新，或者直接操作
   */
  public getConfig() {
    return this.config
  }

  /**
   * 添加内容
   * @param content 要添加的内容
   */
  public addContent(content: string) {
    this.contents.add(content)
    return this
  }

  /**
   * 删除内容
   * @param content 删除的内容
   */
  public removeContent(content: string) {
    this.contents.delete(content)
    return this
  }

  /**
   * 清除所有已添加内容
   */
  public clearContent() {
    this.contents.clear()
    return this
  }

  /**
   * 更换内容
   * @param newContent 新的内容
   * @param oldContent 旧内容
   */
  public replaceContent(newContent: string, oldContent: string) {
    this.contents.delete(oldContent)
    this.contents.add(newContent)
  }

  /**
   * 更新 API 地址，通常在 config 配置
   * @param url API地址
   */
  public setApiUrl(url: string) {
    this.url = url
  }

  /**
   * 设置源语言
   * @param from 源语言
   */
  public setLangFrom(from: Lang) {
    this.config.from = from
    return this
  }

  /**
   * 设置目标语言
   * @param to 目标语言
   */
  public setLangTo(to: Lang) {
    this.config.to = to
    return this
  }

  /**
   * 交换配置中 from 和 to 的语言设置
   */
  public swapLang() {
    [this.config.to, this.config.from] = [this.config.from, this.config.to]
    return this
  }

  public async translate<F extends Lang, T extends Lang>() {
    const res = await axios.get<BaiduFanyiResult<F, T>>(this.url, {
      params: this.createRequestBody(),
      withCredentials: true,
    })
    if (res.data.error_code && res.data.error_code !== ErrorCode.E52000) {
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  }
}
