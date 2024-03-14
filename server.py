from flask import Flask, render_template, request, flash, redirect,session,jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from userClass import User
from flask_session import Session
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
import os
from io import BytesIO
from PIL import Image
import base64
app = Flask(__name__)
app.config['SECRET_KEY'] = 'top-secret!'
app.config['SESSION_TYPE'] = 'filesystem'
login = LoginManager(app)
Session(app)
CORS(app)
socketio = SocketIO(app,cors_allowed_origins="*", manage_session=True)
active_users = {}

@login.user_loader
def load_user(user_id):
    return User(user_id)

#define an index route
@app.route('/')
def index():
    return 'Hello, this is the index route!'

@socketio.on('set-session')
def set_session(data):
    if 'user' in data:
        if data['image'] is not None:
            #get the data from request
            image_data_url = data['image']
            user = data['user']
            #decode image
            _, encoded_data = image_data_url.split(',')
            image_data = base64.b64decode(encoded_data)
            image_bytes_io = BytesIO(image_data)
            image = Image.open(image_bytes_io)
            #acess the socket id
            socket_id = request.sid
            print(socket_id)
            #Create new user class
            user = User(socket_id)
            if user.userClassification(image):
                 if login_user(user):
                    #User is now logged in, do watever with user object and set sessions
                    print("user logged in", current_user.id)
                    active_users[user.id] = user
                    #set sessions to watever the current user is
                    session['age'] = user.age
                    session['gender'] = user.gender
                    get_session()           
        else:
            print("Logging out user")
            logout_user()


@socketio.on('get-matches')
@login_required
def get_matches():
    current_matches = []
    current_age = session['age']
    current_gender = session['gender']
    print(current_gender)
    #this function will need require a user to be logged in to access.
    for user_id, user_instance in active_users.items():
        
        #Access the attributes of each User instance
        user_gender = user_instance.gender
        user_age = user_instance.age
        user_race = user_instance.race
        print(user_instance.gender)
        if user_gender != current_gender:
            user_instance.gender
            current_matches.append({
                'user_id': user_id,
                'user_age': user_age,
                'user_gender': user_gender,
                'user_race': user_race
            })
            print(f"match with {user_id}: {user_gender} {user_age}")
    emit('refresh-matches', {
        'matches': current_matches
    })


@socketio.on('disconnect')
def disconnect():
    user_id = request.sid
    if user_id in active_users:
        del active_users[user_id]
        print(f"User {user_id} disconnected, removed from active_users")
        logout_user()


@socketio.on('get-session')
@login_required
def get_session():
    print(session.get('user'))
    emit('refresh-session', {
        'session_age': session.get('age', ''),
        'session_gender': session.get('gender', ''),
        'user': current_user.id if current_user.is_authenticated else 'anonymous',
        'active_users': list(active_users.keys())  # Send a list of active user IDs
    })

@socketio.on('private-message')
@login_required
def handle_private_message(data):
    recipient_id = data['recipient_id']
    message = data['message']
   
    # Find the recipient's socket ID
    recipient_sid = None
    for user_id, user_instance in active_users.items():
        if user_id == recipient_id:
                recipient_sid = user_id

    # Find the sender's socket ID
    sender_sid = request.sid

    # Check if the recipient is online
    if recipient_sid:
        # Emit the message to the recipient
        emit('private-message', {'sender_id': sender_sid, 'message': message}, room=recipient_sid)
        # Emit acknowledgment to the sender
        emit('private-message', "Your message was sent successfully.", room=sender_sid)
    else:
        print(f"User {recipient_id} is not online.")

if __name__ == '__main__':
    socketio.run(app, debug=True)