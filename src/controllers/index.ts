import { EncryptBcrypt } from '../providers/implementations/EncryptBcrypt'
import { RepositoryMongoDb } from '../data-layer/repository/implementation/RepositoryMongoDb'
import { AuthController } from './AuthController'
import { CaseController } from './CaseController'
import { ConditionController } from './ConditionController'

import { User, Case, Condition } from '../data-layer/schemas'
import { SeedController } from './SeedController'

const userRepository = new RepositoryMongoDb(User)
const caseRepository = new RepositoryMongoDb(Case)
const conditionRepository = new RepositoryMongoDb(Condition)

const encryptor = new EncryptBcrypt()

const authController = new AuthController(encryptor, userRepository)
const caseController = new CaseController(caseRepository)
const conditionController = new ConditionController(conditionRepository)
const seedController = new SeedController()

export { authController, caseController, conditionController, seedController }
