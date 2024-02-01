#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User,TicketLog,Ticket,TicketContributor,Sprint

f = Faker()

def create_users():
    users = []
    roles = ['sales','support','frontend','backend','leadership']
    
    for i in range(5):
        role = roles[i]
        cap = 0

        if role in ['frontend','backend']:
            cap = random.randint(0,50)

        u = User(
            username = f.first_name(),
            role = role,
            user_focus = "idk",
            user_capacity = cap
        )
        users.append(u)
        print(u)
    return users


if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Ticket.query.delete()
        TicketContributor.query.delete()
        Sprint.query.delete()
        TicketLog.query.delete()

        # print("Seeding Users...")
        # users = create_users()
        # db.session.add_all(users)
        db.session.commit()
