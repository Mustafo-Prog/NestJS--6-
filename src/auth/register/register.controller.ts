import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto.js';
import { RegisterService } from './register.service.js';

@ApiTags('Авторизация')
@Controller('auth/register')
export class RegisterController {
    constructor(private readonly RegisterService: RegisterService) {}

    @Post()
    @ApiOperation({ summary: 'Зарегистрироваться' })
    @ApiResponse({ status: 201, description: 'Пользователь создан' })
    @ApiResponse({ status: 400, description: 'Некорректные данные или email уже занят' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    register(@Body() body: RegisterDto) {
        return this.RegisterService.register(body)
    }
}
