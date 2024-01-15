import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entities/survey.entity';
import { FindSurveyDto } from '../dtos/find-survey.dto';
import { constants } from '../survey.constants';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async findSurvey(
    findSurveyDto: FindSurveyDto,
    transactionManager?: EntityManager,
  ) {
    let query: SelectQueryBuilder<Survey>;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(Survey, 'survey');
    } else {
      query = this.surveyRepository.createQueryBuilder('survey');
    }

    const { id, surveyName } = findSurveyDto;

    if (!id && !surveyName) {
      throw new NotFoundException(constants.errorMessages.SURVEY_NOT_FOUND);
    }

    if (id) {
      query.andWhere('survey.id = :id', {
        id,
      });
    }

    if (surveyName) {
      query.andWhere('survey.surveyName = :surveyName', {
        surveyName,
      });
    }

    const result = await query.getOne();

    if (!result) {
      throw new NotFoundException(constants.errorMessages.SURVEY_NOT_FOUND);
    }

    return result;
  }
}
