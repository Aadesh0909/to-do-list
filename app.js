var submit = document.getElementById("submit");
var form = document.getElementById("form");
var update = document.getElementById("update");
update.style.width = "100px"
update.style.display = "none";
var input = document.querySelector("input");
input.style.width = "550px";
input.style.height = "50px"
input.style.boxShadow = "1px 5px";


submit.style.backgroundColor = "#32224d";
submit.style.height = "50px";
submit.style.borderRadius = "25px";
submit.style.borderColor = "blue";

update.style.borderRadius = "25px";
update.style.height = "50px";
update.style.backgroundColor = "#3256ad"

var table = document.querySelector(".table");
table.style.borderRadius = "10px"
table.style.backgroundColor = "#a6a2e8";


var userArray = [];

//from local storage to tasklist
var initialUserData = getUserData();
if (initialUserData.length > 0 ){
    userArray = initialUserData;
    taskTable(userArray)
}
function getUserData(){
    if (localStorage.getItem("setUserTask")){
        return JSON.parse(localStorage.getItem("setUserTask"));
    }
    return [];
}
// console.log(getUserData());


//Id
function uuid() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

//To Edit in Tasklist
function onEdit(e){
   var getId = e.getAttribute("data-id");
   localStorage.setItem("setId",getId);
   update.style.display = "inline-block";
   submit.style.display = "none";
   var getLocalData = getUserData();
   var getObj = getLocalData.find((user)=> getId === user.Id);
   wishList.value = getObj.taskList;
    console.log(getObj);
}
// for update
function onUpdate(){
    var getId = localStorage.getItem("setId");
    getLocalData = getUserData();
    var getObj = getLocalData.find((user)=> getId === user.Id);

   if (getObj) {
    getObj.taskList = wishList.value;
   }
   localStorage.setItem("setUserTask", JSON.stringify(getLocalData));
   form.reset();
   update.style.display = "inline-block";
   submit.style.display = "none";
   taskTable(getLocalData);
}
update.addEventListener("click",onUpdate)

//delete

function onDelete(e){
    var getId = e.getAttribute("data-id");
    var getLocalData = getUserData();
    var modifiedData = getLocalData.filter((user)=> getId !== user.Id);
    localStorage.setItem("setUserTask",JSON.stringify(modifiedData));
    taskTable(modifiedData);   
    window.location.reload();
}

// To add new task
function Oncreate(e){
    e.preventDefault();
    var userObj = {
        taskList : wishList.value,
        Id: uuid(),
    };
    userArray.push(userObj);
    localStorage.setItem("setUserTask", JSON.stringify(userArray));
    form.reset();
    taskTable(userArray)
}
form.addEventListener("submit", Oncreate);

// for task list
function taskTable(e){
    var result = "";
    e.map((user)=>{
        result += `<tr>
        <td>${user.taskList}</td>
        <td><button data-id =${user.Id} onclick = "onEdit(this)" class = "btn btn-outline-dark btn-sm">Edit Task</button></td>
        <td><button data-id =${user.Id} onclick = "onDelete(this)" class = "btn btn-outline-danger btn-sm">Delete Task</button></td>
        </tr>`
    });
    userWishList.innerHTML = result;
}
