import { RepositoryInterface } from '../RepositoryInterface'
import mongoose, { } from 'mongoose'

export class RepositoryMongoDb<T extends mongoose.Document> implements RepositoryInterface<T> {
  private model: mongoose.Model<T>
  constructor (model: mongoose.Model<T>) {
    this.model = model
  }
  update (filter: any, data: any): Promise<T> {
    return this.model.findOneAndUpdate(filter, data, {
      new: true
    })
  }
  public async findOne (data?: any): Promise<T|null> {
    return this.model.findOne(data)
  }
  public async find (): Promise<T[]|null> {
    return this.model.find()
  }
  public async create (data: T): Promise<T|null> {
    return this.model.create(data)
  }

  public async bulkInsert (data:any) :Promise<any> {
    try {
      await this.model.insertMany(data)
      return true
    } catch (error) {
      throw error
    }
  }
  public async drop ():Promise<void> {
    try {
      await this.model.deleteMany({
        '_id ': { '$ne': '' }
      })
    } catch (error) {
      throw error
    }
  }
}
