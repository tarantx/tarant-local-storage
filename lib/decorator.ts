/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Actor } from 'tarant'

const LocalStoragePersisted = <T extends Actor>(persistenceName: string, classFn: new (...args: any[]) => T) => {
  classFn.prototype.isLocalStoragePersisted = true
  classFn.prototype.localStoragePersistenceName = persistenceName
  ;(LocalStoragePersisted as any).constructorMap[persistenceName] = classFn
}

LocalStoragePersisted.constructorMap = {}

export default LocalStoragePersisted
