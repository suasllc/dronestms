
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const morgan = require('morgan');
const WebSocket = require('ws');

const { port } = require('./config');
const { MessageSession, Person } = require('./messageSession-state');
const { User, DirectMessage } = require('./db/models');
const { convoKeyFromUserArray, userArrayFromConvoKey } = require('./utils');



const app = express();

const db = require('./db/models');

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '/public')));

// app.get('*', async (req, res) => {
//   // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   let result = "";
//   try {
//     result = await db.sequelize.authenticate();
//   } catch (e) {
//     result = 'failted to db authorize';
//   } try {
//     const demomessage = await DirectMessage.findByPk(1);
//     res.json({ demomessage });
//   } catch (e) {
//     res.json({ error: e, db_url: process.env.use_env_variable, result })

//   }
// });

const server = createServer(app);

const wss = new WebSocket.Server({ server });

let messageSession = null;

const broadcastMessage = (type, data, persons) => {
  const message = {
    type,
    data,
  };

  persons.forEach((person) => {
    // console.log(person.ws.readyState);
    //TODO: broadcast to only the person in the conversation
    if (person && person.ws && person.ws.readyState === 1) {
      if (message.data.messages && message.data.messages.length) {
        if (message.data.messages[0].senderId !== person.id) {
          message.data.messages[0].receiverId = person.id;
          message.data.messages[0].receiverName = person.username;
        }
      }

      console.log('Broadcasting message:');
      console.log(message);
      console.log(JSON.stringify(message));

      person.ws.send(JSON.stringify(message), (err) => {
        if (err) {
          // TODO Handle errors.
          console.error(err);
        }
      });
    }
  });
};

const startMessageSession = async () => {
  const data = messageSession.getData();
  //TODO: send the previous message in the convo if user participated in a previous convo
  // await messageSession.checkDB();
  const personToBroadcastTo = messageSession.peopleArr[messageSession.peopleArr.length - 1];
  broadcastMessage('start-message-session', data, [personToBroadcastTo]);
};

const updateListOfOnlineUsers = async () => {
  const data = messageSession.peopleArr.map(p => p.getData());
  //TODO: send the list of online people when they are only on the followers or following list
  // await messageSession.checkDB();
  broadcastMessage('update-online-user-list', data, messageSession.peopleArr);
};

const addNewPerson = (id, username, ws) => {
  const person = new Person(id, username, ws);

  if (messageSession === null) {
    messageSession = new MessageSession(person);
  } else {
    if (!messageSession.peopleIdObj[`${person.id}`]) {
      messageSession.addPerson(person);
    }
  }
  if (messageSession.peopleArr.length >= 1) {
    startMessageSession();
    updateListOfOnlineUsers();
  } else {
    ws.close();
  }
};

const pushChatMsgs = (chatData) => {
  const persons = messageSession.getPersons();
  const people = [];
  let { senderId, senderName, receiverIds, receiverNames } = chatData;
  if (receiverIds.length !== receiverNames.length) return;
  // const key = new Set([senderId, receiverId]);
  const receiverArr = receiverIds.map((id, i) => ({ id, username: receiverNames[i] }));
  const key = convoKeyFromUserArray([{ id: senderId, username: senderName }, ...receiverArr]);
  const data = messageSession.getData(key);
  if (messageSession.conversations[key]) {
    console.log('109 messageSession.conversations[key]', messageSession.conversations[key]);
    const arr = userArrayFromConvoKey(key);
    console.log('arr', arr);
    arr.forEach(el =>
      people.push(persons.find(p => p.id === el.id && p.username === el.username))
    );
  } else {
    if (senderId && receiverIds.length && (!receiverIds.includes(senderId))) {
      messageSession.conversations[key] = {
        usernames: [senderName, ...receiverNames],
        userIds: [senderId, ...receiverIds],
      };

      //TODO add this later
      // } else {
      //   if(senderId){
      //     people.push(persons.find(p => p.id === senderId))
      //   }
    }
  }
  console.log('People', people.map(el => el.id));
  if (people.length > 1) broadcastMessage('update-message-session', data, people);
};


