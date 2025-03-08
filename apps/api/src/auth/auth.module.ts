import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret', // In production, always use env variable
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
