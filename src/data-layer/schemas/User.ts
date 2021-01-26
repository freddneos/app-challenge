import { Document, Schema, Model, model } from 'mongoose'
import { UserInterface } from '../../interfaces/User'
import bcrypt from 'bcrypt'

export interface UserModel extends UserInterface, Document {
  fullName(): string
}
const UserSchema = new Schema({
  email: String,
  firstName: String,
  password: String,
  token: String
}, {
  timestamps: true
})
UserSchema.pre<UserInterface>('save', function (): void {
 // this.password = bcrypt.hashSync(this.password, 10)
})
export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