const recordChat = async (chatData) => {
  // console.log('\n\n\nBefore: chatData', chatData);
  // let latestMessage;
  // let i = 0;
  // while (!latestMessage && (i++ < 10)) {
  //   await new Promise(r => setTimeout(r, 100));
  //   latestMessage = await DirectMessage.findAll({
  //     limit: 1,
  //     where: {
  //       senderId: chatData.senderId,
  //       receiverId: chatData.receiverId,
  //       message: JSON.stringify(chatData.message)
  //     },
  //     order: [['createdAt', 'DESC']]
  //   });
  //   if (latestMessage && latestMessage[0]) {
  //     console.log(i, "\nlatestMessage", latestMessage[0].toJSON());
  //     // messageSession.messages.push(chatData);
  //     messageSession.messages.push(latestMessage[0].toJSON());
  //     return pushChatMsgs(latestMessage[0].toJSON());
  //   }
  // }
  //For standalone applications
  messageSession.messages.push(chatData);
  return pushChatMsgs(chatData);
}

const addAChatFriend = (data) => {
  const { myId, myUsername, friendId, friendUsername, convoKey } = data;
  // console.log(messageSession.peopleUnObj[username]);
  if (messageSession) {
    let myself, friend;
    if (messageSession.peopleUnObj[myUsername] !== undefined) {
      myself = messageSession.peopleArr.find(p => p.username === myUsername).getData();
      if (myself.id !== myId) return; //Error, my data not matched
      if (myself) {
        console.log("myself", myself);
        // const convoKey = new Set()
        // messageSession.conversations.push();
      }
    }
    if (messageSession.peopleUnObj[friendUsername] !== undefined) {
      friend = messageSession.peopleArr.find(p => p.username === friendUsername).getData();
      if (friend.id !== friendId) return; //Error, friend data not matched
      if (friend) {
        console.log("friend", friend);
        // const convoKey = new Set()
        // messageSession.conversations.push();
      }
    }
    if (myself && friend && (myself !== friend)) {
      // if (messageSession.conversations[convoKey]) {
      //   messageSession.conversations[convoKey].usernames.push(friend.username);
      //   messageSession.conversations[convoKey].userIds.push(friend.id);
      // } else {
      // const newconvoKey = new Set([myself.id, myself.username, friend.id, friend.username]);
      const newconvoKey = convoKeyFromUserArray([myself, friend]);
      messageSession.conversations[newconvoKey] = {
        usernames: [myself.username, friend.username],
        userIds: [myself.id, friend.id],
      };
      // }
      console.log(messageSession.conversations);
    }
  }
}

//Processing incoming message {"type":"chat-message","data":{"username":"p2","message":"hi there"}}
const processIncomingMessage = (jsonData, ws) => {
  // console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  switch (message.type) {
    case 'add-new-person':
      addNewPerson(message.data.userId, message.data.username, ws);
      break;
    case 'chat-message':
      recordChat(message.data, ws);
      break;
    case 'add-chat-friend':
      addAChatFriend(message.data);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

wss.on('connection', (ws) => {
  ws.on('message', (jsonData) => {
    processIncomingMessage(jsonData, ws);
  });

  ws.on('close', () => {
    if (!messageSession) return;
    const personLeft = messageSession.peopleArr.find(p =>
      p.ws === ws
    )

    if (personLeft) {
      messageSession.peopleArr = messageSession.peopleArr.filter(p =>
        p.ws !== ws
      )
      delete messageSession.peopleIdObj[personLeft.id];
      delete messageSession.peopleUnObj[personLeft.username];
      for (let key in messageSession.conversations) {
        if (messageSession.conversations[key].userIds.includes(personLeft.id)) {
          delete messageSession.conversations[key];
        }
      }
    }
    if (!messageSession.peopleArr.length) {
      messageSession = null;
    }
    console.log('closed');
  });
});


server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
