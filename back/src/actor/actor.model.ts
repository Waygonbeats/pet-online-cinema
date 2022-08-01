import {Base,TimeStamps} from '@typegoose/typegoose/lib/defaultClasses'
import {prop} from '@typegoose/typegoose'
export interface ActorModel  extends Base {}


export class ActorModel extends TimeStamps {//Задаем опции для поля что ниже
    @prop()
    name: string
    
    @prop({unique:true}) 
    slug: string
    
    @prop()
    photo: string
    
}