import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './create-user.dto';
import { UserEntity } from './user.entity';

export interface UserServiceInterface {

create(dto:CreateUserDto, salt:string):Promise<DocumentType<UserEntity>>;

findByEmail(email:string):Promise<DocumentType<UserEntity> | null> ;

findUserById(userId:string):Promise<DocumentType<UserEntity> | null> ;

findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

}
