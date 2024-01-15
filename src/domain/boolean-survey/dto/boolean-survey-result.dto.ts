import { OmitType } from '@nestjs/swagger';
import { BooleanSurveyResult } from '../entities/boolean-survey-answer.entity';

export class BooleanSurveyResultDto extends OmitType(BooleanSurveyResult, [
  'survey',
]) {}
