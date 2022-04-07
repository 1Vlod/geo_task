import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
export class GetGeoDataQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  size?: number;
  dateStart?: string;
  dateEnd?: string;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  busId?: number;
}

export class GetMaxSpeedQuery {
  @IsNotEmpty()
  dateStart: string;
  @IsNotEmpty()
  dateEnd: string;
}
