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

  @ApiProperty({
    description: '설문의 썸네일 이미지',
    example: 'https://sample.image.co.kr',
    required: true,
  })
  @Column({
    comment: '설문 타입',
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  surveyThumbnail: string;

  @ApiProperty({
    description: '설문의 설명',
    example: '그냥 저냥..말은 될 겁니다.. 내 성격겁사',
    required: true,
  })
  @Column({
    comment: '설문의 설명',
    type: 'varchar',
    nullable: true,
    length: 200,
  })
  surveyDescription: string;

  @ApiProperty({
    description: '설문 예상 소요시간',
    example: 4,
    required: true,
  })
  @Column({
    comment: '설문 예상 소요시간',
    type: 'int4',
    nullable: false,
  })
  estimatedTime: number;

  @ApiProperty({
    description: '설문조사된 횟수',
    example: 4247182937,
    required: true,
  })
  @Column({
    comment: '설문조사된 횟수',
    type: 'int4',
    nullable: false,
  })
  views: number;
}
