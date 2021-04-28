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

// ///// ///// ///// ///// ////// ////// ////// ///
// /// Value vs Reference
// ///// ///// ///// ///// ////// ////// ////// ///

// const flight = 'LH234'
// const alex = {
//     name: 'Alex Hoggett',
//     passport: 1323432213,
// }


// const checkIn = function(flightNo, passenger){
//     flightNo = 'LH999';
//     passenger.name = 'Mr. ' + passenger.name;

//     if (passenger.passport === 1323432213){
//         alert('Checked In!');
//     } else {
//         alert('Wrong passport!');
//     }
// }

// checkIn(flight, alex);

// console.log(flight);
// console.log(alex);

// const flightNo = flight;
// const passenger = alex;

// // flight is a primitive type, just a string, when it is passed to the function it is just copied
// // 'alex' is a reference type, objects are refernce types, only the memory address is passed, it is not copied. Changing values changes the original object.

// const newPassport = function(person){
//     // will change their passsport number
//     person.passport = Math.trunc(Math.random() * 1000000000);
// }

// newPassport(alex);
// checkIn(flight, alex);

// console.log(alex);

// ///// ///// ///// ///// ///// ///// ///// ///
// /// First Class and Higher Order Functions
// ///// ///// ///// ///// ///// ///// ///// ///


// javascript treats functions as first class-citizens
// are treated as another type of value

// functions are objects and we call methods on them

// higher order functions: recieves another function as an arguement, only possible because of first class functions

// OR a function that returns another function

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Functions accepting callback functions
// ///// ///// ///// ///// ///// ///// ///// ///

// const oneWord = function(str) {
//     return str.replace(/ /g, '').toLowerCase();
// }

// const upperFirstword = function(str) {
//     const [first, ...other] = str.split(' ');
//     return [first.toUpperCase(), ...other].join(' ');
// };

// // now for the higher order funciton
// const transformer = function(str, fn) {
//     console.log(`OG string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);
//     console.log(`Transformed by: ${fn.name}`);
// };

// // the function that we pass is called the call-back function
// transformer('JavaScript is the best!', upperFirstword);
// transformer('JavaScript is the best!', oneWord);

// const high5 = function(){
//     console.log('HIIII');
// };

// // high5 is the callback function
// document.body.addEventListener('click', high5);
// // calling methods on arrays
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// //This all makes code more reusable!

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Functions returning functions
// ///// ///// ///// ///// ///// ///// ///// ///

// const greet = function(greeting) {
//     return function(name) {
//         console.log(`${greeting} ${name}`);
//     };
// };

// const greeterhey = greet('Hey');

// greeterhey('Alex');

// greet('Hello')('Jonas');

// // With arrow functions
// const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

// greetArr('Hi')('Alex');

// ///// ///// ///// ///// ///// ///// ///// ///
// /// The call and apply methods
// ///// ///// ///// ///// ///// ///// ///// ///

// const lufthansa = {
//     airline: 'Lufthansa',
//     iataCode: 'LF',
//     bookings: [],
//     book(flightNum, name){
//         // print confirmation
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//         // add to bookings array
//         this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
//     },
// };

// lufthansa.book(239, 'Alex Hoggett');
// lufthansa.book(464, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//     airline: 'Eurowings',
//     iataCode: 'EW',
//     bookings: [],

// };

// const book = lufthansa.book;

// // does not work
// // this keyword will point to undefined as it is now in global scope
// // this keyword for a standard function call will point to undefined
// // book(23, 'Sarah Williams');

// // first arg is where this keyword should point
// // this will book to eurowings

// // Call Method
// book.call(eurowings, 23, 'sarah williams');
// console.log(eurowings);

// // this will book to lufthansa
// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//     airline: 'Swiss Airlines',
//     iataCode: 'LX',
//     bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// // Apply Method
// // Does not recieve a list or args after the this keyword, instead it takes an arr of the args
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss); 

// // can use spread operator to feed data from array to call method
// book.call(swiss, ...flightData);

// ///// ///// ///// ///// ///// ///// ///// ///
// /// The Bind Method
// ///// ///// ///// ///// ///// ///// ///// ///

