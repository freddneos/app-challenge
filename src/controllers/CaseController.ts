import { Request, Response } from 'express'
import { UserModel } from '../data-layer/schemas/User'
import { RepositoryInterface } from '../data-layer/repository/RepositoryInterface'

export class CaseController {
  private repository: RepositoryInterface<any>

  constructor (Repository: RepositoryInterface<any>) {
    this.repository = Repository
  }

  public nextCaseToReview = async (req: Request, res: Response): Promise<Response> => {
    const user:UserModel = req.body.user
    const caseData = { data: await this.repository.findOne({ 'reviews.userId': { $ne: user.id } }) }
    if (!caseData.data) {
      return res.status(200).json({ message: 'You are Done' })
    }
    return res.json(caseData)
  }

  public reviewCase = async (req: Request, res: Response): Promise<Response> => {
    const user:UserModel = req.body.user
    const { conditionId } = req.body
    const caseId = req.params.case
    let reviewIndex = -1
    console.log(req.body, req.params)
    try {
      const myCase = await this.repository.findOne({ id: caseId })
      if (!myCase) {
        return res.status(401).json({ message: 'case not found' })
      }
      let newCase = { userId: user.id, conditionId, createdAt: Date.now() }
      myCase.reviews.forEach((review, index):void => {
        if (review.userId.toString() === user._id.toString()) {
          reviewIndex = index
        }
      })
      if (reviewIndex >= 0) {
        myCase.reviews[reviewIndex] = newCase
      } else {
        myCase.reviews.push(newCase)
      }
      await myCase.save()
      res.status(200).json(myCase)
    } catch (error) {

    }
  }
}
