import { Module } from '@nestjs/common';
import { BooleanSurveyQuestionService } from './services/boolean-survey-question.service';
import {
  BooleanSurveyAnswerController,
  BooleanSurveyQuestionController,
} from './controllers/boolean-survey-question.controller';
import { BooleanSurveyQuestionRepository } from './repositories/boolean-survey-question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooleanSurveyQuestion } from './entities/boolean-survey-question.entity';
import { SurveyModule } from '../survey/survey.module';
import { BooleanSurveyAnswerService } from './services/boolean-survey-answer.service';
import { BooleanSurveyResultRepository } from './repositories/boolean-survey-result.repository';
import { BooleanSurveyResult } from './entities/boolean-survey-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BooleanSurveyQuestion, BooleanSurveyResult]),
    SurveyModule,
  ],
  controllers: [BooleanSurveyQuestionController, BooleanSurveyAnswerController],
  providers: [
    BooleanSurveyQuestionService,
    BooleanSurveyAnswerService,
    BooleanSurveyQuestionRepository,
    BooleanSurveyResultRepository,
  ],
})
export class BooleanSurveyModule {}
