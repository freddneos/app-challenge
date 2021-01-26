import { Document, Schema, Model, model } from 'mongoose'
import { CaseInterface } from '../../interfaces/Case'

export interface CaseModel extends CaseInterface, Document {
}
const CaseSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    conditionId: {
      type: Schema.Types.ObjectId,
      ref: 'Condition',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})
export const Case: Model<CaseModel> = model<CaseModel>('Case', CaseSchema)
