function loadNotes() {
    let feedback = document.getElementById("feedback");
    
    ajax("backend/get_notes.php", "GET", "", null, (obj, res) => {
        let data = JSON.parse(res);
        if (data.success) {
            feedback.innerHTML = "";
            data.payload.notes.forEach(n => {
                feedback.appendChild(inflateNote(n));
            });
        } else {
            feedback.innerHTML = "<b>Error while loading notes!</b> Try again...";
        }
    });
}

function inflateNote(data){
    console.log(data);
    let note = document.createElement("div");
    note.classList.add("post");

    let noteInfo = document.createElement("div");
    noteInfo.classList.add("post_info");

    let noteCat = document.createElement("div");
    noteCat.classList.add("post_cat");
    noteCat.innerHTML = data.cat;

    let noteDate = document.createElement("div");
    noteDate.classList.add("post_date");
    noteDate.innerHTML = prettyDate(data.date_created);

    let noteBody = document.createElement("div");
    noteBody.classList.add("post_body");
    noteBody.innerHTML = data.msg;

    note.appendChild(noteBody);
    noteInfo.appendChild(noteDate);
    noteInfo.appendChild(noteCat);
    note.appendChild(noteInfo);

    return note;
}

loadNotes();