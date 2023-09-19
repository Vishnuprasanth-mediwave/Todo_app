allTasks = [
  {
    id: "1",
    work: "clean home",
  },
];
function updateUiList() {
    clearUl();
    
  for (let task of allTasks) {
    const event = MakeLiList(task);
    const ul = document.querySelector(".unchecked-task");
    ul.appendChild(event);
  }
}
function clearUl(){
    const ul = document.querySelector(".unchecked-task");
    ul.innerHTML=""
}

function MakeLiList(task) {
  const li = document.createElement("li");
  li.setAttribute("id", `task-${task["id"]}`);
    
  const inputCheckBox = document.createElement("input");
  inputCheckBox.setAttribute("type", "checkbox");
  let id = `task-${task["id"]}-check`;
  inputCheckBox.setAttribute("id",id);
  console.log(id)

  

  const p = document.createElement("p");
  p.setAttribute("class", "para");
  p.setAttribute("id", `task-${task["id"]}-para`);
  p.innerHTML = task["work"];

  li.appendChild(inputCheckBox);
  li.appendChild(p);


  inputCheckBox.addEventListener('change', function() {
    const strikePara =document.querySelector("#checked-task")
  if (inputCheckBox.checked) {
    p.style.textDecoration = "line-through";
    strikePara.appendChild(li)

  } else {
    p.style.textDecoration = ""
  }
});

  return li;
}
function addForm(){
     const form =document.querySelector("#add-form") 
     form.addEventListener("submit",function(e){
        e.preventDefault();

     let taskInput=document.querySelector("#task").value;
     let button=document.querySelector("#create-todo")
        
     const task = {
        id: new Date().getTime(),
        work: taskInput
     }
     addtask(task);
     updateUiList();
     })
}
function addtask(task){
    allTasks.push(task);
    saveToLocalStorage();
}
// function strikeOut(id){
//     const checkbox = document.querySelector("#id");
  
    
// }

function saveToLocalStorage(){
    const str = JSON.stringify(allTasks);
    localStorage.setItem("my-event-list", str);
}

function getFromLocalStorage() {
    const str = localStorage.getItem("my-event-list");
    if (!str) {
      return allTasks;
    } else {
        allTasks = JSON.parse(str);
    }
}
getFromLocalStorage();
updateUiList();
addForm();
