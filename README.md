## Life Cycle Hooks

```bash
# create service
$ nest g service database
# create controller
$ nest g controller database
```

##### Note: life cycle method start hoi on diye jemon onModuleInit, onApplicationShutdown etc.

```bash
# database.service.ts
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {

    private isConnected = false;

    onModuleInit() {
        this.isConnected = true;
        console.log('Database Connected!');
    }

    onApplicationShutdown(signal: string) {
        this.isConnected = false;
        console.log('Database Disconnected! signal: ${signal}');
    }

    getStatus(){
        return this.isConnected ? 'Connected':'Disconnected';
    }

}
```

##### Note: main.ts e add koro app.enableShutdownHooks();

```bash
# main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks();
}
bootstrap();
```

##### npm run start:dev
![](/public/Img/hooksoutput1.png)

##### ctrl+c
![](/public/Img/hooksoutput2.png)