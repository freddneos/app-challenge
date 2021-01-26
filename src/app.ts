import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'
import Seed from './data-layer/seeds/seed'
const host = process.env.DB_HOST || 'localhost'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
    this.staticServer()
    this.seedDataBase()
  }

  private staticServer ():void{
    this.express.use('/web', express.static('./client/'))
  }

  private async seedDataBase ():Promise<void> {
    const sd = await new Seed()
    console.log('seed database')
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private async database (): Promise<void> {
    const db = await mongoose.connect(`mongodb://${host}:27017/gyapp`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    console.log("Drop database")
    await db.connection.dropDatabase()
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
