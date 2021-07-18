export function pick<T extends object, K extends keyof T>(obj: T, keys: K[] = []) {
  const res = {} as any
  for (const key of keys) {
    if (Reflect.has(obj, key)) {
      res[key] = obj[key as K]
    }
  }
  return res as Pick<T, K>
}
