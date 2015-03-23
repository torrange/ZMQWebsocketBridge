//make `wsUri` a variable
// var wsUri = "ws://127.0.0.1:8000/echo";
var wsUri = "ws://127.0.0.1:8000/zmqfeed";
var output;

function init()
{
  feeder = document.getElementById("testfeedcards")
  countid = 0
  launchWebSocket();
}

function launchWebSocket()
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
  launchWebSocket()
}

function onMessage(evt)
{
  packet = evt.data.split("::")[1]
  jdata = JSON.parse(packet)
  username = jdata["username"]
  text = jdata["text"]
  favorite = jdata["favorite"]
  uid = jdata["uid"]
  avatar = jdata["avatar"]
  html = '<feed-card id=' + '"card' + countid + '"' + ' favorite="' + favorite + '">' + 
  '<img src="' + avatar + '" width="70" height="70">' +
  '<h2>' + username + '</h2>'+ '<p>' + text + '</p>' + '</feed-card>';
  writeToFeed(html);
  countid += 1
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
  feeder.innerHTML = message + feeder.innerHTML;
}

window.addEventListener("load", init, false);