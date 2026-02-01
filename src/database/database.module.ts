import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

//console.log("MONGO_URI:", process.env.MONGO_URI);
@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI'),
            }),
        }),],

})
export class DatabaseModule { }
