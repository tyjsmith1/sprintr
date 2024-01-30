## sprintr

Welcome to Sprintr, an innovative agile project management tool designed to streamline the workflow of tech teams. At the heart of Sprintr lies a unique feature: an intelligent auto-assignment system that dynamically matches tasks with team members based on their skills, focus areas, and current workload. This is achieved through a sophisticated backend logic implemented in Python and Flask, ensuring a seamless and efficient task distribution process. On the frontend, Sprintr utilizes React, providing a responsive and user-friendly interface that facilitates easy tracking and management of tasks, sprints, and team collaboration. The data management is elegantly handled by SQLAlchemy, which offers a powerful and flexible toolkit for SQL database interaction. Our aim with Sprintr is to revolutionize how tech teams approach project management by automating the allocation process, thereby allowing team members to focus more on innovation and less on administrative overhead. Dive into the world of Sprintr where managing tech projects becomes as agile as your team’s aspirations.

## Wireframe
![image](https://github.com/tyjsmith1/sprintr/assets/95344047/48a343c2-16df-46db-947f-cce06483d641)


## User Stories
- As a team member (technical or non-technical), I should be able to submit a ticket for a bug.
- As an engineer, I should be able to view tickets assigned to me for completion
- As a laeder of the team, I should be able to create tasks for strategic initiatives in addition to bugs
- As a scrum master, I should be able to rely on the app to assign trivial tasks to engineers with capacity to cut down time-to-completion

## React Tree Diagram, Routes, & Components
![image](https://github.com/tyjsmith1/sprintr/assets/95344047/ad72830b-8579-4bfb-9fb9-d3e69a539ca3)


## API Routes
CREATE: tickets, users, sprints, ticket_log, ticket_contributors
READ: tickets, users, sprints, ticket_log, ticket_contributors
UPDATE: tickets, users, sprints
DELETE: tickets, ticket_log, ticket_contributors


## Database Design
<img width="682" alt="image" src="https://github.com/tyjsmith1/sprintr/assets/95344047/50595565-4f5e-4730-a91f-7ef9fdc1a010">

The application leverages a robust and intuitive database design to effectively manage agile project workflows. The database consists of several key models, each serving a distinct purpose:

**User:** Central to the application, this model tracks users, their roles, areas of focus (e.g., frontend, backend), and capacity for work. It's pivotal for assigning tasks based on skills and availability.

**Ticket:** At the heart of project tracking, each ticket represents a task or issue. It includes details like title, status, category, and urgency, along with references to its assignee, author, and associated sprint. The model is designed to track the lifecycle of tasks from creation to completion.

**Sprint:** This model captures the essence of agile methodology, encapsulating a set timeframe (start and end dates) during which a set of tickets (tasks) are to be completed.

**TicketLog:** An essential model for maintaining a history of updates and communications on each ticket. It helps in keeping a transparent and chronological track of discussions and changes.

**TicketContributor: **Facilitates a many-to-many relationship between tickets and users. This design choice allows multiple users to collaborate on a single ticket, reflecting real-world team dynamics.

Through these interconnected models, the database effectively mirrors the agile project management process, offering flexibility, scalability, and a user-centric approach to task management.

## Technologies Used
Javascript, React, Python, Flask

## Stretch Goals
- Authenticated log ins
- Productivity analytics
- Task Auto-assignment / auto-triage system

## Super Stretch Goals
- customized views/experience tailored to employee roles
- users can control key and values for input fields for a fully customizable experience 

## Kanban
![image](https://github.com/tyjsmith1/sprintr/assets/95344047/4e9d4b6e-003e-43b9-891a-545e1099efe0)

https://trello.com/b/VEGTLHFN/sprintr
