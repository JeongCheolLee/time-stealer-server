import { ApiProperty } from '@nestjs/swagger';
import { CoreSoftEntity } from 'src/common/entities/core-soft.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Survey' })
export class Survey extends CoreSoftEntity {
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
    description: '설문 시작일',
    example: new Date(),
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: false })
  startedAt: Date;

  @ApiProperty({
    description: '설문 종료일',
    example: new Date(),
    required: false,
  })
  @Column({ type: 'timestamptz', nullable: true })
  endedAt: Date;
}
