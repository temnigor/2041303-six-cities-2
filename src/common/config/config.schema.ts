import convict from 'convict';
import validators from 'convict-format-with-validator';


convict.addFormats(validators);

export type ConfigSchema = {
    PORT:number;
    SALT:string;
    DB_HOST:string;
    DB_USER:string;
    DB_PASSWORD:string;
    DB_PORT:number;
    DB_NAME:string;
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
  },
  DB_USER:{
    doc:'user name to connect (MongoDB)',
    format: String,
    env:'DB_USER',
    default:null
  },
  DB_PASSWORD:{
    doc:'database password (MongoDB)',
    format:String,
    env:'DB_PASSWORD',
    default:null
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'course-nodejs-restapi'
  }
});
