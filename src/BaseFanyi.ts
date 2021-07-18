
export interface IBaseFanyiConfig<L> {
  from: L
  to: L
  updateQuery(query: string): this
  updateSign(): void
  release(): any
}

interface IHandleContent {
  contents: Set<string>
  /**
   * 生产 query content 字符串
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
}


export interface IBaseFanyi<C> extends IHandleContent {
  url: string
  config: C
}

export class BaseFanyi<L, C extends IBaseFanyiConfig<L> = IBaseFanyiConfig<L>> implements IBaseFanyi<C> {
  config!: C
  url!: string
  contents!: Set<string>

  /**
   * 获得配置，可以从 API 实例进行更新，或者直接操作
   */
  getConfig() {
    return this.config
  }

  /**
   * 更新 API 地址，通常在 config 配置
   * @param url API地址
   */
  setApiUrl(url: string) {
    this.url = url
    return this
  }

  /**
   * 设置源语言
   * @param from 源语言
   */
  setLangFrom(from: L) {
    this.config.from = from
    return this
  }

  /**
   * 设置目标语言
   * @param to 目标语言
   */
  setLangTo(to: L) {
    this.config.to = to
    return this
  }

  /**
   * 交换配置中 from 和 to 的语言设置
   */
  swapLang() {
    [this.config.to, this.config.from] = [this.config.from, this.config.to]
    return this
  }

  createRequestBody() {
    this.config.updateQuery(this.generateContent())
    this.config.updateSign()
    return this.config.release()
  }

  generateContent(): string {
    let content = ''
    for (let part of this.contents.values()) {
      content += part + '\n'
    }
    return content
  }

  /**
   * 添加内容
   * @param content 要添加的内容
   */
  addContent(content: string) {
    this.contents.add(content)
    return this
  }

  /**
   * 删除内容
   * @param content 删除的内容
   */
  removeContent(content: string) {
    this.contents.delete(content)
    return this
  }

  /**
   * 清除所有已添加内容
   */
  clearContent() {
    this.contents.clear()
    return this
  }

  /**
   * 更换内容
   * @param newContent 新的内容
   * @param oldContent 旧内容
   */
  replaceContent(newContent: string, oldContent: string) {
    this.contents.delete(oldContent)
    this.contents.add(newContent)
    return this
  }
}