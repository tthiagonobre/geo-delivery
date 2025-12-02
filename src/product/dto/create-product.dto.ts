import { IsString, IsNumber, Min, IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'O nome é obrigatório'})
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @MaxLength(200)
    description: string;

    @IsNotEmpty({ message: 'O preço é obrigatório'})
    @IsNumber()
    @Min(0, { message: 'O valor deve ser maior que zero'})
    price: number;

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsNumber()
    restaurantId: number;
}