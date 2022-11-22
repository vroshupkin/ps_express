class Coord {
	lat: number;
	long: number;

	constructor(lat: number, long: number) {
		this.lat = lat;
		this.long = long;
	}

	computeDistance(newLat: number, newLong: number) {
		return 0;
	}
}

/** При вызове супер конструктор отрабатывает так же инициализацию класса, от которого наследовался */
/** override возможен только когда есть исходный метод, тем самым можно отследить переименование исходного метода  */
export class MapLocation extends Coord {
	_name: string;

	get name() {
		return this._name;
	}

	set name(s: string) {
		this._name = s;
	}

	constructor(lat: number, long: number) {
		super(lat, long);
	}

	override computeDistance(newLat: number, newLong: number): number {
		return 1;
	}
}

interface LoggerService {
	log: (s: string) => void;
}

class Logger implements LoggerService {
	public log(s: string) {
		console.log(s);
	}
}

const a = new Logger();

class MyClass<T> {
	a: T;
}

const b = new MyClass<string>();

/**
 * Абстрактные классы и методы
 */
abstract class Base {
	print(s: string) {
		console.log(s);
	}

	abstract error(s: string): void;
}

class BaseExtended extends Base {
	error(s: string): void {
		console.log('asd');
	}
}

new BaseExtended();

/* 
    
*/

// const point = new Coord(0, 1)
// const p2 = new MapLocation(0, 1)
