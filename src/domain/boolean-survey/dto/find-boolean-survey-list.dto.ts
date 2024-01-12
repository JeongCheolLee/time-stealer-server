import { PickType } from '@nestjs/swagger';
import { BooleanSurvey } from '../entities/boolean-survey.entity';

export class FindBooleanSurveyListDto extends PickType(BooleanSurvey, [
  'surveyName',
]) {}
