'use strict';

// /// // // /// // // /// // // /// // // /// // 
// What is OOP?
// /// // // /// // // /// // // /// // // /// // 

// Abstraction -  ignoring or hiding details that don't matter, we only deal with the information that we NEED

// Encapsulation - keeping methods and properties private inside the class. Some methods can be exposed as an API, to allow access.

// Inheritance - making all methods and properties of a certain class avalable to a child class.

// Polymorphism - A child class can overwrite a method it inherited from a parent class.

// /// // // /// // // /// // // /// // // /// // 
// OOP in JS
// /// // // /// // // /// // // /// // // /// // 

// Objects are linked to a prototype object.

// prototyoe contains all the methods that are accessible to all objects linked to that prototype.

// Behaviour is delegated to the linked prototype object.

// /// // // /// // // /// // // /// // // /// // 
// Constructor functions and New operator
// /// // // /// // // /// // // /// // // /// //

console.log('----Constructor functions and New operator----');

const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never create a method inside a constructor function, it is bad for performance as we might not even need this function
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear);
    // };
};

// call the constructor with the new keyword
const alex = new Person('Alex', 1995);
console.log(alex);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// function automatically return {}

const matilda = new Person('Matilda', 2017);
console.log(matilda);

// returns true
console.log(alex instanceof Person);

// /// // // /// // // /// // // /// // // /// // 
// Prototypes
// /// // // /// // // /// // // /// // // /// //
console.log('----Prototypes----');

// each and every function in JS has a property called prototype

// every object that's created by a constructor will have access to the prototype properties

console.log(Person.prototype);

// Now only 1 copy of this function exists that all instances can use
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

alex.calcAge();
matilda.calcAge();

console.log(alex.__proto__);
console.log(alex.__proto__ === Person.prototype);

// we can check if the prototype of Person is the prototype of an instance
console.log(Person.prototype.isPrototypeOf(alex));
console.log(Person.prototype.isPrototypeOf(matilda));

// Adding to the prototype affects all instances
Person.prototype.species = 'Homo Sapiens';
console.log(alex.species, matilda.species);
// though can not be found directly in the object where it is inherited

// if we want to check for what is inherited and not
console.log(alex.hasOwnProperty('firstName'));
console.log(alex.hasOwnProperty('species'));

// /// // // /// // // /// // // /// // // /// // 
// Prototypal Inheritance & Prototype Chain
// /// // // /// // // /// // // /// // // /// //
console.log('----Prototypal Inheritance & Prototype Chain----');

// these diagrams are killing me

// /// // // /// // // /// // // /// // // /// // 
// Prototypal Inheritance on Built-In Objects
// /// // // /// // // /// // // /// // // /// //

console.log(alex.__proto__);
// Object.prototype is the top of the prototype chain
console.log(alex.__proto__.__proto__);
// therefore this next call will return null
console.log(alex.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 6 ,7, 12, 3, 5];
// we can check the prototype that any array inherits
console.log(arr.__proto__);
// returns true
console.log(arr.__proto__ === Array.prototype);

// we can see that the prototype is an object
console.log(arr.__proto__.__proto__);

// we can add to any already made prototype
Array.prototype.unique = function() {
    return [...new Set(this)];
};
// extending the prototype of a built-in object is a bad idea

console.log(arr.unique());

const h1 = document.querySelector('h1');

// /// // // /// // // /// // // /// // // /// // 
// Coding Challenge #1
// /// // // /// // // /// // // /// // // /// //
console.log('----Coding Challenge #1----');

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed}km/h`);
};

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed}km/h`);
};

// let car1 = new Car('Honda', 32);
// let car2 = new Car('Ford', 15);

// car1.accelerate();
// car1.accelerate();
// car2.accelerate();

// car1.brake();
// car2.brake();
// car2.brake();

// car1.accelerate();
// car2.accelerate();
// car2.accelerate();

// car1.brake();
// car1.brake();
// car2.brake();

// /// // // /// // // /// // // /// // // /// // 
// ES6 Classes
// /// // // /// // // /// // // /// // // /// //
console.log('----ES6 Classes----');


// classes in JS don't work in the more traditional sense

// This is a class expression
// const PersonCl = class{

// }

