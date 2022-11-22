// typle массив заданного значения и заданного типа. Но в массив всёравно можно пушить
const tup: [number, string, number] = [2, 'sds', 2];
tup.push('asdsd');

type ID = number | string;

//  let a: ID = 10

type Animal = {
	name: string;
};

// type Dog = Animal & {
//     tail: boolean
// }

// const dog: Dog = {
//     name: 'asd',
//     tail: true
// }

// Расширение интерфейса

// Interface : могу определять только объекты, а не примитивы
// Types : Не могут участвовать в слиянии определений, как интерфейсы
interface Dog {
	name: string;
}

interface Dog {
	tail: boolean;
}

const a: Dog = {
	name: 'asd',
	tail: true,
};

/* Литеральные типы */

const l_a = 'asd';
const b = 'hi' as const;

type direction = 'left' | 'right';

function moveDog(direction: direction): number {
	switch (direction) {
		case 'left':
			return -1;

		case 'right':
			return 1;
		default:
			return 0;
	}
}

moveDog('left');

interface IConnection {
	host: string;
	port: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function connect(connection: IConnection | 'default'): void {}

connect('default');

// Каст типа внутрь объекта
const connectiton = {
	host: 'localhost',
	protocol: 'https' as 'https' | 'http',
};

const l_b: any = 5;
const l_c1 = <number>l_b; // Не стоит использовать в jsx
const l_c2 = l_b as number;

/** Enum */
/**
 * Enum в рантайме будет функцией
 */

enum Direction {
	Left,
	Right,
	Length = 'asfdasd'.length,
}

Direction.Left;
Direction.Right;

function move2(direction: Direction): number {
	switch (direction) {
		case Direction.Left:
			return -1;
		case Direction.Right:
			return 1;
	}
	return 0;
}

// Скомпилируются только использованные константы
const enum Direction2 {
	Up,
	Down,
}

console.log(Direction2.Up);
