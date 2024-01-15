import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundException, Injectable } from '@nestjs/common';
import { BooleanSurveyQuestion } from '../entities/boolean-survey-question.entity';
import { Pagination } from 'src/common/decorators/pagination-query.decorator';
import { FindBooleanSurveyQuestionListDto } from '../dto/find-boolean-survey-question-list.dto';
import { commonConstants } from 'src/common/constants/common.constants';
import { constants } from '../boolean-survey.constants';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooleanSurveyQuestionRepository {
  constructor(
    @InjectRepository(BooleanSurveyQuestion)
    private booleanSurveyQuestion: Repository<BooleanSurveyQuestion>,
  ) {}

  async findBooleanSurveyQuestionList(
    findBooleanSurveyListDto: FindBooleanSurveyQuestionListDto,
    pagination?: Pagination,
    transactionManager?: EntityManager,
  ) {
    let query: SelectQueryBuilder<BooleanSurveyQuestion>;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(
        BooleanSurveyQuestion,
        'booleanSurvey',
      );
    } else {
      query = this.booleanSurveyQuestion.createQueryBuilder('booleanSurvey');
    }

    query.leftJoin('booleanSurvey.survey', 'survey');

    const { surveyName, surveyId } = findBooleanSurveyListDto;

    if (surveyName) {
      query.andWhere('survey.surveyName = :surveyName', {
        surveyName,
      });
    }

    if (surveyId) {
      query.andWhere('booleanSurvey.surveyId = :surveyId', {
        surveyId,
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
      throw new NotFoundException(constants.errorMessages.INVALID_SURVEY_NAME);
    }

    return { list, count };
  }
}
