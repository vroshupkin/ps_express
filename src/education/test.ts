
// typle массив заданного значения и заданного типа. Но в массив всёравно можно пушить
let tup: [number, string, number] = [2, 'sds', 2]
tup.push('asdsd')

 type ID = number | string

//  let a: ID = 10

type Animal = {
    name: string
}

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
    name: string
}

interface Dog {
    tail: boolean
}

const a: Dog = {
    name: 'asd',
    tail: true
}


/* Литеральные типы */ 

const l_a = 'asd'
let b: 'hi' = "hi"

type direction = 'left' | 'right'

function moveDog(direction: direction){
    switch(direction){
        case 'left': 
            return -1
        
        case 'right': 
            return 1
        default:
            return 0
    }
}

moveDog("left")

interface IConnection {
    host: string,
    port: number
}

function connect(connection: IConnection | "default") {

}

connect("default")

// Каст типа внутрь объекта 
const connectiton = {
    host: "localhost",
    protocol: 'https' as 'https' | 'http'
}

let l_b: any = 5
let l_c1 = <number>l_b          // Не стоит использовать в jsx
let l_c2 = l_b as number


/** Enum */
/**
 * Enum в рантайме будет функцией
 */

enum Direction{
    Left,
    Right,
    Length = 'asfdasd'.length
}

Direction.Left
Direction.Right

function move2(direction: Direction){
    switch(direction){
        case Direction.Left:
            return -1
        case Direction.Right:
            return 1
    }
}

// Скомпилируются только использованные константы
const enum Direction2{
    Up,
    Down
}

console.log(Direction2.Up)
