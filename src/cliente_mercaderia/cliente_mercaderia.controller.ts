import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClienteMercaderiaService } from './cliente_mercaderia.service';

import { ClienteMercaderia } from './entities/cliente_mercaderia.entity'; // Asegúrate de tener la ruta correcta

@Controller('cliente_mercaderia')
export class ClienteMercaderiaController {
  constructor(
    private readonly clienteMercaderiaService: ClienteMercaderiaService,
  ) {}

  @Post()
  async create(
    @Body('ClienteID') clienteID: number,
    @Body('codigo') codigo: string,
    @Body('fecha') fecha: Date,
  ): Promise<ClienteMercaderia> {
    return this.clienteMercaderiaService.create(clienteID, codigo, fecha);
  }

  @Get()
  findAll() {
    return this.clienteMercaderiaService.findAll();
  }

  @Get('mercaderias/:ClienteID')
  async getMercaderiasPorClienteID(@Param('ClienteID') clienteID: number) {
    return this.clienteMercaderiaService.getMercaderiasPorClienteID(clienteID);
  }

  @Get(':clienteID/ids')
  async getIdsClienteMercaderia(
    @Param('clienteID') clienteID: number,
  ): Promise<number[]> {
    return this.clienteMercaderiaService.getIdsClienteMercaderiaPorClienteID(
      clienteID,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clienteMercaderiaService.remove(+id);
  }
}
