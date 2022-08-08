const createInputField = attrs => {
    let inputField = document.createElement('input');
    // attrs = [['id', 'blabla bla'], ...]
    attrs.forEach(attr => {
        inputField.setAttribute(attr[0], attr[1]);
    });
    return inputField;
};

const createLabelField = (labelFor, text) => {
    let label = document.createElement('label');
    label.setAttribute('for', labelFor);
    label.append(text);
    return label
}

const createSelectOptions = values => {
    let optionsList = []
    values.forEach(values => {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', values[0]);
        optionElement.text = values[1];
        optionsList.push(optionElement);
    });
    return optionsList;
}

const createSelectField = (attrs, optionsNodes) => {
    let selectField = document.createElement('select');
    attrs.forEach(attr => {
        selectField.setAttribute(attr[0], attr[1]);
    });
    optionsNodes.forEach(optionNode => {
        selectField.append(optionNode);
    });
    return selectField;
};


const createProductForm = (prefix) => {
    let productFormListItem = document.createElement('li');
    //Name field
    let nameLabel = createLabelField(`${prefix}-name`, 'Produkt');
    let nameField = createInputField([['id', `${prefix}-name`], ['name', `${prefix}-name`], ['type', 'text'], ['list', 'products']]);
    //Price field
    let priceLabel = createLabelField(`${prefix}-price`, 'Cena w zł');
    let priceField = createInputField([['id', `${prefix}-price`], ['name', `${prefix}-price`], ['type', 'number'], ['step', '0.01'],['min', '0']]);
    //Quantity Field
    let quantityLabel = createLabelField(`${prefix}-quantity`, 'Ilość kg/l');
    let quantityField = createInputField([['id', `${prefix}-quantity`], ['name', `${prefix}-quantity`], ['type', 'number'], ['step', '1'],['min', '0']]);
    //lista skladnikow
    let ingredientList = document.createElement('ul');
    ingredientList.setAttribute('id', `${prefix}-ingredients`);
    //dodawanie skladnikow do produktu
    let btnAddIngredient = document.createElement('button');
    btnAddIngredient.setAttribute('id', `${prefix}-btn`)
    btnAddIngredient.append('Dodaj składnik');
    btnAddIngredient.addEventListener('click', e => {
        e.preventDefault();
        createProductIngredientForm(prefix);
    });
    // podlaczenie li do ul
    productFormListItem.append(nameLabel, nameField, priceLabel, priceField, quantityLabel, quantityField, ingredientList, btnAddIngredient);
    return productFormListItem;
}

const createIngredientForm = prefix => {
    const ingredientFormListItem = document.createElement('li');
    ingredientFormListItem.setAttribute('id', prefix)
    ingredientFormListItem.classList.add('ingredientFormItem')
    //name
    const nameLabel = createLabelField(`${prefix}-name`, 'Składnik ')
    const nameField = createInputField([['id', `${prefix}-name`], ['name', `${prefix}-name`], ['type', 'text'], ['list', 'ingredients']])
    //price
    const priceLabel = createLabelField(`${prefix}-price`, 'Cena w zł ')
    const priceField = createInputField([['id', `${prefix}-price`], ['name', `${prefix}-price`], ['type', 'number'], ['step', '0.01'], ['min', '0']])
    //quantity
    const quantityLabel = createLabelField(`${prefix}-quantity`, 'Ilość kg/l ')
    const quantityField = createInputField([['id', `${prefix}-quantity`], ['name', `${prefix}-quantity`], ['type', 'number'], ['step', '0.01'], ['min', '0']])
    ingredientFormListItem.append(nameLabel, nameField, priceLabel, priceField, quantityLabel, quantityField);
    return ingredientFormListItem;
}

//dodawanie kolejnego produktu
let addNextForm = document.querySelectorAll('.addNext');
addNextForm.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        if (btn.previousElementSibling.id.includes('product')) {
            let productFormList = document.querySelector('#productFormList');
            let counter = productFormList.childElementCount;
            let productFormListItem = createProductForm(`product-${counter}`);
            productFormList.append(productFormListItem);
        }
        if (btn.previousElementSibling.id.includes('ingredient')) {
            let ingredientFormList = document.querySelector('#ingredientFormList');
            let counter = ingredientFormList.childElementCount;
            let ingredientFormListItem = createIngredientForm(`ingredient-${counter}`);
            ingredientFormList.append(ingredientFormListItem);
        }
    })
});

const createProductIngredientForm = (prefix) => {
    //prefix - product-(counter)
    //lista skladnikow danego produktu
    let formList = document.querySelector(`#${prefix}-ingredients`);
    let counter = formList.childElementCount;
    console.log(counter);
    //pole skladnika
    let ingredientLabel = createLabelField(`${prefix}-ingredient-${counter}-name`, 'Składnik')
    let optionsList = [];
    let datalistOptions = document.querySelector('datalist#ingredients').childNodes;
    datalistOptions.forEach(option => {
        if (option.tagName == 'OPTION') {
            option.text = option.value;
            optionsList.push(option.cloneNode(true));
        }
    });
    let ingredientField = createSelectField([['id', `${prefix}-ingredient-${counter}-name`], ['name', `${prefix}-ingredient-${counter}-name`]], optionsList)
    let quantityLabel = createLabelField(`${prefix}-ingredient-${counter}-quantity`, 'Ilość l/kg');
    let quantityField = createInputField([['id', `${prefix}-ingredient-${counter}-quantity`],['name', `${prefix}-ingredient-${counter}-quantity`],['type', 'number'],['step','0.01'],['min', '0']])
    //tworzenie list item i podpiecie pod liste skladnikow danego produktu
    let formListItem = document.createElement('li');
    formListItem.append(ingredientLabel, ingredientField, quantityLabel, quantityField);
    formList.append(formListItem);
}

//button wygenerowanego formularza
document.querySelector('#test-product-0-btn').addEventListener('click', e => {
    e.preventDefault();
    createProductIngredientForm('product-0');
});