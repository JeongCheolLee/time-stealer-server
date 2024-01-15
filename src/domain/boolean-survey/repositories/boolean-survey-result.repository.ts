import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundException, Injectable } from '@nestjs/common';
import { constants } from '../boolean-survey.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { BooleanSurveyResult } from '../entities/boolean-survey-result.entity';

@Injectable()
export class BooleanSurveyResultRepository {
  constructor(
    @InjectRepository(BooleanSurveyResult)
    private booleanSurveyResultRepository: Repository<BooleanSurveyResult>,
  ) {}

  async findBooleanSurveyResult(
    surveyId: number,
    surveyResultCode: string,
    transactionManager?: EntityManager,
  ) {
    let query: SelectQueryBuilder<BooleanSurveyResult>;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(
        BooleanSurveyResult,
        'booleanSurveyResult',
      );
    } else {
      query = this.booleanSurveyResultRepository.createQueryBuilder(
        'booleanSurveyResult',
      );
    }

    query.andWhere('booleanSurveyResult.surveyId = :surveyId', {
      surveyId,
    });

    query.andWhere('booleanSurveyResult.surveyResultCode = :surveyResultCode', {
      surveyResultCode,
    });

    const result = await query.getOne();

    if (!result) {
      throw new NotFoundException(constants.errorMessages.CAN_NOT_GET_RESULT);
    }

    return result;
  }
}
