import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import config from "./config";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        dialect: "postgres",
        host: ConfigService.get("db_host"),
        port: ConfigService.get<number>("db_port"),
        username: ConfigService.get("db_user"),
        password: ConfigService.get("db_pass"),
        database: ConfigService.get("db_name"),
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
