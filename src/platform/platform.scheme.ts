import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlatformDocument = Platform & Document;

@Schema()
export class Platform {
  @Prop()
  icon: string;

  @Prop()
  title: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PlatformSchema = SchemaFactory.createForClass(Platform);
