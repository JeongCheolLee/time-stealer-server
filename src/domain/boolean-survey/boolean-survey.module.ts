import { Module } from '@nestjs/common';
import { BooleanSurveyQuestionService } from './services/boolean-survey-question.service';
import {
  BooleanSurveyAnswerController,
  BooleanSurveyQuestionController,
} from './boolean-survey-question.controller';
import { BooleanSurveyQuestionRepository } from './repositories/boolean-survey-question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooleanSurveyQuestion } from './entities/boolean-survey-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BooleanSurveyQuestion])],
  controllers: [BooleanSurveyQuestionController, BooleanSurveyAnswerController],
  providers: [BooleanSurveyQuestionService, BooleanSurveyQuestionRepository],
})
export class BooleanSurveyModule {}
