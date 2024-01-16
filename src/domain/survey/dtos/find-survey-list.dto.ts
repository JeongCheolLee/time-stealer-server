import { PartialType, PickType } from '@nestjs/swagger';
import { Survey } from '../entities/survey.entity';

export class FindSurveyListDto extends PickType(PartialType(Survey), [
  'surveyName',
]) {}
