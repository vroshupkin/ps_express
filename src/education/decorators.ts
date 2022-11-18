
class LocalLogger{
    on: boolean

    constructor(){
        this.on = true
    }

    log(message: string | {} | number){
        if(this.on)
            console.log('logger_2 ' + message)
    }
}

const logger_1 = new LocalLogger()
logger_1.on = false

const logger_2 = new LocalLogger()


function Component(id: number) {
    logger_1.log('init component')
    return (target: Function): void => {
        logger_1.log('run component')
        target.prototype.id = id

    }
}

function Logger(){
    logger_1.log('init logger')
    return (target: Function): void => {
        logger_1.log('run logger')
    }
}

// Декоратор метода
function Method(
    target: Object,
    porpertyKey: string,        // Название метода
    propertyDescriptor: PropertyDescriptor
) {
   logger_1.log(porpertyKey) 
   const oldValue = propertyDescriptor.value

   // Переопределение метода
   propertyDescriptor.value = function (...args: any[]){
        return args[0] * 10
   }
}

function Prop(
    target: {},
    propertyKey: string
){
    let value: number;

    const getter = () => {
        logger_1.log(`getter`)
        return value
    }

    const setter = (newValue: number) => {
        logger_1.log('setter')
        value = newValue
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    })
}

function Param(
    target: Object,
    propertyKey: string,
    index: number
){
    // logger_2.log(target)
    logger_2.log('Название функции: ' + propertyKey)
    logger_2.log('index: ' + index)
}

@Logger()
@Component(2)
export class User{
    @Prop
    id: number

    @Method
    updateId(@Param newId: number){
        this.id = newId
        return this.id
    }
    
}



const user = new User()
logger_2.log(user.updateId(3))

// logger_2.log(user.id)
// user.updateId(3)

// user.id = 2999
// logger_2.log(user.id)

// console.log(`new User ` + (new User()).id)

// console.log(new User())