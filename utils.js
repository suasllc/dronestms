const sortThroughIds = (el1, el2) => !el1.id ? -1 : (!el2.id ? 1 : (el1.id < el2.id ? -1 : 1));
const convoKeyFromUserArray = arr => Array.from(new Set(arr.sort(sortThroughIds).map(el => JSON.stringify(el).replaceAll(':', '::'))));
const userArrayFromConvoKey = key => Array.isArray(key) ? key.map(el => JSON.parse(el.replaceAll? el.replaceAll('::', ':') : el)) : key;

module.exports = { convoKeyFromUserArray, userArrayFromConvoKey };