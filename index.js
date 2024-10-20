if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log("Service Worker registered with scope:", registration.scope);
            }).catch(error => {
                console.log("Service Worker registeration failed", error);
            });
    });
}

//"standalone",

// Function to add task to json file on submit
function addTask() {
    // Get task from input tag
    const inputValue = document.getElementById("task__input").value;

    // Get json file from localStorage or initialise new json file
    const jsonData = JSON.parse(localStorage.getItem("data")) || { tasks: [] };

    // Add task to the json file
    jsonData.tasks.unshift(inputValue);

    // Update the JSON data
    localStorage.setItem("data", JSON.stringify(jsonData));

    // Clear the input value
    inputValue = "";

    // Reload the page
    window.location.reload();
}

// Function to display tasks
function displayTasks() {
    // clear the task list
    var tasklist = document.getElementById("tasks");
    tasklist.innerHTML = "";

    // Get tasks from local storage
    const jsonData = JSON.parse(localStorage.getItem("data")) || { tasks: [] };

    // Button icons
    const checkicon = ""
    const trashicon = "" 

    // Add tasks to html file
    jsonData.tasks.forEach(function (item) {
        var li = document.createElement("li");
        var li_span = document.createElement("span")
        li_span.textContent = item;

        // Creates a checkbox
        var checkbox = document.createElement("button");
        checkbox.textContent = ""
        //checkbox.appendChild(checkicon);
        checkbox.classList.add("btn", "check-btn");

        //validate if item is checked
        if (item.startsWith("§ ")) {

            //delete the first word
            li_span.textContent = "";
            var todo = item.split(" ");
            todo.shift();
            li_span.textContent = todo.join(" ");
            li_span.classList.add("completed");
            checkbox.classList.add("checked");
        }
        //uncheck task
        if (!item.startsWith("§ ")) {
            li_span.classList.remove("completed");
            checkbox.classList.remove("checked");
        }

        checkbox.addEventListener("click", function () { checktask(item)});

        // creates a delete button with delete functions
        var deleteButton = document.createElement("button");
        deleteButton.textContent = ""
        //deleteButton.appendChild(trashicon);
        deleteButton.classList.add("btn", "del-btn");
        deleteButton.addEventListener("click", function () { deleteTask(item)});

        // Button div clas
        var div = document.createElement("div");
        div.textContent = ""
        div.classList.add("btn-div")

        // Binds the elements to their parent
        div.appendChild(checkbox)
        div.appendChild(deleteButton);

        li.appendChild(li_span)
        li.appendChild(div)
        tasklist.appendChild(li);
    });
}

// Toggle completed task
function checktask(task) {

    var jsonData = JSON.parse(localStorage.getItem("data")) || { tasks: [] };
    
    // Find item
    var taskIndex = jsonData.tasks.indexOf(task);

    if (taskIndex > -1) {
 
        // toggle task completion
        jsonData.tasks[taskIndex] = jsonData.tasks[taskIndex].startsWith("§ ") ? jsonData.tasks[taskIndex].slice(2) : "§ " + jsonData.tasks[taskIndex];        
    
        localStorage.setItem("data", JSON.stringify(jsonData));
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(task) {
    // load tasks from local storage
    const jsonData =JSON.parse(localStorage.getItem("data"));

    // Get the index number of the task
    var taskIndex =jsonData.tasks.indexOf(task);

    // loop through the json data to remove a task
    if (taskIndex > -1) {
        jsonData.tasks.splice(taskIndex, 1);
    }

    // Update the local storage
    localStorage.setItem("data", JSON.stringify(jsonData));

    // Reload the page
    window.location.reload();
}


// Display the tasks
displayTasks();