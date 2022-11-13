import { Minute } from "../common/time.js"

const node_js_course = {
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


export function printProgress(step, step_videos){
    const minutes_arr = Object.values(node_js_course[step].videos).map(val => val.time)
    const names_arr = Object.values(node_js_course[step].videos).map(val => val.name)

    const step_name = node_js_course[step].name
    console.log(`Ступень ${step}: '${step_name}'`)
    console.log(
        `Видео ` +  
        `${step_videos}/${minutes_arr.length}: ` + `'${names_arr[step_videos - 1]}' ` +
        `${helperProgress(minutes_arr, step_videos)}`
    )
}



export const helperProgress = (task, complete_ind) => {
    const sum = task.reduce((prev, curr) => {
        return Minute.add(prev, curr)
    })

    const complete_sum = task.reduce((prev, curr, ind) => {
        if(ind >= complete_ind)
            return prev
        return Minute.add(prev, curr)
    }, new Minute('0.00'))
    
    
    return  Math.floor(100 * (complete_sum / sum)) + '%'
}