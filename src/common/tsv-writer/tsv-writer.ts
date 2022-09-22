import { createWriteStream, WriteStream } from 'fs';
import { TSVWriterInterface } from './tsv-writer.interface.js';

export default class TSVWriter implements TSVWriterInterface {

  private stream:WriteStream;

  constructor(public readonly fileName:string) {
    this.stream = createWriteStream(this.fileName, {
      flags:'w',
      encoding:'utf-8',
      highWaterMark:64,
      autoClose:true,
    });
  }

  public write(row: string): Promise<void> {
    console.log(!this.stream.write(`${row}\n`));
    if(!this.stream.write(`${row}\n`)) {
      return new Promise ((resolve)=>{
        this.stream.once('drain', ()=>resolve());
      });
    }
    return Promise.resolve();

  }

}
