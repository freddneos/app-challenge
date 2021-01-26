import { Document, Error, Mongoose } from 'mongoose'
import { RepositoryInterface } from '../repository/RepositoryInterface'
import path from 'path'
import fs from 'fs'
import csvtojson from 'csvtojson'
import { RepositoryMongoDb } from '../repository/implementation/RepositoryMongoDb'
import { Case, Condition, User, UserSchema } from '../schemas'

export default class Seed {
  constructor () {
    (async (): Promise<void> => {
      await this.importCasesfromDir('./src/data-layer/seeds/cases', new RepositoryMongoDb(Case))
      await this.importConditionsFGromCSV('./src/data-layer/seeds/conditions/conditions.csv', new RepositoryMongoDb(Condition))
      await this.importUsersFromJson(new RepositoryMongoDb(User))
    })()
  }
    importCasesfromDir = async (filePath, repo: RepositoryInterface<Document>): Promise<void> => {
      const dir = path.resolve(filePath) // path.resolve('./src/data-layer/seeds/cases')
      const fileTag = fs.readdirSync(dir)
      const files = fileTag.map((fileName): any => {
        const id = fileName.replace('.txt', '')
        const description = fs.readFileSync(path.resolve(`${dir}/${fileName}`), 'utf8')
        return { id, description }
      })
      try {
        await repo.drop()
        await repo.bulkInsert(files)
      } catch (err) {
        throw new Error(err)
      }
    }

    importConditionsFGromCSV = async (filePath, repo: RepositoryInterface<Document>): Promise<void> => {
      try {
        const data = await csvtojson({ headers: ['code', 'description'], delimiter: '\t' }).fromFile(filePath)
        await repo.drop()
        await repo.bulkInsert(data)
      } catch (error) {
        throw new Error(error)
      }
    }

    importUsersFromJson = async (repo: RepositoryInterface<Document>): Promise<void> => {
      const user: UserSchema = {
        firstName: 'admin',
        email: 'doctor@email.com',
        password: '123456'
      }
      try {
        await repo.drop()
       const ret = await repo.create(user)
        console.log('user saved!')
      } catch (error) {
        console.log()
      }
    }
}
