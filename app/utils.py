from app import db
from app.models import Ingredient

def update_ingredients(ingredient_form):
    ingredients_count = int(list(ingredient_form)[-1].split('-')[1])
    ingredients_list = []
    for ingredient in range(ingredients_count + 1):
        name = ingredient_form.get(f'ingredient-{ingredient}-name')
        price = float(ingredient_form.get(f'ingredient-{ingredient}-price'))
        quantity = float(ingredient_form.get(f'ingredient-{ingredient}-quantity'))
        if (x := Ingredient.query.filter_by(name=name).first()) is not None:
            x.update_stack(price, quantity)
            continue
        ingredients_list.append(Ingredient(name=name, price=price, \
            quantity=quantity))
    db.session.add_all(ingredients_list)
    db.session.commit()