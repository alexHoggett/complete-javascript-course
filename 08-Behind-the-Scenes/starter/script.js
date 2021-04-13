'use strict';

// function calcAge(birthYear){
//     const age = 2037 - birthYear;
    
//     function printAge() {
//         let output = `${firstName}, You are ${age}, born in ${birthYear}`;
//         console.log(output);

//         if (birthYear >= 1981 && birthYear <= 1996){
//             var millenial = true;
//             const firstName = 'steven'
//             const str = `Oh, and you're a millenial, ${firstName}`;
//             console.log(str);

//             function add(a, b){
//                 return a + b;
//             }

//             output = 'NEW OUTPUT';
//         }
//         // console.log(str);
//         console.log(millenial);
//         console.log(output);
//         // console.log(add(2, 3));
//     }
//     printAge();
//     return age;
// }

// const firstName = 'Alex';
// calcAge(1991);

// console.log(me);
// // console.log(job);
// // console.log(year);

// var me = 'Alex';
// let job = 'teacher';
// const year = 1991;

// console.log(addDecl(1, 2));
// // console.log(addExpr(1, 2));
// // console.log(addArrow(1, 2));

// function addDecl(a, b){
//     return a + b;
// }

// const addExpr = function(a, b){
//     return a + b;
// }

// const addArrow = (a, b) => a + b;

// // Example

// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart(){
//     console.log('All products deleted!');
// }


// arrow function does not get its own this keyword

// var firstName = 'matilda';

// const alex = {
//     firstName: 'Alex',
//     year: 1995,
//     calcAge: function(){
//         // console.log(this);
//         console.log(2037 - this.year);
        
//         // solution 1
//         // const self = this;
//         // const isMillenial = function() {
//         //     console.log(self);
//         //     console.log(self.year >= 1981 && self.year <= 1996);
//         // };

//         // solution 2
//         const isMillenial = () => {
//             console.log(this);
//             console.log(this.year >= 1981 && this.year <= 1996);
//         };

//         isMillenial();
//     },
//     greet: () => console.log(`hey ${this.firstName}`),
// };

// alex.greet();
// console.log(this.firstName);
// alex.calcAge();

// // arguements keyword
// const addExpr = function(a, b){
//     console.log(arguments);
//     return a + b;
// }

// const addArrow = (a, b) => {
//     console.log(arguments);
//     return a + b;
// }

// addExpr(2, 5);

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);


// const me = {
//     name: 'alex',
//     age: 26,
// };
// const friend = me;
// friend.age = 27;
// console.log('Friend: ', friend);
// console.log('Me: ', me);

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('before marriage: ', jessica);
console.log('after marriage: ', marriedJessica);

// marriedJessica = {};

// Copying Objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);

jessicaCopy.lastName = 'Davis';
console.log('before marriage: ', jessica2);
console.log('after marriage: ', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('before marriage: ', jessica2);
console.log('after marriage: ', jessicaCopy);