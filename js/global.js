document.fonts.ready.then(function () {
    textareaSetup();
});

/**
 * Textarea elements are auto-resizing
 */
function textareaSetup(){
    const txtAreas = document.getElementsByTagName("textarea");
    for (let i = 0; i < txtAreas.length; i++) {
        txtAreas[i].style.height = txtAreas[i].scrollHeight + "px";
        txtAreas[i].style.overflowY = "hidden";
        txtAreas[i].addEventListener("input", resizeTextarea, false);
        txtAreas[i].addEventListener("input", resizeTextarea, false);
        // Remove spellcheck because red on gray is ugly and can't be seen correctly.
        // Unless I am slighlty colorblind, I still don't know after 21 years. 
        txtAreas[i].setAttribute("autocomplete", "off");
    }

    function resizeTextarea(){
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }
}

function textareaRefresh(){
    const txtAreas = document.getElementsByTagName("textarea");
    for (let i = 0; i < txtAreas.length; i++) {
        txtAreas[i].style.height = "auto";
        txtAreas[i].style.height = (txtAreas[i].scrollHeight) + "px";
    }
}

/**
 * Object turned into a string for the GET URI 
 */
function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return "?" + ret.join('&');
}

/**
 * Humanize time
 */
function prettyDate(t) {
    let time_difference = Date.now() / 1000 - t;
    if (time_difference < 1) { 
        return 'Just now!'; 
    }

    const conds = new Map();
    conds.set(12 * 30 * 24 * 60 * 60, 'year');
    conds.set(30 * 24 * 60 * 60, 'month');
    conds.set(24 * 60 * 60, 'day');
    conds.set(60 * 60, 'hour');
    conds.set(60, 'minute');
    conds.set(1, 'second');

    let out = "";

    conds.forEach((str, secs) => {
        let d = time_difference / secs;
        if(d >= 1 && out == "")
        {
            t = Math.round(d);
            out = t + " " + str + (t > 1 ? 's' : '' ) + " ago"; 
        }
    });

    return out;
}

function injectFooter(){
    let footer = document.querySelector('footer');
    ajax('backend/footer.html', 'GET', '', null, (obj, res) => {
        footer.innerHTML = res;
    });
}

injectFooter();