import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/auth.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(
        body.email,
        body.password,
      );
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const token = this.authService.login(user);
      res.cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });
      return res.json({ user });
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);
      const token = this.authService.login(user);
      res.cookie('jwt', token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });
      return res.status(HttpStatus.CREATED).json({ user });
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    const user = structuredClone(req.user);
    delete user.id;
    return res.json({ user });
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    return res.status(HttpStatus.OK).json({ message: 'Logged out' });
  }
}
