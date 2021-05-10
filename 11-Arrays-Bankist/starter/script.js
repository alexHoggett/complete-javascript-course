'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// INSERTING HTML using insertAdjacentHTML
const displayMovements = function(movements){
  // empty current container
  // innerhtml similar to text content
  containerMovements.innerHTML = '';
  movements.forEach(function(mov, i){
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc){
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .filter((inter, i, arr) => {
    // console.log(arr);
    return inter >= 1;
  })
  .reduce((acc, inter) => acc + inter, 0);
labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  })
};
createUserNames(accounts);
// console.log(accounts)

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // in hmtl the default behaviour when we click the submit button of a form is to reload the page
  // pressing enter will also trigger a click event
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  // using optional chaining, pin will only be read if currentAccount exists
  if (currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    
    containerApp.style.opacity = 100;

    // clear data in login form
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount); 
  }
});

// Transferring money
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  // get data from html form
  const amount = Number(inputTransferAmount.value);
  // Use username from form to find the acc details for the reciever
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  // using optional chaining again
  if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }

});

const updateUI = function(account){
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);   
};

// bank only grants a loan if there is at least one deposit that is at least 10% of the loan amount
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    // grant a loan (add movement)
    currentAccount.movements.push(amount);

    // update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('Delete');

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // splice mutates the original array
    accounts.splice(index, 1);
    // console.log(index);

    // hide UI
    containerApp.style.opacity = 0;
  }

  // set input fields back to blank
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// /// // /// // /// // /// // /// // /// // ///
// /// Sorting Arrays
// /// // /// // /// // /// // /// // /// // ///

// /// // /// // /// // /// // /// // /// // ///
// /// flat and flatMap
// /// // /// // /// // /// // /// // /// // ///

// // flattens and array
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[1, 2, 3, [4, 5, 6]], [4, 5, 6], 7, 8];
// // flat method only goes one level deep
// // can set depth with arg, 1 is default
// console.log(arrDeep.flat(2));

// // getting total of every transaction across all accounts
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// // flatMap, does both operations and is better for performance
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// /// // /// // /// // /// // /// // /// // ///
// /// Includes, Some and Every
// /// // /// // /// // /// // /// // /// // ///

// console.log(movements);

// // INCLUDES : EQUALITY
// console.log(movements.includes(-130));

// // SOME : CONDITION FOR ANY
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 5000)
// console.log(anyDeposits);

// // EVERY : CONDITION FOR ALL
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Seperate Callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// /// // /// // /// // /// // /// // /// // ///
// /// Find Method
// /// // /// // /// // /// // /// // /// // ///

// retrieve 1 element of an array based on a condition
// loops over the array, will return the first element for qhich its condition is true
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // implement the above using for of loop

// for (const accountDup of accounts){
//   if (accountDup.owner === 'Jessica Davis') console.log(accountDup);
// }

// /// // /// // /// // /// // /// // /// // ///
// /// Coding challenge 3
// /// // /// // /// // /// // /// // /// // ///

// const calcAverageHumanAge = function (ages){
//   const avgHumanAge = ages
//     .map(age => age <= 2 ? 2 * age : 16 + age * 4 )
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//     console.log(avgHumanAge);
// }


// calcAverageHumanAge([5,2,4,1,15,8,3]);
// calcAverageHumanAge([16,6,10,5,6,1,4]);

// /// // /// // /// // /// // /// // /// // ///
// /// Chaining Methods
// /// // /// // /// // /// // /// // /// // ///


// // PIPELINE
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * 1.1)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * 1.1;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositUSD);

// /// // /// // /// // /// // /// // /// // ///
// /// Coding Challenge 2
// /// // /// // /// // /// // /// // /// // ///

// const calcAverageHumanAge = function (ages){
//   const newAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4 );
//   console.log(newAges);

//   const excluded = newAges.filter(age => age >= 18);
//   console.log(excluded);

//   const avg = excluded.reduce((acc, age) => acc + age, 0) / excluded.length;

//   console.log(avg);
// };

