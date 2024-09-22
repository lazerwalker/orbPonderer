import "dotenv/config.js";
import fetch from 'node-fetch'
import WebSocket from 'ws'

try {
const response = await fetch(`${process.env.SERVER}/api/startPonderingOrbs`, {
  method: 'get',
  headers: { 'userid': process.env.SECRET }
})

const data = await response.json();

if (data.url) {
  const ws = new WebSocket(data.url);
  
  ws.on('error', console.error);
  
  ws.on('open', function open() {
    console.log('connected');
  });
  
  ws.on('message', function message(data) {
    const message = JSON.parse(data)
    if (message.type !== 'chatMessage')  {
      // You may get some extra message spam sent to all users
      return;
    }
    console.log("Received message:", message.value[0])
  });
}

} catch(e) {
  console.error(e)
}