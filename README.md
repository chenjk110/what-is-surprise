# 翻译翻译什么叫TMD的惊喜

![](./surprise.jpeg)

## 支持翻译方案

- [x] 百度翻译
- [x] 有道翻译
- [ ] 待定

## 安装

```bash
npm i what-is-surprise
```

```bash
yarn add what-is-surprise
```

## 简单例子

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

> - 对于语言配置字段 `from`，`to` 可以参考官方文档，默认值都为 `auto` 。
>
> - 请求返回数据结构课参考官方文档。

```ts
class BaiduFanyi {
    /**
     * 已经添加的内容，通常通过 API 方法操作
     */
    contents: Set<string>
   
    /**
     * 默认的官方 API 地址
     */
    static DEFAULT_API_URL: "https://api.fanyi.baidu.com/api/trans/vip/translate"
   
    /**
     * 创建翻译实例
     */
    static createTranslator(options?: Partial<IBaiduFanyiConfig> & {
        url?: string
    }): BaiduFanyi

    /**
     * 获得配置实例，更新对应的配置
     */
    getConfig(): BaiduFanyiReqConfig
   
    /**
     * 添加内容
     */
    addContent(content: string): this

    /**
     * 删除内容
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
     * 更新 API 地址
     */
    setApiUrl(url: string): void
    
    /**
     * 设置源语言，更多语言代码可查阅官方文档
     */
    setLangFrom(from: Lang): this

    /**
     * 设置目标语言，更多语言代码可查阅官方文档
     */
    setLangTo(to: Lang): this

    /**
     * 交换配置中 from 和 to 的语言设置
     */
    swapLang(): this

    /**
     * 翻译
     */
    translate<F extends Lang, T extends Lang>(): Promise<BaiduFanyiResult<F, T>>
}
```

### 使用例子

```ts
import { BaiduFanyi } from 'what-is-surprise'

const translator = BaiduFanyi.createTranslator({ appid: '12341234', key: '12341234', salt: '12341234' })

/**
 * 设置自定义 API URL
 * - 默认值 BaiduFanyi.DEFAULT_API_URL
 */
translator.setApiUrl('https://api.fanyi.baidu.com/api/trans/vip/translate')
translator.setLangFrom('zh')
translator.setLangTo('en')

translator.addContent('翻译翻译')
translator.addContent('什么叫TMD')
translator.addContent('惊喜')

translator.translate<'zh', 'en'>().then(result => {
  const { from, to, trans_result } = result

  console.log('源语言：', from)
  console.log('目标语言：', to)

  trans_result.forEach(part => {
    const { src, dst } = part
    console.log(src + ' -> ' + dst)
  })
}, error => {
  // 翻译出错
  const { error_code, error_msg } = error
  console.log(error_code)
  console.log(error_msg)
})

```
```js
// 结果数据结构
{
  from: 'zh',
  to: 'en',
  trans_result: [
    { src: '翻译翻译', dst: 'Translation Translation' },
    { src: '什么叫TMD', dst: 'What is TMD' },
    { src: '惊喜', dst: 'pleasantly surprised' }
  ]
}
```

