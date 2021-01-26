export interface EncryptInterface {
     encrypt(data:string): Promise<string>
     compareEncrypted(data:string, toCompare:string): Promise<boolean>
}
