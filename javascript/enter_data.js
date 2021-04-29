
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
    var text = document.createTextNode(ing.ingredient + ".................." + ing.amount + " " + ing.units);
    p_element.appendChild(text)
    document.querySelector("#ingredent_list").appendChild(p_element)

    document.querySelector('#ingredient').value = ""
    document.querySelector('#amount').value = ""

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

    }

function submit_recipe(){
    response_verify = verify_data()

    if(response_verify === "-1") {
        //get values
        recipe_name = document.querySelector('#recipe_name').value
        servings = document.querySelector('#servings').value
        prep_time = document.querySelector('#prep_time').value
        cook_time = document.querySelector('#cook_time').value
        difficulty_object = document.querySelector('#difficulty')
        difficulty = difficulty_object.options[difficulty_object.selectedIndex].value
        directions = document.querySelector('#input_directions').value

        //create object
        recipe_object = new Recipe(recipe_name,servings,prep_time,cook_time,difficulty,directions,ingredient_list)
        recipe_object.image_file = image_file

        //clear boxes
        document.querySelector('#error_box').style.display = "none"
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
        console.log(recipe_object)
        if(datasource === "server") {
            post_recipe_to_server(recipe_object)
        } else {
            save_recipe_to_localstorage(recipe_object)
            console.log(get_recipe_from_local_storage())
        }
    }else {
        document.querySelector('#error_message').innerHTML = response_verify
        document.querySelector('#error_box').style.display = "flex"
    }
}

async function post_recipe_to_server(post_data) {
    console.log("server address")
    console.log(server_address)
    send_address = server_address + "/addrecipe"
    console.log("send address")
    console.log(send_address)
    let response = await fetch(send_address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post_data)
    });

    //let result = await response.json();
    //return result.message
}


function verify_data(){

    var status =  "-1"

    if (document.querySelector('#recipe_name').value === ""){
        status = "Please add A recipe name"
    }else if(document.querySelector('#servings').value === ""){
        status = "Please add a serving"
    }else if(document.querySelector('#prep_time').value === ""){
        status = "Please add a prep time"
    }else if(document.querySelector('#cook_time').value === ""){
        status = "Please add a cook time"
    }else if(document.querySelector('#difficulty').selectedIndex === 0){
        status  = "Please select a Difficulty"
    }else  if(ingredient_list.length === 0) {
        status = "Please add ingredients"
    }else if(document.querySelector('#input_directions').value === ""){
        status = "Please Add Directions"
    }else if(isNaN(document.querySelector('#servings').value) === true){
        status = "A number is required for a Serving"
    }else if(isNaN(document.querySelector('#prep_time').value) === true){
        status = "A number is required for a Prep-time"
    }else if (isNaN(document.querySelector('#cook_time').value) === true){
        status = "A number is required for a Cook Time"
    }

    return status

}

function save_recipe_to_localstorage(rec_object){
        if(localStorage.getItem(localstorage_var_name) === null){
            console.log("in empty")
            let item_to_store = []
            item_to_store.push(rec_object)
           let json_to_store = JSON.stringify(item_to_store)
            localStorage.setItem(localstorage_var_name, json_to_store)
        } else {
            console.log("in not empty")
            let json_retrieved = localStorage.getItem(localstorage_var_name)
            let java_object = JSON.parse(json_retrieved)
            java_object.push(rec_object)
            localStorage.setItem(localstorage_var_name, JSON.stringify(java_object))

        }
}

