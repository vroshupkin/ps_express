import { Minute } from "../common/time.js"


interface IVideos{
    name: string,
    time: number
}


interface INodeJsCourse{
    [_: number]: {
        name: string,
        videos: {
            [_: number]: IVideos
        }
        
    }
}
const node_js_course: INodeJsCourse = {
    1: {
        name: 'Почему NodeJS для backend?',
        videos: {
            1: {
                name: 'Почему NodeJS для backend?',
                time: 11.34
            },
        },
    },

    9: {
        name: 'Приложение 2 - API с ExpressJS',
        videos: {
            1: {
                name: 'Вводное видео',
                time: 1.59              
            },
            2: {
                name: 'Простой http сервер',
                time: 9.18
            },
            3: {
                name: 'Переходим на express',
                time: 4.20
            },
            4: {
                name: 'Марщрутизация',
                time: 10.27
            },
            5: {
                name: 'Ответы клиенту',
                time: 9.36
            },
            6: {
                name: 'Router',
                time: 5.32
            },
            7: {
                name: 'Промежуточные обработчики',
                time: 9.15
            },
        }
    }
}

node_js_course[10] = {
    name: 'Переход на TypeScript',
    videos: {
        1: {
            name: 'Дополнительный курс по TypeScript',
            time: 1.31              
        },
        2: {
            name: 'Почему TypeScript',
            time: 5.51              
        },
        3: {
            name: 'Начало работы с TypeScript',
            time: 18.18              
        },
        4: {
            name: 'Базовые типы',
            time: 12.21              
        },
        5: {
            name: 'Union типы',
            time: 6.05              
        },
        6: {
            name: 'Interfaces и Types',
            time: 10.13              
        },
        7: {
            name: 'Литеральные типы',
            time: 10.39              
        },
        8: {
            name: 'Enum',
            time: 8.03              
        },
        9: {
            name: 'Generics',
            time: 9.11              
        },
        10: {
            name: 'Классы',
            time: 26.08              
        },
        11: {
            name: 'Другие типы и возможности',
            time: 6.02              
        },
    }
}


export function printProgress(step: number, step_videos: number){
    const minutes_arr = Object.values(node_js_course[step].videos).map(val => val.time)
    const names_arr = Object.values(node_js_course[step].videos).map(val => val.name)

    const step_name = node_js_course[step].name
    console.log(`Ступень ${step}: '${step_name}'`)
    console.log(
        `Видео ` +  
        `${step_videos}/${minutes_arr.length}: ` + `'${names_arr[step_videos - 1]}' ` +
        `${helperProgress(minutes_arr, step_videos - 1)}`
    )
}



export const helperProgress = (task: number[], complete_ind: number) => {
    const taskMinute = task.map(v => new Minute(v))

    const sum = taskMinute.reduce((prev, curr) => {
        return Minute.add(prev, curr)
    })

    const complete_sum = task.reduce((prev, curr, ind) => {
        if(ind >= complete_ind)
            return prev
        return Minute.add(prev, curr)
    }, new Minute('0.00'))
    
    const completeSumInSeconds = complete_sum.min * 60 + complete_sum.sec
    const sumInSeconds = sum.min * 60 + sum.sec
    
    return  Math.floor(100 * (completeSumInSeconds / sumInSeconds)) + '%'
}