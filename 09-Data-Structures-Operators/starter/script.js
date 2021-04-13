'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
let days = ['mon', 'tues', 'weds', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  [days[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 Enhanced Object Literals
  openingHours,

  order(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
    console.log(`Order Recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);

  },
  orderPasta(ing1, ing2, ing3){
    console.log(`here is your pasta with ${ing1}, ${ing2}, ${ing3}`)
  },
  orderPizza(mainIngredient, ...otherIngredients){
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// // //// //// //// //// //// //
// // // Coding Challenge 2
// // //// //// //// //// //// //

const game = {
  team1: 'Bayern Munich', 
  team2: 'Borrussia Dortmund', 
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ], 
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ], 
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
  team1: 1.33, x: 3.25, team2: 6.5,
  }, 
};

// // //// //// //// //// //// //
// // // Which data structure to use
// // //// //// //// //// //// //



// // //// //// //// //// //// //
// // // Maps: Iteration
// // //// //// //// //// //// //

// const question = new Map([
//   ['question', 'what is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'Javascript'],
//   ['correct', 3],
//   [true, 'Congrats, that is correct!'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// // structure is exactly the same as Object.entries
// console.log(Object.entries(openingHours));

// // so we can convert the object to a map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // iteration, maps are iterables
// console.log(question.get('question'));
// for (const [key, value] of question){
//   // only print the element if the key is a number
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('your answer:'));
// const answer = 3;
// console.log(answer);
// console.log(question.get(answer === question.get('correct')));

// // convert a map back to an array
// console.log([...question]);
// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// // //// //// //// //// //// //
// // // Maps: Fundamentals
// // //// //// //// //// //// //

// // the keys can be any type
// const rest = new Map();
// // adding a new element to the data structure
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// // chaining
// rest
// .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
// .set('open', 11)
// .set('close', 23)
// .set(true, 'we are open')
// .set(false, 'we are closed');

// // to read from a map use get
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// // check the map for a certain key
// console.log(rest.has('categories'));
// // deleting the third element
// rest.delete(2);
// // can use clear to clear the whole map
// // rest.clear();
// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);
// console.log(rest.size);

// console.log(rest.get(arr));

// // //// //// //// //// //// //
// // // SETS
// // //// //// //// //// //// //

// const orderSet = new Set([
//   'pasta',
//   'pizza',
//   'pizza',
//   'pasta',
//   'risotto',
// ]);
// // does not allow duplicates
// console.log(orderSet);
// // displays the length of the set
// console.log(orderSet.size);
// // can create a set of a string
// console.log(new Set('AlexHogg'));
// // you can check its contents
// console.log(orderSet.has('pizza'));
// console.log(orderSet.has('bread'));
// // You can add to the set
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread');
// // and deete
// orderSet.delete('risotto');
// console.log(orderSet);

// // looping is possible like any other iterable
// for(const order of orderSet) console.log(order);

// // delete the whole set
// // orderSet.clear();

// // how do we retrieve?
// // there are no indexes, no way of getting values out of a set, there is no need

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// // using spread to create an array instead of a set
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);
// console.log(new Set(staff).size);

// // how many different letters are found in this?
// console.log(new Set('dsubdsjbvdsjvb').size);

// // //// //// //// //// //// //
// // // Coding Challenge 2
// // //// //// //// //// //// //

// // 1)
// console.log(game.scored.entries());
// for (const [i, scorer] of game.scored.entries()){
//   console.log(`Goal ${i}: ${scorer}`);
// }

// // 2)
// const odds = Object.values(game.odds);
// let sum = 0;
// for (const odd of odds){
//   sum += odd;
// }
// console.log(`Average odd is: ${sum / odds.length}`);

// // 3) 
// for (const [team, odd] of Object.entries(game.odds)){
//   const teamStr = team == 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

// // 4) 
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player] += 1 : scorers[player] = 1;
// }
// console.log(scorers);

// // //// //// //// //// //// //
// // // Looping Objects
// // //// //// //// //// //// //

// const properties = Object.keys(openingHours);
// console.log(properties);
// for (const day of Object.keys(openingHours)){}

// let openStr = `we are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }

// // property VALUES
// const values = Object.values(openingHours);
// console.log(values)

// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [day, {open, close}] of entries){
//   console.log(`on ${day} we open at ${open} and close at ${close}`);
// }


// // //// //// //// //// //// //
// // // Optional Chaining
// // //// //// //// //// //// //

// if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // WITH Optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// days = ['mon', 'tues', 'weds', 'thu', 'fri', 'sat', 'sun'];
// for(const day of days){
//   //console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`on ${day}, we open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [{name: 'Alex', email: 'blahblah'}];

// console.log(users[0]?.name ?? 'user array empty');

// // //// //// //// //// //// //
// // // For Of
// // //// //// //// //// //// //

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// console.log([...menu.entries()]);

// // //// //// //// //// //// //
// // // Coding Challenge 1
// // //// //// //// //// //// //

// const game = {
//   team1: 'Bayern Munich', 
//   team2: 'Borrussia Dortmund', 
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ], 
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ], 
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
//   'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//   team1: 1.33, x: 3.25, team2: 6.5,
//   }, 
// };

// // 1) Create one player array for each team (variables 'players1' and 'players2')
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2)
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4)
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5) 
// const  {
//   team1,
//   x: draw,
//   team2,
// } = game.odds;
// console.log(team1, draw, team2);

