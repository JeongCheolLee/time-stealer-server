import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { BooleanSurvey } from '../entities/boolean-survey.entity';
import { Pagination } from 'src/common/decorators/pagination-query.decorator';
import { FindBooleanSurveyListDto } from '../dto/find-boolean-survey-list.dto';
import { commonConstants } from 'src/common/constants/common.constants';
import { constants } from '../boolean-survey.constants';

@Injectable()
export class BooleanSurveyRepository extends Repository<BooleanSurvey> {
  async findBooleanSurveyList(
    findBooleanSurveyListDto: FindBooleanSurveyListDto,
    pagination?: Pagination,
    transactionManager?: EntityManager,
  ) {
    let query: SelectQueryBuilder<BooleanSurvey>;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(
        BooleanSurvey,
        'booleanSurvey',
      );
    } else {
      query = this.createQueryBuilder('booleanSurvey');
    }

    const { surveyName } = findBooleanSurveyListDto;

    if (!surveyName) {
      throw new BadRequestException(
        constants.errorMessages.INVALID_SURVEY_NAME,
      );
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
      throw new NotFoundException();
    }

    return { list, count };
  }
}
