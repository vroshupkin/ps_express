import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUserRepository,
	) {}

	async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
		return true;
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');

		await user.setPasword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}

		return this.usersRepository.create(user);
	}
}
