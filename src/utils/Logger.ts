export const Logger = {
    info: (msg) => {
         if (process.env.NODE_ENV === 'development') {
             console.info(msg);
         }
    },
    log: (msg) => {
         if (process.env.NODE_ENV === 'development') {
             console.log(msg);
         }
    },
}

// export function Log(_:any, name: string, descriptor:PropertyDescriptor): PropertyDescriptor {
//     const newDescriptor = {
//         ...descriptor,
//         value : function (...args: any[]):any {
//             // 필요한 로그를 찍는다.

//             // 함수 이름 
//             console.log(`Calling ${name} with argument: `);
//             // 함수 인자 
//             console.dir(args);
//             // 함수 호출
//             const result = descriptor.value.apply(this, args);
//             // 결과를 출력
//             console.log(`Result :`)
//             console.dir(result)
//             // 결과 리턴
//             return result
//         }
//     }
//     return newDescriptor
// }


// class Calculator {
//     @Log
//     add(x,y): number{
//         return x + y
//     }
// }

// const calculator = new Calculator()
// console.log(calculator.add(1,2));