// calcAverageHumanAge([5,2,4,1,15,8,3]);
// calcAverageHumanAge([16,6,10,5,6,1,4]);

// /// // /// // /// // /// // /// // /// // ///
// /// Reduce Method
// /// // /// // /// // /// // /// // /// // ///

// // accumulator is like a snowball
// const balance = movements.reduce(function(acc, cur, i, arr){
//   // loops over the array as usual
//   // return accumulator plus the current iteration
//   console.log(`iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

// console.log(balance);

// // Maximum value of movemements array
// const max = movements.reduce((highest, current) => {
//   if (current < highest) return highest;
//   else return current;
// }, movements[0]);

// console.log(max);

// /// // /// // /// // /// // /// // /// // ///
// /// Filter Method
// /// // /// // /// // /// // /// // /// // ///

// // will only be included in deposits if mov > 0
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);

// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

// /// // /// // /// // /// // /// // /// // ///
// /// Map Method
// /// // /// // /// // /// // /// // /// // ///
 
// // convert movements to USD
// const euroToUSD = 1.1;

// // const movementsUSD = movements.map((function(mov, i){
// //   return mov * euroToUSD;
// // }));

// // with arrow function
// const movementsUSD = movements.map(mov => mov * euroToUSD);
// console.log(movements, movementsUSD);

// // without using the map function
// const movementsUSDfor = [];
// for(const mov of movements) movementsUSDfor.push(mov * euroToUSD);
// console.log(movementsUSDfor);

// // the map method calls this function for every entry, we recieve current value, i & the whole array
// const movDescriptions = movements.map((mov, i) => {
//     return `Movement ${i}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
// });

// console.log(movDescriptions);

// /// // /// // /// // /// // /// // /// // ///
// /// Data Transformations, MAP, FILTER & REDUCE
// /// // /// // /// // /// // /// // /// // ///

// MAP returns a new array contating the contents of the first array after an operation
// FILTER returns a new array containing the contents of the first array that pass a condition
// REDUCE boils down all values of the array into a single value

// /// // /// // /// // /// // /// // ///
// /// Coding Challenge 1
// /// // /// // /// // /// // /// // ///

// const checkDogs = function(dogsJulia, dogsKate){
//   const juliaArr = dogsJulia.slice(1, -2);
//   console.log(juliaArr);
//   const jointArr = juliaArr.concat(dogsKate);
//   console.log(jointArr);

//   jointArr.forEach(function(age, i){
//     const message = age < 3 ? 'is still a puppy 🍼' : `is ${age} years old`
//     console.log(`Dog number ${i + 1} is ${message}`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// /// // /// // /// // /// // /// // ///
// /// ForEach with maps and sets
// /// // /// // /// // /// // /// // ///

// // MAPS
// currencies.forEach(function(value, key, map){
//   console.log(`${key}: ${value}`);
// });

// // SETS
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// // Value and key are the same for a set
// // underscore is a throwaway variable
// currenciesUnique.forEach(function(value, _, map){
//   console.log(`${_}: ${value}`);
// })

// /// // /// // /// // /// // /// // ///
// /// Looping Arrays, ForEach
// /// // /// // /// // /// // /// // ///

// // using for of
// for (const [i, movement] of movements.entries()){
//   if (movement > 0){
//     console.log(`Movement ${i + 1}: you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`)
//   }
// }

// // forEach requires a callback function
// // will run the callback function on every iteration, named current iteration 'movement'
// // the order MATTERS
// console.log('FOR EACH');
// movements.forEach(function(mov, i, arr){
//   if (mov > 0){
//     console.log(`Movement: ${i}: you deposited ${mov}`);
//   } else {
//     console.log(`Movement: ${i}: you withdrew ${Math.abs(mov)}`)
//   }
// });

// You cannot break out of a for each loop

// 0: function(200)
// 1: function(450)
// 2: function(-400)

// /// // /// // /// // /// // /// // ///
// /// Array Methods
// /// // /// // /// // /// // /// // ///

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));

// // SPLICE
// // console.log(arr.splice(2)); // takes this part and returns it
// // changes the original

// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

