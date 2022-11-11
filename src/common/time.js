const formats = ['mm.ss', 'ss', 'hh.mmss', 'hh.mm']

export class Minute{
    #sec
    #min
    
    get sec(){
        return this.#sec
    }

    get min(){
        return this.#min
    }

    constructor(val, format='mm.ss'){
        if('mm.ss'){
            this.convert(val)
        }
    }

    convert(val){
        
        let [min, sec] = (val + '').split('.')
        if(sec === undefined)
            sec = '00'

        const sign = `${val}[0]` === '-'? -1 : 1;
                
        if(sec.length === 1)
            sec *= 10
        
        this.#min = sign * Number(min)
        this.#sec = sign * Number(sec)
    }

    static add(a, b){
        if(typeof a === 'string' || 'number' && typeof b === 'string' || 'number'){
            a = new Minute(a)
            b = new Minute(b)
        }

        const min = a.min + b.min + Math.floor((a.sec + b.sec) / 60)
        const sec = (a.sec + b.sec) % 60
        
        return new Minute(`${min}.${sec}`)        
    }

    toString(){
        return `${this.#min}.${this.#sec}`
    }
}


function test(){
    const t_2 = Minute.add(70.59, -0.59)

    console.log(new Minute(0) + '')
    for (const decade of [0, 1, 2, 3, 4, 5]) {
        for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {

            const minute_str = `${decade}${digit}`
            // console.log(new Minute(minute_str) + '')
            // console.log(new Minute('-' + minute_str) + '')
        }
        
    }

    // console.log(new Minute('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'))
    // console.log(t_2 + '')

}

// console.log(range(10))


// test()