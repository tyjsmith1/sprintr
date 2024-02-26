#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker
from datetime import date, timedelta

# Local imports
from app import app
from models import db, User,TicketLog,Ticket,TicketContributor,Sprint

f = Faker()

def create_users():
    users_data = [
        {"id": 1, "username": "Tyler", "role": "backend", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 2, "username": "Joel", "role": "frontend", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 3, "username": "Lisa", "role": "frontend", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 4, "username": "Nate", "role": "backend", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 5, "username": "Roberto", "role": "sales", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 6, "username": "Cory", "role": "sales", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 7, "username": "Dana", "role": "support", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 8, "username": "Alysha", "role": "support", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 9, "username": "Flynn", "role": "leadership", "user_capacity": 50, "password": "defaultPassword"},
        {"id": 10, "username": "Stephanie", "role": "leadership", "user_capacity": 50, "password": "defaultPassword"},
    ]

    for user_data in users_data:
        user = User(
            username = user_data["username"],
            role = user_data["role"],
            user_capacity = user_data["user_capacity"]
        )
        user.set_password(user_data["password"])
        db.session.add(user)

def create_sprint():
    sprint = Sprint.query.filter_by(id=1).first()
    if not sprint:
        sprint = Sprint(
            id=1,
            start_date=date(2024, 2, 1),
            end_date=None
        )
        db.session.add(sprint)

def create_tasks():
    tasks = [
        {"title": "Implement User Authentication", "status": "complete", "category": "backend", "body": "Implement secure user login and registration", "urgency": "high", "story_points": 8, "assignee_user_id": 1, "author_user_id": 9},
        {"title": "Database Schema Design", "status": "complete", "category": "backend", "body": "Design initial database schema for the project", "urgency": "high", "story_points": 5, "assignee_user_id": 4, "author_user_id": 9},
        {"title": "Setup Continuous Integration", "status": "complete", "category": "backend", "body": "Setup CI pipeline for automated testing", "urgency": "med", "story_points": 13, "assignee_user_id": 2, "author_user_id": 10},
        {"title": "Frontend Framework Selection", "status": "complete", "category": "frontend", "body": "Evaluate and select a frontend framework", "urgency": "low", "story_points": 3, "assignee_user_id": 3, "author_user_id": 10},
        {"title": "Implement Landing Page", "status": "complete", "category": "frontend", "body": "Create the landing page according to the design specs", "urgency": "high", "story_points": 8, "assignee_user_id": 2, "author_user_id": 10},
        {"title": "User Feedback System", "status": "to_do", "category": "frontend", "body": "Develop a system for collecting user feedback", "urgency": "med", "story_points": 5, "assignee_user_id": 3, "author_user_id": 9},
        {"title": "Implement Email Service", "status": "complete", "category": "backend", "body": "Setup an email service for notifications", "urgency": "med", "story_points": 3, "assignee_user_id": 4, "author_user_id": 10},
        {"title": "Optimize Database Queries", "status": "in_progress", "category": "backend", "body": "Review and optimize current database queries for performance", "urgency": "high", "story_points": 13, "assignee_user_id": 1, "author_user_id": 9},
        {"title": "Refactor Authentication Logic", "status": "complete", "category": "backend", "body": "Refactor the existing authentication logic to improve security", "urgency": "high", "story_points": 8, "assignee_user_id": 4, "author_user_id": 9},
        {"title": "Implement Cache Strategy", "status": "to_do", "category": "frontend", "body": "Design and implement a caching strategy for the application", "urgency": "med", "story_points": 5, "assignee_user_id": 1, "author_user_id": 10},
        {"title": "Automate Deployment Process", "status": "complete", "category": "backend", "body": "Automate the current manual deployment process", "urgency": "med", "story_points": 8, "assignee_user_id": 2, "author_user_id": 9},
        {"title": "Security Audit", "status": "complete", "category": "backend", "body": "Conduct a security audit to identify potential vulnerabilities", "urgency": "high", "story_points": 13, "assignee_user_id": 3, "author_user_id": 10},
        {"title": "User Profile Management", "status": "in_progress", "category": "frontend", "body": "Develop the user profile management feature", "urgency": "med", "story_points": 8, "assignee_user_id": 2, "author_user_id": 9},
        {"title": "Implement Logging Framework", "status": "complete", "category": "frontend", "body": "Set up a logging framework for backend services", "urgency": "low", "story_points": 3, "assignee_user_id": 4, "author_user_id": 9},
        {"title": "Responsive Design for Mobile", "status": "complete", "category": "frontend", "body": "Ensure the website is responsive and mobile-friendly", "urgency": "high", "story_points": 5, "assignee_user_id": 3, "author_user_id": 10},
        {"title": "API Rate Limiting", "status": "complete", "category": "backend", "body": "Implement rate limiting on the public API to prevent abuse", "urgency": "med", "story_points": 8, "assignee_user_id": 1, "author_user_id": 9},
        {"title": "Setup Monitoring Tools", "status": "complete", "category": "backend", "body": "Setup monitoring and alerting for system health", "urgency": "med", "story_points": 13, "assignee_user_id": 4, "author_user_id": 10},
        {"title": "Code Review Process", "status": "in_progress", "category": "frontend", "body": "Establish a formal code review process", "urgency": "low", "story_points": 2, "assignee_user_id": 1, "author_user_id": 9},
        {"title": "Documentation Standards", "status": "complete", "category": "backend", "body": "Define standards for code documentation", "urgency": "low", "story_points": 1, "assignee_user_id": 2, "author_user_id": 10},
        {"title": "Frontend Testing Framework", "status": "complete", "category": "frontend", "body": "Select and implement a testing framework for the frontend", "urgency": "med", "story_points": 5, "assignee_user_id": 3, "author_user_id": 9}
    ]

    for task in tasks:
        created_at_generate = date.today() - timedelta(days=random.randint(1, 14))
        ticket = Ticket(
            title=task["title"],
            status=task["status"],
            category=task["category"],
            body=task["body"],
            urgency=task["urgency"],
            story_points=task["story_points"],
            created_at=created_at_generate,
            completed_at=None if task["status"] != "complete" else created_at_generate + timedelta(days=1),
            assignee_user_id=task["assignee_user_id"],
            author_user_id=task["author_user_id"],
            sprint_id=1
        )
        db.session.add(ticket)
        db.session.flush()

        ticket_log = TicketLog(
            ticket_id=ticket.id,
            author_user_id=task["author_user_id"],
            comment_text=f"Discussion about {task['title']}",
            status="null",
            created_at=created_at_generate
        )
        db.session.add(ticket_log)

def create_ticket_cont():
    tickets = Ticket.query.all()
    
    for ticket in tickets:
        contributor_assignee = TicketContributor(ticket_id=ticket.id, user_id=ticket.assignee_user_id)
        db.session.add(contributor_assignee)
        
        if ticket.author_user_id != ticket.assignee_user_id:
            contributor_author = TicketContributor(ticket_id=ticket.id, user_id=ticket.author_user_id)
            db.session.add(contributor_author)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Ticket.query.delete()
        TicketContributor.query.delete()
        Sprint.query.delete()
        TicketLog.query.delete()

        print("Seeding Users...")
        create_users()

        print("Seeding Sprint...")
        create_sprint()

        print("Seeding Tickets & Comments...")
        create_tasks()

        print("Seeding Ticket Contributors...")
        create_ticket_cont()

        db.session.commit()
