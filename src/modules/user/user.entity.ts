import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { User } from '../../type/user-data-type.js';
import { createSHA256 } from '../../utils/common.js';


const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions:{
    collection:'user'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor( data:User ) {
    super();
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.userType = data.userType;
    this.avatarImg = data.avatarImg;
  }

  @prop({required: true, default: ''})
  public name!:string;

  @prop({required: true, default: ''})
  public surname!:string;

  @prop({ unique: true, required: true})
  public email!:string;

  @prop({required: true, default: ''})
  private password!:string;

  public setPassword (password:string, salt:string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword (){
    return this.password;
  }

  @prop({required: true, default: ''})
  public userType!:boolean;

  @prop({required: true, default: ''})
  public avatarImg!:string;
}

export const UserModel = getModelForClass(UserEntity);