// This is a class declaration
class PersonCl{
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Methods will be added automatically to the .prototype property
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }

    // the setter will be called any time the property name 'fullName' is used in a declaration
    set fullName(name){
        console.log(name);
        // convention is to add an '_' before the property name
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`)
    }

    // however this now overrwites the property name fullName, so we create a getter to solve this
    get fullName(){
        return this._fullName;
    }

    // Static methods
    static hey(){
        console.log('Hey There Static Method!! 👋🏼');
        console.log(this);
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

// returns true
console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function() {
    console.log(`Hey ${this.firstName}`);
};
jessica.greet();

// 1. Classes are not hoisted. function declarations are, meaning that they can be used before they are declared in the code. this is not the case for classes.

// 2. Classes are first class citizens. We can pass them into functions and return them from functions.

// 3. Body of a class is always executed in strict mode

// /// // // /// // // /// // // /// // // /// // 
// Setters and Getters
// /// // // /// // // /// // // /// // // /// //
console.log('----SETTERS & GETTERS----');

// Every object can have a setter and getter property

const account = {
    owner: 'jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    // any setter method needs to have only 1 paramater
    set latest(mov){
        this.movements.push(mov);
    }
};

// we just write it as if it were a property, not a method
console.log(account.latest);

account.latest = 50;
console.log(account.movements);

// /// // // /// // // /// // // /// // // /// // 
// Static Methods
// /// // // /// // // /// // // /// // // /// //
console.log('----STATIC METHODS----');

// eg Array.from() is attached to the Array object constructor and cannot be called from any array as a method.

// ie Array.from([1, 2, 3]);
// OR Number.parseFloat(12);

Person.hey = function(){
    console.log('Hey There Static Method!! 👋🏼');
    console.log(this);
}

// This is NOT inherited
Person.hey();
// alex.hey(); Therefore this will not work

// /// // // /// // // /// // // /// // // /// // 
// Object.create
// /// // // /// // // /// // // /// // // /// //
console.log('----Object.create----');

// we can use Object.create to manually set the prototype of an object to any other object we want

// recreate the person class
// as an object literal
const personProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

// we pass in the prototype that we want
const steven = Object.create(personProto);
console.log(steven);
// adding properties as object literals, this is replaced by using the init function
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

// returns true
console.log(steven.__proto__ === personProto);


const sarah = Object.create(personProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// /// // // /// // // /// // // /// // // /// // 
// Coding challenge #2
// /// // // /// // // /// // // /// // // /// //
console.log('----Coding Challenge #2----');

// 1.

class CarCl{
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        this.speed += 10;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }

    brake(){
        this.speed -= 5;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }

    get speedUS(){
        return (this.speed / 1.6);
    }

    set speedUS(speedMi){
        this.speed = speedMi * 1.6;
    }
}

const car1 = new CarCl('Honda', 30);
console.log(car1);

car1.accelerate();
car1.accelerate();

car1.brake();
car1.accelerate();

console.log(car1.speedUS);

// /// // // /// // // /// // // /// // // /// // 
// Inheritance Between Classes: Constructors
// /// // // /// // // /// // // /// // // /// //

// inheritance - the child classes can share properties / functions with its parent class

console.log('----Inheritance Between Classes: Constructors----');

const Person2 = function (firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person2.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course){
    Person2.call(this, firstName, birthYear);
    this.course = course;
};

Student.prototype = Object.create(Person2.prototype);

Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

// the constructor of Student is still person so...
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// /// // // /// // // /// // // /// // // /// // 
// Coding Challenge #3
// /// // // /// // // /// // // /// // // /// //
console.log('----Coding Challenge #3----');

const EV = function(make, speed, charge){
    // call the constructor of Car first
    Car.call(this, make, speed);
    // then add additions to the constructor
    this.charge = charge;
};

// set the prototype of the child to that of the parent Car
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
};

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
};

const eCar1 = new EV('Tesla', 30, 89);
const eCar2 = new EV('Honda', 43, 100);

eCar1.accelerate();
eCar2.accelerate();

eCar1.brake();
eCar2.brake();

eCar1.chargeBattery(100);
eCar2.chargeBattery(100);

eCar1.accelerate();
eCar2.accelerate();

// /// // // /// // // /// // // /// // // /// // 
// Inheritance Betweeen Classes: ES6
// /// // // /// // // /// // // /// // // /// //
console.log('----Inheritance Betweeen Classes: ES6----');

// to use unheritance using the ES6 classes syntax, we just use the 'extends' keyword

class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        // super is basically the constructor of the parent class
        // ALways needs to happen first as it responsible for creating the this keyword
        super(fullName, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.firstName} and I study ${this.course}`);
    }

    calcAge(){
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student i feel more like ${2037 - this.birthYear + 10} years old.`);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// /// // // /// // // /// // // /// // // /// // 
// Inheritance Betweeen Classes: Object.create
// /// // // /// // // /// // // /// // // /// //

console.log('----Inheritance Betweeen Classes: Object.create----');

// const personProto = {
//     calcAge(){
//         console.log(2037 - this.birthYear);
//     },

//     init(firstName, birthYear){
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

const steph = Object.create(personProto);

// if we want to implement inheritance, we first make a prototype from the prototype we want to use. In this case it is studentProto, this creates the parent / child relationship

const StudentProto = Object.create(personProto);

StudentProto.init = function(firstName, birthYear, course){
    personProto.init.call(this, firstName, birthYear);
}

StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('jay', 2018, 'Computer Science');
jay.introduce();
jay.calcAge();

// /// // // /// // // /// // // /// // // /// // 
// Another Class Example
// /// // // /// // // /// // // /// // // /// //
console.log('----Another Class Example----');

// public fields
// private fields
// public methods
// private methods

class Account{
    // 1) Public fields (instance)
    locale = navigator.language; // how to define a public field
    _movements = [];

    // 2) Private Fields, only works in chrome
    // #movements = [];
    // #pin;

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        // _ means protected property
        this._movements = [];
        // this.locale = navigator.language;
    }

    // public interface
    getMovements(){
        return this._movements;
    }

    deposit(val){
        this._movements.push(val);
        return this; // to allow for chaining
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }

    _approveLoan(val){
        return true;
    }

    requestLoan(val){
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log('loan approved');
            return this;
        }
    }

    static helper(){
        // static won't be on all the instances, just the parent class
    }

    // 4) Private Methods - No browser supports this
    // #approveLoan(val){
    //     return true;
    // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// a bad idea, use methods to interact with properties
// acc1.movements.push(250);
// acc1.movements.push(-140);
// console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);

// the pin is stilll accessible outside of the class
console.log(acc1.pin);

// /// // // /// // // /// // // /// // // /// // 
// Protected Properties and Methods
// /// // // /// // // /// // // /// // // /// //
console.log('----Protected Properties and Methods----');

// to prevent code from outside the class from interfering with data inside the class

// Added  a _ to the beginning or properties should be kept private, these are called 'protected'
// added methods to act as an interface to interact with these properties

// /// // // /// // // /// // // /// // // /// // //
// Encapsulation: Private Class Fields and Methods
// /// // // /// // // /// // // /// // // /// // //
console.log('----Encapsulation: Private Class Fields and Methods----');

// console.log(acc1.#pin);

// /// // // /// // // /// // // /// // // /// // 
// Chaining Methods
// /// // // /// // // /// // // /// // // /// //
console.log('----Chaining Methods----');

// to allow for chaining our methods must return the account. ie You cannot call deposit on deposit when it returns undefined.
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

// /// // // /// // // /// // // /// // // /// // 
// ES6 Classes Summary
// /// // // /// // // /// // // /// // // /// //
console.log('----ES6 Classes Summary----');

// /// // // /// // // /// // // /// // // /// // 
// Coding Challenge #4
// /// // // /// // // /// // // /// // // /// //
console.log('----Coding Challenge #4----');

class EVCl extends CarCl{
    constructor(make, speed, charge){
        super(make, speed);
        this._charge = charge;
    }

    chargeBattery(chargeTo){
        this._charge = chargeTo;
        return this;
    }

    accelerate(){
        this.speed += 20;
        this.charge--;
        console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this._charge}%`);
        return this;
    }
}

const eCar3 = new EVCl('Tesla', 30, 89);
const eCar4 = new EVCl('Honda', 43, 100);

eCar3.accelerate();
eCar4.accelerate();

eCar3.brake();
eCar4.brake();

eCar3.chargeBattery(100);
eCar4.chargeBattery(100);

eCar3.accelerate();
eCar4.accelerate();