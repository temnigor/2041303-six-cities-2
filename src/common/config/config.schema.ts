import convict from 'convict';
import validators from 'convict-format-with-validator';


convict.addFormats(validators);

export type ConfigSchema = {
    PORT:number;
    SALT:string;
    DB_HOST:string;
};

export const configSchema = convict<ConfigSchema>({
  PORT:{
    doc:'port too incoming connections',
    format:'port',
    env:'PORT',
    default:4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  }
});
