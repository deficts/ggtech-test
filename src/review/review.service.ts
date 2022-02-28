import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.scheme';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { Movie, MovieDocument } from 'src/movie/movie.schema';
import { Platform, PlatformDocument } from 'src/platform/platform.scheme';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Platform.name) private PlatformModel: Model<PlatformDocument>,
    @InjectModel(Review.name) private ReviewModel: Model<ReviewDocument>,
    @InjectModel(Movie.name) private MovieModel: Model<MovieDocument>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    movieId: string,
  ): Promise<Review> {
    const movie = await this.MovieModel.findById(movieId);
    const platform =
      (await this.PlatformModel.findOne({
        title: createReviewDto.platform.title,
      })) || (await this.PlatformModel.create(createReviewDto.platform));
    createReviewDto.platform = platform;
    const review = await this.ReviewModel.create(createReviewDto);
    movie.reviews.push(review);
    await movie.save();
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.ReviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    return this.ReviewModel.findById(id);
  }

  async updateOne(
    id: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.ReviewModel.findByIdAndUpdate(id, createReviewDto);
  }
}
