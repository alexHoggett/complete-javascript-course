// Remember, we're gonna use strict mode in all scripts now!
// "use strict";

// const measureKelvin = function() {
//     const measurement = {
//         type: 'temp',
//         unit: 'celsius',
//         value: Number(prompt('Degrees celsius'))
//     }

//     // prompt always returns a string
//     console.log(measurement);
//     const kelvin = number(measurement.value) + 273;
//     return kelvin;
// };

// console.log(measureKelvin());


// Coding Challenge

printForecast = function(arr) {
    let message = ''
    for(let i = 0; i < arr.length; i++){
        message += `${arr[i]}oC in ${i + 1} days... `;
    }
    console.log(message);
}

const arr = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4];
printForecast(arr);
printForecast(arr2);