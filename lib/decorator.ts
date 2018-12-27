import { Actor } from 'tarant'

export default <T extends Actor>(classFn: new (...args: any[]) => T) => {
  classFn.prototype.isLocalStoragePersisted = true
}
