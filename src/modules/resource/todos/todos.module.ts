import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './todos.entity';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  controllers: [],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
