'use strict';
// sometimes useful fo have functions with params set to a default. you do NOT have to pass in a param

// ///// ///// ///// ///// ///
// /// Default Parameters
// ///// ///// ///// ///// ///

// const bookings = [];

// const createBooking = function(
//     flightNo,
//     numPassengers = 1, 
//     price = 199 * numPassengers){

//     // previous way of writing default params
//     // numPassengers = numPassengers || 1;
//     // price = price || 199;

//     const booking = {
//         flightNo,
//         numPassengers,
//         price
//     }
//     console.log(booking);
//     bookings.push(booking);
// }
// createBooking('LH123');
// createBooking('LH123', 2, 800);
// // when we don't give a param value it is automatically set to undefined
// createBooking('LH123', undefined, 1000)

// ///// ///// ///// ///// ///
// /// Value vs Reference
// ///// ///// ///// ///// ///

const flight = 'LH234'
const alex = {
    name: 'Alex Hoggett',
    passport: 1323432213,
}


const checkIn = function(flightNo, passenger){
    flightNo = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 1323432213){
        alert('Checked In!');
    } else {
        alert('Wrong passport!');
    }
}

checkIn(flight, alex);

console.log(flight);
console.log(alex);

const flightNo = flight;
const passenger = alex;

// flight is a primitive type, just a string, when it is passed to the function it is just copied
// 'alex' is a reference type, objects are refernce types, only the memory address is passed, it is not copied. Changing values changes the original object.

const newPassport = function(person){
    // will change their passsport number
    person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(alex);
checkIn(flight, alex);

console.log(alex);