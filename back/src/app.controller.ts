import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('geoData')
  getGeoData(@Query('page') page?: number, @Query('size') size?: number) {
    return this.appService.getData(page, size);
  }
}
