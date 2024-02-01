#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource
from datetime import date

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Ticket, TicketContributor, TicketLog, Sprint

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

## _______________ USER ROUTES _______________ ##
@app.route('/users', methods = ['GET','POST'])
def get_users():
####>>>>GET<<<<####
    if request.method == 'GET':
        users = User.query.all()
        users_body = [user.to_dict(rules=("-assigned_tickets","-authored_tickets","-ticket_logs","-ticket_contributors",)) for user in users]
        res = make_response(
            users_body,
            200
        )
####>>>>POST<<<<####   
    elif request.method == 'POST':
        form_data = request.get_json()
        new_user = User(
            username = form_data['username'],
            role = form_data['role'],
            user_focus = form_data['user_focus'],
            user_capacity = form_data['user_capacity']
        )
        db.session.add(new_user)
        db.session.commit()

        formatted_user_response = new_user.to_dict(
            rules=(
                "-assigned_tickets",
                "-authored_tickets",
                "-ticket_logs",
                "-ticket_contributors",
                ))

        res = make_response(
            formatted_user_response,
            201
        )
    return res

@app.route('/users/<int:id>', methods=['GET','PATCH'])
def users_by_id(id):
    user = User.query.filter(User.id == id).first()

####>>>>GET<<<<####
    if request.method == 'GET':
        user_body_res = user.to_dict(rules=("-assigned_tickets","-authored_tickets","-ticket_logs","-ticket_contributors",))

        res = make_response(
            user_body_res,
            200
        )
####>>>>PATCH<<<<####
    elif request.method == 'PATCH':
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(user,attr,form_data[attr])

            db.session.commit()

            user_body_res = user.to_dict(rules=("-assigned_tickets","-authored_tickets","-ticket_logs","-ticket_contributors",))

            res = make_response(
                user_body_res,
                202
            )
        except ValueError:
            res = make_response(
                { 'errors': ['validation errors'] },
                400
            )
    return res

## _______________ Ticket ROUTES _______________ ##
@app.route('/tickets', methods=['GET','POST'])
def tickets():
####>>>>GET<<<<####
    if request.method == 'GET':
        tickets = Ticket.query.all()
        ticket_response_body = [ticket.to_dict() for ticket in tickets]

        res = make_response(
            ticket_response_body,
            200
        )
####>>>>POST<<<<####
    elif request.method == 'POST':
        form_data = request.get_json()
        new_ticket = Ticket(
            title = form_data['title'],
            status = form_data['status'],
            category = form_data['category'],
            body = form_data['body'],
            urgency = form_data['urgency'],
            story_points = form_data['story_points'],
            created_at = date.today(),
            completed_at = None, ## This will be populated later by PUT
            assignee_user_id = form_data['assignee_user_id'],
            author_user_id = form_data['author_user_id'], ## This will eventually be derived from session
            sprint_id = form_data['sprint_id']
        )
        db.session.add(new_ticket)
        db.session.commit()

        ticket_response_body = new_ticket.to_dict()

        res = make_response(
            ticket_response_body,
            201
        )
    return res

@app.route('/tickets/<int:id>', methods=['GET','DELETE','PATCH'])
def ticket_by_id(id):
    ticket = Ticket.query.filter(Ticket.id == id).first()
####>>>>GET<<<<####
    if request.method == 'GET':
        ticket_body_res = ticket.to_dict()

        res = make_response(
            ticket_body_res,
            200
        )
####>>>>DELETE<<<<####   
    elif request.method == 'DELETE':
        db.session.delete(ticket)
        db.session.commit()

        res = make_response(
            {},
            204
        )
####>>>>PATCH<<<<####    
    elif request.method == 'PATCH':
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(ticket,attr,form_data[attr])

            db.session.commit()
            ticket_body_res = ticket.to_dict()

            res = make_response(
                ticket_body_res,
                202
            )
        except ValueError:
            res = make_response(
                { 'errors': ['validation errors'] },
                400
            )
    return res

## _______________ Sprint ROUTES _______________ ##
@app.route('/sprints', methods=['GET','POST'])
def sprints():
####>>>>GET<<<<####
    if request.method == 'GET':
        sprints = Sprint.query.all()
        sprints_body_res = [sprint.to_dict() for sprint in sprints]

        res = make_response(
            sprints_body_res,
            200
        )
