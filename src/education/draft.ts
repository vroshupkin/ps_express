const arr = [1, 4, 4, 10];

const avg = (arr: number[]) => arr.reduce((prev, curr, i) => prev + curr / arr.length, 0);

console.log(avg(arr));
