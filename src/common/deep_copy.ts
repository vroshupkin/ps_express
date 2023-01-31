export function deepCopyObj<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj)) as T;
}

function test_1(): void {
	const obj = {
		1: 10,
		2: 30,
		hello: {
			m: 'a',
		},
	};

	console.log(obj != deepCopyObj(obj));

	const res = deepCopyObj(obj);
	console.log(res.hello != obj.hello);
}

function test_2(): void {
	const arr_1 = [1, 2, 3];
	const res = deepCopyObj(arr_1);
	console.log(res != arr_1);
	console.log(res);
}
// test_1();
test_2();
