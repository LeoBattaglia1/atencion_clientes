// cliente-mercaderia.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteMercaderia } from './entities/cliente_mercaderia.entity';

// cliente-mercaderia.service.ts

@Injectable()
export class ClienteMercaderiaService {
  constructor(
    @InjectRepository(ClienteMercaderia)
    private readonly clienteMercaderiaRepository: Repository<ClienteMercaderia>,
  ) {}

  async create(
    clienteID: number,
    codigo: string,
    fecha: Date,
  ): Promise<ClienteMercaderia> {
    const clienteMercaderia = this.clienteMercaderiaRepository.create({
      cliente: { ClienteID: clienteID },
      mercaderia: { codigo: codigo },
      fecha: fecha,
    });

    return await this.clienteMercaderiaRepository.save(clienteMercaderia);
  }

  async findAll(): Promise<ClienteMercaderia[]> {
    return this.clienteMercaderiaRepository.find();
  }

  async getMercaderiasPorClienteID(
    clienteID: number,
  ): Promise<{ Nombre: string; precio: number }[]> {
    const clienteMercaderias = await this.clienteMercaderiaRepository.find({
      where: { cliente: { ClienteID: clienteID } },
      relations: ['mercaderia'],
    });

    return clienteMercaderias.map((clienteMercaderia) => {
      const mercaderia = clienteMercaderia.mercaderia;
      return {
        Nombre: mercaderia?.Nombre || 'Sin nombre',
        precio: mercaderia?.Precio || 0,
        fecha: clienteMercaderia.fecha,
      };
    });
  }

  async getIdsClienteMercaderiaPorClienteID(
    clienteID: number,
  ): Promise<number[]> {
    const clienteMercaderias = await this.clienteMercaderiaRepository.find({
      select: ['id'],
      where: { cliente: { ClienteID: clienteID } },
    });

    return clienteMercaderias.map((clienteMercaderia) => clienteMercaderia.id);
  }

  async remove(id: number): Promise<boolean> {
    const clienteMercaderia = await this.clienteMercaderiaRepository.findOne({
      where: { id },
    });

    if (!clienteMercaderia) {
      throw new NotFoundException(
        `Relación Cliente-Mercaderia con ID ${id} no encontrada`,
      );
    }

    await this.clienteMercaderiaRepository.remove(clienteMercaderia);
    return true;
  }
}
