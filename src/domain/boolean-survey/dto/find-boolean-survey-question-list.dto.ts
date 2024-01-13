import { PickType } from '@nestjs/swagger';
import { BooleanSurveyQuestion } from '../entities/boolean-survey-question.entity';

export class FindBooleanSurveyQuestionListDto extends PickType(
  BooleanSurveyQuestion,
  ['surveyName'],
) {}
