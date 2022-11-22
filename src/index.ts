import express, { Request, Response, NextFunction } from 'express';
// import { appendFile } from 'fs'
import { printProgress } from './services/course_helper.js';
import { MapLocation } from './education/class.js';
import 'reflect-metadata';

new MapLocation(0, 1);

console.log();
const host = '127.0.0.1';
const port = 8000;
const app = express();

/* 
    Порядок обработки запросов зависит от их регистрации в коде. При этом для запуска следующей цепочки
    требуется вызывать next()
*/

/* 
    Можно использовать регулярные выражения в роутингах (app.get, app.post, app.all и т.д)
 */

// Срабатывает в свою очередь при любом запросе
app.use((req: Request, res: Response, next: NextFunction) => {
	const dateNow = new Date(Date.now()) + '';
	console.log('Время', dateNow.slice(16, 15 + 9));

	next();
});

// Вызывается при любом методе
app.get('/example', (req: Request, res: Response, next: NextFunction) => {
	/* Скачивание */
	// res.download('./package.json', 'hello.json')

	/* Редирект */
	// res.redirect(301, 'https://example.com')

	// Добавление хедеров
	// res.set('Content-Type', 'text/plain')
	// res.send('Привет')

	/* Меняет заголовок Content-Type */
	// res.type('application/json')
	// res.type('te')

	res.send('asd');

	//
	// res.location()

	// Передача линков
	// res.links({
	//     next: 'asd'
	// })

	// Куки
	// res.cookie('token', 'asdasd'. {
	//     dpmain: '',
	//     path: '/',
	//     secure: true,       // Шифрование
	//     expires: 600000     // Сколько валиден куки

	// })

	// Очистка куки.  К примеру разлогирование
	// res.clearCookie('token', {
	//     path
	// })
});

// app.use('/users', userRouter)

app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
	res.end();
});

app.post('/hello', (req: Request, res: Response, next: NextFunction) => {
	throw new Error('new error');
});

console.log();
printProgress(11, 1);

console.log('asd');
// for (let i = 0; i <= task.length; i++) {
//     console.log(helperProgress(task, i))
// }

// asdsd

// Обработка ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.message);
	res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log(`Сервер запущен ${host}:${port}`);
});
