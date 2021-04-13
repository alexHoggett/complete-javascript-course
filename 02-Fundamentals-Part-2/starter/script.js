'use strict';

// function logger(){
//     console.log('my name is alex');
// }

// // calling / running / invoking function
// logger();

// function fruitProcessor(apples, oranges){
//     console.log(apples, oranges);
//     // use backwards quotations to interpolate strings
//     const juice = `Juice with ${apples} apples and ${oranges} oranges`;
//     return juice;
// }

// console.log(fruitProcessor(5, 0));

// -------------------------------------------------

// // function declaration - can be called before they are defined
// function calcAge1(birthYear){
//     const age = 2037 - birthYear;
//     return age;
// }

// const age1 = calcAge1(1995);

// // function expression
// const calcAge2 = function(birthYear) {
//     return 2037 - birthYear;
// }

// const age2 = calcAge2(1995);

// console.log(age1, age2);

// -------------------------------------------------

// // arrow function, best for oneliners, only can be used with 1 param
// const calcAge3 = birthYear => 2037 - birthYear;
// const age3 = calcAge3(1995);
// console.log(age3);

// // can take multiple params
// const yearsUntilRetirement = (birthYear, firstName) => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     return `${firstName} retires in ${retirement} years`;
// }

// console.log(yearsUntilRetirement(1995, 'alex'));

// -------------------------------------------------

// coding challenge

// const calcAverage = (first, second, third) => (first + second + third) / 3;

// function checkWinner(avgDolphins, avgKoalas){
//     const message = avgDolphins > avgKoalas ? `Dolphins win by (${avgDolphins} vs. ${avgKoalas})` : 
//     `Koalas win by (${avgKoalas} vs. ${avgDolphins})`;
//     console.log(message);
// }

// checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));

// checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27));

// -------------------------------------------------

// coding challenge

// function calcTips(bill){
//     const tip = bill >= 50 && bill <= 300 ? bill * .15 : bill * .20;
//     return tip;
// }

// const bills = [125, 555, 44];
// const tips = [calcTips(125), calcTips(555), calcTips(44)];
// console.log (tips);

// -------------------------------------------------

// coding challenge

const mark = {
    fullName: 'Mark',
    mass: 78,
    height: 1.69,
    calcBMI : function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};

const john = {
    fullName: 'John',
    mass: 92,
    height: 1.95,
    calcBMI : function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};

