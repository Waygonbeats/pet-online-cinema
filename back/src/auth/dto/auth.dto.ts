import { IsEmail, IsString, MinLength } from 'class-validator'
export class AuthDto {
	//Обработка ошибок
	@IsEmail()
	email: string
	@MinLength(6, {
		message: 'Password cannpt be less than 6 charecters!',
	})
	@IsString()
	password: string
}
