from app import db


class students(db.Model):
    ___tablename__ = "students"
    id = db.Column(db.Integer, primary_key = True, )
    name = db.Column(db.String(100))
    city = db.Column(db.String(50))  
    address = db.Column(db.String(200))
    contact = db.Column(db.String(10))

    def __init__(self, name, city, address, contact):
        self.name = name
        self.city = city
        self.address = address
        self.contact = contact

    def __repr__(self):
        return '<Student %s>' % self.name
