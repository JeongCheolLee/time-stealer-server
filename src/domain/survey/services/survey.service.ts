import { Injectable } from '@nestjs/common';
import { SurveyRepository } from '../repositories/survey.repository';
import { FindSurveyDto } from '../dtos/find-survey.dto';
import { EntityManager } from 'typeorm';
import { FindSurveyListDto } from '../dtos/find-survey-list.dto';
import { Pagination } from 'src/common/decorators/pagination-query.decorator';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async findSurvey(
    findSurveyDto: FindSurveyDto,
    transactionManager?: EntityManager,
  ) {
    return await this.surveyRepository.findSurvey(
      findSurveyDto,
      transactionManager,
    );
  }

  async findSurveyList(
    findSurveyListDto: FindSurveyListDto,
    pagination?: Pagination,
    transactionManager?: EntityManager,
  ) {
    return await this.surveyRepository.findSurveyList(
      findSurveyListDto,
      pagination,
      transactionManager,
    );
  }
}
