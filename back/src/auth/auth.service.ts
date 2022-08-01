import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'
import { hash, genSalt, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'
@Injectable()
export class AuthService {
	//В сервисе происходит вся основная логика
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user= await this.validateUser(dto)
		
		const tokens=await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
		
	}

	async getNewTokens({refreshToken}: RefreshTokenDto ) {
	if (!refreshToken) throw new UnauthorizedException('Please sign in!')

	const result = await this.jwtService.verifyAsync(refreshToken)
	if(!result) throw new UnauthorizedException('Invalid token or epired!')
	const user = await this.UserModel.findById(result._id)
	const tokens=await this.issueTokenPair(String(user._id))

	return {
		user: this.returnUserFields(user),
		...tokens,
	}
	

		
	}
	async register(dto: AuthDto) {
		const oldUser = await this.UserModel.findOne({ email: dto.email })
		if (oldUser)
			throw new BadRequestException(
				'User with this email is alredy in the system'
			)
		const salt = await genSalt(10)

		const newUser = new this.UserModel({
			email: dto.email,
			password: await hash(dto.password, salt), //Асинхронно генерируем хэш для данной строки
		})
        const user = await newUser.save()
		const tokens=await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens
			
		}
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		//Получаем dto с данными
		const user = await this.UserModel.findOne({ email: dto.email }) //Ищем юзера по email
		if (!user) throw new UnauthorizedException('User not found') //Если не нашли

		const isValidPassword = await compare(dto.password, user.password) //Сравниваем  пароли
		if (!isValidPassword) throw new UnauthorizedException('Invalid password') //Если нет

		return user
	}

	async issueTokenPair(userId: string) {
		//Создание токенов
		const data = { _id: userId }
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})
		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserModel) {
		return {
			
			_id: user._id,
			email: user.email,
			isAdmin: user,
		}
	}
}
