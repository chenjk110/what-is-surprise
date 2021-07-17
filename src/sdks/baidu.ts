import axios from 'axios'
import md5 from 'md5'

export interface IBaiduFanyiConfig {
  query: string
  appid: string
  salt: string
  from: string
  to: string
  sign: string
  key: string
}

export type Lang = keyof typeof CommonLang

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
  error_code?: number
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

export const CommonLang = {
  /** 自动检测 */
  auto: 'auto',
  /** 中文 */
  zh: 'zh',
  /** 英语 */
  en: 'en',
  /** 粤语 */
  yue: 'yue',
  /** 文言文 */
  wyw: 'wyw',
  /** 日语 */
  jp: 'jp',
  /** 韩语 */
  kor: 'kor',
  /** 法语 */
  fra: 'fra',
  /** 西班牙语 */
  spa: 'spa',
  /** 泰语 */
  th: 'th',
  /** 阿拉伯语 */
  ara: 'ara',
  /** 俄语 */
  ru: 'ru',
  /** 葡萄牙语 */
  pt: 'pt',
  /** 德语 */
  de: 'de',
  /** 意大利语 */
  it: 'it',
  /** 希腊语 */
  el: 'el',
  /** 荷兰语 */
  nl: 'nl',
  /** 波兰语 */
  pl: 'pl',
  /** 保加利亚语 */
  bul: 'bul',
  /** 爱沙尼亚语 */
  est: 'est',
  /** 丹麦语 */
  dan: 'dan',
  /** 芬兰语 */
  fin: 'fin',
  /** 捷克语 */
  cs: 'cs',
  /** 罗马尼亚语 */
  rom: 'rom',
  /** 斯洛文尼亚语 */
  slo: 'slo',
  /** 瑞典语 */
  swe: 'swe',
  /** 匈牙利语 */
  hu: 'hu',
  /** 繁体中文 */
  cht: 'cht',
  /** 越南语 */
  vie: 'vie',
}

/**
 * 错误码列表
 * 当翻译结果无法正常返回时，请参考
 */
export const ErrorCode = {
  /**
   * - 含义：成功  
   * - 解决方案：
   */
  E52000: 52000,
  /** 
   * - 含义：请求超时
   * - 解决方案：请重试 
   */
  E52001: 52001,
  /** 
   * - 含义：系统错误
   * - 解决方案：请重试 
   */
  E52002: 52002,
  /** 
   * - 含义：未授权用户
   * - 解决方案：请检查appid是否正确或者服务是否开通 
   */
  E52003: 52003,
  /** 
   * - 含义：必填参数为空
   * - 解决方案：请检查是否少传参数 
   */
  E54000: 54000,
  /** 
   * - 含义：签名错误
   * - 解决方案：请检查您的签名生成方法 
   */
  E54001: 54001,
  /** 
   * - 含义：访问频率受限
   * - 解决方案：请降低您的调用频率，或进行身份认证后切换为高级版/尊享版 
   */
  E54003: 54003,
  /** 
   * - 含义：账户余额不足
   * - 解决方案：请前往管理控制台为账户充值 
   */
  E54004: 54004,
  /** 
   * - 含义：长query请求频繁
   * - 解决方案：请降低长query的发送频率，3s后再试 
   */
  E54005: 54005,
  /** 
   * - 含义：客户端IP非法
   * - 解决方案：检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改 
   */
  E58000: 58000,
  /** 
   * - 含义：译文语言方向不支持
   * - 解决方案：检查译文语言是否在语言列表里 
   */
  E58001: 58001,
  /** 
   * - 含义：服务当前已关闭
   * - 解决方案：请前往管理控制台开启服务 
   */
  E58002: 58002,
  /** 
   * - 含义：认证未通过或未生效
   * - 解决方案：请前往我的认证查看认证进度 
   */
  E90107: 90107,
}

export class BaiduFanyiReqConfig implements IBaiduFanyiConfig {
  query: string = ''
  appid: string = ''
  salt: string = Date.now().toString()
  from: Lang = 'auto'
  to: Lang = 'auto'
  sign: string = ''
  key: string = ''

  constructor(config?: Partial<IBaiduFanyiConfig>) {
    Object.assign(this, config)
  }

  updateQuery(query: string = '') {
    this.query = query
    return this
  }

  updateAppId(appId: string = '') {
    this.appid = appId
    return this
  }

  updateSalt(salt: string = '') {
    this.salt = salt
    return this
  }

  updateFrom(from: Lang = 'auto') {
    this.from = from
    return this
  }

  updateTo(to: Lang = 'auto') {
    this.to = to
    return this
  }

  updateSign(sign: string = '') {
    this.sign = sign
    return this
  }

  /**
   * 创建当前配置冻结副本
   */
  release() {
    const { query, appid, salt, from, to, sign, key } = this
    return Object.freeze({ query, appid, salt, from, to, sign, key })
  }
}

/**
 * 百度翻译 SDK
 */
export class BaiduFanyi {
  private config = new BaiduFanyiReqConfig()
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
  static createTranslator(config: Partial<IBaiduFanyiConfig>) {
    const sdk = new BaiduFanyi()
    Object.assign(sdk.config, config)
    return sdk
  }

  private createSign() {
    const { appid, query: q, salt, key } = this.config
    return md5(appid + q + salt + key)
  }

  private createRequestBody() {
    this.config.updateQuery(Array.from(this.contents.values()).join('\n'))
    const { query: q, appid, salt, from, to } = this.config
    const sign = this.createSign()
    return { q, appid, salt, from, to, sign }
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
