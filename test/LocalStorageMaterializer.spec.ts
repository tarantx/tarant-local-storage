/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { faker } from '@faker-js/faker'
import { LocalStorageMaterializer } from '../lib/LocalStorageMaterializer'

class FakeActor {
  readonly id: string
  counter: number

  constructor(id: string, counter: number) {
    this.id = id
    this.counter = counter
  }

  toJson() {
    return {
      id: this.id,
      type: 'FakeActor',
      counter: this.counter,
    }
  }

  updateFrom({ counter }: any): void {
    this.counter = counter
  }
}

describe('LocalStorageRepository', () => {
  let repository: LocalStorageMaterializer

  beforeEach(() => {
    repository = LocalStorageMaterializer.create({ actorTypes: { FakeActor } })
  })

  it('it should be able to recover a persisted actor', async () => {
    const id = faker.random.word()
    const number = faker.datatype.number()
    const fakeActor = new FakeActor(id, number)
    jest.spyOn(fakeActor, 'toJson')
    jest.spyOn(fakeActor, 'updateFrom')
    await repository.onAfterMessage(fakeActor as any, null as any)
    expect(fakeActor.toJson).toBeCalledTimes(1)
    expect(fakeActor.updateFrom).not.toBeCalled()
    const actorResult = (await repository.resolveActorById(id)) as any as FakeActor
    expect(actorResult.id).toEqual(id)
    expect(actorResult.counter).toEqual(number)
  })
})
