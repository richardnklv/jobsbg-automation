import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_DB_HOST || 'db.mdvphyumudwpnvnhlsqa.supabase.co',
      port: process.env.SUPABASE_DB_PORT ? parseInt(process.env.SUPABASE_DB_PORT) : 5432,
      username: process.env.SUPABASE_DB_USERNAME || 'postgres',
      password: process.env.SUPABASE_DB_PASSWORD || '',
      database: process.env.SUPABASE_DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      ssl: { rejectUnauthorized: false }, // Required for Supabase
    }),
    AuthModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
