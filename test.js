
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
const set3 = new Set([{ id: 1, username: "tony" }, { id: 2, username: "daniel" }, { id: 3, username: "Jesse" }]);
const set4 = new Set([{ id: 2, username: "daniel" }, { id: 3, username: "Jesse" }, { id: 4, username: "Joe" }]);
const set5 = new Set([{ id: 3, username: "Jesse" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }]);

const keyFromSet = set => JSON.stringify(Array.from(set).sort(sortThroughIds));

const key3 = keyFromSet(set3);
const key4 = keyFromSet(set4);
const key5 = keyFromSet(set5);

// console.log('set3', set3);
// console.log('set4', set4);
// console.log('set5', set5);
const obj2 = {};
obj2[key3] = "set3";
obj2[key4] = "set4";

console.log(obj2[key3], set3);
console.log(obj2[key4], set4);
console.log(obj2[key5], set5);