####>>>>POST<<<<####
    if request.method == 'POST':
        # form_data = request.get_json()

        new_sprint = Sprint(
            start_date = date.today(),
            end_date = None
        )
        db.session.add(new_sprint)
        db.session.commit()

        new_sprint_bod = new_sprint.to_dict()

        res = make_response(
            new_sprint_bod,
            201
        )
    return res

@app.route('/sprints/<int:id>',methods=['GET','PATCH'])
def sprints_by_id(id):
    sprint = Sprint.query.filter(Sprint.id == id).first()
####>>>>GET_SINGLE<<<<####  
    if request.method == 'GET':
        sprint_body = sprint.to_dict()
        res = make_response(
            sprint_body,
            200
        )
####>>>>PATCH<<<<####
    if request.method == 'PATCH':
        try:
            sprint.end_date = date.today()

            db.session.commit()
            sprint_body = sprint.to_dict()
            res = make_response(
                sprint_body,
                200
            )
        except ValueError:
            res = make_response(
                { 'errors': ['validation errors'] },
                400
            )
    return res

## _______________ TicketLog ROUTES _______________ ##
@app.route('/ticket-logs',methods=['GET','POST'])
def ticket_logs():
####>>>>GET<<<<####
    if request.method == 'GET':
        tickets = TicketLog.query.all()
        ticket_body = [ticket.to_dict(only = ('id','comment_text','author_user_id','ticket_id',)) for ticket in tickets]
        res = make_response(
            ticket_body,
            200
        )
####>>>>POST<<<<####
    if request.method == 'POST':
        form_data = request.get_json()

        new_ticket_log = TicketLog(
            ticket_id = form_data['ticket_id'],
            author_user_id = form_data['author_user_id'],
            comment_text = form_data['comment_text'],
            status = form_data['status'],
            created_at = date.today()
        )
        db.session.add(new_ticket_log)
        db.session.commit()

        new_ticket_res = new_ticket_log.to_dict(only = ('id','comment_text','author_user_id','ticket_id',))

        res = make_response(
            new_ticket_res,
            201
        )
    return res

@app.route('/ticket-logs/<int:id>', methods = ['GET','DELETE'])
def ticket_log_by_id(id):
    ticket_log = TicketLog.query.filter(TicketLog.id == id).first()
####>>>>GET<<<<####
    if request.method == 'GET':
        ticket_log_res = ticket_log.to_dict(only = ('id','comment_text','author_user_id','ticket_id',))

        res = make_response(
            ticket_log_res,
            200
        )
####>>>>DELETE<<<<####
    if request.method == 'DELETE':
        db.session.delete(ticket_log)
        db.session.commit()

        res = make_response(
            {},
            200
        )

    return res

## _______________ TicketContributors ROUTES _______________ ##
@app.route('/ticket-contributors', methods=['GET','POST'])
def ticket_contributors():
####>>>>GET<<<<####
    if request.method == 'GET':
        ticket_contributors = TicketContributor.query.all()
        ticket_contributors_res = [ticket_contributor.to_dict(only = ('id','ticket_id','user_id',)) for ticket_contributor in ticket_contributors]

        res = make_response(
            ticket_contributors_res,
            200
        )
####>>>>POST<<<<####
    elif request.method == 'POST':
        form_data = request.get_json()

        new_contributor = TicketContributor(
            ticket_id = form_data['ticket_id'],
            user_id = form_data['user_id']
        )
        db.session.add(new_contributor)
        db.session.commit()

        new_contributor_res = new_contributor.to_dict(only = ('id','ticket_id','user_id',))

        res = make_response(
            new_contributor_res,
            201
        )
    return res

@app.route('/ticket-contributors/<int:id>', methods=['DELETE'])
def contributors_by_id(id):
####>>>>DELETE<<<<####
    contributor = TicketContributor.query.filter(TicketContributor.id == id).first()
    db.session.delete(contributor)
    db.session.commit()

    res = make_response(
        {},
        202
    )
    return res

if __name__ == '__main__':
    app.run(port=5555, debug=True)