import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieService } from './movie.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('movies')
export class MovieController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private readonly movieService: MovieService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  async getMovies(@Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      let movies = await this.movieService.findAll();
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(movies);
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      session.endSession();
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one movie' })
  async getMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      let movie = await this.movieService.updateOne(id, updateMovieDto);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(movie);
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      session.endSession();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update one movie' })
  async updateMovie(@Param('id') id: string, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      let movie = await this.movieService.findOne(id);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(movie);
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      session.endSession();
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Movie' })
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newClient = await this.movieService.create(createMovieDto, session);
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
