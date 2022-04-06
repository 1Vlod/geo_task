import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetGeoDataQuery } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('geoData/:id?')
  getGeoData(@Query() query: GetGeoDataQuery, @Param('id') id?: string) {
    return this.appService.getData({...query, id});
  }
}
