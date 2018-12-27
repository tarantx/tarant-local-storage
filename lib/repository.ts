import { Actor, ActorMessage } from 'tarant'
import IMaterializer from 'tarant/dist/actor-system/materializer/materializer'
import IResolver from 'tarant/dist/actor-system/resolver/resolver'
import LocalStoragePersisted from './decorator'

export default class LocalStorageRepository implements IMaterializer, IResolver {
  public onInitialize(actor: Actor): void {
    return
  }

  public onBeforeMessage(actor: Actor, message: ActorMessage): void {
    return
  }

  public onAfterMessage(actor: Actor, message: ActorMessage): void {
    const actorState = Object.assign({}, actor) as any
    delete actorState.busy
    delete actorState.materializers
    delete actorState.scheduled
    delete actorState.self
    delete actorState.supervisor
    delete actorState.system

    const className = actor.constructor.prototype.localStoragePersistenceName

    localStorage.setItem('tarant-local-storage/actor/' + actor.id, JSON.stringify({ className, actorState }))
  }

  public onError(actor: Actor, message: ActorMessage, error: any): void {
    return
  }

  public async resolveActorById(id: string): Promise<Actor> {
    const storedActorStateString = localStorage.getItem('tarant-local-storage/actor/' + id)
    if (storedActorStateString === null) {
      return (undefined as unknown) as Actor
    }

    const { className, actorState } = JSON.parse(storedActorStateString)
    actorState.constructor = (LocalStoragePersisted.constructorMap as any)[className]
    actorState.prototype = actorState.constructor.prototype

    actorState.onReceiveMessage = Actor.prototype.onReceiveMessage.bind(actorState)
    actorState.initialized = (Actor.prototype as any).initialized.bind(actorState)
    actorState.dispatchAndPromisify = (Actor.prototype as any).dispatchAndPromisify.bind(actorState)

    return actorState as Actor
  }
}
