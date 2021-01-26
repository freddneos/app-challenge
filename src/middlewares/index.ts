import { RepositoryMongoDb } from '../data-layer/repository/implementation/RepositoryMongoDb'
import { User } from '../data-layer/schemas/User'
import Auth from './Auth'

const repository = new RepositoryMongoDb(User)
export const authMiddleware = new Auth(repository)
