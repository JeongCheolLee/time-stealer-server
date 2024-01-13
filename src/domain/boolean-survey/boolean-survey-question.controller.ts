import { Controller, Get, Query } from '@nestjs/common';
import { BooleanSurveyQuestionService as BooleanSurveyQuestionService } from './services/boolean-survey-question.service';
import { FindBooleanSurveyQuestionListDto } from './dto/find-boolean-survey-question-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('boolean-survey')
@Controller('boolean-survey')
export class BooleanSurveyQuestionController {
  constructor(
    private readonly booleanSurveyQuestionService: BooleanSurveyQuestionService,
  ) {}

  @Get('questions')
  async findBooleanSurveyQuestionList(
    @Query() findBooleanSurveyListDto: FindBooleanSurveyQuestionListDto,
  ) {
    return await this.booleanSurveyQuestionService.findBooleanSurveyQuestionList(
      findBooleanSurveyListDto,
    );
  }
}

@ApiTags('boolean-survey')
@Controller('boolean-survey')
export class BooleanSurveyAnswerController {
  constructor(
    private readonly booleanSurveyQuestionService: BooleanSurveyQuestionService,
  ) {}

  @Get('answer')
  async findBooleanSurveyQuestionList(
    @Query() findBooleanSurveyListDto: FindBooleanSurveyQuestionListDto,
  ) {
    return await this.booleanSurveyQuestionService.findBooleanSurveyQuestionList(
      findBooleanSurveyListDto,
    );
  }
}
