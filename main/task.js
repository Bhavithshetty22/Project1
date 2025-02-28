document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-task-btn")
  const modal = document.getElementById("modal")
  const closeModal = document.getElementById("close-modal")
  const taskTitle = document.getElementById("task-title")
  const taskDescription = document.getElementById("task-description")
  const taskDate = document.getElementById("task-date")
  const createTaskBtn = document.getElementById("create-task")
  const step1 = document.getElementById("step-1")
  const step2 = document.getElementById("step-2")
  const step3 = document.getElementById("step-3")
  const next1 = document.getElementById("next-1")
  const next2 = document.getElementById("next-2")
  const categoryButtons = document.querySelectorAll(".category-btn")

  let tasks = []
  let currentStep = 1
  let selectedCategory = ""

  flatpickr(taskDate, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  })

  addTaskBtn.addEventListener("click", () => {
    modal.style.display = "block"
    currentStep = 1
    showStep(currentStep)
  })

  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    resetForm()
  })

  next1.addEventListener("click", () => {
    if (taskTitle.value.trim() !== "") {
      currentStep = 2
      showStep(currentStep)
    }
  })

  next2.addEventListener("click", () => {
    if (taskDate.value.trim() !== "") {
      currentStep = 3
      showStep(currentStep)
    }
  })

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("selected"))
      button.classList.add("selected")
      selectedCategory = button.dataset.category
    })
  })

  createTaskBtn.addEventListener("click", () => {
    if (taskTitle.value.trim() !== "" && taskDate.value.trim() !== "" && selectedCategory !== "") {
      const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        description: taskDescription.value,
        date: new Date(taskDate.value),
        category: selectedCategory,
        completed: false,
      }
      tasks.push(newTask)
      renderTasks()
      modal.style.display = "none"
      resetForm()
    }
  })

  function showStep(step) {
    step1.classList.add("hidden")
    step2.classList.add("hidden")
    step3.classList.add("hidden")

    switch (step) {
      case 1:
        step1.classList.remove("hidden")
        break
      case 2:
        step2.classList.remove("hidden")
        break
      case 3:
        step3.classList.remove("hidden")
        break
    }
  }

  function resetForm() {
    taskTitle.value = ""
    taskDescription.value = ""
    taskDate.value = ""
    selectedCategory = ""
    categoryButtons.forEach((btn) => btn.classList.remove("selected"))
    currentStep = 1
    showStep(currentStep)
  }

  function renderTasks() {
    const columns = {
        Mathematics: document.querySelector("#mathematics .task-list"),
        Chemistry: document.querySelector("#chemistry .task-list"),
        Physics: document.querySelector("#physics .task-list"),
    };

    for (const category in columns) {
        columns[category].innerHTML = "";
    }

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task-item";
        
        // Select image based on category
        let imageSrc = "";
        switch (task.category) {
            case "Mathematics":
                imageSrc = "./chalkboard.png"; // Change this to the actual path of your image
                break;
            case "Chemistry":
                imageSrc = "./lab.png";
                break;
            case "Physics":
                imageSrc = "./todophy.png";
                break;
        }

        taskElement.innerHTML = `
            <div class="task-container">
            <div class="imgbox">
                <img src="${imageSrc}" class="task-image" alt="${task.category}">
                </div>
                <div class="task-info">
                    
                    <label class="container1"><input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}><div class="checkmark"></div></label>
                    <div>
                    <div class="head">
                        <div class="task-title">${task.title}</div>
                        <div class="task-description">${task.description}</div>
                        </div>
                        <div class="task-date">${task.date.toLocaleString()}</div>
                    </div>
                </div>
                <button class="delete-btn"  data-id="${task.id}">
                    <svg viewBox="0 0 448 512" class="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                </button>
            </div>
        `;

        const checkbox = taskElement.querySelector(".task-check");
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const deleteBtn = taskElement.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
        });

        columns[task.category].appendChild(taskElement);
    });
}

renderTasks();
})

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle=body.querySelector(".toggle"),
    modeSwitch=body.querySelector(".toggle-switch"),
    modeText=body.querySelector(".mode-text");

    toggle.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
    });
    modeSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText ="Light Mode"
        }
        else{
            modeText.innerText="Dark Mode"
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        const textElement = document.getElementById("text");
        const text = textElement.innerText;
        textElement.innerText = ""; // Clear original text
      
        text.split("").forEach((char, index) => {
          const span = document.createElement("span");
          span.innerText = char;
          span.style.animationDelay = `${index * 0.1}s`; // Delay each letter
          textElement.appendChild(span);
        });
      });
      