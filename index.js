import { helperProgress } from './src/common/progress.js'
import { ChildProcess } from 'child_process'
import http from 'http'
import { Minute } from './src/common/time.js'
import { express } from 'express'

const host = '127.0.0.1'
const port = 8000



const router = {
    get: {
        hello: (res) => {
            res.statusCode = 200
            res.setHeader('Content-type', 'text/plain')
            res.end('Привет методы и энд поинты url!')
        }
    }
}

const server = http.createServer((req, res) => {
    const endPoint = req.url.slice(1)

    const handler = router[req.method.toLowerCase()]?.[endPoint]
    
    if(handler)>>>
        handler(res)
    else{
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('Привет!')
    }
        

    
})

server.listen(port, host, () => {
    console.log(`Сервер запущен ${host}:${port}`)
})


function printProgress(step_progress){
    const task_times = [9.18, 4.20, 10.27, 9.36, 5.32, 9.15]
    const names = ['Вводное видео', 'Простой http сервер', 'Переходим на express', 'Маршрутизация', 'Ответы клиенту', 'Router', 'Промежуточные обработчики']
    
    console.log(`${step_progress + 1} Ступень: ${names[step_progress]}`)
    console.log(`Ступень ${step_progress + 1}/${task_times.length} ` + helperProgress(task_times, step_progress))
}

printProgress(2)

// for (let i = 0; i <= task.length; i++) {    
//     console.log(helperProgress(task, i))
// }
