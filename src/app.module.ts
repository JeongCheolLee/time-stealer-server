import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { BooleanSurveyModule } from './domain/boolean-survey/boolean-survey.module';
import envFilePath from 'envs/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from './domain/survey/survey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        TZ: Joi.string().valid('Asia/Seoul').required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SCHEMA_NAME: Joi.string().required(),
        DB_SSL: Joi.string().required(),
        DB_LOGGING: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      schema: process.env.DB_SCHEMA_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: process.env.DB_LOGGING === 'true',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: process.env.NODE_ENV !== 'prod',
    }),
    SurveyModule,
    BooleanSurveyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
