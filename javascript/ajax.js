function get_data(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector('#content').innerHTML = this.responseText
        }
    };
    xhttp.open("GET", data, true);
    xhttp.send();
}

