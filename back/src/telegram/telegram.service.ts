import { Telegraf } from 'telegraf'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Telegram } from './telegram.interface'

@Injectable()
export class TelegramService {
	bot?: Telegraf
	options?: Telegram
	constructor(private readonly configService: ConfigService) {
		const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN')
		const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')

		if (token && chatId) {
			this.options = { token, chatId }
			this.bot = new Telegraf(token)
		}
	}
}
