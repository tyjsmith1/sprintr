#!/bin/bash

# Install Python dependencies and enter Pipenv shell
pipenv install
pipenv install flask-login

# Start Python server
(pipenv run python server/app.py &) # This will run in the background

# Install Node.js dependencies
npm install --prefix client
npm install react-icons --prefix client

# Start React client
(npm start --prefix client &) # This will run in the background

# Set up Flask database
cd server
pipenv run flask db init
pipenv run flask db upgrade head
pipenv run python seed.py

echo "Setup completed."