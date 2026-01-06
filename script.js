const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const form = document.getElementById("task-form");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filters button");

let currentFilter = "all";

// FORM SUBMIT
form.addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

// ADD TASK
function addTask(){
    if(inputBox.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = inputBox.value;

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
    updateCount();
}

// CLICK EVENTS
listContainer.addEventListener("click", e => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
    updateCount();
});

// DOUBLE CLICK → EDIT
listContainer.addEventListener("dblclick", e => {
    if(e.target.tagName === "LI"){
        editTask(e.target);
    }
});

function editTask(li){
    li.classList.add("editing");

    const input = document.createElement("input");
    input.type = "text";
    input.value = li.firstChild.textContent;
    input.className = "edit-input";

    li.innerHTML = "";
    li.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => {
        li.textContent = input.value || "Untitled task";
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.classList.remove("editing");
        saveData();
        updateCount();
    });
}

// FILTERS
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

function applyFilter(){
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        if(currentFilter === "all"){
            task.style.display = "block";
        }
        else if(currentFilter === "active"){
            task.style.display = task.classList.contains("checked") ? "none" : "block";
        }
        else{
            task.style.display = task.classList.contains("checked") ? "block" : "none";
        }
    });
}

// COUNTER
function updateCount(){
    const total = listContainer.children.length;
    const completed = listContainer.querySelectorAll(".checked").length;
    taskCount.textContent = `${total - completed} tasks left`;
}

// STORAGE
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateCount();
}

showTask();
