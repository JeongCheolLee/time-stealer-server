import { Injectable } from '@nestjs/common';
import { BooleanSurveyQuestionRepository } from '../repositories/boolean-survey-question.repository';
import { FindBooleanSurveyQuestionListDto } from '../dto/find-boolean-survey-question-list.dto';

@Injectable()
export class BooleanSurveyQuestionService {
  constructor(
    private readonly booleanSurveyRepository: BooleanSurveyQuestionRepository,
  ) {}

  async findBooleanSurveyQuestionList(
    findBooleanSurveyListDto: FindBooleanSurveyQuestionListDto,
  ) {
    return await this.booleanSurveyRepository.findBooleanSurveyQuestionList(
      findBooleanSurveyListDto,
    );
  }
}
