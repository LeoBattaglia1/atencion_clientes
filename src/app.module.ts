import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static'; // Importa ServeStaticModule
import { join } from 'path'; // Importa join para construir la ruta al directorio public
import { MercaderiaModule } from './mercaderia/mercaderia.module';
import { ClientesModule } from './clientes/clientes.module';
import { ClienteMercaderiaModule } from './cliente_mercaderia/cliente_mercaderia.module';
import { CajaModule } from './caja/caja.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.18.215',
      port: 3306,
      username: 'root2',
      password: 'root',
      database: 'cobrodigital',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MercaderiaModule,
    ClientesModule,
    ClienteMercaderiaModule,
    CajaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta al directorio public
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
