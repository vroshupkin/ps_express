class Polynom {
	constructor(public array: number[]) {}

	public derivative(): Polynom {
		const derivativeArr = this.array.map((val, ind) => val * ind).slice(1);
		return new Polynom(derivativeArr);
	}
	/**
	 * Считает полином в точке (x)
	 */
	calc(x: number) {
		let res = 0;
		for (const [ind, k] of this.array.entries()) {
			res += k * x ** Number(ind);
		}
		return res;
	}
}

const polynom_1 = new Polynom([2, 3, 1]); // x ** 2 + 3 * x + 2
console.log(polynom_1.calc(2));
console.log(polynom_1.derivative().calc(2));
console.log(polynom_1.derivative().derivative().calc(2));
