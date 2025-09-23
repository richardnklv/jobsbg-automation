import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cv')
export class CV {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  candidate_id: string;

  @Column('text', { nullable: true })
  file_url: string;
}