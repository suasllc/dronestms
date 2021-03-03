const sortThroughIds = (el1, el2) => !el1.id ? -1 : (!el2.id ? 1 : (el1.id < el2.id ? -1 : 1));
const keyFromUserArray = arr => Array.from(new Set(arr.sort(sortThroughIds).map(el => JSON.stringify(el).replaceAll(':', '::'))));
const arrayFromConvoKey = key => Array.isArray(key) ? key.map(el => JSON.parse(el.replaceAll('::', ':'))) : key;

module.exports = { keyFromUserArray, arrayFromConvoKey };