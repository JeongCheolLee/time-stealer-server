import { Module } from '@nestjs/common';
import { SurveyService } from './services/survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './entities/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyRepository } from './repositories/survey.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyRepository],
  exports: [SurveyService],
})
export class SurveyModule {}
