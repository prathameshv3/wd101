let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function fillTable(){
    let object = localStorage.getItem("user_entries");
    if(object){
        user_entries = JSON.parse(object);
    }else{
        user_entries = [];
    }
    return user_entries;
}
user_entries = fillTable();

let username = element("name"),
  email = element("email"),
  password = element("password"),
  tc = element("tc"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");

function verify(element,message,cnd){
    if(cnd){
        element.style.border = "2px solid Yellow";
        element.setCustomValidity(message);
        element.reportValidity();
    }else{
        element.style.border = "2px solid Violet";
        element.setCustomValidity('');

    }
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}
let message_name = "Username must be at least 5 characters long";
let message_email = "Your Email must be valid";
let message_agree = "You must agree all the terms and conditions";
let message_dob = "You age is between 18 and 55 to go futher ";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username,message_name,cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,message_dob,cond_dob);
});
tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc,message_agree,cond_agree);
});

function makeObject(){
    let check = false;
    if(tc.checked){
        check = true;
    }
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: check
    }
    return obj;
}


function displayTable(){
    let table = element("user-table");
    let entries = user_entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree= !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        user_entries.push(obj);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    displayTable();
});
window.onload = (event) => {
    displayTable();
};
