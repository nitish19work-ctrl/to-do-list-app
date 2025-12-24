const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const form = document.getElementById("task-form");

// FORM SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

// Add task
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

// Check & delete
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// Save data
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved data
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
