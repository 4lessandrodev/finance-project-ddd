import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
	  MongooseModule.forRoot("mongodb://localhost/fiance_api")
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
