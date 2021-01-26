import bcrypt from 'bcrypt'
import { EncryptInterface } from '../EncryptInterface'
export class EncryptBcrypt implements EncryptInterface {
  private readonly saltRounds = 1
  public async encrypt (data: string):Promise<string> {
    return bcrypt.hash(data, this.saltRounds)
  }
  public async compareEncrypted (data: string, toCompare:string): Promise<boolean> {
    return bcrypt.compare(data, toCompare)
  }
}
