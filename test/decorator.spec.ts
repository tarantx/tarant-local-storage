/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Actor } from 'tarant'
import LocalStoragePersisted from '../lib/decorator'

class TestActor extends Actor {
  public constructor() {
    super()
  }
}

LocalStoragePersisted('TestActor', TestActor)

describe('LocalStoragePersisted', () => {
  it('it should add a persisted annotation to the class prototype', () => {
    expect((TestActor.prototype as any).isLocalStoragePersisted).toBeTruthy()
    expect((TestActor.prototype as any).localStoragePersistenceName).toBe('TestActor')
    expect((LocalStoragePersisted as any).constructorMap.TestActor).toBe(TestActor)
  })
})
