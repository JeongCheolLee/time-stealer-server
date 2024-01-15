import { Injectable } from '@nestjs/common';
import { SurveyRepository } from '../repositories/survey.repository';
import { FindSurveyDto } from '../dtos/find-survey.dto';
import { EntityManager } from 'typeorm';

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
}
