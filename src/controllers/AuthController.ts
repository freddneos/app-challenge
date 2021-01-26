import { Request, Response } from 'express'
import { UserInterface } from '../interfaces/User'
import { EncryptInterface } from '../providers/EncryptInterface'
import { RepositoryInterface } from '../data-layer/repository/RepositoryInterface'

export class AuthController {
  private encryptor: EncryptInterface
  private repository: RepositoryInterface<any>

  constructor (
    Encrypt: EncryptInterface,
    Repository: RepositoryInterface<any>) {
    this.encryptor = Encrypt
    this.repository = Repository
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    try {
      const user: UserInterface = await this.repository.findOne({ email: email })
      if (user && (password === user.password)) {
        const token = JSON.stringify(user) // await this.encryptor.encrypt(JSON.stringify(user))
        await this.repository.update({ email: user.email }, { token })
        return res.json({ user: user.firstName, token })
      }
      return res.status(401).json({ message: 'user not found' })
    } catch (error) {
      return res.status(500).json({ message: `server error ${error}` })
    }
  }

  public signup = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body

    try {
      const userAlreadyExist: UserInterface = await this.repository.findOne({ email: email })
      if (userAlreadyExist) {
        res.status(401).json({ message: 'an user already exists with this email' })
      }

      const user: UserInterface = await this.repository.create(req.body)
      const token = JSON.stringify(user) // await this.encryptor.encrypt(JSON.stringify(user))
      await this.repository.update({ email: user.email }, { token })
      return res.json({ user: user.firstName, token })
    } catch (error) {
      return res.status(500).json({ message: 'server error' })
    }
  }

  public logout = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.body
    try {
      const user = await this.repository.update({ token }, { token: '' })
      if (user) {
        return res.status(201).json({ message: 'Logged out' })
      }
      return res.status(401).json({ message: 'user not found' })
    } catch (error) {
      return res.status(500).json({ message: 'server error' })
    }
  }
}
