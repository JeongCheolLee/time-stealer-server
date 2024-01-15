import { OmitType } from '@nestjs/swagger';
import { BooleanSurveyResult } from '../entities/boolean-survey-result.entity';

export class BooleanSurveyResultDto extends OmitType(BooleanSurveyResult, [
  'survey',
]) {}
