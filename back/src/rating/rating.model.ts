import {Base,TimeStamps} from '@typegoose/typegoose/lib/defaultClasses'
import {prop, Ref} from '@typegoose/typegoose'
import { MovieModel } from 'src/movie/movie.model'
import { UserModel } from 'src/user/user.model'
export interface RatingModel  extends Base {}


export class RatingModel extends TimeStamps {//Задаем опции для поля что ниже
    @prop({ref:()=>UserModel})
    userId:Ref<UserModel>[]

    @prop({ref:()=>MovieModel})
    movieId:Ref<MovieModel>[]

    @prop() 
    value:number
   
}