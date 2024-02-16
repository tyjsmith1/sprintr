#!/bin/bash

# Install Python dependencies and enter Pipenv shell
pipenv install
# This line to activate pipenv shell won't work in a script as expected
# since it spawns a subshell. Commands that should run inside the pipenv shell
# need to be run in a different way, shown below.

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