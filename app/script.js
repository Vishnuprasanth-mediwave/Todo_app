allTasks = [
  {
    id: "1",
    work: "clean home",
    ischecked: false,
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
function clearUl() {
  const ul = document.querySelector(".unchecked-task");
  ul.innerHTML = "";
}

function MakeLiList(task) {
  if (task.ischecked) {
    const li = document.createElement("li");
    li.setAttribute("id", `task-${task["id"]}`);
    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.checked = true;
    let id = `task-${task["id"]}-check`;
    inputCheckBox.setAttribute("id", id);
    const p = document.createElement("p");
    p.setAttribute("class", "para");
    p.setAttribute("id", `task-${task["id"]}-para`);
    p.innerHTML = task["work"];
    p.style.textDecoration = "line-through";
    li.appendChild(inputCheckBox);
    li.appendChild(p);
    inputCheckBox.addEventListener("change", function () {
      if (inputCheckBox.checked) {
        checkingCheckBox(task["id"], true);
      } else {
        checkingCheckBox(task["id"], false);
      }
    });
    return li;
  } else {
    const li = document.createElement("li");
    li.setAttribute("id", `task-${task["id"]}`);
    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox");
    let id = `task-${task["id"]}-check`;
    inputCheckBox.setAttribute("id", id);
    const p = document.createElement("p");
    p.setAttribute("class", "para");
    p.setAttribute("id", `task-${task["id"]}-para`);
    p.innerHTML = task["work"];
    p.style.textDecoration = "";
    li.appendChild(inputCheckBox);
    li.appendChild(p);
    inputCheckBox.addEventListener("change", function () {
      if (inputCheckBox.checked) {
        checkingCheckBox(task["id"], true);
      }
    });
    return li;
  }
}

function checkingCheckBox(taskId, bool) {
  const checkIndex = allTasks.findIndex((task) => task.id == taskId);
  if (checkIndex != -1) {
    allTasks[checkIndex]["ischecked"] = bool;
    sortArray();
    saveToLocalStorage();
    updateUiList();
  }
}

function sortArray() {
  allTasks.sort((a, b) =>
    a.ischecked === b.ischecked ? 0 : a.ischecked ? 1 : -1
  );
}
function addForm() {
  const form = document.querySelector("#add-form");
  const textInput = document.getElementById('textInput');

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let taskInput = document.querySelector("#task").value;
    let button = document.querySelector("#create-todo");
    const task = {
      id: new Date().getTime(),
      work: taskInput,
      ischecked: false,
    };
    addtask(task);
    clearValue();
    updateUiList();
  });
}
function clearValue(){
  const taskInput = document.querySelector("#task")
  taskInput.value="";
}
function addtask(task) {
  allTasks.push(task);
  sortArray();
  saveToLocalStorage();
}
function saveToLocalStorage() {
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

const inputField = document.getElementById("task");
const submitButton = document.getElementById("create-todo");
inputField.addEventListener("input", function () {
  if (inputField.value !== "") {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
getFromLocalStorage();
updateUiList();
addForm();