// // Bind also allows you to manually set the this keyword

// // does not call book, but creates a new function where the this keyword is eurowings
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams');

// // can set the this keyword and the flight No
// // setting more than just the this keyword is called partial application
// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Alex Hoggett');
// bookEW23('Martha Stewart');

// // with Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function(){
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
// };

// // in an event listener the this keyword is always pointed to the element the listener is attached to
// // We have to manually select the this keyword using bind
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application - we can preset params
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // ⬆ The same as ⬇
// // const addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

// const addTaxRate = function(rate){
//     return function(value){
//         return value + value * rate;
//     }
// }

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Coding Challenge 1
// ///// ///// ///// ///// ///// ///// ///// ///

// const poll = {
//     question: "What is your favourite programming language?", 
//     options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//     // This generates [0, 0, 0, 0]. More in the next section! 
//     answers: new Array(4).fill(0),
// };

// // 1)
// poll.registerNewAnswer = function(){
//     const answer = Number(prompt('What is your favourite programming language? \n0: Javascript \n1: Python \n2: Rusts \n3: C++ \n(Write option number)'));

//     if (answer && answer >= 0 && answer <= 3){
//         this.answers[answer]++;
//     } 
//     this.displayResults('string');
// };

// // 2)
// document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

// // 3)
// poll.displayResults = function(type){
//     if (type == 'string'){
//         console.log(`Poll results are ${this.answers.join(', ')}`);
//     } else if (type == 'array'){
//         console.log(this.answers);
//     }
// }

// // 5)
// // Test Data
// const data1 = [5, 2, 3];
// const data2 = [1, 5, 3, 9, 6, 1];

// poll.displayResults.call({answers: [5, 2, 3]}, 'string');

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Immediately invoked function definitions
// ///// ///// ///// ///// ///// ///// ///// ///

// // Only used once, then disappears

// const runOnce = function() {
//     console.log('this will never run again');
// };

// // transform the statement from before, into an expression, using parentheses
// // IIFE
// (function() {
//     console.log('this will never run again');
//     const isPrivate = 23;
// })();

// // using arrow functions
// (() => console.log('this will ALSO never run again'))();
// // functions create scopes

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Closures
// ///// ///// ///// ///// ///// ///// ///// ///

// it's not a feature that we explicitly use
// they happen automatically

// const secureBooking = function () {
//     let passengerCount = 0;


//     return function() {
//         passengerCount++;
//         console.log(`${passengerCount} passengers`);
//     }
// };

// const booker = secureBooking();

// // passenger count can be incremented despite the EC being discarded from the stack
// booker();
// booker();
// booker();

// // closures remember all variables that existed in the functions 'birthplace' essentially

// console.dir(booker);

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Closures Continued
// ///// ///// ///// ///// ///// ///// ///// ///

// // Example 1
// let f;

// const g = function() {
//     const a = 23;
//     f = function() {
//         console.log(a * 2);
//     }
// }

// const h = function() {
//     const b = 777;
//     f = function () {
//         console.log(b * 2);
//     };
// }

// g();
// f();
// // console.dir(f);

// // Re-Assigning f function
// // loses value of a
// h();
// f();
// // console.dir(f);

// // Example 2
// const boardPassengers = function(n, wait) {
//     const perGroup = n / 3;

//     // setting a timer
//     // takes a function that will be executed after a certain time that is also specified (in ms)
//     setTimeout(function(){
//         console.log(`We are now boarding all ${n} passengers`);
//         console.log(`There are 3 groups, each with ${perGroup} passengers`);
//     }, wait * 1000);

//     console.log(`Will start boarding in ${wait} seconds`);
// };

// // closure has priority over scope chain !!!
// // So this ⬇️ has no effect
// const perGroup = 1000;
// boardPassengers(180, 3);

// ///// ///// ///// ///// ///// ///// ///// ///
// /// Coding Challenge 2
// ///// ///// ///// ///// ///// ///// ///// ///

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    
    document.querySelector('body').addEventListener('click', () => {header.style.color = 'blue'});
})();