import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from "@prisma/client";

export class RegisterDto {
    @ApiProperty({ example: 'Mustafo', description: 'Имя пользователя', minLength: 3, maxLength: 20 })
    @IsString({
        message: "ism text bo'lishi kerak"
    })
    @Length(3, 20, {
        message: "ism minimal 3 va maksimal 20 ta belgidan tashkil topgan bo'lishi kerak"
    })
    name: string;
    @ApiProperty({ example: 'student@example.com', description: 'Email пользователя', format: 'email' })
    @IsEmail({}, {
        message: "To'g'ri email yozing"
    })
    email: string;

    @ApiProperty({ example: 'study123', description: 'Пароль', minLength: 6, format: 'password', writeOnly: true })
    @IsNotEmpty()
    @MinLength(6, {
        message: "Parol 6 ta belgidan iborat bo'lishi kerak"
    })
    password: string;

    @ApiPropertyOptional({ enum: Role, example: Role.USER, default: Role.USER, description: 'Роль пользователя' })
    @IsOptional()
    @IsEnum(Role, {
        message: "role ADMIN, SELLER yoki USER bo'lishi kerak"
    })
    role?: Role;
}