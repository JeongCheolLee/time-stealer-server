import { ApiProperty } from '@nestjs/swagger';
import { CoreSoftEntity } from 'src/common/entities/core-soft.entity';
import { Survey } from 'src/domain/survey/entities/survey.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index(['survey'], { unique: false })
@Index(['survey', 'surveyResultCode'], { unique: true })
@Entity({ name: 'BooleanSurveyResult' })
export class BooleanSurveyResult extends CoreSoftEntity {
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
    description: '결과 코드',
    example: 'INTP',
    required: true,
  })
  @Column({
    comment: '결과 코드',
    type: 'varchar',
    nullable: false,
    length: 30,
  })
  surveyResultCode: string;

  @ApiProperty({
    description: '답변 json',
    example: { code: '금사빠', personality: '사랑에 쉽게 빠짐' },
    required: true,
  })
  @Column({
    comment: '답변 json',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  @Column({ type: 'jsonb', nullable: false })
  surveyResult: string;
}
