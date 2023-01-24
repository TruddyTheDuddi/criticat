let panelForm = document.getElementById("form");
let panelSuccess = document.getElementById("success");

let submitBtn = document.getElementById("submit_btn");
let categoryList = document.getElementById("cat_list");
let resp = document.getElementById("resp_msg");
submitBtn.addEventListener("click", submitMessage);

function submitMessage(){
    submitBtn.classList.add("disabled");
    categoryList.classList.add("disabled");
    
    let msg = document.getElementById("post_box").value.trim();
    let cat = document.querySelector('input[name="category"]:checked').value;
   
    let data = { "msg": msg, "cat_id": cat };
    
    ajax("backend/submit.php", "GET", encodeQueryData(data), null, (obj, res) => {
        let data = JSON.parse(res);
        let respMsg = "";
        if(data.success){
            document.getElementById("post_box").value = "";
            textareaRefresh();
            panelForm.classList.add("fadeOut");

            setTimeout(() => {
                panelForm.style.display = "none";
                panelSuccess.style.display = null;
                panelSuccess.classList.add("fadeIn");
            }, 500);
        } else {
            resp.style.display = null;
            respMsg = "<b>Error : </b>"
            resp.innerHTML = respMsg + data.msg;
        }
        
        // Remove disabled class for submit button after 5 seconds
        setTimeout(() => {
            submitBtn.classList.remove("disabled");
        }, 1500);
        categoryList.classList.remove("disabled");
    });
}

let cat_desc = document.getElementById('cat_desc');
document.getElementById("cat_list").childNodes.forEach(
    c => {
        c.addEventListener("click",
            e => {
                let str = c.querySelector("#cat_name").title;
                let name = c.querySelector("#cat_name").innerHTML;
                if(str){
                    cat_desc.innerHTML = "<b>" + name + " :</b> " + str;
                    cat_desc.style.display = null;
                } else {
                    cat_desc.innerHTML = "";
                    cat_desc.style.display = "none";
                }
            }
        );
    }
);
