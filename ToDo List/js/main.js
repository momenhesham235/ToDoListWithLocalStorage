let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// check if theres task in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage();

// add task
submit.onclick = function (){
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

// click on task element
tasksDiv.addEventListener("click" , (e) => {
    if(e.target.classList.contains("del")){ 
         // remove element from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // remove element from page
        e.target.parentElement.remove()
    }
    // task element
    if(e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskText){
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed:false
    }
    // push task to array of tasks
    arrayOfTasks.push(task);
    //Add Elements To Page
    addElementsToPageFrom(arrayOfTasks) 
    // add task to local storage
    addDataToLocalStorage(arrayOfTasks)

}

function addElementsToPageFrom(arrayOfTasks){
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // add element
    arrayOfTasks.forEach( (task) => {
        let div = document.createElement("div");
        div.className = "task"
        // check if class is done
        if(task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("x"));
        div.appendChild(span)
        // add task into main div
        tasksDiv.appendChild(div)
    })
}

function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        addElementsToPageFrom(JSON.parse(data));
    }
}

 function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter( (task) => task.id != taskId)
    addDataToLocalStorage(arrayOfTasks);
 }

function toggleStatusTaskWith(taskId){
    for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks)
}