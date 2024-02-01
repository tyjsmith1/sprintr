from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import date

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    #________COLUMNS________#
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    user_focus = db.Column(db.String)
    user_capacity = db.Column(db.Integer)

    #________RELATIONSHIPS________#
    assigned_tickets = db.relationship("Ticket", foreign_keys="[Ticket.assignee_user_id]", back_populates="assignee")
    authored_tickets = db.relationship("Ticket", foreign_keys="[Ticket.author_user_id]", back_populates="author")
    ticket_logs = db.relationship("TicketLog", back_populates="user")
    ticket_contributors = db.relationship("TicketContributor", back_populates="user")

    #________SERIAL________#
    serialize_rules = ('-assigned_tickets.assignee', '-authored_tickets.author', '-ticket_logs.user', '-ticket_contributors.user', )

    #________VALIDATIONS________#

    def __repr__(self):
        return f'<Users: {self.username}, {self.role}>'
    
    
class TicketLog(db.Model, SerializerMixin):
    __tablename__ = "ticket_logs"

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"))
    author_user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment_text = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.Date, nullable=False)

    #________RELATIONSHIPS________#
    user = db.relationship("User", back_populates="ticket_logs")
    ticket = db.relationship("Ticket", back_populates="ticket_logs")

    #________SERIAL________#
    serialize_rules = ('-user.ticket_logs','-ticket.ticket_logs',)

    #________VALIDATIONS________#

    def __repr__(self):
        return f'<TicketLogs: {self.ticket_id}, {self.author_user_id}, {self.comment_text}, {self.created_at}>'

class Sprint(db.Model, SerializerMixin):
    __tablename__ = "sprints"

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

    #________RELATIONSHIPS________#
    tickets = db.relationship("Ticket", back_populates="sprint")

    #________SERIAL________#
    serialize_rules = ('-tickets.sprint',)

    #________VALIDATIONS________#

    def __repr__(self):
        return f'<Sprints: {self.id}, {self.start_date}, {self.end_date}>'
    
    
    
class TicketContributor(db.Model, SerializerMixin):
    __tablename__ = "ticket_contributors"

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    #________RELATIONSHIPS________#
    user = db.relationship("User", back_populates="ticket_contributors")
    ticket = db.relationship("Ticket", back_populates="ticket_contributors")

    #________SERIAL________#
    serialize_rules = ('-user.ticket_contributors','-ticket.ticket_contributors',)

    #________VALIDATIONS________#

    def __repr__(self):
        return f'<TicketContributors: {self.ticket_id}, {self.user_id}>'

class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    urgency = db.Column(db.Integer, nullable=False)
    story_points = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    ## Stretch goal -- maybe add an updated at to track updates
    completed_at = db.Column(db.Date)
    assignee_user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    author_user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    sprint_id = db.Column(db.Integer, db.ForeignKey("sprints.id"))

    #________RELATIONSHIPS________#
    assignee = db.relationship("User",foreign_keys=[assignee_user_id], back_populates="assigned_tickets")
    author = db.relationship("User",foreign_keys=[author_user_id],back_populates="authored_tickets")
    sprint = db.relationship("Sprint", back_populates="tickets")
    ticket_contributors = db.relationship("TicketContributor", back_populates="ticket")
    ticket_logs = db.relationship("TicketLog", back_populates="ticket")

    #________SERIAL________#
    serialize_rules = ('-assignee.assigned_tickets','-author.authored_tickets','-ticket_contributors.ticket','-ticket_logs.ticket',)

    #________VALIDATIONS________#

    def __repr__(self):
        return f'<Tickets: {self.id}, {self.title}, {self.status}>'