import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'student@example.com', description: 'Email пользователя', format: 'email' })
    @IsEmail({},{
        message: "Email bo'lishi kerak"
    })
    email: string

    @ApiProperty({ example: 'study123', description: 'Пароль', format: 'password', writeOnly: true })
    @IsNotEmpty()
        password: string;
}