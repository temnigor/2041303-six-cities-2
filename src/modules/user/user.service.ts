import { DocumentType } from '@typegoose/typegoose';
import {types} from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { Component } from '../../type/component-type.js';
import createUserDto from './create-user.dto';
import { UserServiceInterface } from './user-service.interface';
import { UserEntity} from './user.entity';

@injectable()

export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger:LoggerInterface,
    @inject(Component.UserModel) private userModel:types.ModelType<UserEntity>
  ) {}

  public async create(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity, BeAnObject>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user create ${user.name}`);
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity > | null > {
    return this.userModel.findOne({email});
  }

  public async findUserById(userId: string): Promise<DocumentType<UserEntity, types.BeAnObject> | null> {
    return this.userModel.findById(userId).exec();
  }

  public async findOrCreate(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity, types.BeAnObject>> {
    const existUser = await this.findByEmail(dto.email);

    if(existUser) {
      return existUser;
    }

    return this.create(dto, salt);
  }
}
