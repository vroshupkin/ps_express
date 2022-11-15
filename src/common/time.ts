const formats = ['mm.ss', 'ss', 'hh.mmss', 'hh.mm']

export class Minute{
    #sec: number
    #min: number
    
    get sec(){
        return this.#sec
    }

    get min(){
        return this.#min
    }

    constructor(val: number | string, format='mm.ss'){
        if('mm.ss'){
            this.convert(val)
        }
    }

    convert(val: number | string){
        let min: number | string
        let sec: number | string

        [min, sec] = (val + '').split('.')
        if(sec === undefined)
            sec = '00'

        const sign = `${val}[0]` === '-'? -1 : 1;
                
        if(sec.length === 1)
            sec = Number(sec) * 10
        
        this.#min = sign * Number(min)
        this.#sec = sign * Number(sec)
    }

    static add(
        a: Minute | string | number,
        b: Minute | string | number
    ): Minute


    static add(a: any, b: any): Minute{
        let m_a, m_b: Minute

        m_a = (typeof b === 'string' || 'number')? new Minute(a) : a
        m_b = (typeof b === 'string' || 'number')? new Minute(b) : b
        
        const min = m_a.min + m_b.min + Math.floor((m_a.sec + m_b.sec) / 60)
        const sec = (m_a.sec + m_b.sec) % 60
        
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



