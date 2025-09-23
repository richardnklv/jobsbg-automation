import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_post')
export class JobPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  recruiter_id: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  requirements: string;

  @Column('text', { nullable: true })
  offer: string;

  @Column('timestamp', { nullable: true })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  end_date: Date;
}
