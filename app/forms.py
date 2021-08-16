from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, FormField, FloatField, DecimalField, SelectField
from wtforms.validators import DataRequired

class IngredientForm(FlaskForm):
    name = StringField('Składnik', validators=[DataRequired()])
    price = FloatField('Cena w zł', validators=[DataRequired()])
    quantity = DecimalField('Ilość kg/l', validators=[DataRequired()])


class ProductForm(FlaskForm):
    name = StringField('Produkt', validators=[DataRequired()])
    price = FloatField('Cena w zł', validators=[DataRequired()])
    quantity = DecimalField('Ilość kg/l', validators=[DataRequired()])

