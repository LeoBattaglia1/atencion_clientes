import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CajaDto } from './dto/caja.dto';
import { Caja } from './entities/caja.entity';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
  ) {}

  async create(cajaDto: CajaDto): Promise<CajaDto> {
    try {
      // Verificar si ya existe una entrada en la caja para la fecha actual
      const existingEntry = await this.cajaRepository.findOne({
        where: { fecha: cajaDto.fecha },
      });

      if (existingEntry) {
        // Si ya existe una entrada para la fecha actual, lanzar una excepción NotFoundException
        throw new NotFoundException(
          'Ya existe una entrada en la caja para la fecha actual.',
        );
      }

      // Continuar con la creación normal si no hay una entrada existente
      const caja = this.cajaRepository.create(cajaDto);
      await this.cajaRepository.save(caja);
      return caja;
    } catch (error) {
      // Manejar cualquier otro error
      throw new Error(`Error al crear la entrada en la caja: ${error.message}`);
    }
  }

  async update(id: number, cajaDto: CajaDto): Promise<CajaDto> {
    try {
      const caja = await this.cajaRepository.findOne({ where: { id: id } });

      if (!caja) {
        throw new NotFoundException(`Caja con ID ${id} no encontrada`);
      }

      // Actualiza solo la propiedad 'caja'
      await this.cajaRepository
        .createQueryBuilder()
        .update(Caja)
        .set({ caja: cajaDto.caja })
        .where('id = :id', { id: id })
        .execute();

      // Cargar el caja actualizado para devolverlo
      const cajaActualizado = await this.cajaRepository.findOne({
        where: { id: id },
      });

      if (!cajaActualizado) {
        throw new NotFoundException(
          `Caja con ID ${id} no encontrado después de la actualización`,
        );
      }

      return {
        id: cajaActualizado.id,
        fecha: cajaActualizado.fecha,
        caja: cajaActualizado.caja,
      };
    } catch (error) {
      throw new Error(`Error al actualizar la caja: ${error.message}`);
    }
  }

  async findAll(): Promise<CajaDto[]> {
    return this.cajaRepository.find();
  }

  async findOne(id: number): Promise<CajaDto> {
    const caja = await this.cajaRepository.findOne({
      where: { id: id },
    });

    if (!caja) {
      throw new NotFoundException(`caja con ID ${id} no encontrado`);
    }

    return caja as CajaDto;
  }

  async remove(id: number): Promise<boolean> {
    const caja = await this.cajaRepository.findOne({
      where: { id: id },
    });

    if (!caja) {
      throw new NotFoundException(`caja con ID ${id} no encontrado`);
    }

    await this.cajaRepository.remove(caja);
    return true;
  }
}
