import * as Baidu from './sdks/baidu'
import * as Youdao from './sdks/youdao'

export * as Baidu from './sdks/baidu'
export * as Youdao from './sdks/youdao'

export const sdks = {
  Baidu,
  Youdao,
}

export default {
  sdks,
  Baidu,
  Youdao,
}

module.exports.sdks = sdks
module.exports.Baidu = Baidu
module.exports.Youdao = Youdao
