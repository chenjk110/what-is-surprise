import { BaseFanyi } from './BaseFanyi'

export function assignOptions<
  T extends BaseFanyi<any>,
  O extends { url?: string }
>(instance: T, options?: O) {
  if (options?.url) {
    instance.url = options.url
    options = { ...options }
    Reflect.deleteProperty(options, 'url')
  }
  Object.assign(instance.config, options)
  return instance
}
