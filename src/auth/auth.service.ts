import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async validateUser(email: string, password: string) {
      const user = await this.userService.findByEmail(email);
      if (user) {
        const isPasswordValid = await bcryt.compare(password, user.password);
        if (isPasswordValid) {
            return {
                ...user,
                password: undefined
            }
        }
      }
      throw new Error("Email or password is incorrect");
    }

    login() {
        //throw new Error('Method not implemented.');
    }
}
