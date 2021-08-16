from app import db, login
from flask_login import UserMixin

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    quantity = db.Column(db.Float)
    ingredient_of = db.relationship('ProductIngredients', backref='ingredient', cascade='all, delete')

    def update_stack(self, price, quantity):
        self.price = max(price, self.price)
        self.quantity += quantity

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    quantity = db.Column(db.Float)
    ingredients = db.relationship('ProductIngredients', \
        backref='product_ingredient', cascade='all, delete')

    def count_price(self):
        self.price = sum([x.quantity * x.ingredient.price for x in self.ingredients])

class ProductIngredients(db.Model):
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
    quantity = db.Column(db.Float)

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)


@login.user_loader
def load_user(id):
    return Users.query.get(id)