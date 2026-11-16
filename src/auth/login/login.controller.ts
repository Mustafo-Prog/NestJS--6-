import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service.js';
import { LoginDto } from '../dto/login.dto.js';

@ApiTags('Авторизация')
@Controller('auth/login')
export class LoginController {
    constructor(private readonly LoginSercie: LoginService) {}
    @Post()
    @ApiOperation({ summary: 'Войти и получить JWT' })
    @ApiResponse({ status: 201, description: 'Успешный вход. Ответ содержит access_token и данные пользователя без пароля.' })
    @ApiResponse({ status: 400, description: 'Некорректные данные, email не найден или пароль неверный' })
    @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
    register(@Body() body: LoginDto) {
        return this.LoginSercie.login(body)
    }
}
