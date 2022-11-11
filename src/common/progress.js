
import { Minute } from "./time.js"

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