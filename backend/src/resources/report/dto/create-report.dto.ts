import { IsInt, IsString, IsOptional, IsBoolean, IsDateString, Min, MaxLength, MIN } from 'class-validator';


import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateReportDto {
    @Min(1)
    @IsNotEmpty()
      @IsNumber()
    userId: number;

    @Min(1)
    @IsNotEmpty()
      @IsNumber()
    restaurantId: number;

    @IsString()
    motif: string;

    @IsString()
    description: string;

}