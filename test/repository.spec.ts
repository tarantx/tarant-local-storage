/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fakerStatic from 'faker'
import { Actor, ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import Mailbox from 'tarant/dist/mailbox/mailbox'
import LocalStoragePersisted from '../lib/decorator'
import LocalStorageRepository from '../lib/repository'

class PersistedTestActor extends Actor {
  public state: string = ''

  public constructor() {
    super()
  }

  public async applyRandomState(): Promise<void> {
    this.state = fakerStatic.lorem.text()
  }
}

LocalStoragePersisted('PersistedTestActor', PersistedTestActor)

describe('LocalStorageRepository', () => {
  let actorSystem: ActorSystem
  let repository: LocalStorageRepository

  const cleanUpActorSystemRefs = () => {
    const system = actorSystem as any
    system.actors = new Map()
    system.subscriptions = new Map()
    system.mailbox = Mailbox.empty()
  }
  beforeEach(() => {
    repository = new LocalStorageRepository()
    actorSystem = ActorSystem.for(
      ActorSystemConfigurationBuilder.define()
        .withMaterializers([repository])
        .withResolvers([repository])
        .done(),
    )
  })

  afterEach(() => {
    actorSystem.free()
  })

  it('it should be able to recover a persisted actor', async () => {
    const createdActor = actorSystem.actorOf(PersistedTestActor, []) as any
    await createdActor.applyRandomState()

    const id = createdActor.ref.id
    cleanUpActorSystemRefs()
    const foundActor = (await actorSystem.actorFor(id)) as any

    expect(foundActor.ref.id).toBe(createdActor.ref.id)
    expect(foundActor.ref.state).toBe(createdActor.ref.state)
    expect(foundActor.ref.constructor).toBe(PersistedTestActor)

    await foundActor.applyRandomState()
    expect(foundActor.ref.state).not.toBe(createdActor.ref.state)
  })
})
