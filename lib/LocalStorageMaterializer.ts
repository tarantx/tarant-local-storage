/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Actor, ActorMessage, IMaterializer, IResolver } from 'tarant'

export class LocalStorageMaterializer implements IMaterializer, IResolver {
  public static create(config: any): LocalStorageMaterializer {
    return new LocalStorageMaterializer(config)
  }
  private config: any

  protected constructor(config: any) {
    this.config = config
  }

  public onInitialize(actor: Actor): void {
    //
  }

  public onBeforeMessage(actor: Actor, message: ActorMessage): void {
    //
  }

  public async onAfterMessage(actor: Actor, message: ActorMessage): Promise<void> {
    localStorage.setItem('tarant-local-storage/actor/' + actor.id, JSON.stringify(await (actor as any).toJson()))
  }

  public onError(actor: Actor, message: ActorMessage, error: any): void {
    //
  }

  public async resolveActorById(id: string): Promise<Actor> {
    const storedActorStateString = localStorage.getItem('tarant-local-storage/actor/' + id)
    if (storedActorStateString === null) {
      return undefined as unknown as Actor
    }
    const storedActorJson = JSON.parse(storedActorStateString)
    const actor = new this.config.actorTypes[storedActorJson.type](id)
    actor.updateFrom(storedActorJson)
    return actor
  }
}
