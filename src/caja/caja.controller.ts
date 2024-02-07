import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaDto } from './dto/caja.dto';

@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @Post()
  async create(@Body() cajaDto: CajaDto): Promise<CajaDto> {
    return await this.cajaService.create(cajaDto);
  }

  @Get()
  async findAll(): Promise<CajaDto[]> {
    return this.cajaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CajaDto> {
    return await this.cajaService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, // Cambiado a string
    @Body() cajaDto: CajaDto,
  ): Promise<CajaDto> {
    return await this.cajaService.update(+id, cajaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.cajaService.remove(+id);
  }
}
