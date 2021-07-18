import * as Baidu from './sdks/baidu'
import * as Youdao from './sdks/youdao'

// alias
export const sdks = {
  Baidu,
  Youdao,
}

// for esm
export default {
  sdks,
  Baidu,
  Youdao,
}

// for cmd
module.exports = {
  sdks,
  Baidu,
  Youdao,
}
