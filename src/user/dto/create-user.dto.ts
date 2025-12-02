import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @IsString()
    @MinLength(6, {  message: 'O mínimo de carateres é 6' })
    password: string;
}