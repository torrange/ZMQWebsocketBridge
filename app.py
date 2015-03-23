#!/usr/bin/env python2

from flask import Flask, request, render_template
from flask_sockets import Sockets
from time import sleep
from json import loads, dumps
import zmq


app = Flask(__name__)
sockets = Sockets(app)
context = zmq.Context()
socket = context.socket(zmq.SUB)


def socket_connect(addr, port):
    socket.connect("tcp://%s:%s" % (addr, port))

#WebSockets Routes
@sockets.route('/echo')
def echo_socket(ws):
    while True:
        #message = ws.receive()
        posts = loads(open("./static/json/posts.json").read())
        for post in posts:
        	_post = dumps(post)
        	ws.send(_post)
        	sleep(2)


@sockets.route('/zmqfeed')
def zmq_socket(ws):
    socket_connect("127.0.0.1", "5999")
    socket.setsockopt(zmq.SUBSCRIBE, "001")
    while True:
        message = socket.recv()
        ws.send(message)



#App Routes
@app.route("/")
def main():
	return render_template("index.html")

@app.route("/posts")
def posts():
	posts = open("./static/json/posts.json").read()
	return(posts)