import { BaseFanyi } from './BaseFanyi'

export function pick<
  T extends object,
  K extends keyof T
>(obj: T, keys: K[] = []) {
  const res = {} as any
  for (const key of keys) {
    if (Reflect.has(obj, key)) {
      res[key] = obj[key as K]
    }
  }
  return res as Pick<T, K>
}

export function omit<
  T extends object,
  K extends keyof T
>(obj: T, keys: K[] = []) {
  const res = { ...obj } as any
  for (const key of keys) {
    Reflect.deleteProperty(res, key)
  }
  return res as Omit<T, K>
}

export function assignOptions<
  T extends BaseFanyi<any>,
  O extends { url?: string }
>(instance: T, options?: O) {
  if (options?.url) {
    instance.setApiUrl(options.url)
    options = { ...options }
    Reflect.deleteProperty(options, 'url')
  }
  Object.assign(instance.config, options)
  return instance
}
