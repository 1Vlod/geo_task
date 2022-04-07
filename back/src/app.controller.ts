import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetGeoDataQuery, GetMaxSpeedQuery } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('geoData/:id?')
  getGeoData(@Query() query: GetGeoDataQuery, @Param('id') id?: number) {
    return this.appService.getData({ ...query, id });
  }

  @Get('geoData/speed/:busId')
  getMaxSpeed(
    @Query() query: GetMaxSpeedQuery,
    @Param('busId', ParseIntPipe) busId: number,
  ) {
    return this.appService.getMaxSpeed({ ...query, busId });
  }
}
