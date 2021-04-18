
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
}

function clear_form(){
    document.querySelector("#ingredent_list").innerHTML = ""
    ingredient_list = []
    document.querySelector('#ingredient').value = ""
    document.querySelector('#amount').value = ""
    document.querySelector('#input_directions').value = ""
    //TODO: add command to reset drop down
    }

function submit_recipe(){
    
}

function post_recipe_to_server(){
    //add ajax call to api to save recipe
}