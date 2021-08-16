from app import app, login, db
from flask import render_template, request, url_for, redirect
from app.forms import IngredientForm, ProductForm
from app.models import *
from app.utils import update_ingredients


@app.get('/')
def index():
    products = Product.query.all()
    return render_template('index.html', products=products)


@app.get('/panel')
def user_panel():
    ingredient_form = IngredientForm(prefix='ingredient-0')
    ingredients = Ingredient.query.all()
    products = Product.query.all()
    product_form = ProductForm(prefix='product-0')
    return render_template('user_panel.html', ingredient_form=ingredient_form,\
         ingredients=ingredients, product_form=product_form, products=products)

@app.post('/ingredients')
def ingredient_add():
    update_ingredients(request.form)
    return redirect(url_for('index'))

@app.post('/products')
def product_add():
    products_counter = int(list(request.form.lists())[-1][0].split('-')[1])
    for counter in range(products_counter + 1):
        product_name = request.form.get(f'product-{counter}-name') 
        # product_price = float(request.form.get(f'product-{counter}-price'))
        # product_quantity = float(request.form.get(f'product-{counter}-quantity'))
        
        product = Product.query.filter_by(name=product_name).first()
        if product is None:
            product = Product(name=product_name)
            db.session.add(product)
        ###########################################################################################
        ings = list(filter(lambda x: x[0].startswith(f'product-{counter}-ingredient'),\
            list(request.form.lists())))
        '''
        [('product-0-ingredient-0-name', ['Olejek różany']), ('product-0-ingredient-0-quantity', 
        ['0.02']), ('product-0-ingredient-1-name', ['Olejek różany']), 
        ('product-0-ingredient-1-quantity', ['0.03'])]
        '''
        handle_product_ingredients(ings, product, f'product-{counter}')
    db.session.commit()
    return redirect(url_for('index'))

def handle_product_ingredients(ingredients, product_obj, product_name):
    ingredients_amount = int(ingredients[-1][0].split('-')[-2])
    ingredients = dict(ingredients)
    for ingredient_counter in range(ingredients_amount + 1):
        ingredient_name = ingredients.get(f'{product_name}-ingredient-{ingredient_counter}-name')[0]
        ing = Ingredient.query.filter_by(name=ingredient_name).first()
        ing_quantity = ingredients.get(f'{product_name}-ingredient-{ingredient_counter}-quantity')[0]
        product_ingredient = ProductIngredients(product_id=product_obj.id, ingredient_id=ing.id, quantity=ing_quantity)
        db.session.add(product_ingredient)