import { Request, Response } from 'express'
import Seed from '../data-layer/seeds/seed'

export class SeedController {
    runSeed = async (req: Request, res: Response): Promise<Response> => {
      try {
        const seed = new Seed()
        return res.status(200).json({ message: 'import succedded' })
      } catch (error) {
        res.status(500).json({ message: error })
        throw new Error(error)
      }
    }
}
