document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");
  const add = document.getElementById("addTask");
  const emptyImage = document.querySelector("img");
  const taskSummary = document.getElementById("taskSummary");
  const successAnimation = document.getElementById("successAnimation");
  const winSound = document.getElementById("winSound");

  let hasPlayedSound = false;

  function updateSummary() {
    const total = list.children.length;
    const completed = list.querySelectorAll(".completed").length;
    taskSummary.textContent = `Completed ${completed} of ${total} tasks`;

    if (total > 0 && completed === total) {
      successAnimation.style.display = "block";
      if (!hasPlayedSound) {
        winSound.currentTime = 0;
        winSound.play();
        hasPlayedSound = true;
      }
    } else {
      successAnimation.style.display = "none";
      hasPlayedSound = false;
    }
  }

  function removeEmpty() {
    emptyImage.style.display = list.children.length === 0 ? "block" : "none";
  }

  function taskAdd(event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.innerHTML = `
      ${taskText}
      <div class="button">
        <button class="completebtn">
          <span class="material-symbols-outlined">task_alt</span>
        </button>
        <button class="deletebtn">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;

    list.appendChild(li);
    input.value = "";
    removeEmpty();
    updateSummary();
  }

  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (e.target.closest(".deletebtn")) {
      li.remove();
      removeEmpty();
      updateSummary();
    }

    if (e.target.closest(".completebtn")) {
      li.classList.toggle("completed");
      updateSummary();
    }
  });

  add.addEventListener("click", taskAdd);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      taskAdd(e);
    }
  });
});

