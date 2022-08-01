import {Base,TimeStamps} from '@typegoose/typegoose/lib/defaultClasses'
import {prop, Ref} from '@typegoose/typegoose'
import { MovieModel } from 'src/movie/movie.model'
export interface UserModel  extends Base {}


export class UserModel extends TimeStamps {//Задаем опции для поля что ниже
    @prop({unique:true}) 
    email: string
    @prop()
    password: string
    @prop({default: false})
    isAdmin: boolean
    @prop({default:[],ref:()=>MovieModel})
    favorites?:Ref<MovieModel>[]
}