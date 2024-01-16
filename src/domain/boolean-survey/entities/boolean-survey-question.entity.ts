import { ApiProperty } from '@nestjs/swagger';
import { CoreSoftEntity } from 'src/common/entities/core-soft.entity';
import { Survey } from 'src/domain/survey/entities/survey.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index(['survey'], { unique: false })
@Entity({ name: 'BooleanSurveyQuestions' })
export class BooleanSurveyQuestion extends CoreSoftEntity {
  @ApiProperty({
    description: '설문 타입',
    example: '간단 성격 검사',
    required: true,
  })
  @ManyToOne(() => Survey, (survey) => survey.id, {
    nullable: false,
  })
  @JoinColumn()
  survey: Survey;

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

  @ApiProperty({
    description: '결과의 자릿수, 1이라면 XXXX 결과의 첫번째',
    example: 1,
    required: false,
  })
  @Column({
    comment: '결과의 자릿수',
    type: 'int4',
    nullable: true,
  })
  resultPlace: number;

  @ApiProperty({
    description: '질문 이미지',
    example: 'https://sample.image.co.kr',
    required: true,
  })
  @Column({
    comment: '질문 이미지',
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  questionImage: string;
}
