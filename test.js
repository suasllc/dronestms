
// `compress` takes a unicode string and returns a base64 string
// `decompress` takes that base64 string and returns the original unicode string

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


// lastMessage = {"blocks":[{"key":"3v2g0","text":"fsdfsd342423","type":"usernamestyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};


// const set1 = new Set([1, 2, 3]);
// const set2 = new Set([2, 3, 4]);

// const obj = {};
// obj[`${JSON.stringify(set1)}`] = "set1";
// obj[`${JSON.stringify(set2)}`] = "set2";

// console.log(obj, JSON.stringify(set1));
// console.log(obj[JSON.stringify(set1)], set1);
// console.log(obj[JSON.stringify(set2)], set2);

const sortThroughIds = (el1, el2) => !el1.id ? -1 : (!el2.id ? 1 : (el1.id < el2.id ? -1 : 1));
const array3 = [{ site: "dronest.com" }, { id: 1, username: "tony" }, { id: 2, username: "daniel" }, { id: 3, username: "Jesse" }];
const array4 = [{ site: "dronest.com" }, { id: 2, username: "daniel" }, { id: 3, username: "Jesse" }, { id: 4, username: "Joe" }, { id: 5, username: "Sami" }];
let array5 = [];

const arr5 = [{ id: 3, username: "Jesse" }, { id: 3, username: "Jesse" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 5, username: "Sami" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 5, username: "Sami" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 5, username: "Sami" },
{ id: 5, username: "Sami" },
{ site: "dronest.com" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 4, username: "Joe" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" }, { id: 4, username: "Joe" }, { id: 2, username: "daniel" },
{ id: 5, username: "Sami" },
{ id: 5, username: "Sami" },
{ site: "dronest.com" }
];
// arr5.forEach(el => array5.push(el));
array5 = arr5;
array5.push({ id: 6, username: "Michelle" })

const keyFromUserArray = arr => Array.from(new Set(arr.sort(sortThroughIds).map(el => JSON.stringify(el).replaceAll(':', '::'))));
const arrayFromConvoKey = key => Array.isArray(key) ? key.map(el => JSON.parse(el.replaceAll('::', ':'))) : key;

const key3 = keyFromUserArray(array3);
const key4 = keyFromUserArray(array4);
const key5 = keyFromUserArray(array5);

// console.log('array3', array3);
// console.log('array4', array4);
// console.log('array5', array5);
console.log('key3', key3);
console.log('key4', key4);
console.log('key5', key5);
console.log('parsed: key3', arrayFromConvoKey(key3));
console.log('parsed: key4', arrayFromConvoKey(key4));
console.log('parsed: key5', arrayFromConvoKey(key5));
const obj2 = {};
obj2[key3] = "array3";
obj2[key4] = "array4";
obj2[key5] = arrayFromConvoKey(key5);

console.log(obj2[key3], obj2[key5] === obj2[key3]);
console.log(obj2[key4], obj2[key3] === obj2[key4]);
console.log(obj2[key5], obj2[key5] === obj2[key4]);

console.log(obj2);


// const encoder = new TextEncoder();
// const view = encoder.encode(key5);
// console.log(view, view.length, key5.reduce((acum, el) => acum += el.length, 0)); // Uint8Array(3) [226, 130, 172]


// console.log(key5.toString());
// console.log(Buffer.from(key5.toString()).toString('binary'));

// const encoded = key5.map(el => Buffer.from(el).toString('base64'));
// console.log('encoded', encoded);
// const decoded = encoded.map(el => Buffer.from(el, 'base64').toString('ascii'))
// console.log('decoded', decoded);
// console.log('decoded', arrayFromConvoKey(decoded));


// var raw_text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
 
// var hm = new jsscompress.Hauffman();
// var compressed = hm.compress(raw_text);
 
// console.log("before compressed: " + raw_text);
// console.log("length: " + raw_text.length);
// console.log("after compressed: " + compressed);
// console.log("length: " + compressed.length);
 
// console.log("decompressed: " + hm.decompress(compressed));