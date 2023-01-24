/**
 * Full AJAX request with specified caught xhttp changes
 * NEW: Fuctions are all embedded when sent
 */
function ajax(URL, method, dataToSend, objectToChange, onSuccess=null, onError=null){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){ 
        if (this.readyState == 4 && this.status == 200) {
            if(onSuccess !== null) {
                onSuccess(objectToChange, xhttp.responseText);
            } else {
                objectToChange.innerHTML = xhttp.responseText;
            }
        } else {
            if(this.readyState == 4 && this.status != 200){
                console.error("Error while executing ajax command [Code: "+this.status+"]");
                if(onError !== null)
                    onError(objectToChange, this.status);
            }
        }
    }

    // Setting fuctions for each case (optional)
    if(onError !== null)
        xhttp.addEventListener("error", onError);
        xhttp.addEventListener("timeout", onError);
    
    switch(method){
        case "POST":
            xhttp.open("POST", URL);
            xhttp.send(dataToSend);
            break;
        
        case "GET":
            xhttp.open("POST", URL+dataToSend);
            xhttp.send();
            break;
    }
}


/**
 * Full AJAX request with specified caught xhttp changes
 * @param {string} URL Path to the image handler
 * @param {FormData} dataToSend A full FormData with all info needed
 * @param {object} objectToChange Object to pass for the onSuccess if not null, else immediate change
 * @param {function} onSuccess Function to be called when request over
 * @param {function} onError Function to be called when event progress is triggered
 * @param {function} onProgress Function to be called when event progress is triggered
 */
 function ajaxImg(URL, dataToSend, objectToChange, onSuccess = null, onError = null, onProgress = null){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){ 
        if (this.readyState == 4 && this.status == 200) {
            if(onSuccess !== null) {
                onSuccess(objectToChange, xhttp.responseText);
            } else {
                objectToChange.innerHTML = xhttp.responseText;
            }
        } else {
            if(this.readyState == 4 && this.status != 200){
                //console.error("Error while executing ajax command [Code: "+this.status+"]");
                if(onError !== null)
                    onError(objectToChange);
            }
        }
    }

    // Setting fuctions for each case (optional)
    if(onError !== null) {
        xhttp.addEventListener("error", onError);
        xhttp.addEventListener("timeout", onError);
    }

    if(onProgress !== null)
        xhttp.upload.addEventListener("progress", onProgress(objectToChange), false)

    xhttp.open("POST", URL);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Not sure what the fuck this is but it made me get stuck for an hour
    xhttp.send(dataToSend);

    return xhttp;
}