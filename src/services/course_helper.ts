import { Minute } from "../common/time.js"


interface IVideos{
    name: string,
    time: number
}

type TCourseVideosTuple = [order: number, video_name: string, time: number]
type TCourseNameTuple = [number, string]


interface ICourseMainObject{
    [_: number]: {
        name: string,
        videos: {
            [_: number]: IVideos
        }
        
    }
}
const node_js_course: ICourseMainObject = {
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


convertObjectToArrCourse()


  
  
const step_1_name: TCourseNameTuple = [ 1, 'Почему NodeJS для backend?' ]
const step_1: TCourseVideosTuple[] = [
    [ 1, 'Почему NodeJS для backend?', 11.34 ]
]




const step_9_name: TCourseNameTuple = [ 9, 'Приложение 2 - API с ExpressJS' ]
const step_9: TCourseVideosTuple[] = [
    [ 1, 'Вводное видео', 1.59 ],
  [ 2, 'Простой http сервер', 9.18 ],
  [ 3, 'Переходим на express', 4.2 ],
  [ 4, 'Марщрутизация', 10.27 ],
  [ 5, 'Ответы клиенту', 9.36 ],
  [ 6, 'Router', 5.32 ],
  [ 7, 'Промежуточные обработчики', 9.15 ]
]

const step_10_name: TCourseNameTuple = [ 10, 'Переход на TypeScript' ]
const step_10: TCourseVideosTuple[] = [
    [ 1, 'Дополнительный курс по TypeScript', 1.31 ],
    [ 2, 'Почему TypeScript', 5.51 ],
    [ 3, 'Начало работы с TypeScript', 18.18 ],
    [ 4, 'Базовые типы', 12.21 ],
    [ 5, 'Union типы', 6.05 ],
    [ 6, 'Interfaces и Types', 10.13 ],
    [ 7, 'Литеральные типы', 10.39 ],
    [ 8, 'Enum', 8.03 ],
    [ 9, 'Generics', 9.11 ],
    [ 10, 'Классы', 26.08 ],
    [ 11, 'Другие типы и возможности', 6.02 ]
]

const step_11_name: TCourseNameTuple = [11, 'Первый шаг к архитектуре']
const step_11: TCourseVideosTuple[] = [
    [1, 'Обзор архитектуры', 5.45],
    [2, 'Пишем класс приложения', 10.56],
    [3, 'Добавляем логгер', 11.22],
    [4, 'Базовый класс контроллера', 15.54],
    [5, 'Упражнение - Контроллер пользователей', 8.47],
    [6, 'Обработка ошибок', 16.50]
]


const step_12_name: TCourseNameTuple = [12, 'Depedency Injection']
const step_12: TCourseVideosTuple[] = [
    [1, 'Разбор DI и IOC', 12.21],
    [2, 'Декораторы', 21.53],
    [3, 'Metada Reflection', 16.57],
    [4, 'Внедряем IversifyJS', 17.05],
    [5, 'Упражнение улучшаем DI', 7.15],
]

const step_13_name: TCourseNameTuple = [13, 'Отладка и watch']
const step_13: TCourseVideosTuple[] = [
    [1, 'Eslint и prettier', 17.57],
    [2, 'Подключение nodemon', 5.53],
    [3, 'Отладка', 9.54],
    [4, 'Анализ памяти', 14.11],
    [5, 'Мониторинг производительности', 12.33],
]

const step_14_name: TCourseNameTuple = [14, 'Второй шаг к архитектуре']
const step_14: TCourseVideosTuple[] = [
    [1, 'Улучшение архитектуры', 2.46],
    [2, 'Data transfer object', 9.54],
    [3, 'User entity', 10.37],
    [4, 'Сервис users', 12.46],
    [5, 'Middleware для роутов', 5.59],
    [6, 'Валидация данных', 12.47],
]

const step_15_name: TCourseNameTuple = [15, 'Работа с базой данных']
const step_15: TCourseVideosTuple[] = [
    [1, 'Сервис конфигурации', 17.23],
    [2, 'Работа с prisma', 21.05],
    [3, 'Репозиторий users', 16.06],
    [4, 'Упражнение - Логин пользователя', 13.02],
]

const step_16_name: TCourseNameTuple = [16, 'Авторизация']
const step_16: TCourseVideosTuple[] = [
    [1, 'Работа JWT', 5.50],
    [2, 'Создание токена', 11.57],
    [3, 'Middleware для проверки токена', 14.32],
    [4, 'Упражнение - Guard авторизации', 9.53],
]

const step_17_name: TCourseNameTuple = [17, 'Тесты']
const step_17: TCourseVideosTuple[] = [
    [1, 'Виды тестирования', 7.14],
    [2, 'Unit тесты', 23.12],
    [3, 'Упражнение - новые unit тесты', 5.17],
    [4, 'E2e тесты', 14.20],
    [5, 'Упражнение - дописываем e2e тесы ', 10.58],
]

const step_18_name: TCourseNameTuple = [18, 'Заключение']
const step_18: TCourseVideosTuple[] = [
    [1, 'Куда двигаться дальше', 4.30],
]


/**
 * Превращает объект TCourseNameTuple и TCourseVideosTuple
 */
function convertObjectToArrCourse() {
    const steps_name: TCourseNameTuple[] = []
    for (const course_id of Object.keys(node_js_course)) {
        const course_id_num = Number(course_id)

        steps_name.push([
            Number(course_id),
            node_js_course[course_id_num].name
        ])

        const videos = []
        for (const videosId of Object.keys(node_js_course[course_id_num].videos)) {
            const videosId_num = Number(videosId)
            const video = node_js_course[course_id_num].videos[videosId_num]

            videos.push([
                videosId_num, video.name, video.time
            ])
        }

        // console.log(videos)
        // console.log(steps_name)

    }
}

function addNewCourse(main_obj: ICourseMainObject, courseNameTuple: TCourseNameTuple, step_arr: TCourseVideosTuple[]){
    const [course_order, course_name] = courseNameTuple
    main_obj[course_order] = {
        name: course_name,
        videos: { }
    }

    for (const tuple of step_arr) {
        const [orderOfVideos, videoName, videoDuration] = tuple
        main_obj[course_order].videos[orderOfVideos] = {
            name: videoName,
            time: videoDuration
        }   
    }
}

/**
 * Хранит ступень курса
 * 1) Название и длительность всех видео ступеней
 * 2) Название курса и его длительность
 */
class CourseStep{
    
    #durationCourse: Minute
    #courseName: string
    #courseOrder: number
    #videos: {[_: number]: IVideos}

    constructor(course_order: number, course_name: string, course_videos: TCourseVideosTuple[]) {
        this.#courseName = course_name
        this.#courseOrder = course_order
        this.#durationCourse = new Minute(0)
        this.#videos = []

        for (const videosData of course_videos) {
            const [order, video_name, time] = videosData
            
            this.#videos[order] = {
                name: video_name,
                time: time
            }

            this.#durationCourse = Minute.add(this.#durationCourse, time)
        }    

    }

    get durationCourse(){
        return this.#durationCourse
    }

    logCourse(){
        console.log(`${this.#courseOrder} ${this.#courseName}: ${this.#durationCourse} мин`)

        // for (const videoKey of Object.keys(this.#videos)) {
        //     console.log(this.#videos[Number(videoKey)])
        // }
    }
}

