
// class User{
//   constructor(username){
//     this.username = username;
//   }

//   get userName(){ //Notice the getter is userName, different from this.username
//     //otherwise it complains saying Maximum call stack size exceeded 
//     return this.username;
//   }
//   set userName(newUsername){//Notice the setter is userName, different from this.username
//     //otherwise it complains saying Maximum call stack size exceeded 
//     this.username = newUsername;
//   }
// }

// const joe = new User('joe');

// console.log(joe.userName, joe.username); //Output: joe joe
// joe.userName = 'jesse';
// console.log(joe.userName, joe.username); //Output: jesse jesse

// class TestPrivate{
//   #p = 3; //private object property (not class property)
//   constructor(v1, v2){
//     this.v1 = v1;
//     this.v2 = v2;
//   }

//   getP(){
//     return this.#p;
//   }
//   incP(v = 1){
//     this.#p += v;
//   }
// }

// let t = new TestPrivate(1, 2);
// console.log(t.v1, t.v2);
// console.log(t.getP());
// t.incP(2);
// console.log(t.getP());

// let t2 = new TestPrivate(1, 2);
// console.log(t2.v1, t2.v2);
// console.log(t2.getP());


// lastMessage = {"blocks":[{"key":"3v2g0","text":"fsdfsd342423","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};


// const set1 = new Set([1, 2, 3]);
// const set2 = new Set([2, 3, 4]);

// const obj = {};
// obj[`${JSON.stringify(set1)}`] = "set1";
// obj[`${JSON.stringify(set2)}`] = "set2";

// console.log(obj, JSON.stringify(set1));
// console.log(obj[JSON.stringify(set1)], set1);
// console.log(obj[JSON.stringify(set2)], set2);

const sortThroughIds = (el1, el2) => el1.id < el2.id ? -1 : 1;
const array3 = [{ id: 1, un: "tony", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 3, un: "Jesse", st: "dronest.com" }];
const array4 = [{ id: 2, un: "daniel", st: "dronest.com" }, { id: 3, un: "Jesse", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }];
let array5 = [];

const arr5 = [{ id: 3, un: "Jesse", st: "dronest.com" }, {id: 3, un: "Jesse", st: "dronest.com" }, 
  { id: 4, un: "Joe", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" },
  { id: 4, un: "Joe", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" },
  { id: 4, un: "Joe", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" },
  { id: 4, un: "Joe", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" },
  { id: 4, un: "Joe", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" }, { id: 4, un: "Joe", st: "dronest.com" }, { id: 2, un: "daniel", st: "dronest.com" },
];
// arr5.forEach(el => array5.push(el));
array5 = arr5;

const keyFromArray = arr => Array.from(new Set(arr.sort(sortThroughIds).map(el => JSON.stringify(el))));

const key3 = keyFromArray(array3);
const key4 = keyFromArray(array4);
const key5 = keyFromArray(array5);

// console.log('array3', array3);
// console.log('array4', array4);
// console.log('array5', array5);
console.log('key3', key3);
console.log('key4', key4);
console.log('key5', key5);
const obj2 = {};
obj2[key3] = "array3";
obj2[key4] = "array4";

console.log(obj2[key3]);
console.log(obj2[key4]);
console.log(obj2[key5], obj2[key5] === obj2[key4]);


