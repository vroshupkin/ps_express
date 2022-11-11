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


const cb_1 = (req, res, next) => {
    console.log('cb_1')
    next()
}
const cb_2 = (req, res, next) => {
    console.log('cb_2')
    res.send('Hello middleware')
    next()
}

// Вызывается при любом методе
app.all('/hello', (req, res, next) => {
    console.log('all')
    next()
})

app.get('/hello', cb_1, cb_2)

app.post('/hello', (req, res) => {

})



app.listen(port, () => {
    console.log(`Сервер запущен ${host}:${port}`)
})



function printProgress(step_progress){
    const task_times = [9.18, 4.20, 10.27, 9.36, 5.32, 9.15]
    const names = ['Вводное видео', 'Простой http сервер', 'Переходим на express', 'Маршрутизация', 'Ответы клиенту', 'Router', 'Промежуточные обработчики']
    
    console.log(`${step_progress + 1} Ступень: ${names[step_progress]}`)
    console.log(`Ступень ${step_progress + 1}/${task_times.length} ` + helperProgress(task_times, step_progress))
}

printProgress(3)

// for (let i = 0; i <= task.length; i++) {    
//     console.log(helperProgress(task, i))
// }
