import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { CreateMovieDto } from './dto/createMovie.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import FormData = require('form-data');
import { PaginationParams } from './dto/pagination.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private MovieModel: Model<MovieDocument>,
    private httpService: HttpService,
  ) {}

  async create(createMovieDto: CreateMovieDto, session): Promise<Movie> {
    try {
      const possibleMovie = await lastValueFrom(
        this.httpService
          .post(
            `https://betterimdbot.herokuapp.com/?tt=${createMovieDto.title}`,
          )
          .pipe(
            map((response) => {
              return response.data[1].jsonnnob;
            }),
          ),
      );
      if (
        possibleMovie.image &&
        possibleMovie.name &&
        possibleMovie.director?.length > 0
      ) {
        console.log('entered');
        createMovieDto.title = possibleMovie.name;
        createMovieDto.image = possibleMovie.image;
        createMovieDto.director = possibleMovie.director[0].name;
      }
    } catch (error) {
      console.log(error);
    }
    console.log(createMovieDto);

    const createdMovie = new this.MovieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(pagination: PaginationParams): Promise<Movie[]> {
    const query = this.MovieModel.find()
      .sort({ _id: 1 })
      .skip(pagination.skip)
      .populate({
        path: 'reviews',
        populate: { path: 'platform', options: { sort: { title: -1 } } },
      });

    if (pagination.limit) {
      query.limit(pagination.limit);
    }
    return query.exec();
  }

  async findOne(id: string): Promise<Movie> {
    return this.MovieModel.findById(id).populate('reviews');
  }

  async updateOne(id: string, createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.MovieModel.findByIdAndUpdate(id, createMovieDto);
  }
}
