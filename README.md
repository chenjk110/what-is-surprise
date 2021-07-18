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

## 模块导入方式
```js
const {
  sdks, // 包含 Baidu、Youdao 命名空间，下方两个命名空间等效
  Baidu, // 百度翻译 SDK 相关 API 的命名空间
  Youdao, // 有道翻译 SDK 相关 API 的命名空间
} = require('what-is-surprise')
```
```ts
import { sdks, Baidu, Youdao } from 'what-is-surprise'
```
## 简单例子

** Class **

```ts
import { Baidu } from 'what-is-surprise'

const translator = Baidu.BaiduFanyi.createTranslator()

translator.setLangFrom('zh')
translator.setLangTo('en')
translator.addContent('翻译翻译、什么叫TMD的惊喜！')
translator.translate().then(res => {
  // 成功
}, err => {
  // 未成功
})
```

** CommonJS **
```js
const { Baidu } = require('what-is-surprise')

const translator = Baidu.BaiduFanyi.createTranslator()

translator.setLangFrom('zh')
translator.setLangTo('en')
translator.addContent('翻译翻译、什么叫TMD的惊喜！')
translator.translate().then(res => {
  // 成功
}, err => {
  // 未成功
})

```

## 通用API

> - 对于语言配置字段 `from`，`to` 可以参考官方文档，默认值都为 `auto` 。
>
> - 请求返回数据结构课参考官方文档。
> - 对于不同`翻译 API `的详细参数配置、返回结果数据结构、请对应官方文档或在线调试进行参考。

```ts
  /**
   * 对应参数配置，可直接修改或者通过封装的 API 方法进行修改
   */
  config: C
  /**
   * SDK API 地址
   */
  url: string
  /**
   * 翻译的内容，结合中每个值代表一个段落部分
   */
  contents: Set<string>
  /**
   * 获得配置，可以从 API 实例进行更新，或者直接操作
   */
  getConfig(): C
  /**
   * 更新 API 地址，通常在 config 配置
   * @param url API地址
   */
  setApiUrl(url: string): this
  /**
   * 设置源语言
   * @param from 源语言
   */
  setLangFrom(from: L): this
  /**
   * 设置目标语言
   * @param to 目标语言
   */
  setLangTo(to: L): this
  /**
   * 交换配置中 from 和 to 的语言设置
   */
  swapLang(): this
  /**
   * 快速创建对应的 SDK API 请求参数对象
   */
  createRequestBody(): any
  /**
   * 创建当前缓存的段落内容文本，以 `\n` 进行连接
   */
  generateContent(): string
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
  replaceContent(newContent: string, oldContent: string): this
```

### 使用例子

```ts
import { Baidu } from 'what-is-surprise'

const translator = Baidu.BaiduFanyi.createTranslator({ appid: '12341234', key: '12341234', salt: '12341234' })

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