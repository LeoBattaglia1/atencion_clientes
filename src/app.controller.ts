import { Controller, Get } from '@nestjs/common';
import { readFile } from 'fs/promises'; // Importa la función readFile de Node.js
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      // Lee el contenido del archivo index.html
      const content = await readFile(
        __dirname + '/../public/index.html',
        'utf-8',
      );
      return content; // Devuelve el contenido del archivo como respuesta HTTP
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return 'Error al leer el archivo index.html';
    }
  }
}
