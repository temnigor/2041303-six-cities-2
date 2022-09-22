import EventEmitter from 'events';
import { createReadStream} from 'fs';
import { FileReaderInterface } from '../file-reader/file-reader.interface.js';

export default class TSVReader extends EventEmitter implements FileReaderInterface  {

  constructor (public fileName: string) {
    super();
  }

  public async read():Promise<void> {
    const stream = createReadStream(this.fileName, {
      highWaterMark: 16384,
      encoding: 'utf-8'
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importLineCount = 0;

    for await ( const chang of stream){
      lineRead+= chang.toString();
      while((endLinePosition = (lineRead.indexOf('\n')))>=0){
        const completeRow = lineRead.slice(0, endLinePosition+1);
        lineRead = lineRead.slice(++endLinePosition);
        importLineCount++;
        this.emit('line', completeRow);
      }
    }
    this.emit('end', importLineCount);
  }
}
