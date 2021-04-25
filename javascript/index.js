//check for user name and id, then set

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