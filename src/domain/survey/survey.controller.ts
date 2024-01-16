import { Controller, Get, Query } from '@nestjs/common';
import { SurveyService } from './services/survey.service';
import { ApiTags } from '@nestjs/swagger';
import { FindSurveyListDto } from './dtos/find-survey-list.dto';
import {
  Pagination,
  PaginationQuery,
} from 'src/common/decorators/pagination-query.decorator';
import { ListResponse } from 'src/common/dtos/list-response.dto';
import { ApiDoc } from 'src/common/decorators/api-doc.decorator';
import { Survey } from './entities/survey.entity';

@ApiTags('설문')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiDoc({
    summary: '설문 리스트를 조회합니다.',
    responseModel: Survey,
  })
  @Get()
  async findSurveyList(
    @Query() findSurveyListDto: FindSurveyListDto,
    @PaginationQuery() pagination?: Pagination,
  ) {
    const { list, count } = await this.surveyService.findSurveyList(
      findSurveyListDto,
      pagination,
    );

    return new ListResponse(list, count);
  }
}
