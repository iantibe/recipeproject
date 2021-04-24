
var server_data = null
var selected_recipe = 0

function open_slider(target_div){
    let button = document.querySelector(target_div)
     if(getComputedStyle(button).getPropertyValue("display") === "none"){
          button.style.setProperty('display', "block")
      } else {
         button.style.setProperty('display', "none")
      }
}


function load_recipe_detail(recipe_id){

    let recipe_obj = null
    selected_recipe = recipe_id

    ///the for loop loops through serverdata variable and finds the recipe with the proper recipe_id
    for(let y = 0; y < server_data.length; y++){
        if (server_data[y].recipe_id === recipe_id){
           recipe_obj = server_data[y]
        }
    }

    document.querySelector('#recipe_name').innerHTML = recipe_obj.name;
    document.querySelector('#number_of_servings').innerHTML = recipe_obj.servings;
    document.querySelector('#prep_time').innerHTML = recipe_obj.preptime;
    document.querySelector('#cooking_time').innerHTML = recipe_obj.cookingtime;
    document.querySelector('#difficulty').innerHTML = recipe_obj.difficulty;
    document.querySelector('#right_title img').setAttribute("src","images/" + recipe_obj.image_file)



    let p_obj = document.createElement('p')
    let obj_text = document.createTextNode(recipe_obj.directions);
    p_obj.appendChild(obj_text)
    document.querySelector('#display_info3').appendChild(p_obj)

    for (let x = 0; x < recipe_obj.ingredient_list.length; x++) {
        let i = recipe_obj.ingredient_list[x].ingredient
        let a = recipe_obj.ingredient_list[x].amount
        let u = recipe_obj.ingredient_list[x].units

        let div_object_ing = document.createElement("div");
        let div_spacer = document.createElement("div")
        let p_object_ing = document.createElement('p')
        let p_object_amount = document.createElement('p')
        let p_object_units = document.createElement('p')

        p_object_amount.setAttribute("class","ingredient_item");
        div_object_ing.setAttribute("class","ingredient_list_item")
        div_spacer.setAttribute('class',"ingredient_unit")

        let ingredient_text = document.createTextNode(i)
        let amount_text = document.createTextNode(a + "  ")
        let unit_text = document.createTextNode(u)

        p_object_ing.appendChild(ingredient_text)
        p_object_amount.appendChild(amount_text)
        p_object_units.appendChild(unit_text)

        div_object_ing.appendChild(p_object_ing)
        div_spacer.appendChild(p_object_amount)
        div_spacer.appendChild(p_object_units)
        div_object_ing.appendChild(div_spacer)

        document.querySelector('#display_info2').appendChild(div_object_ing);
    }
}

function create_recipe_button(text_to_display, classname, addlocation, recipe_id){
    let x = document.createElement("div");
    let text = document.createTextNode(text_to_display);
    x.className = classname
    x.appendChild(text)
    x.addEventListener('click', function (){clear_boxes(); load_recipe_detail(recipe_id)})
    document.querySelector("#" + addlocation).appendChild(x)
}

function  generate_recipe_buttons(){
    //run this function to generate a view

    for(let z =0; z < server_data.length; z++){
        create_recipe_button(server_data[z].name,"recipe_select","left_display_panel", server_data[z].recipe_id)
    }
}

function get_data_from_server(){
    //gets data from server and places in object
    //todo:remove test code
    //let ingredint = new Ingredient("testingredinet","test amount","units")
    //let ing_list = []
    //ing_list.push(ingredint)
    //let recipe_obj = new Recipe("name","servings","preptime","cooktime","difficulty","directions", ing_list)
    //recipe_obj.recipe_id = 100
    //recipe_obj.image_file = "salmon.jpg"
    //return [recipe_obj]
    console.log("server_Data")
    console.log(server_address)
    console.log("formatted data")
    get_server_data = server_address + "/recipes"

    console.log(get_server_data)

    fetch(get_server_data)
        .then(x => x.json())
        .then(y =>  server_data = y);

}


function get_data_from_cookie(){
    //get data from cookie
}

//const apiData = () => {
//    fetch('http://127.0.0.1:5000/recipes',)
//        .then((res) => {
//            return  res.json()
//        }).then((data) => {
//        fetchedData(data)
//    })
//}

//fetchedData = (apiData) => {
//    console.log(apiData)
//}

function clear_boxes(){
    //added to clear ingredient and direction boxes with new item load
    document.querySelector('#display_info2').innerHTML = ""
    document.querySelector('#display_info3').innerHTML = ""
}

function change_servings(multipler){
    var recipe = null

    for(let y = 0; y < server_data.length; y++){
        if (server_data[y].recipe_id === selected_recipe){
            recipe = server_data[y]
        }
    }

    document.querySelector('#display_info2').innerHTML = ''
    var new_servings =  multipler*parseInt(recipe.servings)
    document.querySelector('#number_of_servings').innerHTML = new_servings.toString();

    for (let x = 0; x < recipe.ingredient_list.length; x++) {
        let i = recipe.ingredient_list[x].ingredient
        let a_original = parseInt(recipe.ingredient_list[x].amount)
        let a = multipler * a_original
        let u = recipe.ingredient_list[x].units

        let div_object_ing = document.createElement("div");
        let div_spacer = document.createElement("div")
        let p_object_ing = document.createElement('p')
        let p_object_amount = document.createElement('p')
        let p_object_units = document.createElement('p')

        p_object_amount.setAttribute("class","ingredient_item");
        div_object_ing.setAttribute("class","ingredient_list_item")
        div_spacer.setAttribute('class',"ingredient_unit")

        let ingredient_text = document.createTextNode(i)
        let amount_text = document.createTextNode(a + "  ")
        let unit_text = document.createTextNode(u)

        p_object_ing.appendChild(ingredient_text)
        p_object_amount.appendChild(amount_text)
        p_object_units.appendChild(unit_text)

        div_object_ing.appendChild(p_object_ing)
        div_spacer.appendChild(p_object_amount)
        div_spacer.appendChild(p_object_units)
        div_object_ing.appendChild(div_spacer)

        document.querySelector('#display_info2').appendChild(div_object_ing);
    }

}
