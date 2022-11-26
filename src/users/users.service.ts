import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
		return true;
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');
		console.log(salt);
		await user.setPasword(password, Number(salt));
		// проверка что пользователь есть
		// если есть то null
		// если нет - то создаём

		return user;
	}
}
