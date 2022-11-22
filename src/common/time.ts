const formats = ['mm.ss', 'ss', 'hh.mmss', 'hh.mm'];

export class Minute {
	#sec: number;
	#min: number;

	get sec(): number {
		return this.#sec;
	}

	get min(): number {
		return this.#min;
	}

	constructor(val: number | string | Minute, format = 'mm.ss') {
		if (val instanceof Minute) return val;

		if (format === 'mm.ss') {
			this.convert(val);
		}
	}

	convert(val: number | string): void {
		let min: number | string;
		let sec: number | string;

		// eslint-disable-next-line prefer-const
		[min, sec] = (val + '').split('.');
		if (sec === undefined) sec = '00';

		const sign = `${val}[0]` === '-' ? -1 : 1;

		if (sec.length === 1) sec = Number(sec) * 10;

		this.#min = sign * Number(min);
		this.#sec = sign * Number(sec);
	}

	// static add(a: Minute | string | number, b: Minute | string | number): Minute;

	static add(a: Minute | string | number, b: Minute | string | number): Minute {
		a = new Minute(a);
		b = new Minute(b);

		const min = a.min + b.min + Math.floor((a.sec + b.sec) / 60);
		const sec = (a.sec + b.sec) % 60;

		return new Minute(`${min}.${sec}`);
	}

	toString(): string {
		return `${this.#min}.${this.#sec}`;
	}
}

function test(): any {
	const t_2 = Minute.add(70.59, -0.59);

	console.log(new Minute(0) + '');
	for (const decade of [0, 1, 2, 3, 4, 5]) {
		for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
			const minute_str = `${decade}${digit}`;
			// console.log(new Minute(minute_str) + '')
			// console.log(new Minute('-' + minute_str) + '')
		}
	}

	// console.log(new Minute('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'))
	// console.log(t_2 + '')
}