// // 6
// const printGoals = function(...playerGoals){
//   for (let i = 0; i < playerGoals.length; i++) console.log(playerGoals[i]);
//   console.log(`There were ${playerGoals.length} goals!`);
// };
// printGoals('me', 'jamie', 'vasquez');
// printGoals(...game.scored);

// // 7
// team1 < team2 && console.log('Team1 is more likley to win');
// team1 > team2 && console.log('Team2 is more likley to win');

// // //// //// //// //// //// //
// // // Nullish
// // //// //// //// //// //// //

// restaurant.numGuests = 0;
// console.log(restaurant.numGuests || 10);

// // Nullish values are null or undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// // //// //// //// //// //// //
// // // Short Circuiting
// // //// //// //// //// //// //

// logical operators
// Use ANY data type, return ANY datatype, short-circuiting = if first value is truthy, returns truthy value
// console.log('---OR---');
// console.log(3 || 'Alex');
// console.log('' || 'Alex'); // '' is falsey
// console.log(true || 0); // true is truthy
// console.log(undefined || null); // both falsey

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // hello is first truthy

// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
// // can be written as
// console.log(restaurant.numGuests || 10);

// console.log('---AND---');
// console.log(0 && 'Jonas');
// console.log(5 && 'Jonas');

// console.log('Hello' && 23 && null && 'Alex');

// if (restaurant.orderPizza){
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// // //// //// //// //// //// //
// // // Rest Operator
// // //// //// //// //// //// //

// // 1) Desctructuring 

// // SPREAD because on the RIGHT side of 
// const arr = [1, 2, ...[3, 4]];
// console.log(arr);

// // REST, becaure on LEFT side of equals sign
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // REST must always be at the last elemement
// const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]

// console.log(pizza, risotto, otherFood);

// // Objects
// const {sat: saturday, ...weekdays} = restaurant.openingHours;
// console.log(saturday);

// // 2) Functions

// const add = function(...numbers){
//   // console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };
// add(2, 3);
// add(2, 3, 6, 3);
// add(7, 4, 4, 5, 6, 7);

// const x = [2, 5, 3, 6];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');


// //// //// //// //// //// //
// // Spread Operator
// //// //// //// //// //// //

// const arr = [7, 8, 9];
// // const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// // console.log(badNewArr);

// const newArr = [1, 2, ...arr];
// console.log(newArr)

// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
// console.log(newMenu);

// // Copy Array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
// console.log(menu);

// // Iterables are arrays, strings, maps, sets but NOT objects

// const str = 'Alex';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// // const ingredients = [
// //   prompt('Let\'s make some pasta! Ingredient 1?'), prompt('Let\'s make some pasta! Ingredient 2?'), prompt('Let\'s make some pasta! Ingredient 3?')
// // ];
// // console.log(ingredients);

// // restaurant.orderPasta(...ingredients);

// // Spreading Objects 
// const newRestaurant = {foundingYear: 1998, ...restaurant, founder: 'Gianna'};
// console.log(newRestaurant);

// const restaurantCopy = {...restaurant};
// restaurantCopy.name = 'Ristorante Rome'
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

//// //// //// //// //// //
// Destructuring Objects 
//// //// //// //// //// //

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del sol',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del sol',
//   starterIndex: 2,
// })

// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // default values
// console.log('break');
// const { menu = [], starterMenu: starters = []} = restaurant;
// console.log(menu, starters);

// // mutating variables
// let a = 111;
// let b = 999;
// const obj = {a: 23, b: 7, c: 14};

// ({a, b} = obj);
// console.log(a, b);

// // nested objects
// const {
//   fri: {open: o, close: c},
// } = openingHours;
// console.log(open, close);

// //// //// //// //// //// //
// // Destructuring an array
//// //// //// //// //// //// //

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// let [main, ,secondary] = restaurant.categories;
// console.log(main, secondary);

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // recieve 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested Destructuring 
//  const nested = [2, 4, [5, 6]];
// //  const [i, , j] = nested;
// //  console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p=1, q=1, r=1] = [8, 9];
// console.log(p, q, r);