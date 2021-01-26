import { Request, Response } from 'express'
import { RepositoryInterface } from '../data-layer/repository/RepositoryInterface'
import { ConditionModel } from '../data-layer/schemas/Condition'

export class ConditionController {
  private repository: RepositoryInterface<any>
  constructor (Repository: RepositoryInterface<any>) {
    this.repository = Repository
  }
  public index = async (req: Request, res: Response): Promise<Response> => {
    const conditions:ConditionModel[] = await this.repository.find()

    if (!conditions) {
      return res.status(401).json({ message: 'not found' })
    }
    return res.json(conditions)
  }
}
