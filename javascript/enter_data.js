
var ingredient_list = []

function add_item(){
    let ingredient = document.querySelector('#ingredient').value
    let amount = document.querySelector('#amount').value;
    let dropdown_m = document.querySelector('#units');
    let units = dropdown_m.options[dropdown_m.selectedIndex].text

    ing = new Ingredient(ingredient, amount, units)
    ingredient_list.push(ing)

    let p_element = document.createElement("p");
    p_element.setAttribute("id", "single_ingredient")
    var text = document.createTextNode(ing.ingredient + "---------------------" + ing.amount + " " + ing.units);
    p_element.appendChild(text)
    document.querySelector("#ingredent_list").appendChild(p_element)

    document.querySelector('#ingredient').value = ""
    document.querySelector('#amount').value = ""
    //todo: Add drop down reset
}

function clear_form(){
    document.querySelector("#ingredent_list").innerHTML = ""
    document.querySelector('#ingredient').value = ""
    document.querySelector('#amount').value = ""
    document.querySelector('#input_directions').value = ""
    document.querySelector('#recipe_name').value = ""
    document.querySelector('#servings').value = ""
    document.querySelector('#prep_time').value = ""
    document.querySelector('#cook_time').value =""
    document.querySelector('#input_directions').value = ""
    ingredient_list = []
    //TODO: add command to reset drop down
    }

function submit_recipe(){
    recipe_name = document.querySelector('#recipe_name').value
    servings = document.querySelector('#servings').value
    prep_time = document.querySelector('#prep_time').value
    cook_time = document.querySelector('#cook_time').value
    difficulty_object = document.querySelector('#difficulty')
    difficulty = difficulty_object.options[difficulty_object.selectedIndex].value
    directions = document.querySelector('#input_directions').value

    recipe_object = new Recipe(recipe_name,servings,prep_time,cook_time,difficulty,directions,ingredient_list)

    console.log(recipe_object)
    console.log(JSON.stringify(recipe_object))

    document.querySelector('#recipe_name').value = ""
    document.querySelector('#servings').value = ""
    document.querySelector('#prep_time').value = ""
    document.querySelector('#cook_time').value =""
    document.querySelector('#input_directions').value = ""
    document.querySelector("#ingredent_list").innerHTML = ""
    document.querySelector('#ingredient').value = ""
    document.querySelector('#amount').value = ""
    document.querySelector('#input_directions').value = ""
    ingredient_list = []
    //todo: Add dropdown reset
}

function post_recipe_to_server(){
    //add ajax call to api to save recipe
}