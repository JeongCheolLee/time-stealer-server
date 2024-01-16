import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindBooleanSurveyResultDto } from '../dto/find-boolean-survey-result.dto';
import { BooleanSurveyQuestionService } from './boolean-survey-question.service';
import { constants } from '../boolean-survey.constants';
import { BooleanSurveyResultRepository } from '../repositories/boolean-survey-result.repository';

@Injectable()
export class BooleanSurveyAnswerService {
  constructor(
    private readonly booleanSurveyRepository: BooleanSurveyResultRepository,
    private readonly booleanSurveyQuestionService: BooleanSurveyQuestionService,
  ) {}

  async findBooleanSurveyResult(
    findBooleanSurveyResultDto: FindBooleanSurveyResultDto,
  ) {
    const surveyId = findBooleanSurveyResultDto.surveyId;
    const surveyQuestionList =
      await this.booleanSurveyQuestionService.findBooleanSurveyQuestionList({
        surveyId: surveyId,
      });

    const answers = findBooleanSurveyResultDto.answers;

    // STEP1. 모든 질문에 응답되었는지 검증
    if (surveyQuestionList.count !== answers.length) {
      throw new BadRequestException(
        constants.errorMessages.EVERY_QUESTION_SHOULD_BE_ANSWERED,
      );
    }

    // STEP2. 응답한 질문이 해당 설문에 존재하는 질문인지 검증 및 질문 객체 answers에 매핑
    for (const answer of answers) {
      const found = surveyQuestionList.list.find((e) => e.id === answer.id);

      if (!found) {
        throw new BadRequestException(
          constants.errorMessages.INVALID_QUESTION_ID,
        );
      } else {
        answer.question = found;
      }
    }

    // STEP3. 결과 자릿수별 결과 확인
    let resultCode = '';
    const maxResultPlace = answers.sort(function (a, b) {
      return b.question.resultPlace - a.question.resultPlace;
    })[0].question.resultPlace;

    for (let i = 1; i <= maxResultPlace; i++) {
      const filtered = answers.filter((e) => e.question.resultPlace === i);

      const trueCount = filtered.filter((e) => e.response === true).length;
      const falseCount = filtered.filter((e) => e.response === false).length;

      if (trueCount > falseCount) {
        resultCode += 'O';
      } else {
        resultCode += 'X';
      }
    }

    if (resultCode === '') {
      throw new InternalServerErrorException(
        constants.errorMessages.CAN_NOT_GET_RESULT,
      );
    }

    const surveyResult =
      await this.booleanSurveyRepository.findBooleanSurveyResult(
        findBooleanSurveyResultDto.surveyId,
        resultCode,
      );

    return surveyResult;
  }
}
