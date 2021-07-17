# 翻译翻译什么叫TMD的惊喜

![](./surprise.jpeg)

## 支持翻译方案

- [x] 百度翻译
- [ ] 有道翻译
- [ ] 待定

## 安装&基本使用

```bash
npm i what-is-surprise
```

```ts
import { BaiduFanyi } from 'what-is-surprise'

const baiduFanyiSdk = BaiduFanyi.createTranslator()

baiduFanyiSdk.setLangFrom('zh')
baiduFanyiSdk.setLangTo('en')
baiduFanyiSdk.addContent('翻译翻译、什么叫TMD的惊喜！')
baiduFanyiSdk.translate().then(res => {
  // 成功
}, err => {
  // 未成功
})
```

## 百度翻译API
```ts
 export interface IBaiduFanyiConfig {
    query: string
    appid: string
    salt: string
    from: string
    to: string
    sign: string
    key: string
}
export declare type Lang = keyof typeof CommonLang
export declare type BaiduFanyiResult<F extends Lang, T extends Lang> = {
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
    trans_result: BaiduFanyiResult<F, T>[]
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
export declare const CommonLang: {
    /** 自动检测 */
    auto: string
    /** 中文 */
    zh: string
    /** 英语 */
    en: string
    /** 粤语 */
    yue: string
    /** 文言文 */
    wyw: string
    /** 日语 */
    jp: string
    /** 韩语 */
    kor: string
    /** 法语 */
    fra: string
    /** 西班牙语 */
    spa: string
    /** 泰语 */
    th: string
    /** 阿拉伯语 */
    ara: string
    /** 俄语 */
    ru: string
    /** 葡萄牙语 */
    pt: string
    /** 德语 */
    de: string
    /** 意大利语 */
    it: string
    /** 希腊语 */
    el: string
    /** 荷兰语 */
    nl: string
    /** 波兰语 */
    pl: string
    /** 保加利亚语 */
    bul: string
    /** 爱沙尼亚语 */
    est: string
    /** 丹麦语 */
    dan: string
    /** 芬兰语 */
    fin: string
    /** 捷克语 */
    cs: string
    /** 罗马尼亚语 */
    rom: string
    /** 斯洛文尼亚语 */
    slo: string
    /** 瑞典语 */
    swe: string
    /** 匈牙利语 */
    hu: string
    /** 繁体中文 */
    cht: string
    /** 越南语 */
    vie: string
}
/**
 * 错误码列表
 * 当翻译结果无法正常返回时，请参考
 */
export declare const ErrorCode: {
    /**
     * - 含义：成功
     * - 解决方案：
     */
    E52000: number
    /**
     * - 含义：请求超时
     * - 解决方案：请重试
     */
    E52001: number
    /**
     * - 含义：系统错误
     * - 解决方案：请重试
     */
    E52002: number
    /**
     * - 含义：未授权用户
     * - 解决方案：请检查appid是否正确或者服务是否开通
     */
    E52003: number
    /**
     * - 含义：必填参数为空
     * - 解决方案：请检查是否少传参数
     */
    E54000: number
    /**
     * - 含义：签名错误
     * - 解决方案：请检查您的签名生成方法
     */
    E54001: number
    /**
     * - 含义：访问频率受限
     * - 解决方案：请降低您的调用频率，或进行身份认证后切换为高级版/尊享版
     */
    E54003: number
    /**
     * - 含义：账户余额不足
     * - 解决方案：请前往管理控制台为账户充值
     */
    E54004: number
    /**
     * - 含义：长query请求频繁
     * - 解决方案：请降低长query的发送频率，3s后再试
     */
    E54005: number
    /**
     * - 含义：客户端IP非法
     * - 解决方案：检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改
     */
    E58000: number
    /**
     * - 含义：译文语言方向不支持
     * - 解决方案：检查译文语言是否在语言列表里
     */
    E58001: number
    /**
     * - 含义：服务当前已关闭
     * - 解决方案：请前往管理控制台开启服务
     */
    E58002: number
    /**
     * - 含义：认证未通过或未生效
     * - 解决方案：请前往我的认证查看认证进度
     */
    E90107: number
}
export declare class BaiduFanyiReqConfig implements IBaiduFanyiConfig {
    query: string
    appid: string
    salt: string
    from: Lang
    to: Lang
    sign: string
    key: string
    constructor(config?: Partial<IBaiduFanyiConfig>)
    updateQuery(query?: string): this
    updateAppId(appId?: string): this
    updateSalt(salt?: string): this
    updateFrom(from?: Lang): this
    updateTo(to?: Lang): this
    updateSign(sign?: string): this
    /**
     * 创建当前配置冻结副本
     */
    release(): Readonly<{
        query: string
        appid: string
        salt: string
        from: string
        to: string
        sign: string
        key: string
    }>
}
/**
 * 百度翻译 SDK
 */
export declare class BaiduFanyi {
    /**
     * 已经添加的内容
     */
    contents: Set<string>
    /**
     * 默认的官方 API 地址
     */
    static DEFAULT_API_URL: "http://api.fanyi.baidu.com/api/trans/vip/translate"
    /**
     * 创建翻译实例
     * @param config 配置
     */
    static createTranslator(config: Partial<IBaiduFanyiConfig>): BaiduFanyi
    /**
     * 获得配置，可以从 API 实例进行更新，或者直接操作
     */
    getConfig(): BaiduFanyiReqConfig
    /**
     * 添加内容
     * @param content 要添加的内容
     */
    addContent(content: string): this
    /**
     * 删除内容
     * @param content 删除的内容
     */
    removeContent(content: string): this
    /**
     * 清除所有已添加内容
     */
    clearContent(): this
    /**
     * 更换内容
     * @param newContent 新的内容
     * @param oldContent 旧内容
     */
    replaceContent(newContent: string, oldContent: string): void
    /**
     * 更新 API 地址，通常在 config 配置
     * @param url API地址
     */
    setApiUrl(url: string): void
    /**
     * 设置源语言
     * @param from 源语言
     */
    setLangFrom(from: Lang): this
    /**
     * 设置目标语言
     * @param to 目标语言
     */
    setLangTo(to: Lang): this
    /**
     * 交换配置中 from 和 to 的语言设置
     */
    swapLang(): this
    translate<F extends Lang, T extends Lang>(): Promise<BaiduFanyiResult<F, T>>
}
```