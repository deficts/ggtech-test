import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Movie } from '../movie/movie.schema';
import { Platform } from '../platform/platform.scheme';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Platform' })
  @Prop()
  platform: Platform;

  @Prop()
  author: string;

  @Prop()
  body: string;

  @Prop()
  score: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
