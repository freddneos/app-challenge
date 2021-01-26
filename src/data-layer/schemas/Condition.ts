import { Document, Schema, Model, model } from 'mongoose'
import { ConditionInterface } from '../../interfaces/Condition'

export interface ConditionModel extends ConditionInterface, Document {
}
const ConditionSchema = new Schema({
  code: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  description: String
}, {
  timestamps: true
})

export const Condition: Model<ConditionModel> = model<ConditionModel>('Condition', ConditionSchema)
