import { Module } from '@nestjs/common';
import { BooleanSurveyService } from './services/boolean-survey.service';
import { BooleanSurveyController } from './boolean-survey.controller';
import { BooleanSurveyRepository } from './repositories/boolean-survey.repository';

@Module({
  controllers: [BooleanSurveyController],
  providers: [BooleanSurveyService, BooleanSurveyRepository],
})
export class BooleanSurveyModule {}
