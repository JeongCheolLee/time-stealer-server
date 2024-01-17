import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BooleanSurveyQuestionService as BooleanSurveyQuestionService } from '../services/boolean-survey-question.service';
import { FindBooleanSurveyQuestionListDto } from '../dto/find-boolean-survey-question-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { BooleanSurveyQuestionDto } from '../dto/boolean-survey-question.dto';
import { ApiDoc } from 'src/common/decorators/api-doc.decorator';
import { ListResponse } from 'src/common/dtos/list-response.dto';
import { BooleanSurveyResultDto } from '../dto/boolean-survey-result.dto';
import { FindBooleanSurveyResultDto } from '../dto/find-boolean-survey-result.dto';
import { BooleanSurveyAnswerService } from '../services/boolean-survey-answer.service';
import { ObjectResponse } from 'src/common/dtos/object-response.dto';
import { FindBooleanSurveyResultByIdAndCodeDto } from '../dto/find-boolean-survey-result-by-id-and-code.dto';

@ApiTags('설문 질문')
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

@ApiTags('설문 결과')
@Controller('boolean-survey')
export class BooleanSurveyAnswerController {
  constructor(
    private readonly booleanSurveyAnswerService: BooleanSurveyAnswerService,
  ) {}

  @ApiDoc({
    summary: '설문의 결과를 id와 code로 조회합니다.',
    responseModel: BooleanSurveyResultDto,
  })
  @Get('result')
  async findBooleanSurveyResultByCode(
    @Query()
    findBooleanSurveyResultByIdAndCodeDto: FindBooleanSurveyResultByIdAndCodeDto,
  ) {
    const result =
      await this.booleanSurveyAnswerService.findBooleanSurveyResultByServiceIdAndCode(
        findBooleanSurveyResultByIdAndCodeDto.surveyId,
        findBooleanSurveyResultByIdAndCodeDto.surveyResultCode,
      );

    return new ObjectResponse(result);
  }

  @ApiDoc({
    summary: '설문의 결과를 조회합니다.',
    responseModel: BooleanSurveyResultDto,
  })
  @Post('result')
  async findBooleanSurveyResult(
    @Body() findBooleanSurveyResultDto: FindBooleanSurveyResultDto,
  ) {
    const result =
      await this.booleanSurveyAnswerService.findBooleanSurveyResult(
        findBooleanSurveyResultDto,
      );

    return new ObjectResponse(result);
  }
}
