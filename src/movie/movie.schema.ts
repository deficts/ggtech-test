import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Platform } from '../platform/platform.scheme';
import { Review } from '../review/review.scheme';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  slug: string;

  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  director: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Platform' }] })
  platforms: Array<Platform>;

  @Prop()
  score: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Array<Review>;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
