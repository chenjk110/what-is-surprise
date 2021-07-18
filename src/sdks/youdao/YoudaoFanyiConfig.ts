import Crypto from 'crypto-js'
import { Lang } from './constants'
import { IBaseFanyiConfig } from '../../BaseFanyi'

export interface IYoudaoFanyiConfig<L extends string = Lang> {
  /** 待翻译文本  必须是UTF-8编码 */
  q: string,
  /** 源语言  参考下方 支持语言 (可设置为auto) */
  from: L,
  /** 目标语言  参考下方 支持语言 (可设置为auto) */
  to: L,
  /** 应用ID  可在 应用管理 查看 */
  appKey: string,
  /** 应用密钥 */
  appSecret: string
  /** UUID  UUID */
  salt: string,
  /** 签名  sha256(应用ID+input+salt+curtime+应用密钥) */
  sign: string,
  /** 签名类型  v3 */
  signType: 'v3',
  /** 当前UTC时间戳(秒)  TimeStamp */
  curtime: string,
  /** 翻译结果音频格式，支持mp3 false mp3 */
  ext?: 'mp3',
  /** 翻译结果发音选择 
   * 0为女声，1为男声。默认为女声 */
  voice?: '0' | '1',
  /** 是否严格按照指定from和to进行翻译：true/false false 如果为false，
   * 则会自动中译英，英译中。默认为false */
  strict?: 'true' | 'false',
  /** 用户上传的词典 false 用户指定的词典 out_id，目前支持英译中 */
  vocabId?: string,
}

export class YoudaoFanyiConfig implements IYoudaoFanyiConfig, IBaseFanyiConfig<Lang> {
  q: string = ''
  from: Lang = 'auto'
  to: Lang = 'auto'
  appKey: string = ''
  appSecret: string = ''
  salt: string = Date.now().toString()
  sign: string = ''
  signType: 'v3' = 'v3'
  curtime: string = Date.now().toString()

  ext?: 'mp3' | undefined
  voice?: '0' | '1' | undefined
  strict?: 'true' | 'false' | undefined
  vocabId?: string | undefined

  constructor(config?: Partial<IYoudaoFanyiConfig>) {
    Object.assign(this, config)
  }

  update(part: Partial<IYoudaoFanyiConfig>) {
    Object.assign(this, part)
  }

  updateQuery(query: string) {
    this.q = query
    return this
  }

  updateAppKey(appKey: string) {
    this.appKey = appKey
    return this
  }

  updateAppSecret(appSecret: string) {
    this.appSecret = appSecret
    return this
  }

  updateSalt(salt = Date.now().toString()) {
    this.salt = salt
    return this
  }

  udpateCurtime(curtime = new Date().toString()) {
    this.curtime = curtime
    return this
  }

  setLangFrom(lang: Lang) {
    this.from = lang
    return this
  }

  setLangTo(lang: Lang) {
    this.to = lang
    return this
  }

  /**
   * 签名生成
   */
  updateSign() {
    const { q, salt, curtime, appKey, appSecret } = this
    /**
      * 签名生成方法如下：
      * signType=v3；
      * sign=sha256(应用ID+input+salt+curtime+应用密钥)；
      * 其中，input的计算方式为：
      * - input=q前10个字符 + q长度 + q后10个字符（当q长度大于20）
      * - input=q字符串（当q长度小于等于20）
      */
    const input = q.length > 20
      ? q.slice(0, 10) + q.length + q.slice(-10)
      : q

    this.sign = Crypto.SHA256(appKey + input + salt + curtime + appSecret).toString()
  }

  /**
   * 创建冻结副本
   */
  release(this: YoudaoFanyiConfig) {
    return Object.freeze({ ...this })
  }
}
