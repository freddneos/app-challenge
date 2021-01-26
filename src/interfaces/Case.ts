import { ReviewInterface } from './Review'
export interface CaseInterface {
    id?:any
    description: string
    reviews: ReviewInterface[]
}
