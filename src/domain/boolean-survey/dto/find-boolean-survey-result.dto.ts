import { ApiProperty, PickType } from '@nestjs/swagger';
import { FindBooleanSurveyQuestionListDto } from './find-boolean-survey-question-list.dto';

export class FindBooleanSurveyResultDto extends PickType(
  FindBooleanSurveyQuestionListDto,
  ['surveyId'],
) {
  @ApiProperty({
    description: '질문id와 답',
    example: {
      1: true,
      2: false,
      3: true,
      4: false,
      5: false,
      6: true,
      7: true,
      8: false,
      9: true,
      10: false,
      11: false,
      12: true,
    },
    required: true,
  })
  answers: Record<number, boolean>;
}
