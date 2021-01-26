export interface RepositoryInterface<T> {
     find(): Promise<T[]|null>
     findOne(data: any): Promise<T|null>
     create(item: T): Promise<T|null>
     update(filter:any, data:any): Promise<T>
     bulkInsert?(data: any):Promise<any>
     drop?():Promise<any>
}
