import { Types } from 'mongoose';
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class IdDto{
    @IsNotEmpty()
    @MinLength(24,{each:true})
    @MaxLength(24,{each:true})
   genreIds: Types.ObjectId[]
}