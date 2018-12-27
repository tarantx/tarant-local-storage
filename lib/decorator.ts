import { Actor } from 'tarant'

const LocalStoragePersisted = <T extends Actor>(persistenceName: string, classFn: new (...args: any[]) => T) => {
  classFn.prototype.isLocalStoragePersisted = true
  classFn.prototype.localStoragePersistenceName = persistenceName
  ;(LocalStoragePersisted as any).constructorMap[persistenceName] = classFn
}

LocalStoragePersisted.constructorMap = {}

export default LocalStoragePersisted
