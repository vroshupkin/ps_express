import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

export class User {
	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._passwordHash = passwordHash;
		}
	}
	private _passwordHash: string;

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get passwordHash(): string {
		return this._passwordHash;
	}

	public async setPasword(pass: string, salt: number): Promise<void> {
		this._passwordHash = await hash(pass, Number(salt));

		// console.debug(`password salt`, this._password);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return bcryptjs.compare(password, this.passwordHash);
	}
}
