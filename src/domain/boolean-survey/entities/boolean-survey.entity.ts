import { ApiProperty } from '@nestjs/swagger';
import { CoreSoftEntity } from 'src/common/entities/core-soft.entity';
import { Column, Entity, Index } from 'typeorm';
import { constants } from '../boolean-survey.constants';

@Index(constants.props.UNIQUE_BOOLEAN_SURVEY_NAME, ['surveyName'], {
  unique: true,
})
@Entity({ name: 'BooleanSurvey' })
export class BooleanSurvey extends CoreSoftEntity {
  @ApiProperty({
    description: '설문 타입',
    example: '간단 성격 검사',
    required: true,
  })
  @Column({
    comment: '설문 타입',
    type: 'varchar',
    nullable: false,
    length: 30,
  })
  surveyName: string;

  @ApiProperty({
    description: '질문',
    example: '당신은 멋쟁이입니까?',
    required: true,
  })
  @Column({
    comment: '질문',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  question: string;

  @ApiProperty({
    description: '긍정에 해당하는 답변',
    example: '네! 저는 멋쟁이입니다!',
    required: true,
  })
  @Column({
    comment: '긍정에 해당하는 답변',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  positiveAnswer: string;

  @ApiProperty({
    description: '부정에 해당하는 답변',
    example: '아..그렇진 않은 것 같아요..',
    required: true,
  })
  @Column({
    comment: '부정에 해당하는 답변',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  negativeAnswer: string;
}
