import md5 from 'md5'
import { Lang } from './constants'
import { IBaseFanyiConfig } from '../../BaseFanyi'

export interface IBaiduFanyiConfig<L extends string = Lang> {
  /** 翻译的内容 */
  q: string
  /** 开发者APP ID */
  appid: string
  /** 开发者密钥 */
  key: string
  /** 签名使用的盐值 */
  salt: string
  /** 源语言 */
  from: L
  /** 目标语言 */
  to: L
  /** 请求内容签名 */
  sign: string
}

export class BaiduFanyiReqConfig implements IBaiduFanyiConfig, IBaseFanyiConfig<Lang> {
  q: string = ''
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
    this.q = query
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

  /**
   * 根据当前配置信息更新签名 sign 的值
   * @param sign 已确定的签名值，可选，推荐不传
   */
  updateSign(sign: string = '') {
    if (typeof sign === 'string' && sign) {
      this.sign = sign
    } else {
      const { appid, q, salt, key } = this
      this.sign = md5(appid + q + salt + key)
    }
    return this
  }

  /**
   * 创建当前配置冻结副本
   */
  release(this: BaiduFanyiReqConfig) {
    return Object.freeze({ ...this })
  }
}