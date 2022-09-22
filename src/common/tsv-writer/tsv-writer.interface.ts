export interface TSVWriterInterface {
  fileName:string;
  write(row:string):void;
}
