import { Request, Response, NextFunction } from 'express'
import { RepositoryInterface } from '../data-layer/repository/RepositoryInterface'
import { UserInterface } from '../interfaces/User'

export default class Auth {
    private repository: RepositoryInterface<any>

    constructor (Repository:RepositoryInterface<any>) {
      this.repository = Repository
    }

    public isAuthenticated = async (req:Request, res:Response, next:NextFunction) : Promise<void|Response> => {
      const { token } = req.body
      try {
        const user:UserInterface = await this.repository.findOne({ token })
        if (!user) {
          return res.status(401).json({ message: 'You are not logged' })
        }
        req.body.user = user
        return next()
      } catch (error) {
        return res.status(500).json({ message: 'server error' })
      }
    }
}
