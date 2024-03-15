let input = document.getElementById("taskInput");
let btn_add = document.querySelector(".add");
let ul = document.getElementById("taskList");

btn_add.addEventListener("click", addTask);

function addTask() {
  let taskText = input.value.trim();
  if (taskText !== "") {
    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "delete";
    deleteBtn.onclick = function () {
      li.remove();
    };

    li.appendChild(deleteBtn);
    ul.appendChild(li);

    input.value = "";
  }
}
