#!/bin/bash

# Ensure script is executed from the correct directory
# Adjust the path as necessary
cd sprintr

# Install Python dependencies
pipenv install

# Set up Flask database
cd server
pipenv run flask db init
pipenv run flask db upgrade head
pipenv run python seed.py
# Start Python server in the background and save the process ID
pipenv run python app.py & SERVER_PID=$!

# Navigate back to the project root (adjust as necessary)
cd ..

# Install Node.js dependencies
npm install --prefix client

# Start React client in the background and save the process ID
npm start --prefix client & CLIENT_PID=$!

echo "Setup completed. Flask PID: $SERVER_PID, React PID: $CLIENT_PID"
echo "To stop Flask: kill $SERVER_PID"
echo "To stop React: kill $CLIENT_PID"
