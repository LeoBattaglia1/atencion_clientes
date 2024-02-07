import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Caja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  caja: number;

  constructor(fecha: Date, caja: number) {
    this.fecha = fecha;
    this.caja = caja;
  }

  // Getters
  getid(): number {
    return this.id;
  }

  getfecha(): Date {
    return this.fecha;
  }

  getcaja(): number {
    return this.caja;
  }

  // Setters
  setid(id: number): void {
    this.id = id;
  }

  setfecha(fecha: Date): void {
    this.fecha = fecha;
  }

  setcaja(caja: number): void {
    this.caja = caja;
  }
}
