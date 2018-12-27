import { Actor } from 'tarant'
import LocalStoragePersisted from '../lib/decorator'

class TestActor extends Actor {
  public constructor() {
    super()
  }
}

LocalStoragePersisted(TestActor)

describe('LocalStoragePersisted', () => {
  it('it should add a persisted annotation to the class prototype', () => {
    expect((TestActor.prototype as any).isLocalStoragePersisted).toBeTruthy()
  })
})
