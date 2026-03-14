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

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

##### npm run start:dev
![](/public/Img/hooksoutput1.png)

##### ctrl+c
![](/public/Img/hooksoutput2.png)


NestJS এ Lifecycle Hooks হলো এমন কিছু method যেগুলো application বা module এর বিভিন্ন stage এ automatically run হয়।

অর্থাৎ NestJS app যখন start হয়, module load হয়, destroy হয়, তখন কিছু নির্দিষ্ট method automatically execute হয় — এগুলোকেই Lifecycle Hooks বলা হয়।

সহজভাবে:

```
Application Start
      ↓
Module Initialize
      ↓
Application Ready
      ↓
Application Shutdown
```

এই প্রতিটি stage এ NestJS কিছু hooks provide করে।

---

#### NestJS Lifecycle Hooks গুলো

NestJS এ প্রধান কয়েকটি lifecycle hook আছে:

-  `OnModuleInit`
-  `OnApplicationBootstrap`
-  `OnModuleDestroy`
-  `BeforeApplicationShutdown`
-  `OnApplicationShutdown`

---

#### OnModuleInit

যখন module initialize হয়, তখন এই hook run হয়।

##### Example

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserService implements OnModuleInit {

  onModuleInit() {
    console.log('Module initialized');
  }

}
```

#### কখন ব্যবহার হয়

- Database connection check
- Initial data load
- Cache warmup

---

#### OnApplicationBootstrap

যখন সব module load হয়ে যায় এবং application start হতে যাচ্ছে, তখন run হয়।

##### Example

```ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  onApplicationBootstrap() {
    console.log('Application fully started');
  }

}
```

---

#### OnModuleDestroy

যখন module destroy হয়, তখন run হয়।

##### Example

```ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class UserService implements OnModuleDestroy {

  onModuleDestroy() {
    console.log('Module destroyed');
  }

}
```

---

#### BeforeApplicationShutdown

Application shutdown হওয়ার ঠিক আগে run হয়।

##### Example

```ts
import { Injectable, BeforeApplicationShutdown } from '@nestjs/common';

@Injectable()
export class AppService implements BeforeApplicationShutdown {

  beforeApplicationShutdown() {
    console.log('App shutting down...');
  }

}
```

---

#### OnApplicationShutdown

Application পুরোপুরি shutdown হওয়ার সময় run হয়।

```ts
import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationShutdown {

  onApplicationShutdown() {
    console.log('Application shutdown');
  }

}
```

---

#### Lifecycle Flow

NestJS app এর lifecycle সাধারণত এমন হয়:

```
App Start
   ↓
onModuleInit()
   ↓
onApplicationBootstrap()
   ↓
Application Running
   ↓
onModuleDestroy()
   ↓
beforeApplicationShutdown()
   ↓
onApplicationShutdown()
```

---

#### Real Project Example

ধরো তুমি Prisma database use করছো।

App start হলে database connect করবে:

```ts
async onModuleInit() {
  await this.prisma.$connect();
}
```

App shutdown হলে database disconnect করবে:

```ts
async onApplicationShutdown() {
  await this.prisma.$disconnect();
}
```

---