import { helperProgress } from './src/common/progress.js'
import { ChildProcess } from 'child_process'
import http from 'http'
import { Minute } from './src/common/time.js'
import express from 'express'
import { appendFile } from 'fs'

const host = '127.0.0.1'
const port = 8000
const app = express()

/* 
    Порядок обработки запросов зависит от их регистрации в коде. При этом для запуска следующей цепочки
    требуется вызывать next()
*/ 

/* 
    Можно использовать регулярные выражения в роутингах
 */


// Вызывается при любом методе
app.get('/hello', (req, res, next) => {
    console.log('all')
    next()
})

app.post('/hello', (req, res) => {

})



app.listen(port, () => {
    console.log(`Сервер запущен ${host}:${port}`)
})




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


function printProgress(step, step_videos){
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

printProgress(9, 5)

// for (let i = 0; i <= task.length; i++) {    
//     console.log(helperProgress(task, i))
// }
