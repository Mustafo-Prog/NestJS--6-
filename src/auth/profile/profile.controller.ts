import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.js';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Получить свой профиль' })
  @ApiResponse({ status: 200, description: 'Профиль пользователя без пароля' })
  @ApiResponse({ status: 401, description: 'JWT отсутствует, недействителен или истёк' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async profile(@Req() req: any) {
    const user = await this.prisma.users.findUnique({ where: { id: req.user.id } });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    const { password, ...withoutPassword } = user;
    return withoutPassword;
  }
}
