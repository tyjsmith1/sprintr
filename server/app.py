#!/usr/bin/env python3

# Standard library imports

# Business logic
from sprint_analytics import calculate_sprint_analytics

# Remote library imports
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource
from datetime import date
from werkzeug.security import check_password_hash, generate_password_hash

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
        username = form_data['username']
        password = form_data['password']
        role = form_data.get('role','backend')
        user_capacity = form_data.get('user_capacity', 50)

        new_user = User(username=username, role=role, user_capacity=user_capacity)
        new_user.set_password(password)
        try:
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
        except Exception as e:
            db.session.rollback()
            res = jsonify({"error": "Failed to create user", "message": str(e)}), 500
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

#########################################################
#                                                       #
#                   DEMO SECTION                        #
#                                                       #
#########################################################

####>>>>LOGIN -- POST<<<<####   
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid username or password"}), 401


## _______________ Ticket ROUTES _______________ ##
@app.route('/tickets', methods=['GET','POST'])
def tickets():
####>>>>GET<<<<####
    if request.method == 'GET':
        tickets = Ticket.query.all()
        ### Figure this out later -- serious spaghetti code
        ticket_response_body = [ticket.to_dict(only=("id", "title", "status", "category", "body", "urgency", "story_points", "created_at", "completed_at", "assignee_user_id", "author_user_id", "sprint_id",)) for ticket in tickets]

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

        ticket_response_body = new_ticket.to_dict(only=("id", "title", "status", "category", "body", "urgency", "story_points", "created_at", "completed_at", "assignee_user_id", "author_user_id", "sprint_id",))

        res = make_response(
            ticket_response_body,
            201
        )
    return res

@app.route('/tickets/<int:id>', methods=['GET','DELETE','PATCH'])
def ticket_by_id(id):
####>>>>GET<<<<####
    if request.method == 'GET':
        ticket_details = Ticket.query.join(
                User, Ticket.assignee_user_id == User.id
            ).add_columns(
                Ticket.id,
                Ticket.title,
                Ticket.body,
                Ticket.urgency,
                Ticket.assignee_user_id,
                User.username.label('assigned_username')
            ).filter(Ticket.id == id).first()
        if ticket_details:
            response ={
                'id': ticket_details.id,
                'title': ticket_details.title,
                'body': ticket_details.body,
                'urgency': ticket_details.urgency,
                'assignee_user_id': ticket_details.assignee_user_id,
                'assigned_username': ticket_details.assigned_username
            }
            res = make_response(jsonify(response), 200)

####>>>>DELETE<<<<####   
    elif request.method == 'DELETE':
        ticket = Ticket.query.filter(Ticket.id == id).first()
        db.session.delete(ticket)
        db.session.commit()

        res = make_response(
            {},
            204
        )
####>>>>PATCH<<<<####    
    elif request.method == 'PATCH':
        ticket = Ticket.query.filter(Ticket.id == id).first()
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(ticket,attr,form_data[attr])

            db.session.commit()
            ticket_body_res = ticket.to_dict(only=("id", "title", "status", "category", "body", "urgency", "story_points", "created_at", "completed_at", "assignee_user_id", "author_user_id", "sprint_id",))

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
        sprints_body_res = [sprint.to_dict(only=('id','start_date','end_date')) for sprint in sprints]

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

@app.route('/sprints/<int:id>',methods=['GET','PATCH','DELETE'])
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
####
    if request.method == 'DELETE':
        db.session.delete(sprint)
        db.session.commit()

        res = make_response(
            {},
            204
        )
    
    return res

#########################################################
#                                                       #
#                   DEMO SECTION                        #
#                                                       #
#########################################################


####>>>>ANALYTICS<<<<####
@app.route('/sprints/<int:sprint_id>/analytics', methods=['GET'])
def get_sprint_analytics(sprint_id):
    sprint = Sprint.query.get_or_404(sprint_id)
    tickets = Ticket.query.filter(Ticket.sprint_id == sprint_id).all()

    analytics = calculate_sprint_analytics(sprint, tickets)

    return jsonify(analytics)

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
####>>>>GET<<<<####
    if request.method == 'GET':
        ticket_logs = (TicketLog.query
                        .join(User, TicketLog.author_user_id == User.id)
                        .filter(TicketLog.ticket_id == id)
                        .all()
        )
        
        ticket_logs_res = [{
            'id': log.id,
            'comment_text': log.comment_text,
            'author_user_id': log.author_user_id,
            'ticket_id': log.ticket_id,
            'username': log.user.username
        } for log in ticket_logs]

        res = make_response(
            ticket_logs_res,
            200
        )
####>>>>DELETE<<<<####
    if request.method == 'DELETE':
        ticket_log = TicketLog.query.filter(TicketLog.id == id).first()
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

#########################################################
#                                                       #
#                   DEMO SECTION                        #
#                                                       #
#########################################################


## _______________ Analytics ROUTES _______________ ##
@app.route('/contributor-data')
def get_contributor_data():
    joined_data = db.session.query(Ticket, User).join(User, Ticket.assignee_user_id == User.id).all()
    result = []
    for ticket, user in joined_data:
        result.append({
            'ticket_id': ticket.id,
            'user_id': user.id,
            'username': user.username,
            'storypoints': ticket.story_points,
            'ticket_status': ticket.status
        })
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=5555, debug=True)