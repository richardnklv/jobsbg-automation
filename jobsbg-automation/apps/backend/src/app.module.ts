import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CvModule } from './cv/cv.module';
import { JobPostModule } from './job-post/job-post.module';
import { MatchingModule } from './matching/matching.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_DB_HOST || 'aws-1-eu-central-1.pooler.supabase.com',
      port: process.env.SUPABASE_DB_PORT ? parseInt(process.env.SUPABASE_DB_PORT) : 5432,
      username: process.env.SUPABASE_DB_USERNAME || 'postgres.mdvphyumudwpnvnhlsqa',
      password: process.env.SUPABASE_DB_PASSWORD || 'vhrPAvNVuLTUFNCF',
      database: process.env.SUPABASE_DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      ssl: { rejectUnauthorized: false }, // Required for Supabase
    }),
  AuthModule,
  CvModule,
  JobPostModule,
  MatchingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
