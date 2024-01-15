import { ApiProperty, PickType } from '@nestjs/swagger';
import { FindBooleanSurveyQuestionListDto } from './find-boolean-survey-question-list.dto';
import { BooleanSurveyQuestionDto } from './boolean-survey-question.dto';

export class BooleanAnswerDto {
  @ApiProperty({
    description: '질문의 id',
    example: 3,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: '질문에 대한 대답',
    example: true,
    required: true,
  })
  response: boolean;

  question?: BooleanSurveyQuestionDto;
}

export class FindBooleanSurveyResultDto extends PickType(
  FindBooleanSurveyQuestionListDto,
  ['surveyId'],
) {
  @ApiProperty({
    description: '질문id와 답',
    required: true,
    type: () => BooleanAnswerDto,
    isArray: true,
  })
  answers: BooleanAnswerDto[];
}
