import {
  EntityManager,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../entities/survey.entity';
import { FindSurveyDto } from '../dtos/find-survey.dto';
import { constants } from '../survey.constants';
import { Pagination } from 'src/common/decorators/pagination-query.decorator';
import { commonConstants } from 'src/common/constants/common.constants';
import { FindSurveyListDto } from '../dtos/find-survey-list.dto';
import { ModifySurveyDto } from '../dtos/modify-survey.dto';

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

  async findSurveyList(
    findSurveyListDto: FindSurveyListDto,
    pagination?: Pagination,
    transactionManager?: EntityManager,
  ) {
    let query: SelectQueryBuilder<Survey>;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(Survey, 'survey');
    } else {
      query = this.surveyRepository.createQueryBuilder('survey');
    }

    const { surveyName } = findSurveyListDto;

    if (surveyName) {
      query.andWhere('survey.surveyName ILIKE :surveyName', {
        surveyName: `%${surveyName}%`,
      });
    }

    let page = commonConstants.defaultQuery.PAGE;
    let pageSize = commonConstants.defaultQuery.PAGE_SIZE;

    if (pagination) {
      page = pagination.page || page;
      pageSize = pagination.pageSize || pageSize;
    }

    query.take(pageSize);
    query.skip(pageSize * (page - 1));

    const [list, count] = await query.getManyAndCount();

    if (!list || list.length < 1 || count < 1) {
      throw new NotFoundException(constants.errorMessages.SURVEY_NOT_FOUND);
    }

    return { list, count };
  }

  async updateSurvey(
    id: number,
    modifySurveyDto: ModifySurveyDto,
    transactionManager?: EntityManager,
  ) {
    try {
      let result: UpdateResult;
      if (transactionManager) {
        result = await transactionManager.update(Survey, id, modifySurveyDto);
      } else {
        result = await this.surveyRepository.update(id, modifySurveyDto);
      }

      return result;
    } catch (e) {
      const props = constants.props;
      const errorMessages = constants.errorMessages;

      switch (e.constraint) {
        default:
          throw e;
      }
    }
  }
}
