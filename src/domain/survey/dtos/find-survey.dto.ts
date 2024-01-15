import { PartialType, PickType } from '@nestjs/swagger';
import { Survey } from '../entities/survey.entity';

export class FindSurveyDto extends PartialType(
  PickType(Survey, ['id', 'surveyName']),
) {}
