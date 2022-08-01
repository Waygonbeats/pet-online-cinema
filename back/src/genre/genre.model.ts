import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'
export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
	//Задаем опции для поля что ниже

	@prop()
	name: string

	@prop()
	slug: string

	@prop()
	description: string

	@prop()
	icon: string
}
