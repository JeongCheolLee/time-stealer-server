import { IntersectionType, PickType } from '@nestjs/swagger';
import { BooleanSurveyResult } from '../entities/boolean-survey-result.entity';
import { FindBooleanSurveyQuestionListDto } from './find-boolean-survey-question-list.dto';

export class FindBooleanSurveyResultByIdAndCodeDto extends IntersectionType(
  PickType(FindBooleanSurveyQuestionListDto, ['surveyId']),
  PickType(BooleanSurveyResult, ['surveyResultCode']),
) {}
