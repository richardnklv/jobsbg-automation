import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cv')
export class CV {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  candidate_id: string;

  @Column('jsonb')
  skill_experience: Record<string, number>;

  @Column('text')
  education: string;

  @Column('vector', { length: 1536 })
  embedding: number[];
}