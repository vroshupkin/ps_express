
import http from 'http'


const host = '127.0.0.1'
const port = 8000




const server = http.createServer((req, res) => {

})

server.listen(port, host, () => {
    console.log(`Сервер запущен ${host}:${port}`)
})





const helperProgress = (task, complete) => {
    const taskSum = task.reduce((a, b) => a + b, 0)
    const completeSum = complete.reduce((a, b) => a + b, 0)
    
    let percent = 0
    if(completeSum !== 0)
        percent = completeSum / taskSum

    percent += '%'
    const count = ` ${completeSum}/${taskSum}` 
    return  count + ' ' +  percent
        
}


class HelperProgress{
    
    constructor(){

    }



}
helperProgress()