import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

export class User {
	constructor(private readonly _email: string, private readonly _name: string) {}
	private _password: string;

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPasword(pass: string): Promise<void> {
		this._password = await hash(pass, 10);
	}
}
