import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { Connection } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private readonly reviewService: ReviewService,
  ) {}

  @Post(':movieId')
  @ApiOperation({ summary: 'Create a new Movie Review' })
  async createReview(
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newClient = await this.reviewService.create(
        createReviewDto,
        movieId,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.CREATED).send(newClient);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}
