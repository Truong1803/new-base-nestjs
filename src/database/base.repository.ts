import {
  Attributes,
  BulkCreateOptions,
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  UpdateOptions,
} from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';
import { FIRST_PAGE, LIMIT_PAGE } from 'src/constants';

import { IPaginationRes } from '../interfaces';

export class BaseRepository<T extends Model> {
  constructor(readonly model: Repository<T>) {}

  async find(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(options?: FindOptions<T>): Promise<T> {
    return this.model.findOne(options);
  }

  async paginate(
    findAndCountOptions?: FindAndCountOptions<T>,
    page = FIRST_PAGE,
    limit = LIMIT_PAGE,
  ): Promise<IPaginationRes<T>> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.rawPaginate({
      ...findAndCountOptions,
      offset,
      limit,
    });
    return {
      items: rows,
      total: count,
      page,
      limit,
    } as IPaginationRes<T>;
  }

  async rawPaginate(options: FindAndCountOptions): Promise<{
    rows: T[];
    count: number;
  }> {
    return await this.model.findAndCountAll({
      ...options,
      distinct: true,
    });
  }

  async create(entity: Attributes<T>, options?: CreateOptions<T>): Promise<T> {
    return this.model.create(entity, options);
  }

  async bulkCreate(
    entities: Attributes<T>[],
    options?: BulkCreateOptions<T>,
  ): Promise<T[]> {
    return this.model.bulkCreate(entities, options);
  }

  async update(
    entity: Attributes<T>,
    updateOptions: UpdateOptions<T>,
  ): Promise<T[]> {
    const [, affectedRows] = await this.model.update(entity, {
      ...updateOptions,
      returning: true,
    });
    return affectedRows;
  }

  async delete(
    destroyOptions: DestroyOptions<T>,
    force = true,
  ): Promise<number> {
    return this.model.destroy({
      ...destroyOptions,
      force,
    });
  }

  async raw(query: string): Promise<[unknown[], unknown]> {
    return this.model.sequelize.query(query);
  }

  getModel(): Repository<T> {
    return this.model;
  }
}
