#!/usr/bin/env python2

from flask import Flask, request, render_template
from flask_sockets import Sockets
from time import sleep
from json import loads, dumps

app = Flask(__name__)
sockets = Sockets(app)


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



#App Routes
@app.route("/")
def main():
	return render_template("index.html")

@app.route("/posts")
def posts():
	posts = open("./static/json/posts.json").read()
	return(posts)