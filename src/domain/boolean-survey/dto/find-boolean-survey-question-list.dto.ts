import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Survey } from 'src/domain/survey/entities/survey.entity';

export class FindBooleanSurveyQuestionListDto extends PartialType(
  PickType(Survey, ['surveyName']),
) {
  @ApiProperty({
    description: 'survey id',
    example: 1,
    required: true,
  })
  surveyId: number;
}
