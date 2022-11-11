import { helperProgress } from './src/common/progress.js'
import { ChildProcess } from 'child_process'
import http from 'http'
import { Minute } from './src/common/time.js'

const host = '127.0.0.1'
const port = 8000




const server = http.createServer((req, res) => {

})

server.listen(port, host, () => {
    console.log(`Сервер запущен ${host}:${port}`)
})



const task_times = [9.18, 4.20, 10.27, 9.36, 5.32, 9.15]
const names = ['Вводное видео', 'Простой http сервер', 'Переходим на express', 'Маршрутизация', 'Ответы клиенту', 'Router', 'Промежуточные обработчики']
const step_progress = 1
console.log(`${step_progress + 1} Ступень: ${names[step_progress]}`)
console.log(`Ступень ${step_progress + 1}/${task_times.length} ` + helperProgress(task_times, step_progress))

// for (let i = 0; i <= task.length; i++) {    
//     console.log(helperProgress(task, i))
// }
