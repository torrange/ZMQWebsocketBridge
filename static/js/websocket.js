//make `wsUri` a variable
var wsUri = "ws://127.0.0.1:8000/echo";
var output;

function init()
{
  output = document.getElementById("output");
  feeder = document.getElementById("testfeedcards")
  testWebSocket();
}

function testWebSocket()
{
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  var log_entry = "Connected"
  console.log(log_entry)
}

function onClose(evt)
{
  var log_entry = "Disconnected"
  console.log(log_entry)
}

function onMessage(evt)
{
  jdata = JSON.parse(evt.data)
  data = evt.data
  username = jdata["username"]
  text = jdata["text"]
  favorite = jdata["favorite"]
  uid = jdata["uid"]
  avatar = jdata["avatar"]
  //writeToScreen('<span style="color: blue;">' + text+'</span>');
  writeToFeed('<feed-card>' + '<p>' + text + '</p>' + '</feed-card>');
}

function onMessageFeed(evt)
{
  //writeToFeed()
}

function onError(evt)
{
  var log_entry = "Error"
  console.log(log_entry)
}

function doSend(message)
{ 
  websocket.send(message);
}

function writeToScreen(message)
{
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

function writeToFeed(message)
{
  feeder.innerHTML += message;
}

window.addEventListener("load", init, false);