import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todos } from './todos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
  ) {}

  async getList() {
    return await this.todosRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async getDetail(id) {
    return await this.todosRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async create(createData) {
    const newItem = this.todosRepository.create(createData);
    await this.todosRepository.save(newItem);

    return true;
  }

  async update(id, updateData) {
    const todo = await this.getDetail(id);

    if (!todo) {
      throw new HttpException('item not found', HttpStatus.NOT_FOUND);
    }

    await this.todosRepository.update(todo.id, updateData);
    return this.getDetail(todo.id);
  }

  async delete(id) {
    const todo = await this.getDetail(id);

    if (!todo) {
      throw new HttpException('item not found', HttpStatus.NOT_FOUND);
    }

    await this.todosRepository.update(todo.id, { isDeleted: true });

    return true;
  }
}
