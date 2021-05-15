function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function CreateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function setup_name_user_id(){
    name = getCookie("userid")
    if( name === ""){
        setTimeout(function() {
            newname = prompt("Enter name")
            newguid = CreateUUID()
            setCookie("userid",newname,365)
            setCookie("userguid",newguid, 365)
            document.querySelector('#username').innerHTML = newname
        }, 5000);
    }else {
        document.querySelector('#username').innerHTML = name
    }
}

function change_server(){
    new_server = prompt("Enter new Server Name or IP Number")
    server_address = new_server
    display_server()
}

function display_server(){
    document.querySelector('#server_value').innerHTML = server_address;
}

function change_source(){
    var e = document.querySelector('#source');
    datasource = e.options[e.selectedIndex].value;
    display_source()
}

function display_source(){
    document.querySelector('#source_display').innerHTML = datasource
}

function load_initial_json(){
   if(localStorage.getItem(localstorage_var_name) === null) {
       fetch("json_response.txt")
           .then(function (response) {
               return response.json();
           })
           .then(function (result) {
               localStorage.setItem(localstorage_var_name, JSON.stringify(result))
           });

       console.log(localStorage.getItem(localstorage_var_name))
       console.log(JSON.parse(localStorage.getItem(localstorage_var_name)))
   }else{
       console.log("did not load init")
   }
}

function change_to_ethereal(){
    server_address = "http://etherealmind.ddns.net:8000"
    display_server()
}

function change_to_python_anywhere(){
    server_address = "http://itibe.pythonanywhere.com"
    display_server()
}

function set_up_display_recipe(){
    get_data_from_server()
    setTimeout(function(){ generate_recipe_buttons(); }, 1500);

}

function set_up_remote_status(){
    setTimeout(function(){display_source(); display_server();},1000)
}

function get_menu_option(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector('#content').innerHTML = this.responseText
        }
    };
    xhttp.open("GET", data, true);
    xhttp.send();
}

