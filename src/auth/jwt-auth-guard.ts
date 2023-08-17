import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const tocken = authHeader.split(" ")[1];
      if (!tocken || bearer !== "Bearer") {
        throw new UnauthorizedException({ message: "unauthorize" });
      }
      const user = this.jwtService.verify(tocken);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "unauthorize" });
    }
  }
}
