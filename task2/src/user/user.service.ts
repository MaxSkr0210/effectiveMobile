import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async fixProblemsFlag(): Promise<number> {
    const count = await this.userModel.count({ where: { problems: true } });
    await this.userModel.update(
      { problems: false },
      { where: { problems: true } },
    );
    return count;
  }
}
