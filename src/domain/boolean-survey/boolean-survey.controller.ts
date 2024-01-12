import { Controller, Query } from '@nestjs/common';
import { BooleanSurveyService } from './services/boolean-survey.service';
import { FindBooleanSurveyListDto } from './dto/find-boolean-survey-list.dto';

@Controller('boolean-survey')
export class BooleanSurveyController {
  constructor(private readonly booleanSurveyService: BooleanSurveyService) {}

  async findBooleanSurveyList(
    @Query() findBooleanSurveyListDto: FindBooleanSurveyListDto,
  ) {
    return await this.booleanSurveyService.findBooleanSurveyList(
      findBooleanSurveyListDto,
    );
  }
}
