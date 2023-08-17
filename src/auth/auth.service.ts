import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  private async generateTocken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      tocken: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException("user not found", HttpStatus.BAD_REQUEST);
    }
    const passwordVerify = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (!passwordVerify) {
      throw new HttpException("data is incorrect", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateTocken(user);
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("user already exist", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateTocken(user);
  }
}