const steps = [step_1, step_9, step_10, step_11, step_12, step_13, step_14, step_15, step_16, step_17, step_18]
const steps_name = [step_1_name, step_9_name, step_10_name, step_11_name, step_12_name, step_13_name, step_14_name, step_15_name, step_16_name, step_17_name, step_18_name]

class AgregatorCourseStep{
    #totalTime: Minute
    #courses: CourseStep[]

    constructor(courses: CourseStep[]){
        this.#totalTime = new Minute(0)
        this.#courses = []

        for (const course of courses) {
            this.#courses.push(course)
        }

    }

    get totalTime(){
        for (const course of this.#courses) {
            this.#totalTime = Minute.add(this.#totalTime, course.durationCourse)
        }
        return this.#totalTime
    }
}



function FactoryCourses() {
    let courses: CourseStep[] = []
    for (let i = 0; i < steps.length; i++) {
        const course = new CourseStep(steps_name[i][0], steps_name[i][1], steps[i])
        courses.push(course)
    }
    return courses
}

let courses: CourseStep[] = FactoryCourses()
const PurpleSchool_NodeJS = new AgregatorCourseStep(courses)
// console.log(PurpleSchool_NodeJS.totalTime + '')


function getTotatalDurationCourse() {
    let totalDuration = new Minute(0)
    for (let i = 0; i < steps.length; i++) {
        addNewCourse(node_js_course, steps_name[i], steps[i])

        const course = new CourseStep(steps_name[i][0], steps_name[i][1], steps[i])
        console.log(i + 8, course.durationCourse.toString())
        totalDuration = Minute.add(totalDuration, course.durationCourse)
    }

    console.log(totalDuration.toString())
}

getTotatalDurationCourse()

/**
 * Выводит в консоль прогресс курса в процентах от ступени
 * @param step Порядковый номер текущей ступени
 * @param step_videos Текущее видео
 */
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


/**
 * @param task Массив видео данной ступени [мин]
 * @param complete_ind Индекс текущего видео
 * @returns Процент выполнения данной ступени
 */
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
