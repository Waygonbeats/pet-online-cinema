import { Types } from 'mongoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { UpdateMovieDto } from './dto/movie.dto'
import { SlugDto } from './dto/movie.slug.dto'
import { IdDto } from './dto/movie.genresId.dto'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
	) {}

	async getAll(serchTerm?: string) {
		let options = {}

		if (serchTerm)
			options = {
				$or: [
					{
						title: new RegExp(serchTerm, 'i'),
					},
				],
			}

		return this.MovieModel.find(options)
			.select(' -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec()
	}

	async bySlug(slug: string) {
		const doc = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec()
		if (!doc) throw new NotFoundException('Update not found')
		return doc
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.MovieModel.find({ actor: actorId }).exec()
		if (!docs) throw new NotFoundException('Movies not found')
		return docs
	}

	async byGenres(genreIds:Types.ObjectId[]) {
		const docs= await this.MovieModel.findOne({
			genres: { $in:genreIds }}).exec()
        if(!genreIds) throw new NotFoundException('You nee to specify genre IDs')
		if (!docs) throw new NotFoundException('Update not found')
		return docs
	}
	async getMostPopular() {
		return await this.MovieModel.find({ countOpened: { $in: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async updateCountOpened(slug: string) {
		const updateDoc:SlugDto = await this.MovieModel.findOneAndUpdate(
           
			{ slug },
			{
				$inc: { countOpened: 1 },
			},
			{
				new: true,
			}
		).exec()
        if(!slug) throw new NotFoundException('You need to specify a slug')
		if (!updateDoc) throw new NotFoundException('Movie not found')
		return updateDoc
	}
async updateRating(id:Types.ObjectId, newRating:number){
	return this.MovieModel.findOneAndUpdate(id,{
		rating: newRating
	},{
		new:true
	}).exec()
}

	/*Admin zone */
	async byId(_id: string) {
		const doc = await this.MovieModel.findById(_id)
		if (!doc) throw new NotFoundException('Movie not found')

		return doc
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			vaideoUrl: '',
			slug: '',
		}
		const doc = await this.MovieModel.create(defaultValue)
		return doc._id
	}
	//telegram mod
	async update(_id: string, dto: UpdateMovieDto) {
		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('UpdateMovie not found')

		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.MovieModel.findByIdAndDelete(id).exec()
		if (!deleteDoc) throw new NotFoundException('UpdateMovie not found')
		return deleteDoc
	}
}
