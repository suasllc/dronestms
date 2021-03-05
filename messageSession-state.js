/* eslint-disable max-classes-per-file */

const { User, DirectMessage } = require('./db/models');
const { Op } = require('sequelize');
const { convoKeyFromUserArray, userArrayFromConvoKey } = require('./utils');
const e = require('express');



class Person {
  constructor(id, username, site, ws) {
    this.id = id;
    this.username = username;
    this.site = site;
    this.ws = ws;
  }

  getData() {
    return {
      id: this.id,
      username: this.username,
      site: this.site,
    };
  }
}

class MessageSession {
  #peeparr = [];
  constructor(person) {
    this.styles = ['lightblue', 'lightgray'];
    this.messages = [];
    this.peopleIdObj = {};
    this.peopleIdObj[`${person.id}`] = person.username;
    this.peopleUnObj = {};
    this.peopleUnObj[`${person.username}`] = person.id;
    this.peopleArr = [person];
    this.latestMessage = {};
    this.conversations = {};
  }

  // get messageSessionOver() {
  // }

  addPerson(person){
    this.peopleIdObj[`${person.id}`] = person.username;
    this.peopleUnObj[`${person.username}`] = person.id;
    this.peopleArr.push(person);
  }

  getPersons() {
    // return this.peopleIdObj;
    return this.peopleArr;
  }


  getData(convoKey = undefined) {
    const data = {
      //TODO optimize this!
      peopleIdObj: this.peopleIdObj,
      peopleUnObj: this.peopleUnObj,
      // peopleArr: this.peopleArr.map(p => p.getData()),
      messages: [],
      // conversations: this.conversations,
    };

    if(convoKey){
      const msgs = this.getConversationMessages(convoKey);
      if(msgs)
        data.messages = msgs;
    }

    return data;
  }

  getConversationMessages(convoKey){
    //TODO: also make sure username matchs
    const arr = userArrayFromConvoKey(convoKey).map(el => el.id);
    const msgs = this.messages.filter(m => arr.includes(m.senderId) && 
      m.receiverIds.every(id => arr.includes(id)));
    if(msgs && msgs.length) {
      return [msgs.pop()];
    }
  }

  async checkDB() {
    const p1 = await User.findOne({
      where: {
        username: this.peopleArr[0].username
      },
      include: [{ model: DirectMessage, as: 'sent' }, { model: DirectMessage, as: 'received' }]
    });

    // const person = await JSON.parse(p1);
    console.log("person 1", p1.toJSON().sent);
  }
}

module.exports = {
  MessageSession,
  Person,
};
