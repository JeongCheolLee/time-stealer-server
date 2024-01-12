import { Injectable } from '@nestjs/common';
import { BooleanSurveyRepository } from '../repositories/boolean-survey.repository';
import { FindBooleanSurveyListDto } from '../dto/find-boolean-survey-list.dto';

@Injectable()
export class BooleanSurveyService {
  constructor(
    private readonly booleanSurveyRepository: BooleanSurveyRepository,
  ) {}

  async findBooleanSurveyList(
    findBooleanSurveyListDto: FindBooleanSurveyListDto,
  ) {
    return await this.booleanSurveyRepository.findBooleanSurveyList(
      findBooleanSurveyListDto,
    );
  }
}
