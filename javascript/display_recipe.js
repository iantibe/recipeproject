function open_slider(target_div){
    let button = document.querySelector(target_div)
     if(getComputedStyle(button).getPropertyValue("display") === "none"){
          button.style.setProperty('display', "block")
      } else {
         button.style.setProperty('display', "none")
      }
}

function load_recipe_detail(recipe_id){
    //add code to display object on screen
    console.log('I was clicked')
    console.log(recipe_id)
}

function create_recipe_button(text_to_display, classname, addlocation, recipe_id){
    var x = document.createElement("div");
    var text = document.createTextNode(text_to_display);
    x.className = classname
    x.appendChild(text)
    x.addEventListener('click', function (){load_recipe_detail(recipe_id)})
    document.querySelector(addlocation).appendChild(x)
}

function  generate_recipe_buttons(){
    //generates recipes buttons from a call from server or cookie
}

function get_data_from_server(){
    //gets data from server and places in object
}

function get_data_from_cookie(){
    //gets data from cookie and places in object
}

