import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("fix-problems")
  async fixProblemsFlag(): Promise<{ updated: number }> {
    const count = await this.userService.fixProblemsFlag();
    return { updated: count };
  }
}
