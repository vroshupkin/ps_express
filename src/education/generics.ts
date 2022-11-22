interface HasLength {
	length: number;
}

function log<T extends HasLength, K>(obj: T, arr: K[]): K[] {
	console.log(arr.length);
	console.log(obj.length);

	return arr;
}

// Использование дженериков в интерфейсе
interface IUser {
	name: string;
	age?: number;
	bid: <T>(sum: T) => boolean;
}

log<string, number>('fasd', [1, 2, 3]);
