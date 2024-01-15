import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BooleanSurveyQuestionService as BooleanSurveyQuestionService } from './services/boolean-survey-question.service';
import { FindBooleanSurveyQuestionListDto } from './dto/find-boolean-survey-question-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { BooleanSurveyQuestionDto } from './dto/boolean-survey-question.dto';
import { ApiDoc } from 'src/common/decorators/api-doc.decorator';
import { ListResponse } from 'src/common/dtos/list-response.dto';
import { BooleanSurveyResultDto } from './dto/boolean-survey-result.dto';
import { FindBooleanSurveyResultDto } from './dto/find-boolean-survey-result.dto';

@ApiTags('boolean-survey')
@Controller('boolean-survey')
export class BooleanSurveyQuestionController {
  constructor(
    private readonly booleanSurveyQuestionService: BooleanSurveyQuestionService,
  ) {}

  @ApiDoc({
    summary: '질문 목록을 조회합니다.',
    responseModel: BooleanSurveyQuestionDto,
    isArrayResponse: true,
  })
  @Get('questions')
  async findBooleanSurveyQuestionList(
    @Query() findBooleanSurveyListDto: FindBooleanSurveyQuestionListDto,
  ) {
    const { list, count } =
      await this.booleanSurveyQuestionService.findBooleanSurveyQuestionList(
        findBooleanSurveyListDto,
      );

    return new ListResponse(list, count);
  }
}

@ApiTags('boolean-survey')
@Controller('boolean-survey')
export class BooleanSurveyAnswerController {
  constructor(
    private readonly booleanSurveyQuestionService: BooleanSurveyQuestionService,
  ) {}

  @ApiDoc({
    summary: '설문의 결과를 조회합니다.',
    responseModel: BooleanSurveyResultDto,
  })
  @Post('answer')
  async findBooleanSurveyQuestionList(
    @Body() findBooleanSurveyResultDto: FindBooleanSurveyResultDto,
  ) {
    return true;
  }
}
