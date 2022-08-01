import { ICollection } from './../../../../backend-advanced (1)/backend-advanced-main/src/genre/interfaces/genre.interface'
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { exec } from 'child_process'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService
	) {}

	async bySlug(slug: string) {
		const doc = await this.GenreModel.findOne({ slug }).exec()
		if (!doc) throw new NotFoundException('Genre not found')
		return doc
	}

	async getAll(serchTerm?: string) {
		let options = {}

		if (serchTerm)
			options = {
				$or: [
					{
						name: new RegExp(serchTerm, 'i'),
					},
					{
						slug: new RegExp(serchTerm, 'i'),
					},
					{
						description: new RegExp(serchTerm, 'i'),
					},
				],
			}
		return this.GenreModel.find(options)
			.select(' -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}
	async getCollections() {
		const genres = await this.getAll()
		const collections = await Promise.all(
			genres.map(async (genre) => {
				const movieByGenre = await this.movieService.byGenres([genre.id])
				const result: ICollection = {
					_id: String(genre.id),
					image: movieByGenre[0].bigPoster,
					slug: genre.slug,
					title: genre.name,
				}
				return result
			})
			
		)

		return collections
	}

	/*Admin zone */
	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id)
		if (!genre) throw new NotFoundException('Genrenot found')

		return genre
	}

	async create() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}
		const genre = await this.GenreModel.create(defaultValue)
		return genre._id
	}
	async update(_id: string, dto: CreateGenreDto) {
		const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('Genre not found')
		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.GenreModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) throw new NotFoundException('Genre not found')
		return deleteDoc
	}
}
