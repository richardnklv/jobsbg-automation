import { Module } from '@nestjs/common';
import { MatchingController } from './api/matching.controller';

@Module({
  controllers: [MatchingController],
  providers: [],
})
export class MatchingModule {}
