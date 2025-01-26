import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async processImg(imgBuffer: Buffer): Promise<string> {
    const { data: { text } } = await Tesseract.recognize(imgBuffer)
    return text;
  }
}
