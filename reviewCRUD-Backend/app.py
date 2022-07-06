import imp
from flask import Flask, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
app.config['DEBUG'] = True
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import students

db.create_all()
db.session.commit()


@app.route('/')
def hello_world():
    return 'This is my first API call!'


@app.route('/api/getAll', methods=['GET'])
def show_all():
    data = db.session.query(students).all()
    # data = db.engine.execute("SELECT id, name, city, address, contact FROM students")
    student_list = []

    for i in data:
        student_list.append({
            "id": i.id,
            "name": i.name,
            "address": i.address,
            "contact": i.contact,
            "city": i.city
        })
    response = make_response({
    'status_code': 200,
    'data': student_list
    })
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/api/add', methods=['POST'])
def addNew():
    data = request.json
    new = students(data['name'], data['city'], data['address'], data['contact'])
    db.session.add(new)
    db.session.commit()

    response = make_response({
    'status_code': 200,
    'message': 'Added Successfully'
    })
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/api/deleteAll', methods=['POST'])
def deleteAll():
    students.query.delete()
    db.session.commit()

    response = make_response({
    'status_code': 200,
    'message': 'Deleted Successfully'
    })
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/api/delete', methods=['POST'])
def delete():
    record_id = request.json["id"]
    students.query.filter_by(id=record_id).delete()
    db.session.commit()

    response = make_response({
    'status_code': 200,
    'message': f'Deleted ID: {record_id} Successfully'
    })
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/api/update', methods=['POST'])
def update():
    data = request.json
    record_id = data["id"]

    existing_record = students.query.filter(students.id == record_id).first()
    existing_record.name = data["name"]
    existing_record.address = data["address"]
    existing_record.city = data["city"]
    existing_record.contact = data["contact"]
    
    db.session.commit()

    response = make_response({
    'status_code': 200,
    'message': f'Updated ID: {record_id} Successfully'
    })
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == "__main__":
    app.run()
