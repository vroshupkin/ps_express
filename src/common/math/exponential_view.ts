class EponentionalView {
	private exponent: string;
	private fraction: string;
	private exponentialView: string;

	private getExponentialView(num: Number): string {
		return Number.parseFloat(num + '').toExponential();
	}
	constructor(private num: number) {
		this.exponentialView = this.getExponentialView(num);
		const exponentialView = this.exponentialView;
		const eSymbolInd = exponentialView.indexOf('e');
		// Если нету 'e' в строке
		if (eSymbolInd !== -1) {
			this.exponent = exponentialView.slice(eSymbolInd, exponentialView.length + 1);
			this.fraction = exponentialView.slice(0, eSymbolInd - 1);
		} else {
			this.exponent = '';
			this.fraction = exponentialView;
		}
	}

	/**
	 * @param l Сколько значащих цифр будет в fraction
	 */
	public getNormalView(l: number, withSpace = true): string {
		const exp_num = Number(this.exponent.slice(1));

		if (Math.abs(exp_num) <= l - 1) {
			if (exp_num === l - 1) l--;

			return `${this.num}`.slice(0, l + 1);
		} else if (exp_num >= l) {
			const fraction = `${this.num}`.slice(0, l);
			const new_exp = exp_num - (l - 1);

			return `${fraction} e${new_exp}`;
		} else {
			const fraction = `${this.exponentialView}`.slice(0, l + 1);
			const new_exp = exp_num + (l - 1);

			return `${fraction}e${new_exp}`;
		}
	}
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
// const arr = [1, 4, 4, 10];

// const avg = (arr: number[]) => arr.reduce((prev, curr, i) => prev + curr / arr.length, 0);

// console.log(avg(arr));

// // type f = Function(a: number): number

type INumFunc = (num: number) => number;

function linearFunctionFactory(k: number): INumFunc {
	return (num: number) => k * num;
}

function getNextValue(current_value: number, f: INumFunc): number {
	return f(current_value);
}

const start_value = 100000;
const actFunction = linearFunctionFactory(0.8);

let current_value = start_value;
const maxN = 200;
for (let i = 0; i < maxN; i++) {
	current_value = getNextValue(current_value, actFunction);

	const view = Number.parseFloat(current_value + '').toExponential();
	// console.log(new EponentionalView(current_value).getNormalView(4));

	new EponentionalView(current_value);
}
