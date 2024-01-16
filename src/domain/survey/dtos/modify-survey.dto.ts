import { PickType } from '@nestjs/swagger';
import { Survey } from '../entities/survey.entity';

export class ModifySurveyDto extends PickType(Survey, ['views']) {}
