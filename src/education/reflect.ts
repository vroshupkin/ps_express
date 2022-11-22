import 'reflect-metadata';

// function Inject(key: string) {
//     return (target: Function) => {
//         Reflect.defineMetadata('a', 1, target)

//         const meta = Reflect.getMetadata('a', target)
//         console.log(meta)
//     }
// }

function Injectable(key: string) {
	return (target: Function): void => {
		Reflect.defineMetadata(key, 1, target);

		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
	};
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function Prop(target: {}, name: string): void {}

@Injectable('C')
export class C {
	@Prop prop: number;
}

// @Injectable('D')
// export class D{
//     constructor(@Inject('C') c: C){

//     }
// }
