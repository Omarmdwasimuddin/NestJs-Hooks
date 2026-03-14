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