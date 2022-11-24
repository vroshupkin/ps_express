import { injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
		return true;
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name);
		await user.setPasword(password);
		// проверка что пользователь есть
		// если есть то null
		// если нет - то создаём

		return user;
	}
}
