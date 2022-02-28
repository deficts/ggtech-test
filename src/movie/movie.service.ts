import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private MovieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto, session): Promise<Movie> {
    const createdMovie = new this.MovieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.MovieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    return this.MovieModel.findById(id);
  }

  async updateOne(id: string, createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.MovieModel.findByIdAndUpdate(id, createMovieDto);
  }
}
