import{IsObjectId} from "class-validator-mongo-object-id"
import { IsNumber } from "class-validator";
export class SetRatingDto{
    @IsObjectId({message:'MovieId is in valid'})
    movieId:string
    @IsNumber()
    value:number
}
