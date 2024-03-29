import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import bcrypt from 'bcryptjs';
import { C } from '../education/reflect';
@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUserRepository,
	) {}

	async validateUser({ email, name, password }: UserRegisterDto): Promise<boolean> {
		const userInRepository = await this.usersRepository.find(email);
		if (!userInRepository) {
			return false;
		}
		const newUser = new User(email, name, userInRepository.password);
		const result = await newUser.comparePassword(password);

		return result;
	}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');

		await user.setPasword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		console.log(existedUser);

		if (existedUser) {
			return null;
		}

		return this.usersRepository.create(user);
	}

	async getUserInfo(email: string): Promise<any> {
		return this.usersRepository.find(email);
	}
}
