import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateRestaurantDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString()
    name: string;
    
    @IsNotEmpty({ message: 'Endereço é obrigatório' })
    @IsString()
    address: string;
    
    @IsNumber()
    @Min(-90, { message: 'Latitude mínima é: -90' })
    @Max(90, { message: 'Latitude máxima é: 90' })
    latitude: number;
    
    @IsNumber()
    @Min(-180, { message: 'Longitude mínima é: -180' })
    @Max(180, { message: 'Longitude máxima é: 180' })
    longitude: number;
}