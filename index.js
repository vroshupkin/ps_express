
import { ChildProcess } from 'child_process'
import http from 'http'
import express from 'express'
import { appendFile } from 'fs'
import { printProgress } from './src/services/course_helper.js'

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




printProgress(9, 5)

// for (let i = 0; i <= task.length; i++) {    
//     console.log(helperProgress(task, i))
// }
