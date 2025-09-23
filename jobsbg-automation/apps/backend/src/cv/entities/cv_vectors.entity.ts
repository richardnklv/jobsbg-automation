import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CV } from './cv.entity';

@Entity('cv_vectors')
export class CVVector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  cv_id: string;

  @ManyToOne(() => CV)
  @JoinColumn({ name: 'cv_id' })
  cv: CV;

  @Column('int')
  vector_index: number;

  @Column('simple-array') // Use simple-array for number arrays in TypeORM
  embedding: number[];
}
