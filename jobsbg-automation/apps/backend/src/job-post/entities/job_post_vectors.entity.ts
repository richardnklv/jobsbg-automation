import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobPost } from './job_post.entity';

@Entity('job_post_vectors')
export class JobPostVector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  job_id: string;

  @ManyToOne(() => JobPost)
  @JoinColumn({ name: 'job_id' })
  job: JobPost;

  @Column('int')
  vector_index: number;

  // Project currently stores embeddings as simple-array (text) like cv_vectors.
  // If you migrate to pgvector, create the column via SQL and use raw queries or a custom transformer.
  @Column('simple-array')
  embedding: number[];
}
