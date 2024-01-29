#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Ticket, TicketContributor, TicketLog, Sprint

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/users', methods = ['GET'])
def get_users():
    users = User.query.all()
    users_body = [user.to_dict() for user in users]
    res = make_response(
        users_body,
        200
    )

    return res

if __name__ == '__main__':
    app.run(port=5555, debug=True)